import test from 'node:test';
import assert from 'node:assert/strict';
import { getKariConfig } from '../src/config/kari.ts';

test('optional embed is absent by default and never needs credentials', () => {
  assert.equal(getKariConfig({}), null);
  assert.equal(getKariConfig({ KARI_ENABLED: 'false', KARI_WIDGET_URL: 'javascript:bad' }), null);
});
test('same-origin and universal HTTPS embeds share the public contract', () => {
  assert.deepEqual(getKariConfig({ KARI_ENABLED: 'true' }), { widgetUrl: '/kari/embed.js', apiBase: '/kari/api', siteId: 'portfolio' });
  assert.equal(getKariConfig({ KARI_ENABLED: 'true', KARI_API_BASE: 'https://kari.example.com/kari/api/' }).apiBase, 'https://kari.example.com/kari/api');
});
test('bad flags, executable schemes, credentialed and protocol-relative URLs fail at build time', () => {
  assert.throws(() => getKariConfig({ KARI_ENABLED: 'yes' }));
  for (const url of ['javascript:alert(1)', '//untrusted.example/embed.js', 'https://user:secret@example.com/embed.js', 'http://untrusted.example/embed.js', '/\\untrusted.example/embed.js']) {
    assert.throws(() => getKariConfig({ KARI_ENABLED: 'true', KARI_WIDGET_URL: url }));
  }
  assert.throws(() => getKariConfig({ KARI_ENABLED: 'true', KARI_SITE_ID: '../owner' }));
});
