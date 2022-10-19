const {Router } = require('express')
const { check } = require('express-validator')
const Role = require('../models/role')
const router = Router()

const {
    usuariosPut,
    usuariosGet,
    usuariosPost,
    usuariosDelete
} = require('../controllers/user')
const { validarCampos } = require('../middelwares/validar-campos')
const { validRole, emailExist, idExist } = require('../helpers/db-validators')



router.get('/',  usuariosGet)
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idExist ),
    validarCampos

], usuariosPut)
router.post('/', [
    check('correo', 'El correo debe tener un valor valido').isEmail(),
    check('correo').custom( emailExist ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 digitos').isLength({ min:6 }),    
    check('rol').custom( validRole ),
    validarCampos    
] ,usuariosPost)
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idExist ),
    validarCampos
],usuariosDelete)


module.exports = router