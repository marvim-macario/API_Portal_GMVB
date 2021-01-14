const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();


/* rota para fazer cadastro de usuarios*/
router.get('/cadastro',(req,res)=>{
    res.send({msg:'cadastro'})
})

// rota para fazer login no portal
router.post('/login',UserController.find);
module.exports = router;

/*rota para envio de email de recuperação de senha*/
router.post('/email',UserController.send);

//rota para resetar senha
router.post('/reset',UserController.update);
