import { NotFoundError } from '../../shared/errors/AppError.js';
import {
  toAniversarioAdminDto,
  toConsultaGeneralAdminDto,
} from './forms.dtos.js';
import { formsRepository } from './forms.repository.js';

export const formsService = {
  async registerAniversarioPostulacion(sanitized, metadata) {
    return formsRepository.createAniversario(sanitized, metadata);
  },

  async registerBeneficioDecision(dto) {
    const updated = await formsRepository.updateAniversarioBeneficio(dto);
    if (!updated) {
      throw new NotFoundError('No se encontró la postulación asociada a esta sesión.');
    }
    return updated;
  },

  async registerConsultaGeneral(sanitized, metadata) {
    return formsRepository.createConsultaGeneral(sanitized, metadata);
  },

  async getSummary() {
    return formsRepository.getDashboardSummary();
  },

  async listAniversarioForAdmin(filters) {
    const { items, total } = await formsRepository.listAniversario(filters, { paginate: true });
    return {
      items: items.map(toAniversarioAdminDto),
      pagination: {
        page: filters.page,
        pageSize: filters.pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / filters.pageSize)),
      },
    };
  },

  async updateAniversarioReview(id, updates, adminId) {
    const updated = await formsRepository.updateAniversarioReview(id, {
      ...updates,
      revisadoPorAdminId: adminId,
    });
    if (!updated) {
      throw new NotFoundError('Postulación de aniversario no encontrada.');
    }
    return toAniversarioAdminDto(updated);
  },

  async deleteAniversarioForAdmin(id) {
    const deleted = await formsRepository.deleteAniversario(id);
    if (!deleted) {
      throw new NotFoundError('Postulación de aniversario no encontrada.');
    }
    return deleted;
  },

  async listConsultasForAdmin(filters) {
    const { items, total } = await formsRepository.listConsultasGenerales(filters, {
      paginate: true,
    });
    return {
      items: items.map(toConsultaGeneralAdminDto),
      pagination: {
        page: filters.page,
        pageSize: filters.pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / filters.pageSize)),
      },
    };
  },

  async updateConsultaReview(id, updates, adminId) {
    const updated = await formsRepository.updateConsultaReview(id, {
      ...updates,
      revisadoPorAdminId: adminId,
    });
    if (!updated) {
      throw new NotFoundError('Consulta general no encontrada.');
    }
    return toConsultaGeneralAdminDto(updated);
  },

  async deleteConsultaForAdmin(id) {
    const deleted = await formsRepository.deleteConsultaGeneral(id);
    if (!deleted) {
      throw new NotFoundError('Consulta general no encontrada.');
    }
    return deleted;
  },
};
