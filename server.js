const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/cotizaciones', (req, res) => {
  const moneda = req.query.moneda;

  axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${moneda}&vs_currencies=usd`)
    .then(response => {
      const precio = response.data[moneda].usd;

      const cotizacion = {
        moneda: moneda,
        precio: precio
      };

      res.json([cotizacion]);
    })
    .catch(error => {
      console.error('Error al obtener la cotización:', error);
      res.status(500).json({ error: 'Error al obtener la cotización' });
    });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
