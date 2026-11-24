import ExcelJS from 'exceljs';
import {
  toAniversarioAdminDto,
  toConsultaGeneralAdminDto,
} from '../forms/forms.dtos.js';
import { formsRepository } from '../forms/forms.repository.js';

const FORMULA_INJECTION_REGEX = /^[\s\u0000-\u001f]*[=+\-@\t\r]/;

/**
 * Neutraliza inyección de fórmulas en hojas de cálculo (CSV / Excel).
 */
export function sanitizeSpreadsheetCell(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  const str = String(value);
  if (FORMULA_INJECTION_REGEX.test(str)) {
    return `'${str}`;
  }
  return str;
}

function formatDateTimeCo(isoValue) {
  if (!isoValue) return '';
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) return String(isoValue);
  return new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

const ANIVERSARIO_COLUMNS = [
  { header: 'ID', key: 'id', width: 10 },
  { header: 'Código Postulación', key: 'codigoPostulacion', width: 20 },
  { header: 'Fecha Registro (Bogotá)', key: 'createdAt', width: 22 },
  { header: 'Postulante', key: 'nombrePostulante', width: 28 },
  { header: 'Celular / WhatsApp', key: 'celularWhatsapp', width: 20 },
  { header: '¿Quién Necesita Abogado?', key: 'quienNecesita', width: 24 },
  { header: 'Persona Afectada', key: 'nombrePersonaAfectada', width: 28 },
  { header: '¿Ocurrió en Bogotá?', key: 'ocurrioEnBogota', width: 20 },
  { header: 'Situación Actual', key: 'situacionActual', width: 34 },
  { header: 'Relato del Caso', key: 'relatoCaso', width: 55 },
  { header: 'Decisión Beneficio 60%', key: 'decisionBeneficio', width: 22 },
  { header: 'Autoriza Ley 1581', key: 'aceptaTratamientoDatos', width: 18 },
  { header: 'Estado Revisión', key: 'estadoRevision', width: 18 },
  { header: 'Notas Internas Admin', key: 'notasAdmin', width: 40 },
  { header: 'Revisado Por', key: 'revisadoPorNombre', width: 24 },
];

const CONSULTAS_COLUMNS = [
  { header: 'ID', key: 'id', width: 10 },
  { header: 'Código Consulta', key: 'codigoConsulta', width: 20 },
  { header: 'Origen Formulario', key: 'origenFormulario', width: 24 },
  { header: 'Fecha Registro (Bogotá)', key: 'createdAt', width: 22 },
  { header: 'Nombre / Contacto', key: 'nombreCompleto', width: 28 },
  { header: 'Teléfono / WhatsApp', key: 'telefonoWhatsapp', width: 20 },
  { header: 'Correo Electrónico', key: 'correoElectronico', width: 28 },
  { header: 'Ciudad', key: 'ciudad', width: 18 },
  { header: 'Servicio / Necesidad', key: 'necesidadServicio', width: 32 },
  { header: 'Institución Fuerza Pública', key: 'institucionFuerzaPublica', width: 26 },
  { header: 'Plan de Interés', key: 'planInteres', width: 24 },
  { header: 'Situación Penal', key: 'situacionPenal', width: 28 },
  { header: 'Audiencia Próxima', key: 'audienciaProxima', width: 22 },
  { header: 'Urgencia', key: 'urgencia', width: 22 },
  { header: 'Empresa / Razón Social', key: 'empresaRazonSocial', width: 28 },
  { header: 'Sector Empresa', key: 'empresaSector', width: 22 },
  { header: 'Tamaño Empresa', key: 'empresaTamano', width: 24 },
  { header: 'Detalles del Caso', key: 'detallesCaso', width: 55 },
  { header: 'Autoriza Ley 1581', key: 'aceptaTratamientoDatos', width: 18 },
  { header: 'Estado Revisión', key: 'estadoRevision', width: 18 },
  { header: 'Notas Internas Admin', key: 'notasAdmin', width: 40 },
  { header: 'Revisado Por', key: 'revisadoPorNombre', width: 24 },
];

const CONSOLIDADO_COLUMNS = [
  { header: 'Tipo Formulario', key: 'tipoFormulario', width: 24 },
  { header: 'Código', key: 'codigo', width: 20 },
  { header: 'Fecha Registro (Bogotá)', key: 'fecha', width: 22 },
  { header: 'Nombre / Postulante', key: 'nombre', width: 28 },
  { header: 'Teléfono / WhatsApp', key: 'telefono', width: 20 },
  { header: 'Correo / Persona Afectada', key: 'contactoSecundario', width: 28 },
  { header: 'Ciudad / ¿En Bogotá?', key: 'ubicacion', width: 22 },
  { header: 'Servicio / Situación', key: 'categoria', width: 34 },
  { header: 'Detalle / Relato', key: 'detalle', width: 55 },
  { header: 'Beneficio / Plan / Empresa', key: 'extra', width: 32 },
  { header: 'Estado Revisión', key: 'estadoRevision', width: 18 },
  { header: 'Notas Internas Admin', key: 'notasAdmin', width: 40 },
];

