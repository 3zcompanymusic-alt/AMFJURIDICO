import { buildApiUrl } from '../config/siteConfig';

const SESSION_TOKEN_KEY = 'amf_admin_bearer_fallback';

let inMemoryToken = null;

export function setSessionToken(token) {
  inMemoryToken = token || null;
  try {
    if (token) {
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
    }
  } catch {
    // noop
  }
}

export function getSessionToken() {
  if (inMemoryToken) return inMemoryToken;
  try {
    return sessionStorage.getItem(SESSION_TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function clearSessionToken() {
  setSessionToken(null);
}

export async function apiRequest(path, { method = 'GET', body, keepalive = false } = {}) {
  const headers = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getSessionToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildApiUrl(path), {
    method,
    headers,
    credentials: 'include',
    keepalive,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    const err = new Error(
      data?.error || 'No fue posible completar la solicitud en el servidor.',
    );
    err.status = response.status;
    err.code = data?.code || null;
    err.fieldErrors = data?.fieldErrors || null;
    throw err;
  }

  return data.data;
}

export async function apiDownload(path, defaultFilename = 'exportacion-amf') {
  const headers = {};
  const token = getSessionToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildApiUrl(path), {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMsg = 'No fue posible generar el archivo de exportación.';
    try {
      const json = await response.json();
      if (json?.error) errorMsg = json.error;
    } catch {
      // noop
    }
    const err = new Error(errorMsg);
    err.status = response.status;
    throw err;
  }

  const disposition = response.headers.get('Content-Disposition') || '';
  const filenameMatch = disposition.match(/filename="?([^"]+)"?/i);
  const filename = filenameMatch?.[1] || defaultFilename;

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
