const mongoose = require("mongoose");
const Institucion = require("../models/institucionModel");
const Departamento = require("../models/departamentoModel");

// Obtener todas las instituciones
const getInstituciones = async (req, res) => {
  try {
    const instituciones = await Institucion.find();
    res.status(200).json(instituciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva institución
const createInstitucion = async (req, res) => {
  try {
    if (req.body.iddepartamento) {
      const departamento = await Departamento.findById(req.body.iddepartamento);
      if (departamento) {
        console.log("Departamento encontrado");
      }
    }
    if (req.body.idmunicipio) {
      const municipio = await Municipio.findById(req.body.idmunicipio);
      if (municipio) {
        console.log("Municipio encontrado");
      }
    }

    const nuevaInstitucion = new Institucion(req.body);
    const institucionGuardada = await nuevaInstitucion.save();
    res.status(201).json(institucionGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener una institución por ID
const getInstitucionById = async (req, res) => {
  try {
    const institucion = await Institucion.findById(req.params.id);
    if (!institucion) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }
    res.status(200).json(institucion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una institución
const updateInstitucion = async (req, res) => {
  try {
    // Convertir campos a ObjectId si existen
    if (req.body.iddepartamento) {
      req.body.iddepartamento = mongoose.Types.ObjectId(
        req.body.iddepartamento
      );
    }
    if (req.body.idmunicipio) {
      req.body.idmunicipio = mongoose.Types.ObjectId(req.body.idmunicipio);
    }
    if (req.body.idsecretaria) {
      req.body.idsecretaria = mongoose.Types.ObjectId(req.body.idsecretaria);
    }

    const institucionActualizada = await Institucion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!institucionActualizada) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }
    res.status(200).json(institucionActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una institución
const deleteInstitucion = async (req, res) => {
  try {
    const institucionEliminada = await Institucion.findByIdAndDelete(
      req.params.id
    );
    if (!institucionEliminada) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }
    res.status(200).json({ message: "Institución eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInstituciones,
  createInstitucion,
  getInstitucionById,
  updateInstitucion,
  deleteInstitucion,
};
