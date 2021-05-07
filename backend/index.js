// Variables de modulos (importamos librerias)
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

// Variable para puerto de conexion del servidor
let port = process.env.PORT || 3001;
// variable de la aplicacion que ejecuta el server
let app = express();

/* Routes */
let usuarioRoutes = require("./routes/usuario");



// Conexion a DB
mongoose.connect(
    "mongodb://localhost:27017/bitstoredb",
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log("Servidor DB: ON");
        app.listen(port, function () {
          console.log("Servidor Backend funcionando en el puerto :" + port);
        });
      }
    }
  );
  // Analizar la codificacion de las url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
  });
  
/* Usar las rutas */
app.use("/api",usuarioRoutes)

// Creamos modulo para importar
module.exports = app;