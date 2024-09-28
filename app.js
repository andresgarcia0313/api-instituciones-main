const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(express.json());

// Definir rutas
const institucionRoutes = require("./routes/institucionRoutes");
const departamentoRoutes = require("./routes/departamentoRoutes");
const municipioRoutes = require("./routes/municipioRoutes");
app.use("/api", institucionRoutes);
app.use("/api", departamentoRoutes);
app.use("/api", municipioRoutes);

// Configuración de swagger-jsdoc
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Definir que es la versión 3 de OpenAPI
    info: {
      title: "API de Instituciones Educativas",
      version: "1.0.0",
      description:
        "Documentación de la API para gestionar instituciones educativas",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: [
    "./routes/institucionRoutes.js",
    "./routes/departamentoRoutes.js",
    "./routes/municipioRoutes.js",
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Servir documentación Swagger en /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Definir puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
);
