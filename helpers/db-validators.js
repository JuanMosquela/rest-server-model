const Role = require('../models/role')
const Usuario = require('../models/usuario')

const validRole = async(rol = '') => {
    const rolExist = await Role.findOne({ rol });
    if( !rolExist ){
        throw new Error('El rol no esta registrado en la base de datos')
    }
}

const emailExist = async(correo = '') => {
    const existEmail = await Usuario.findOne({ correo })
    if(existEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const idExist = async(id) => {
    const existId = await Usuario.findById( id )
    if(!existId) {
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    validRole, 
    emailExist,
    idExist
}