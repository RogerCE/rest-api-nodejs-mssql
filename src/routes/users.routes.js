const {Router} = require('express');
const router = Router();
const {validarCampos} =require('../middlewares/validation');
const {check} = require('express-validator');

const user = require('../controllers/user.controller');

router.get('/', user.getUsuarios);
router.get('/:id', user.getUsuarioId);
router.post('/',
[ //middlewares
    check('User_Name', 'User Name es obligatorio').not().isEmpty(),
    check('Name', 'Name es obligatorio').not().isEmpty(),
    check('Last_Name', 'Last Name es obligatorio').not().isEmpty(),
    check('Email', 'Email es obligatorio').not().isEmpty(),
    check('Profile_ID', 'Profile ID es obligatorio').not().isEmpty(),
    validarCampos
], user.addUser);
router.put('/:id', 
    [ //middlewares
        check('User_Name', 'User Name es obligatorio').not().isEmpty(),
        check('User_ID', 'El user ID es obligatorio').not().isEmpty(),
        check('Name', 'Name es obligatorio').not().isEmpty(),
        check('Last_Name', 'Last Name es obligatorio').not().isEmpty(),
        check('Email', 'Email es obligatorio').not().isEmpty(),
        check('Profile_ID', 'Profile ID es obligatorio').not().isEmpty(),
        validarCampos
    ], user.editUser); 
router.delete('/:id', user.deleteUser);
module.exports = router;