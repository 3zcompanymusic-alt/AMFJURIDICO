import { cleanText } from '../../../../shared/validators.js';
import { ValidationError } from '../../shared/errors/AppError.js';
import { parseAdminFormsQueryDto } from '../forms/forms.dtos.js';

const EXPORT_TYPES = new Set(['aniversario', 'consultas', 'todos']);
const EXPORT_FORMATS = new Set(['xlsx', 'csv']);

export function parseExportQueryDto(query = {}) {
  const tipo = cleanText(query.tipo) || 'todos';
  const formato = (cleanText(query.formato) || 'xlsx').toLowerCase();

  if (!EXPORT_TYPES.has(tipo)) {
    throw new ValidationError('Tipo de exportación inválido. Usa: aniversario, consultas o todos.');
  }
  if (!EXPORT_FORMATS.has(formato)) {
    throw new ValidationError('Formato de exportación inválido. Usa: xlsx o csv.');
  }

  const filters = parseAdminFormsQueryDto({
    ...query,
    page: 1,
    pageSize: 200,
  });

  return {
    tipo,
    formato,
    filters,
  };
}
