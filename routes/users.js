const express = require('express');
const UserController = require('../controllers/UserController');
const CadastroController = require('../controllers/CadastroController');
const PropostaController = require('../controllers/PropostaController');
const router = express.Router();


// rota para fazer login no portal
router.post('/login',UserController.Login);

/*rota para envio de email de recuperação de senha*/
router.post('/email',UserController.send);

//rota para alterar senha senha
router.post('/reset',UserController.update);

//rotas para popular campos 
router.get('/funcionario',CadastroController.Funcionario);

router.get('/supervisor',CadastroController.Supervisor);

router.get('/gerente',CadastroController.Gerente);

router.get('/filial',CadastroController.Filial);

//pequisa 
router.post('/search',CadastroController.FullSearch);


//inclusao 
// inclusão de cadastro pag cadastro
router.post('/cadastro/inclusao',CadastroController.Create);

//cadastro de novo acesso no portal 
router.post('/cadastro/acesso',UserController.Create)

//popular campos no modal de cadastro
router.post('/cadastro/modal',CadastroController.Modal)



//proposta

router.get('/proposta/parceiro',PropostaController.PropostaPorId);

// get para popular campos na pagina de proposta 
router.get('/proposta/status',PropostaController.Status);

router.get('/proposta/tipo',PropostaController.Tipo);

router.get('/proposta/empresas',PropostaController.Empresa);

router.get('/proposta/bancos',PropostaController.Banco);

router.get('/proposta/substatus',PropostaController.SubStatus);

router.get('/proposta/produto',PropostaController.Produto);


// buscar propostas po id

router.get('/proposta/search',PropostaController.PropostaPorId)



module.exports = router;