function mapAniversarioRow(dto) {
  return {
    id: dto.id,
    codigoPostulacion: sanitizeSpreadsheetCell(dto.codigoPostulacion),
    createdAt: sanitizeSpreadsheetCell(formatDateTimeCo(dto.createdAt)),
    nombrePostulante: sanitizeSpreadsheetCell(dto.nombrePostulante),
    celularWhatsapp: sanitizeSpreadsheetCell(dto.celularWhatsapp),
    quienNecesita: sanitizeSpreadsheetCell(dto.quienNecesita),
    nombrePersonaAfectada: sanitizeSpreadsheetCell(dto.nombrePersonaAfectada),
    ocurrioEnBogota: sanitizeSpreadsheetCell(dto.ocurrioEnBogota),
    situacionActual: sanitizeSpreadsheetCell(dto.situacionActual),
    relatoCaso: sanitizeSpreadsheetCell(dto.relatoCaso),
    decisionBeneficio: sanitizeSpreadsheetCell(dto.decisionBeneficio),
    aceptaTratamientoDatos: dto.aceptaTratamientoDatos ? 'Sí' : 'No',
    estadoRevision: sanitizeSpreadsheetCell(dto.estadoRevision),
    notasAdmin: sanitizeSpreadsheetCell(dto.notasAdmin),
    revisadoPorNombre: sanitizeSpreadsheetCell(dto.revisadoPorNombre),
  };
}

function mapConsultaRow(dto) {
  return {
    id: dto.id,
    codigoConsulta: sanitizeSpreadsheetCell(dto.codigoConsulta),
    origenFormulario: sanitizeSpreadsheetCell(dto.origenFormulario),
    createdAt: sanitizeSpreadsheetCell(formatDateTimeCo(dto.createdAt)),
    nombreCompleto: sanitizeSpreadsheetCell(dto.nombreCompleto),
    telefonoWhatsapp: sanitizeSpreadsheetCell(dto.telefonoWhatsapp),
    correoElectronico: sanitizeSpreadsheetCell(dto.correoElectronico),
    ciudad: sanitizeSpreadsheetCell(dto.ciudad),
    necesidadServicio: sanitizeSpreadsheetCell(dto.necesidadServicio),
    institucionFuerzaPublica: sanitizeSpreadsheetCell(dto.institucionFuerzaPublica),
    planInteres: sanitizeSpreadsheetCell(dto.planInteres),
    situacionPenal: sanitizeSpreadsheetCell(dto.situacionPenal),
    audienciaProxima: sanitizeSpreadsheetCell(dto.audienciaProxima),
    urgencia: sanitizeSpreadsheetCell(dto.urgencia),
    empresaRazonSocial: sanitizeSpreadsheetCell(dto.empresaRazonSocial),
    empresaSector: sanitizeSpreadsheetCell(dto.empresaSector),
    empresaTamano: sanitizeSpreadsheetCell(dto.empresaTamano),
    detallesCaso: sanitizeSpreadsheetCell(dto.detallesCaso),
    aceptaTratamientoDatos: dto.aceptaTratamientoDatos ? 'Sí' : 'No',
    estadoRevision: sanitizeSpreadsheetCell(dto.estadoRevision),
    notasAdmin: sanitizeSpreadsheetCell(dto.notasAdmin),
    revisadoPorNombre: sanitizeSpreadsheetCell(dto.revisadoPorNombre),
  };
}

