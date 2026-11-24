export function extractClientMetadata(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  const rawIp = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === 'string'
      ? forwarded.split(',')[0]
      : req.ip || req.socket?.remoteAddress || '';

  return {
    ipOrigen: rawIp.trim().slice(0, 64) || null,
    userAgent:
      typeof req.headers?.['user-agent'] === 'string'
        ? req.headers['user-agent'].slice(0, 500)
        : null,
  };
}
