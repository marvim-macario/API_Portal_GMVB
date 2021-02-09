const express = require('express');

const UserController = require('../controllers/UserController');
const CadastroController = require('../controllers/CadastroController');
const PropostaController = require('../controllers/PropostaController');
const PreencherCamposController = require('../controllers/PreencherCamposController');
const ComissaoController = require('../controllers/ComissaoController');


const router = express.Router();

// rota para fazer login no portal
router.post('/login',UserController.Login);

/*rota para envio de email de recuperação de senha*/
router.post('/email',UserController.send);

//rota para alterar senha senha
router.post('/reset',UserController.update);

//rotas para popular campos

router.post('/parceiros',PreencherCamposController.Parceiro);
router.get('/funcionario',PreencherCamposController.Funcionario);
router.get('/supervisor',PreencherCamposController.Supervisor);
router.get('/gerente',PreencherCamposController.Gerente);
router.get('/filial',PreencherCamposController.Filial);
router.get('/proposta/status',PreencherCamposController.Status);
router.get('/proposta/tipo',PreencherCamposController.Tipo);
router.get('/proposta/empresas',PreencherCamposController.Empresa);
router.get('/proposta/bancos',PreencherCamposController.Banco);
router.get('/proposta/substatus',PreencherCamposController.SubStatus);
router.get('/proposta/produto',PreencherCamposController.Produto);
router.get('/supervisormulti',PreencherCamposController.SupervisorMulti);

router.get('/comissao/promotor',PreencherCamposController.Promotor);
router.get('/comissao/status',PreencherCamposController.StausComissao);
router.get('/comissao/datagerente',PreencherCamposController.DataPagamentoGerente);
router.get('/comissao/datasupervisor',PreencherCamposController.DataPagamentoSupervisor);
router.get('/comissao/competencia',PreencherCamposController.Competencia);
// router.get('/banco',PreencherCamposController)

//pequisa de cadastros
router.post('/search',CadastroController.FullSearch);

// inclusão de cadastro 
router.post('/cadastro/inclusao',CadastroController.Create);

//cadastro de novo acesso no portal 
router.post('/cadastro/acesso',UserController.Create)

//popular campos no modal de cadastro
router.post('/cadastro/modal',CadastroController.Modal)

//preencher modal de acessos
router.post('/cadastro/busca/acesso',UserController.PreencherAcesso)


//busca cadastros para preencher acessos vinculados no cpf
router.post('/cadastro/buscar',UserController.BuscarAcesso)


router.post('/proposta/filtro',PropostaController.Interface);
router.post('/proposta/inclusao',)




 






module.exports = router;
