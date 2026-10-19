import { specialMessages } from '../data/special-person';
const page = document.querySelector<HTMLElement>('.secret-page');
if (page) {
  const letter = page.querySelector<HTMLElement>('.secret-letter')!;
  const open = page.querySelector<HTMLButtonElement>('.secret-open')!;
  const save = page.querySelector<HTMLButtonElement>('.secret-save')!;
  const seal = page.querySelector<HTMLButtonElement>('.envelope-seal')!;
  const hint = page.querySelector<HTMLElement>('.secret-hint')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let busy = false;
  const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
  page.querySelectorAll<HTMLElement>('.secret-actions').forEach(element => element.hidden = false);
  letter.setAttribute('aria-hidden', 'true');
  seal.hidden = false;
  seal.addEventListener('click', () => { open.focus({ preventScroll: true }); open.click(); });
  open.addEventListener('click', async () => {
    if (busy) return;
    busy = true; open.disabled = true; seal.hidden = false; seal.disabled = true;
    save.hidden = true; letter.setAttribute('aria-hidden', 'true');
    if (page.dataset.state === 'open') { page.dataset.state = 'closed'; await delay(reduced.matches ? 0 : 220); }
    page.dataset.state = 'opening'; hint.textContent = 'Sebentar. Pesannya lagi dibuka…';
    if (innerWidth < 768) page.querySelector('.secret-stage')?.scrollIntoView({ block: 'center', behavior: reduced.matches ? 'instant' : 'smooth' });
    await delay(reduced.matches ? 0 : 1800);
    page.dataset.state = 'open'; letter.removeAttribute('aria-hidden'); letter.setAttribute('aria-live', 'polite');
    open.innerHTML = 'Baca lagi <span aria-hidden="true">↻</span>';
    open.disabled = false; seal.hidden = true; seal.disabled = false; save.hidden = false;
    hint.textContent = 'Nggak perlu buru-buru. Pesannya boleh dibaca pelan-pelan.';
    busy = false;
  });
  document.querySelector<HTMLAnchorElement>('.special-skip')?.addEventListener('click', () => {
    if (busy) return;
    page.dataset.state = 'open'; letter.removeAttribute('aria-hidden'); save.hidden = false;
    seal.hidden = true;
    open.innerHTML = 'Baca lagi <span aria-hidden="true">↻</span>';
  });
  save.addEventListener('click', () => {
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 900;
    const ctx = canvas.getContext('2d'); if (!ctx) { hint.textContent = 'Kartu belum bisa disimpan di browser ini.'; return; }
    ctx.fillStyle = '#080808'; ctx.fillRect(0, 0, 1200, 900);
    ctx.fillStyle = '#ff002b'; ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(1200, 0); ctx.lineTo(1200, 100); ctx.lineTo(0, 150); ctx.fill();
    ctx.fillStyle = '#eee5d4'; ctx.fillRect(65, 180, 1070, 600);
    ctx.fillStyle = '#ff002b'; ctx.font = 'italic 68px Impact, sans-serif'; ctx.fillText('BUAT KAMU.', 105, 270);
    const wrap = (text: string, x: number, y: number, width: number, line: number) => {
      let row = ''; for (const word of text.split(' ')) { const next = row ? `${row} ${word}` : word; if (ctx.measureText(next).width > width && row) { ctx.fillText(row, x, y); y += line; row = word; } else row = next; }
      ctx.fillText(row, x, y); return y + line;
    };
    ctx.fillStyle = '#161410'; ctx.font = 'italic 42px Georgia, serif';
    const bottom = wrap(specialMessages.special.message, 105, 365, 960, 60);
    ctx.font = '26px Georgia, serif'; wrap(specialMessages.special.note, 105, bottom + 30, 960, 40);
    ctx.font = 'italic 36px Georgia, serif'; ctx.fillText('— Jovan', 885, 720);
    ctx.fillStyle = '#eee5d4'; ctx.font = '20px Arial, sans-serif'; ctx.fillText('Satu halaman kecil. Buat orang yang berarti.', 65, 850);
    canvas.toBlob(blob => { if (!blob) return; const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'buat-kamu-special.png'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); hint.textContent = 'Kartunya sudah disiapkan untuk disimpan.'; }, 'image/png');
  });
  reduced.addEventListener('change', () => { if (reduced.matches && page.dataset.state === 'opening') page.dataset.state = 'open'; });
}
