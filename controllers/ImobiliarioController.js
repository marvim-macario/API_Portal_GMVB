const { imobiliario } = require('../models')
const  Acesso  = require('../modules/niveisdeAcesso.js')


const ImobiliarioController = {
    Pesquisar: async (req,res)=>{
    const {userPerfil,userCpf,userTipousuario,userNome,userCnpjMatriz,parceiro,nome_operador,gerente,supervisor,status,imovel,
        tipo_imovel,
        cpf,
        proposta,
        data_retorno,
        nome,
        modalidade,
        uf,
        identificacao_imovel,
        banco} = req.body;
        
    
       let where = Acesso(userPerfil,userCpf,userTipousuario,userNome,userCnpjMatriz)

        if(parceiro) where.parceiro = parceiro;
        if(nome_operador)where.nome_operador = nome_operador;
        if(gerente) where.gerente = gerente;
        if(supervisor) where.supervisor = supervisor;
        if(status) where.status = status;
        if(imovel) where.imovel = imovel;
        if(tipo_imovel) where.tipo_imovel = tipo_imovel;
        if(cpf) where.cpf = cpf;
        if(proposta) where.proposta = proposta;
        if(data_retorno) where.data_retorno = data_retorno;
        if(nome) where.nome = nome;
        if(modalidade) where.modalidade = modalidade;
        if(uf) where.uf = uf;
        if(identificacao_imovel)where.identificacao_imovel = identificacao_imovel;
        if(banco) where.banco = banco;
        
        console.log(where)
        try {
            const pesquisaImobiliario = await imobiliario.findAll({
                where
            })
            res.status(200).send(pesquisaImobiliario);
        } catch (error) {
            console.log(error)
        }
        

        
    },
    Incluir: async (req, res) => {
        const {
            proposta,
            data_solicitacao,
            valor_financiado,
            modalidade,
            status,
            tipo_imovel,
            banco,
            telefone_promotor,
            autorizacao,
            data_retorno,
            nome,
            cpf,
            data_nascimento,
            uf,
            telefone,
            telefone_alternativo,
            parceiro,
            supervisor,
            gerente,
            nome_operador
        } = req.body;


        
    }

}

module.exports = ImobiliarioController