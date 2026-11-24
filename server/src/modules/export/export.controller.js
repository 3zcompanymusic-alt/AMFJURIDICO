import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { parseExportQueryDto } from './export.dtos.js';
import { exportService } from './export.service.js';

export const exportController = {
  download: asyncHandler(async (req, res) => {
    const dto = parseExportQueryDto(req.query);
    const file = await exportService.generateExport(dto);

    res.setHeader('Content-Type', file.contentType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.filename}"`,
    );
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(file.buffer);
  }),
};
