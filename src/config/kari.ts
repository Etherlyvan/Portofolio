type KariEnvironment = Record<string, string | undefined>;

function publicUrl(value: string, label: string): string {
  if (/[\s\\]/u.test(value)) throw new Error(`${label} must be a URL without whitespace or backslashes.`);
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  let parsed: URL;
  try { parsed = new URL(value); } catch { throw new Error(`${label} must be an absolute path or HTTPS URL.`); }
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
  if (parsed.username || parsed.password || parsed.hash || (parsed.protocol !== 'https:' && !(local && parsed.protocol === 'http:'))) {
    throw new Error(`${label} must use HTTPS (HTTP is allowed only for localhost), without credentials or fragments.`);
  }
  return parsed.href;
}

export function getKariSiteId(value = 'portfolio') {
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/u.test(value)) throw new Error('KARI_SITE_ID must be a public lowercase slug (1–64 characters).');
  return value;
}

/** Only these public values enter the HTML. No provider credentials belong here. */
export function getKariConfig(env: KariEnvironment) {
  const enabled = (env.KARI_ENABLED ?? 'false').toLowerCase();
  if (!['true', 'false'].includes(enabled)) throw new Error('KARI_ENABLED must be true or false.');
  if (enabled !== 'true') return null;
  const siteId = getKariSiteId(env.KARI_SITE_ID);
  return {
    widgetUrl: publicUrl(env.KARI_WIDGET_URL ?? '/kari/embed.js', 'KARI_WIDGET_URL'),
    apiBase: publicUrl(env.KARI_API_BASE ?? '/kari/api', 'KARI_API_BASE').replace(/\/$/u, ''),
    siteId,
  };
}
