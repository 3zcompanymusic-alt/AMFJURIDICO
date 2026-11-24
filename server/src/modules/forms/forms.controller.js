import { ValidationError } from '../../shared/errors/AppError.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { extractClientMetadata } from '../../shared/utils/requestMeta.js';
import {
  parseAdminFormsQueryDto,
  parseBeneficioDecisionDto,
  parseCreateAniversarioDto,
  parseCreateConsultaGeneralDto,
  parseUpdateReviewDto,
} from './forms.dtos.js';
import { formsService } from './forms.service.js';

function parsePositiveId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError('Identificador inválido.');
  }
  return id;
}

export const formsController = {
  createAniversario: asyncHandler(async (req, res) => {
    const dto = parseCreateAniversarioDto(req.body);
    const metadata = extractClientMetadata(req);
    const created = await formsService.registerAniversarioPostulacion(dto, metadata);
    res.status(201).json({
      ok: true,
      message: 'Postulación registrada con éxito.',
      data: created,
    });
  }),

  updateBeneficio: asyncHandler(async (req, res) => {
    const dto = parseBeneficioDecisionDto(req.body);
    const updated = await formsService.registerBeneficioDecision(dto);
    res.status(200).json({ ok: true, data: updated });
  }),

  createConsultaGeneral: asyncHandler(async (req, res) => {
    const dto = parseCreateConsultaGeneralDto(req.body);
    const metadata = extractClientMetadata(req);
    const created = await formsService.registerConsultaGeneral(dto, metadata);
    res.status(201).json({
      ok: true,
      message: 'Consulta registrada con éxito.',
      data: created,
    });
  }),

  adminSummary: asyncHandler(async (_req, res) => {
    const summary = await formsService.getSummary();
    res.status(200).json({ ok: true, data: summary });
  }),

  adminListAniversario: asyncHandler(async (req, res) => {
    const filters = parseAdminFormsQueryDto(req.query);
    const data = await formsService.listAniversarioForAdmin(filters);
    res.status(200).json({ ok: true, data });
  }),

  adminUpdateAniversario: asyncHandler(async (req, res) => {
    const id = parsePositiveId(req.params.id);
    const dto = parseUpdateReviewDto(req.body);
    const updated = await formsService.updateAniversarioReview(id, dto, req.admin.id);
    res.status(200).json({ ok: true, data: updated });
  }),

  adminDeleteAniversario: asyncHandler(async (req, res) => {
    const id = parsePositiveId(req.params.id);
    const deleted = await formsService.deleteAniversarioForAdmin(id);
    res.status(200).json({
      ok: true,
      message: 'Postulación eliminada correctamente.',
      data: deleted,
    });
  }),

  adminListConsultas: asyncHandler(async (req, res) => {
    const filters = parseAdminFormsQueryDto(req.query);
    const data = await formsService.listConsultasForAdmin(filters);
    res.status(200).json({ ok: true, data });
  }),

  adminUpdateConsulta: asyncHandler(async (req, res) => {
    const id = parsePositiveId(req.params.id);
    const dto = parseUpdateReviewDto(req.body);
    const updated = await formsService.updateConsultaReview(id, dto, req.admin.id);
    res.status(200).json({ ok: true, data: updated });
  }),

  adminDeleteConsulta: asyncHandler(async (req, res) => {
    const id = parsePositiveId(req.params.id);
    const deleted = await formsService.deleteConsultaForAdmin(id);
    res.status(200).json({
      ok: true,
      message: 'Consulta eliminada correctamente.',
      data: deleted,
    });
  }),
};
