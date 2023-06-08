import express from 'express';
import passport from 'passport';
import path from 'path';
import Authorization from "./auth.js"
import axios from 'axios';
import fs from 'fs';

const __dirname = fs.realpathSync('.');


class ConnectBackendServer {
  constructor() {
const app = express();
const port = 3000;

app.use('/style.css', (req, res, next) => {
  res.type('text/css');
  next();
});

// Ruta para servir el archivo CSS
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

app.use(express.static('public'));
app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    this._auth = new Authorization(app);
  
    app.get('/login/', this._login);
    app.get('/auth/google/',
    passport.authenticate('google', {
      scope: ['email', 'profile']
    }));
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  app.get('/', this._auth.checkAuthenticated, this._goHome);

  app.post("/logout", (req,res) => {
    req.logOut(err=>console.log(err));
    res.redirect("/login");
 })

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

    app.listen(port, () => {
      console.log(`Servidor Express escuchando en el puerto ${port}`);
    })
});


  }
  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }
  
  async _goHome(req, res)  {
    res.sendFile(path.join(__dirname, "public/index.html"));
  }
};
