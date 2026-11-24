import { ValidationError } from '../../shared/errors/AppError.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import {
  parseCreateInvitationDto,
  parseUpdateAdminStatusDto,
} from './adminUsers.dtos.js';
import { adminUsersService } from './adminUsers.service.js';

function parsePositiveId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError('Identificador numérico inválido.');
  }
  return id;
}

export const adminUsersController = {
  listUsers: asyncHandler(async (_req, res) => {
    const users = await adminUsersService.listAllUsers();
    res.status(200).json({ ok: true, data: users });
  }),

  updateUser: asyncHandler(async (req, res) => {
    const targetId = parsePositiveId(req.params.id);
    const dto = parseUpdateAdminStatusDto(req.body);
    const updated = await adminUsersService.updateUser(targetId, dto, req.admin.id);
    res.status(200).json({ ok: true, data: updated });
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const targetId = parsePositiveId(req.params.id);
    const deleted = await adminUsersService.deleteUser(targetId, req.admin.id);
    res.status(200).json({
      ok: true,
      message: 'Administrador eliminado correctamente.',
      data: deleted,
    });
  }),

  listInvitations: asyncHandler(async (_req, res) => {
    const codes = await adminUsersService.listInvitationCodes();
    res.status(200).json({ ok: true, data: codes });
  }),

  createInvitation: asyncHandler(async (req, res) => {
    const dto = parseCreateInvitationDto(req.body);
    const created = await adminUsersService.createInvitationCode(dto, req.admin.id);
    res.status(201).json({
      ok: true,
      message: 'Código de registro generado. Compártelo de forma segura (solo se muestra una vez).',
      data: created,
    });
  }),

  revokeInvitation: asyncHandler(async (req, res) => {
    const invitationId = parsePositiveId(req.params.id);
    const revoked = await adminUsersService.revokeInvitationCode(invitationId);
    res.status(200).json({ ok: true, data: revoked });
  }),
};
