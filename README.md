# Gespa Enerji — Web Sitesi

Gespa Enerji Ltd. Şti. kurumsal web sitesi. Node.js + Express statik site sunucusu.

## Yerel Çalıştırma

```bash
npm install
npm start
```

Tarayıcıda: `http://localhost:3000`

## Railway Deployment

1. Bu repoyu GitHub'a push et
2. Railway.com'da yeni proje oluştur → "Deploy from GitHub repo" seç
3. Otomatik deploy başlar — `PORT` environment variable Railway tarafından otomatik atanır
4. Custom domain: Railway Settings > Domain > `gespaenerji.com.tr` ekle

## Sayfa Yapısı

| URL | Sayfa |
|-----|-------|
| / | Ana Sayfa |
| /hizmetler/villa | Villa & Konut |
| /hizmetler/tarimsal | Tarımsal Sulama |
| /hizmetler/fabrika | Fabrika & Endüstri |
| /hizmetler/otel | Otel & Turizm |
| /hizmetler/tekne | Tekne & Marine |
| /hizmetler/ticari | Ticari & Diğer |
| /projeler | Projeler Galerisi |
| /hesaplama | GES Hesaplama Aracı |
| /hakkimizda | Hakkımızda |
| /iletisim | İletişim |

## Geliştirici

Göksoylar İletişim
