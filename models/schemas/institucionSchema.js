const mongoose = require('mongoose');

const AsistenciaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    asistio: {
        type: Boolean,
        required: true
    },
    idmateria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    },
    idperiodo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Periodo',
        required: true
    }
});

const EvaluacionSchema = new mongoose.Schema({
    idmateria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    },
    idperiodo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Periodo',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    fecha: {
        type: Date,
        required: true
    },
    nota: {
        valor: {
            type: Number,
            min: 0,
            max: 5
        }
    }
});

const GrupoSchema = new mongoose.Schema({
    idgrupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    materias: [
        {
            idmateria: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Materia',
                required: true
            },
            nombre: {
                type: String,
                required: true
            },
            descripcion: {
                type: String
            }
        }
    ],
    talleres: [
        {
            idtaller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Taller',
                required: true
            },
            nombre: {
                type: String,
                required: true
            },
            descripcion: {
                type: String
            },
            fechainicio: {
                type: Date
            },
            fechafin: {
                type: Date
            }
        }
    ]
});

const EstudianteSchema = new mongoose.Schema({
    idestudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechanacimiento: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    direccion: {
        type: String
    },
    grupos: [GrupoSchema],
    asistencias: [AsistenciaSchema],
    evaluaciones: [EvaluacionSchema]
});

const ProfesorSchema = new mongoose.Schema({
    idprofesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesor',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    especialidad: {
        type: String
    }
});

const PeriodoSchema = new mongoose.Schema({
    idperiodo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Periodo',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fechainicio: {
        type: Date,
        required: true
    },
    fechafin: {
        type: Date,
        required: true
    }
});

const InstitucionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    email: {
        type: String
    },
    director: {
        type: String,
        required: true
    },
    iddepartamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    idmunicipio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    idsecretaria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Secretaria'
    },
    nosedes: {
        type: Number,
        min: 1
    },
    estudiantes: [EstudianteSchema],
    profesores: [ProfesorSchema],
    periodos: [PeriodoSchema]
});

module.exports = mongoose.model('Institucion', InstitucionSchema);