function mapConsolidadoRows(anivDtos, consDtos) {
  const fromAniv = anivDtos.map((dto) => ({
    tipoFormulario: 'Aniversario Bogotá',
    codigo: sanitizeSpreadsheetCell(dto.codigoPostulacion),
    fecha: sanitizeSpreadsheetCell(formatDateTimeCo(dto.createdAt)),
    rawDate: dto.createdAt,
    nombre: sanitizeSpreadsheetCell(dto.nombrePostulante),
    telefono: sanitizeSpreadsheetCell(dto.celularWhatsapp),
    contactoSecundario: sanitizeSpreadsheetCell(
      dto.nombrePersonaAfectada ? `Afectado: ${dto.nombrePersonaAfectada}` : dto.quienNecesita,
    ),
    ubicacion: sanitizeSpreadsheetCell(`Bogotá: ${dto.ocurrioEnBogota}`),
    categoria: sanitizeSpreadsheetCell(dto.situacionActual),
    detalle: sanitizeSpreadsheetCell(dto.relatoCaso),
    extra: sanitizeSpreadsheetCell(`Beneficio: ${dto.decisionBeneficio}`),
    estadoRevision: sanitizeSpreadsheetCell(dto.estadoRevision),
    notasAdmin: sanitizeSpreadsheetCell(dto.notasAdmin),
  }));

  const fromCons = consDtos.map((dto) => ({
    tipoFormulario:
      dto.origenFormulario === 'diagnostico_compliance'
        ? 'Diagnóstico Compliance'
        : 'Consulta General',
    codigo: sanitizeSpreadsheetCell(dto.codigoConsulta),
    fecha: sanitizeSpreadsheetCell(formatDateTimeCo(dto.createdAt)),
    rawDate: dto.createdAt,
    nombre: sanitizeSpreadsheetCell(dto.nombreCompleto),
    telefono: sanitizeSpreadsheetCell(dto.telefonoWhatsapp),
    contactoSecundario: sanitizeSpreadsheetCell(dto.correoElectronico),
    ubicacion: sanitizeSpreadsheetCell(dto.ciudad),
    categoria: sanitizeSpreadsheetCell(dto.necesidadServicio),
    detalle: sanitizeSpreadsheetCell(dto.detallesCaso),
    extra: sanitizeSpreadsheetCell(
      [dto.planInteres, dto.empresaRazonSocial, dto.situacionPenal].filter(Boolean).join(' | '),
    ),
    estadoRevision: sanitizeSpreadsheetCell(dto.estadoRevision),
    notasAdmin: sanitizeSpreadsheetCell(dto.notasAdmin),
  }));

  return [...fromAniv, ...fromCons].sort(
    (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime(),
  );
}

function escapeCsvCell(value) {
  const str = String(value ?? '');
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildCsvBuffer(columns, rows) {
  const headerLine = columns.map((col) => escapeCsvCell(col.header)).join(',');
  const dataLines = rows.map((row) =>
    columns.map((col) => escapeCsvCell(row[col.key])).join(','),
  );
  const content = `\uFEFF${[headerLine, ...dataLines].join('\r\n')}`;
  return Buffer.from(content, 'utf8');
}

async function buildXlsxBuffer(sheets) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'AMF Firma Legal S.A.S.';
  workbook.created = new Date();

  for (const sheetSpec of sheets) {
    const sheet = workbook.addWorksheet(sheetSpec.name, {
      views: [{ state: 'frozen', ySplit: 1 }],
    });

    sheet.columns = sheetSpec.columns.map((c) => ({
      header: c.header,
      key: c.key,
      width: c.width,
    }));

    const headerRow = sheet.getRow(1);
    headerRow.height = 24;
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFDF9F2' }, size: 11 };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF350108' },
      };
      cell.border = {
        bottom: { style: 'medium', color: { argb: 'FFA9863E' } },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });

    for (const rowObj of sheetSpec.rows) {
      const added = sheet.addRow(rowObj);
      added.eachCell((cell) => {
        cell.alignment = { vertical: 'top', wrapText: true };
      });
    }
  }

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}

export const exportService = {
  async generateExport({ tipo, formato, filters }) {
    const today = new Date().toISOString().slice(0, 10);

    const [anivRes, consRes] = await Promise.all([
      tipo === 'aniversario' || tipo === 'todos'
        ? formsRepository.listAniversario(filters, { paginate: false })
        : Promise.resolve({ items: [] }),
      tipo === 'consultas' || tipo === 'todos'
        ? formsRepository.listConsultasGenerales(filters, { paginate: false })
        : Promise.resolve({ items: [] }),
    ]);

    const anivDtos = anivRes.items.map(toAniversarioAdminDto);
    const consDtos = consRes.items.map(toConsultaGeneralAdminDto);

    if (formato === 'csv') {
      let columns;
      let rows;
      if (tipo === 'aniversario') {
        columns = ANIVERSARIO_COLUMNS;
        rows = anivDtos.map(mapAniversarioRow);
      } else if (tipo === 'consultas') {
        columns = CONSULTAS_COLUMNS;
        rows = consDtos.map(mapConsultaRow);
      } else {
        columns = CONSOLIDADO_COLUMNS;
        rows = mapConsolidadoRows(anivDtos, consDtos);
      }

      return {
        buffer: buildCsvBuffer(columns, rows),
        contentType: 'text/csv; charset=utf-8',
        filename: `amf-${tipo}-${today}.csv`,
      };
    }

    const sheets = [];
    if (tipo === 'aniversario' || tipo === 'todos') {
      sheets.push({
        name: 'Aniversario Bogotá',
        columns: ANIVERSARIO_COLUMNS,
        rows: anivDtos.map(mapAniversarioRow),
      });
    }
    if (tipo === 'consultas' || tipo === 'todos') {
      sheets.push({
        name: 'Consultas Generales',
        columns: CONSULTAS_COLUMNS,
        rows: consDtos.map(mapConsultaRow),
      });
    }

    return {
      buffer: await buildXlsxBuffer(sheets),
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      filename: `amf-${tipo}-${today}.xlsx`,
    };
  },
};
