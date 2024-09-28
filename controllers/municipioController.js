const Municipio = require("../models/municipioModel");

const getMunicipios = async (req, res) => {
  try {
    const municipios = await Municipio.find(
      //para obtener todos los municipios
      {}, //se puede poner un filtro
      "id_municipio descripcion id_departamento" // esto es para que solo me muestre estos campos
    );
    res.status(200).json(municipios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los municipios", error });
  }
};

module.exports = { getMunicipios };
