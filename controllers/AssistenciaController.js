

const {
    assistencia
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AssistenciaController = {


    AssIncluir: async (req, res) => {
        const {
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            cidade,
            estado,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia
        } = req.body;

//colocar aqui um if de altenticacao

        if (
                typeof cliente_nome != undefined && cliente_nome !='' &&
                typeof  cliente_cpf != undefined && cliente_cpf !='' &&
                typeof  data_nascimento != undefined && data_nascimento !='' &&
                typeof   cep != undefined && cep !='' &&
                typeof   rua  != undefined &&   rua !='' &&
                typeof   bairro != undefined && bairro !='' &&
                typeof   cidade != undefined && cidade !='' &&
                typeof   estado != undefined && estado !='' &&
                typeof   numero != undefined && numero !='' &&
                typeof   complemento != undefined && complemento !='' &&
                typeof  email != undefined && email !='' &&
                typeof   telefone != undefined && telefone !='' &&
                typeof   tipo_contratacao != undefined && tipo_contratacao !='' &&
                typeof   banco != undefined && banco !='' &&
                typeof   agencia != undefined && agencia !='' &&
                typeof   conta != undefined && conta !='' &&
                typeof   digito != undefined && digito !='' &&
                typeof   tipo_conta != undefined && tipo_conta !='' &&
                typeof   status != undefined && status !='' &&
                typeof    tipo_assistencia != undefined && tipo_assistencia !='' &&
                typeof    forma_contratacao != undefined && forma_contratacao !='' &&
                typeof   parceiro != undefined && parceiro !='' &&
                typeof   id_parceiro != undefined && id_parceiro !='' &&
                typeof   cpf_parceiro != undefined && cpf_parceiro !='' &&
                typeof   supervisor != undefined && supervisor !='' &&
                typeof   gerente != undefined && gerente !='' &&
                typeof   data_inclusao != undefined && data_inclusao !='' &&
                typeof   responsavel_alteracao != undefined && responsavel_alteracao !='' &&
                typeof   data_alteracao!= undefined && data_alteracao !='' &&
                typeof  valor_assistencia!= undefined && valor_assistencia !=''
       
        
        ){ 
        const assistenciaInserir = await assistencia.create({
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            cidade,
            estado,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia
        })

        return res.status(201).json(assistenciaInserir)
    }else{return res.status(500).send({erro:"Por favor, preencha os dados obrigatórios"})}
},

    
    AssAlterar: async (req, res) => {
        const {
            codigo,
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            cidade,
            estado,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia
        } = req.body;

        const assistenciaAlterar = await assistencia.update({ 
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            cidade,
            estado,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia
          }, {
            where: {codigo: codigo},
            returning: true, 
            plain: true 
        })
        return res.status(200).json(assistenciaAlterar)
    },

    AssFiltrarSelecionadasPorId: async (req, res) => {
        const {
        id_parceiro,
        cliente_cpf,
        tipo_contratacao,
        banco,
        tipo_assistencia,
        forma_contratacao
        } = req.body;

        const assistenciaInserir = await assistencia.findAll({
            attributes: ['cliente_cpf', 'cliente_nome', 'tipo_contratacao', 'tipo_assistencia'],
            where: {

                [Op.and]:
                  [
                    { id_parceiro: id_parceiro }
                  ],
                [Op.or]: 
                [
                  { cliente_cpf: cliente_cpf },
                  { tipo_contratacao: tipo_contratacao },
                  { banco: banco },
                  { tipo_assistencia: tipo_assistencia },
                  { forma_contratacao: forma_contratacao }
                ]
            }
        })
        return res.status(200).json(assistenciaInserir)
    },
        AssFiltrarTodasPorId: async (req, res) => {
            const {
            id_parceiro
            } = req.body;

            const assistenciaInserir = await assistencia.findAll({ //Operador OR , busca propostas por id 
                attributes: ['cliente_cpf', 'cliente_nome', 'tipo_contratacao', 'tipo_assistencia'],
                where: {
                    [Op.and]: [
                      { id_parceiro: id_parceiro }
                    ]}
            })
            return res.status(200).json(assistenciaInserir)
        },

        AssFiltrarParaAlterar: async (req, res) => {
            const {
            cliente_nome,
            cliente_cpf,
            tipo_contratacao,
            tipo_assistencia
            } = req.body;

            const assistenciaInserir = await assistencia.findOne({ 
                attributes: [            
                    'codigo',//colocar input hidden 
                    'cliente_nome',
                    'cliente_cpf',
                    'data_nascimento',
                    'cep',
                    'rua',      
                    'bairro',
                    'cidade',
                    'estado',
                    'numero',
                    'complemento',
                    'email',
                    'telefone',
                    'tipo_contratacao',
                    'banco',
                    'agencia',
                    'conta',
                    'digito',
                    'tipo_conta',
                    'status',
                    'tipo_assistencia',
                    'forma_contratacao',
                    'id_parceiro',
                   ],
                where: {
                    [Op.and]: [
                     { cliente_nome: cliente_nome },
                      { cliente_cpf: cliente_cpf },
                      { tipo_contratacao: tipo_contratacao },
                      { tipo_assistencia: tipo_assistencia }
                    ]}
            })
            return res.status(200).json(assistenciaInserir)
        },

        AssCnab: async (req, res) => {
            const {
            status,
            tipo_contratacao
            } = req.body;

            const assCnab = await assistencia.findAll({
                attributes: [            
                    'codigo',
                    'cliente_nome',
                    'cliente_cpf',
                    'data_nascimento',
                    'cep',
                    'rua',      
                    'bairro',
                    'cidade',
                    'estado',
                    'numero',
                    'complemento',
                    'email',
                    'telefone',
                    'tipo_contratacao',
                    'banco',
                    'agencia',
                    'conta',
                    'digito',
                    'tipo_conta',
                    'status',
                    'tipo_assistencia',
                    'forma_contratacao',
                    'id_parceiro',
                    'valor_assistencia'
                   ],
                where: {
                    [Op.and]: [
                      { status: status },
                      { tipo_contratacao: tipo_contratacao }

                    ]}
            })
            return res.status(200).json(assCnab)
        },


//criar uma pasta temp e la colocar uma de envio pra ike e para o banco 
        AssGerarTxt: async (req, res) => {
            const {
            agencia,
            cliente_nome,
            cliente_cpf,
            numero_arquivo,
            cidade,
            estado,
            valor_assistencia, //valor unitario e6
            qtdRegistros, //qtd de pessoas que contrataram no indice z e j completar com zeros
            valor_final,  // no indice z completar com zeros 
            data_hoje  
            } = req.body;

/**identificacao do cliente no banco e na empresa (usar conta bancaria - digito)c2,c4,e2,e4
E8 numero de TELEFONE
 */


            let 
            letraA = "A100333759002500032721GRUPOMAISVALOR      033SANTANDER           "+data_hoje,
            letraA2 ="06DEBITOAUTOMATICO RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLER",
            
            tamanho_numero = numero_arquivo.toString(),
            diferenca_caracteres_numero = 6-tamanho_numero.length,
            espaco_numero = "0".repeat(diferenca_caracteres_numero),

            nome_tamanho = cliente_nome.length,
            diferenca_caracteres = 40-nome_tamanho,
            espaco = ' '.repeat(diferenca_caracteres),

            cidade_tamanho = cidade.length,
            diferenca_caracteres_cidade = 30-cidade_tamanho,
            espaco_cidade = ' '.repeat(diferenca_caracteres_cidade),

            ocorrencia1 = "ocorrencia1ocorrencia1ocorrencia1ocorren",
            ocorrencia2= "ocorrencia2ocorrencia2ocorrencia2ocorren",
            letraC = "C",
            id_cliente_empresa = "0000000000000000000011111", //25 caracteres (verificar valor correto)
            id_cliente_banco= "00000000011111",//14 digitos  verificar valor correto 
            codigo_movimento = "2" ,//fixo (inclusao de debito automatico)
            reservado_futuroC = "RESERVADOPARAFUTUROFILLER",
            letraE ="E",
            data_vencimento = "20211022",
            valor_debito = "000000000084562",
            cod_moeda = "03",
            uso_da_empresa= "USODAEMPRESAUSODAEMPRESAUSODAEMPRESAUSODAEMPRESAUSODAEMPRESA",
            tipo_identificacao = "2",//2 (cpf)
            identificacao = "000"+cliente_cpf,
            identificacaoE = "0000"+cliente_cpf,
            res_futuro_filler = "resf",
            codigo_movimentoE = "0" ,//fixo
            letraI ="I",
            cpf = "2",
            res_ff = "RESERVADOPARAOFUTUROFILLERRESERVADOPA",
            letraJ = "J",
            nsa = espaco_numero + numero_arquivo ,// igual ao a8 numero que vem do banco para empresa 
            data = "20211025" ,//data geracao d arquivo 
            total_reg= "000598" ,//total do registro do arquivo (6digitos)   VER TREILLER z2
            val_tot_arquivo= "00000000000895000" ,//valor total do arquivo 17 digitos          VER TREILLER z3
            data_processamento = "20211022" ,
            res_fut = "RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLER", //104 caracteres
            //LETRA Z
            letraZ= "Z",
            total_registros = "000123", //(6 digitos) seria o total de linhas
            valor_total_registros = "00000023659874125", //(acumular os campos e6 valor do debito e f6  17 digitos)
            res_fut_Z = "RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFI",//126 caracteres 
            
            //letraL uma vez por mes ********Marcar data separada****se for dia x mandar ****
            data_faturamento = "20211022", // VERIFICAR COM A CRIS
            data_remessa_arquivo_banco = data_hoje,
            data_remessa_contas_fisicas_assinante = "20211022", // VERIFICAR COM A CRIS
            reservado_fut = "RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFI"
            
            letra_a_concatenado = letraA+nsa+letraA2,
            letra_c_concatenado =letraC+id_cliente_empresa+agencia+id_cliente_banco+ocorrencia1+ocorrencia2+reservado_futuroC+codigo_movimento,
            letra_e_concatenado = letraE+id_cliente_empresa+agencia+id_cliente_banco+data_vencimento+valor_debito+cod_moeda+uso_da_empresa+tipo_identificacao+identificacaoE+res_futuro_filler+codigo_movimentoE,
            letra_i_concatenado = letraI+id_cliente_empresa+cpf+identificacao+cliente_nome+espaco+cidade+espaco_cidade+estado+res_ff,
            letra_j_concatenado = letraJ+espaco_numero+numero_arquivo+data+total_reg+val_tot_arquivo+data_processamento+res_fut,
            letra_z_concatenado = letraZ+total_registros+valor_total_registros+res_fut_Z


            var fs = require('fs');
            await  fs.appendFile(`../API_Portal_GMVB/assistenciaTxt/teste1.txt`,`${letra_a_concatenado}\n${letra_c_concatenado}\n${letra_e_concatenado}\n${letra_i_concatenado}\n${letra_j_concatenado}\n${letra_z_concatenado}\n`,
                                                                                                                                                                                                                                                                                                                                                          
            function(erro) {
                if(erro) {
                    throw erro;
                }
            });
            return res.status(200).json("arquivo salvo")
        }

}
module.exports = AssistenciaController;
