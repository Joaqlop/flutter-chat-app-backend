// path: api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validate } = require('../middlewares/validate');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

router.post('/new', [
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatoria').not().isEmpty(),
   validate
],createUser);

router.post('/', [
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatoria').not().isEmpty(),
   validate
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
