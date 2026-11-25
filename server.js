const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.use((req, res, next) => {
  if (/^\/(server\.js|package(-lock)?\.json|node_modules(\/|$)|supabase(\/|$))/.test(req.path)) {
    return res.status(404).end();
  }
  next();
});

app.use(express.static(__dirname, {
  dotfiles: 'ignore',
  index: 'index.html'
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`White server listening on http://${HOST}:${PORT}`);
});
