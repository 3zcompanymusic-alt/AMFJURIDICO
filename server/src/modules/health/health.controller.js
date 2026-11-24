import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { healthService } from './health.service.js';

export const healthController = {
  check: asyncHandler(async (_req, res) => {
    const status = await healthService.getStatus();
    res.status(200).json(status);
  }),
};
