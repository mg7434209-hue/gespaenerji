/* ═══════════════════════════════════════
   GESPA ENERJİ — PAYLAŞILAN JS
   ═══════════════════════════════════════ */

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPath) a.classList.add('active');
  });
});

// WhatsApp SVG icon
const WA_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.101.544 4.071 1.495 5.789L0 24l6.395-1.607A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.371l-.359-.213-3.721.935.991-3.624-.234-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" fill-rule="evenodd" clip-rule="evenodd"/></svg>`;

// Inject WA icon where needed
document.querySelectorAll('.wa-icon').forEach(el => el.innerHTML = WA_ICON);

// Hesaplama
const GUNES = { antalya: 5.8, istanbul: 4.2, ankara: 4.8, izmir: 5.1, diger: 4.5 };

function hesaplaKonut() {
  const fatura = parseFloat(document.getElementById('fatura')?.value);
  const sehir = document.getElementById('sehir')?.value || 'antalya';
  if (!fatura || fatura <= 0) { alert('Lütfen aylık fatura tutarını girin.'); return; }
  const kwh_yil = (fatura / 3.5) * 12;
  const gunes = GUNES[sehir] || 5.0;
  const kwp = Math.ceil((kwh_yil / (gunes * 365)) * 1.15);
  const uretim = Math.round(kwp * gunes * 365 * 0.85);
  const tasarruf = Math.round(uretim * 3.5);
  const maliyet = kwp * 22000;
  const amortisman = (maliyet / tasarruf).toFixed(1);
  const co2 = (uretim * 0.00042).toFixed(1);
  showResult([
    ['Önerilen kapasite', kwp + ' kWp'],
    ['Yıllık tahmini üretim', uretim.toLocaleString('tr') + ' kWh'],
    ['Yıllık tasarruf', '₺' + tasarruf.toLocaleString('tr')],
    ['Amortisman süresi', amortisman + ' yıl'],
    ['CO₂ azaltımı', co2 + ' ton / yıl'],
  ]);
}

function hesaplaTarim() {
  const pompa = parseFloat(document.getElementById('pompa')?.value);
  const saat = parseFloat(document.getElementById('calisma')?.value);
  const aylar = parseInt(document.getElementById('aylar')?.value || 4);
  if (!pompa || !saat) { alert('Lütfen pompa gücü ve çalışma saatini girin.'); return; }
  const gun = aylar * 30;
  const kwp = Math.ceil(pompa * 1.3);
  const uretim = Math.round(kwp * 5.5 * gun * 0.85);
  const tasarruf = Math.round(pompa * saat * gun * 3.5);
  const maliyet = kwp * 25000 + 8000;
  const amortisman = (maliyet / tasarruf).toFixed(1);
  const aku = Math.round(pompa * saat * 100 / 48);
  showResult([
    ['Önerilen panel kapasitesi', kwp + ' kWp'],
    ['Akü kapasitesi (akülü sistem)', aku + ' Ah (48V)'],
    ['Yıllık enerji tasarrufu', uretim.toLocaleString('tr') + ' kWh'],
    ['Yıllık maliyet tasarrufu', '₺' + tasarruf.toLocaleString('tr')],
    ['Amortisman süresi', amortisman + ' yıl'],
  ]);
}

function showResult(items) {
  const box = document.getElementById('result-box');
  if (!box) return;
  box.innerHTML = `
    <div class="result-title">Tahmini sonuçlar</div>
    <div class="result-items">
      ${items.map(([l,v])=>`
      <div class="result-row">
        <span class="result-label">${l}</span>
        <span class="result-val">${v}</span>
      </div>`).join('')}
    </div>
    <div class="result-note">Bu sonuçlar tahmini değerlerdir. Kesin analiz için ücretsiz keşif talep edin.</div>
    <a href="https://wa.me/905437434209?text=Hesaplama%20yaptım%2C%20detaylı%20bilgi%20almak%20istiyorum." class="btn-gold" style="display:block;text-align:center;margin-top:16px;">Ücretsiz Keşif Talep Et</a>`;
}
