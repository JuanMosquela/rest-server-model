const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs') 


const usuariosGet = async(req,res = response) => {

    const {limit = 5} = req.query

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({ estado: true }).limit(limit)
    ])

    // const total = await Usuario.find({ estado: true }).limit(limit)
    // const usuarios = await Usuario.countDocuments()

    

    res.status(200).json({
        total, 
        usuarios
    })

}

const usuariosPost = async (req,res = response) => {    
    
    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo,password,rol})  

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en base de datos
    await usuario.save();

    res.status(200).json({
        msg:'Hola mundo post',
        usuario
    }) 
}

const usuariosPut = async (req,res = response) => {
    const { id } = req.params
    const { _id, password, google,correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.status(200).json({
        msg:'Hola mundo post',         
        usuario
    })
}

const usuariosDelete = async (req,res = response) => {

    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})

   
    res.status(200).json({
        msg:'Usuario eliminado',
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}