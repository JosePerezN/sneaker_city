// Sneaker City Api

var express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const mockdata = require("./mockdata.js");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Puerto del Servidor
const HTTP_PORT = 8000;

// Iniciar Servidor
app.listen(HTTP_PORT, () => {
  console.log(`Servidor Iniciado en el Puerto: ${HTTP_PORT}`);
});

// Endpoint Raiz
app.get("/", (req, res, next) => {
  res.status(400).json("Especificar un endpoint de la ruta /api/items");
});

/*
// Respuesta por defecto a cualquier Solicitud
app.use(function (req, res) {
  res.status(404);
});
*/

// MockData de los items disponibles
const items = mockdata.items;
const item_sizes = mockdata.item_sizes;

// Ordena los Itemss por fecha
items.sort((a, b) =>
  a.releaseDate < b.releaseDate ? 1 : b.releaseDate < a.releaseDate ? -1 : 0
);

// Endpoints de Items
app.get("/api/items", (req, res, next) => {
  try {
    const indiceInicio = Number(req.query.start);
    const indiceFin = Number(req.query.end);

    let temp = [];

    //retorna solo el rango solicitado

    if (indiceInicio && indiceFin && indiceInicio < indiceFin) {
      temp = items.slice(indiceInicio, indiceFin);
    } else if (indiceInicio && !indiceFin) {
      temp = items.slice(indiceInicio, 10);
    } else {
      temp = items.slice(0, 10);
    }

    res.json(temp);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

app.get("/api/items/:id", (req, res, next) => {
  const id = req.params.id;
  let item = null;

  try {
    const temp = items.filter((_item) => _item.id == id);

    if (temp.length > 0) {
      item = temp[0];
    }

    res.json(item);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

app.get("/api/items/:id/sizes", (req, res, next) => {
  const id = req.params.id;

  try {
    const tempSizes = item_sizes[id];

    if (tempSizes.length > 0) {
      res.json(tempSizes);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});
