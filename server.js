const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const routes = {
  '/': 'index.html',
  '/hakkimizda': 'pages/hakkimizda.html',
  '/projeler': 'pages/projeler.html',
  '/hesaplama': 'pages/hesaplama.html',
  '/iletisim': 'pages/iletisim.html',
  '/hizmetler/villa': 'pages/villa.html',
  '/hizmetler/tarimsal': 'pages/tarimsal.html',
  '/hizmetler/fabrika': 'pages/fabrika.html',
  '/hizmetler/otel': 'pages/otel.html',
  '/hizmetler/tekne': 'pages/tekne.html',
  '/hizmetler/ticari': 'pages/ticari.html',
};

Object.entries(routes).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', file));
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Gespa Enerji çalışıyor: http://localhost:${PORT}`);
});
