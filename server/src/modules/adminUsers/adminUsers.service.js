import { ADMIN_ROLES } from '../../../../shared/constants.js';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '../../shared/errors/AppError.js';
import {
  generateInvitationCode,
  maskInvitationCode,
  sha256Hex,
} from '../../shared/utils/crypto.js';
import {
  toAdminUserResponseDto,
  toInvitationCodeResponseDto,
} from './adminUsers.dtos.js';
import { adminUsersRepository } from './adminUsers.repository.js';

export const adminUsersService = {
  async listAllUsers() {
    const rows = await adminUsersRepository.listAdmins();
    return rows.map(toAdminUserResponseDto);
  },

  async updateUser(targetUserId, updates, actingAdminId) {
    const target = await adminUsersRepository.findById(targetUserId);
    if (!target) {
      throw new NotFoundError('Administrador no encontrado.');
    }

    if (
      target.es_fundador &&
      (updates.activo === false ||
        (updates.rol && updates.rol !== ADMIN_ROLES.SUPER_ADMIN))
    ) {
      throw new ForbiddenError(
        'El administrador fundador es indestructible: no puede desactivarse ni degradarse.',
      );
    }

    if (Number(target.id) === Number(actingAdminId) && updates.activo === false) {
      throw new ValidationError('No puedes desactivar tu propia cuenta administrativa.');
    }

    const willRemoveSuperAdmin =
      target.rol === ADMIN_ROLES.SUPER_ADMIN &&
      target.activo === true &&
      (updates.activo === false || (updates.rol && updates.rol !== ADMIN_ROLES.SUPER_ADMIN));

    if (willRemoveSuperAdmin) {
      const activeSuperAdmins = await adminUsersRepository.countActiveSuperAdmins();
      if (activeSuperAdmins <= 1) {
        throw new ConflictError(
          'Debe permanecer al menos un Super Administrador activo en el sistema.',
        );
      }
    }

    const updated = await adminUsersRepository.updateAdmin(targetUserId, updates);
    return toAdminUserResponseDto(updated);
  },

  async createInvitationCode({ etiquetaUsuario, rolAsignado, expiraEnHoras }, actingAdminId) {
    const codigoPlano = generateInvitationCode();
    const codigoHash = sha256Hex(codigoPlano);
    const codigoPreview = maskInvitationCode(codigoPlano);
    const expiraAt = new Date(Date.now() + expiraEnHoras * 60 * 60 * 1000);

    const created = await adminUsersRepository.createInvitation({
      codigoHash,
      codigoPreview,
      etiquetaUsuario,
      rolAsignado,
      creadoPorAdminId: actingAdminId,
      expiraAt,
    });

    return toInvitationCodeResponseDto(created, codigoPlano);
  },

  async listInvitationCodes() {
    const rows = await adminUsersRepository.listInvitations();
    return rows.map((row) => toInvitationCodeResponseDto(row));
  },

  async revokeInvitationCode(invitationId) {
    const updated = await adminUsersRepository.revokeInvitation(invitationId);
    return toInvitationCodeResponseDto(updated);
  },
};
