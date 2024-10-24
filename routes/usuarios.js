const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
//const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost} = require('../controllers/usuarios');

const router = Router();

router.get('/', [ /* validarJWT, esAdminRole */ ], usuariosGet);

router.post('/', [
    /* validarJWT, */
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    /* check('correo').custom( emailExiste ), */
    /* check('rol').custom( esRoleValido ),  */
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    /* validarCampos */
], usuariosPost);

//router.patch('/', usuariosPatch);

module.exports = router;




