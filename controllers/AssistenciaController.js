

const {
    assistencia
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mailer = require('../modules/mailer');



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
            data_vencimento,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia,
            id_cliente,// cpf+nascimento
            id_contrato // cpf+cc
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
                typeof   data_vencimento != undefined && data_vencimento !='' &&
                typeof   responsavel_alteracao != undefined && responsavel_alteracao !='' &&
                typeof   data_alteracao!= undefined && data_alteracao !='' &&
                typeof  valor_assistencia!= undefined && valor_assistencia !=''&&
                typeof   id_cliente!= undefined && id_cliente !='' &&
                typeof  id_contrato!= undefined && id_contrato !=''
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
            data_vencimento,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia,
            id_cliente,// cpf+nascimento
            id_contrato // cpf+cc
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
            data_vencimento,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia,
            id_cliente,// cpf+nascimento
            id_contrato // cpf+cc
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
            data_vencimento,
            responsavel_alteracao,
            data_alteracao,
            valor_assistencia,
            id_cliente,// cpf+nascimento
            id_contrato // cpf+cc
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
                    'data_vencimento',
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
                    'id_contrato',
                    'id_cliente',
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
                    'data_vencimento',
                    'data_inclusao',
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
            valor_assistencia, 
            qtdRegistros, //6 digitos  total registros
            valor_final,  //17 digitos valor_total_registros
            data_hoje,
            data_vencimento,
            id_empresa_banco  
            } = req.body;
          


            //variaveis para gerar o TXT
            let 
            letraA = "A100333759002500032721GRUPOMAISVALOR      033SANTANDER           "+data_hoje,
            letraA2 ="06DEBITOAUTOMATICO RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLER",

            tamanho_numero = numero_arquivo.toString(),
            diferenca_caracteres_numero = 6-tamanho_numero.length,
            espaco_numero = "0".repeat(diferenca_caracteres_numero),

            tamanho_qtdRegistros = qtdRegistros.toString(),
            diferenca_caracteres_qtdRegistros = 6-tamanho_qtdRegistros.length,
            espaco_qtdRegistros = "0".repeat(diferenca_caracteres_qtdRegistros),

            tamanho_valor_final = valor_final.toString(),//TIRAR O PONTO NA HORA DE ENVIAR PELO FRONT
            diferenca_caracteres_valor_final = 17-tamanho_valor_final.length,
            espaco_valor_final = "0".repeat(diferenca_caracteres_valor_final),

            nome_tamanho = cliente_nome.length,
            diferenca_caracteres = 40-nome_tamanho,
            espaco = ' '.repeat(diferenca_caracteres),

            cidade_tamanho = cidade.length,
            diferenca_caracteres_cidade = 30-cidade_tamanho,
            espaco_cidade = ' '.repeat(diferenca_caracteres_cidade),

            valor_assistencia2 = valor_assistencia.replace(".", ""),
            valor_debito = valor_assistencia2.toString(),
            diferenca_caracteres_valor_assistencia = 15-valor_debito.length,
            espaco_valor_assistencia = '0'.repeat(diferenca_caracteres_valor_assistencia),

            ocorrencia1 = "ocorrencia1ocorrencia1ocorrencia1ocorren",
            ocorrencia2= "ocorrencia2ocorrencia2ocorrencia2ocorren",

            letraC = "C",

            tamanho_id_empresa = id_empresa_banco.toString(),
            diferenca_id_empresa= 25-tamanho_id_empresa.length,
            espaco_empresa = "0".repeat(diferenca_id_empresa),

            tamanho_id_banco = id_empresa_banco.toString(),
            diferenca_id_banco= 14-tamanho_id_banco.length,
            espaco_banco = "0".repeat(diferenca_id_banco),  

            id_cliente_empresa = espaco_empresa+id_empresa_banco, //25 caracteres
            id_cliente_banco= espaco_banco+id_empresa_banco,//14 
            codigo_movimento = "2" ,
            reservado_futuroC = "RESERVADOPARAFUTUROFILLER",
            letraE ="E",
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
            nsa = espaco_numero + numero_arquivo ,
            res_fut = "RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLER", //104 caracteres
            //LETRA Z
            letraZ= "Z",
            res_fut_Z = "RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFI",//126 caracteres 
            
            //letraL uma vez por mes ********Marcar data separada****se for dia x mandar ****
            data_faturamento = "20211022", // VERIFICAR COM A CRIS
            data_remessa_arquivo_banco = data_hoje,
            data_remessa_contas_fisicas_assinante = "20211022", // VERIFICAR COM A CRIS
            reservado_fut = "RESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFILLERRESERVADOPARAOFUTUROFI"
            
            letra_a_concatenado = letraA+nsa+letraA2,
            letra_c_concatenado =letraC+id_cliente_empresa+agencia+id_cliente_banco+ocorrencia1+ocorrencia2+reservado_futuroC+codigo_movimento,
            letra_e_concatenado = letraE+id_cliente_empresa+agencia+id_cliente_banco+data_vencimento+espaco_valor_assistencia+valor_debito+cod_moeda+uso_da_empresa+tipo_identificacao+identificacaoE+res_futuro_filler+codigo_movimentoE,
            letra_i_concatenado = letraI+id_cliente_empresa+cpf+identificacao+cliente_nome+espaco+cidade+espaco_cidade+estado+res_ff,
            letra_j_concatenado = letraJ+espaco_numero+numero_arquivo+data_hoje+espaco_qtdRegistros+qtdRegistros+espaco_valor_final+valor_final+data_hoje+res_fut,
            letra_z_concatenado = letraZ+espaco_qtdRegistros+qtdRegistros+espaco_valor_final+valor_final+res_fut_Z

            let data_arquivo_txt = new Date();
            let diaHoje = ("0" + data_arquivo_txt.getDate()).slice(-2);
            let mesHoje = ("0" + (data_arquivo_txt.getMonth() + 1)).slice(-2);
            let anoHoje = data_arquivo_txt.getFullYear();
            hoje = diaHoje + mesHoje + anoHoje;


            let fs = require('fs');
            await  fs.appendFile(`../API_Portal_GMVB/temp/arquivoBanco/envioBanco${hoje}.txt`,`${letra_a_concatenado}\n${letra_c_concatenado}\n${letra_e_concatenado}\n${letra_i_concatenado}\n${letra_j_concatenado}\n${letra_z_concatenado}\n`,
                                                                                                                                                                                                                                                                                                                                                      
            function(erro) {
                if(erro) {
                    throw erro;
                }else{
                    //função de enviar email para o banco com o anexo gerado na data de hoje
                }
            });
            return res.status(200).json("txt banco salvo")
        },


        AssGerarArquivoIke: async (req, res) => {
            const {
                contrato, //OK
                conta, //OK
                qtdRegistros, //OK
                cod_interno_cliente, //OK
                nome ,  //OK
                cpf, //OK
                data_nascimento, //OK
                data_venda,  //OK
                endereco, //OK
                numero , //OK
                complemento, //OK
                bairro, //OK
                cidade, //OK
                cep, //OK
                uf,//OK
                numero_sequencial_arquivo//10digitos completar cmo zeroa
          
            } = req.body;
//10 digitos
 
             let
             layout = "L1"

             data_arquivo_txt = new Date()
             diaHoje = ("0" + data_arquivo_txt.getDate()).slice(-2)
             mesHoje = ("0" + (data_arquivo_txt.getMonth() + 1)).slice(-2)
             anoHoje = data_arquivo_txt.getFullYear()
             data_geracao_arquivo = anoHoje + mesHoje + diaHoje //incluir hora minuto e segundo


             hora = ("0" + data_arquivo_txt.getHours()).slice(-2)
             minuto = ("0" + (data_arquivo_txt.getMinutes() + 1)).slice(-2)
             horaArquivo = hora + minuto

            
             cod_gmvb = "GMV"
             letraH = "H"
             vigencia_inicial = "00000000"
             vigencia_final = "99991231"
             produto = "02560"
             canal_de_venda = "2"
             tipo_movimentacao = "I"
            

             tamanho_qtdRegistros = qtdRegistros.toString(),
             diferenca_caracteres_qtdRegistros = 10-tamanho_qtdRegistros.length,
             espaco_qtdRegistros = "0".repeat(diferenca_caracteres_qtdRegistros),
             
             tamanho_cdCliente = cod_interno_cliente.toString(),
             diferenca_caracteres_cdCliente = 20-tamanho_cdCliente.length,
             espaco_cdCliente = " ".repeat(diferenca_caracteres_cdCliente),

             tamanho_nome = nome.toString(),
             diferenca_nome = 130-tamanho_nome.length,
             espaco_nome = " ".repeat(diferenca_nome),

             tamanho_cpf = cpf.toString(),
             diferenca_caracteres_cpf = 14-tamanho_cpf.length,
             espaco_cpf = "0".repeat(diferenca_caracteres_cpf),

             tamanho_endereco = endereco.toString(),
             diferenca_caracteres_endereco = 150-tamanho_endereco.length,
             espaco_endereco = " ".repeat(diferenca_caracteres_endereco),

             
             tamanho_numero = numero.toString(),
             diferenca_caracteres_numero = 5-tamanho_numero.length,
             espaco_numero = " ".repeat(diferenca_caracteres_numero),

             tamanho_complemento = complemento.toString(),
             diferenca_caracteres_complemento = 10-tamanho_complemento.length,
             espaco_complemento = " ".repeat(diferenca_caracteres_complemento),

             tamanho_bairro = bairro.toString(),
             diferenca_caracteres_bairro = 50-tamanho_bairro.length,
             espaco_bairro = " ".repeat(diferenca_caracteres_bairro),

             tamanho_cidade = cidade.toString(),
             diferenca_caracteres_cidade = 50-tamanho_cidade.length,
             espaco_cidade = " ".repeat(diferenca_caracteres_cidade),

             contador_linhas = 5 * qtdRegistros;
             //o primeiro é formato string tamanho 9 o segundo é formato numerico tamanho 9
             tamanho_contador_string = contador_linhas.toString(),
             diferenca_contador_string = 9-tamanho_contador_string.length,
             espaco_contador_string = " ".repeat(diferenca_contador_string),

             tamanho_contador_numerico = contador_linhas.toString(),
             diferenca_caracteres_contador_numerico = 9-tamanho_contador_numerico.length,
             espaco_contador_numerico = "0".repeat(diferenca_caracteres_contador_numerico),

             tamanho_numero_sequencial_arquivo = numero_sequencial_arquivo.toString(),
             diferenca_caracteres_numero_sequencial_arquivo = 10-tamanho_numero_sequencial_arquivo.length,
             espaco_numero_sequencial_arquivo = "0".repeat(diferenca_caracteres_numero_sequencial_arquivo),


             //Concatenando
             chave = cpf +";"+ contrato +";"+ conta, //tirar caracteres especiais no front end antes de mandar 
             header= letraH +";"+espaco_numero_sequencial_arquivo + numero_sequencial_arquivo +";"+ cod_gmvb +";"+ layout +";"+ data_geracao_arquivo +";"+ espaco_qtdRegistros +qtdRegistros +";"+ contador_linhas + espaco_contador_string
             dados_cliente =  cod_interno_cliente + espaco_cdCliente +";"+nome + espaco_nome +";"+ espaco_cpf + cpf  +";"+data_nascimento +";"+ data_venda +";"+ vigencia_inicial +";"+ vigencia_final +";"+ produto +";"+ canal_de_venda +";"+ tipo_movimentacao
             endereco_final = endereco + espaco_endereco +";"+ numero + espaco_numero+";"+  complemento + espaco_complemento +";"+  bairro + espaco_bairro +";"+ cidade + espaco_cidade +";"+ cep +";"+ uf
             contador_linhas_final = espaco_contador_numerico +  contador_linhas

      
            arquivo_completo =`${chave}\n${header}\n${dados_cliente}\n${endereco_final}\n${contador_linhas_final}\n`
          
            console.log(arquivo_completo)

            let fs = require('fs');
            await  fs.appendFile(`../API_Portal_GMVB/temp/arquivoIke/GMVB_L1_${data_geracao_arquivo}.txt`,`${arquivo_completo}`,//colocar hora por ultimo _${horaArquivo}
                                                                                                                                                                                                                                                                                                                                                
            function(erro) {
                if(erro) {
                    throw erro;
                }else{
                    //função de enviar email para o banco com o anexo gerado na data de hoje
                }
            });
            return res.status(200).json(arquivo_completo)
        },


        AssUpdateStatus:async (req, res) =>{

            const { codigo, status } = req.body;
    
            const assUpdateStatus = await assistencia.update({ 
                status
              }, {
                where: {codigo: codigo},
                returning: true, 
                plain: true 
            })
            return res.status(200).json(assUpdateStatus)

        },

          
    AssSendEmailBanco: async (req, res) => {


        let data_arquivo_txt = new Date();
        let diaHoje = ("0" + data_arquivo_txt.getDate()).slice(-2);
        let mesHoje = ("0" + (data_arquivo_txt.getMonth() + 1)).slice(-2);
        let anoHoje = data_arquivo_txt.getFullYear();
        hoje = diaHoje + mesHoje + anoHoje;


     try{
        var fs = require('fs');
         await  fs.readFile(`../API_Portal_GMVB/temp/arquivoBanco/envioBanco${hoje}.txt`, function (err, data) {

                mailer.sendMail({
                            from: 'esteira.maisvalor@gmvb.com.br',
                            to: 'thaynara.rodrigues@gmvb.com.br',//colocar email do banco
                            subject: 'Email TXT para o banco',
                            body: 'arquivo banco teste',
                            attachments: [{'filename': `envioBanco${hoje}.txt`, 'content': data}]

                }, (err) => {
                    if (err){
                    console.log(err);
                        return res.status(400).send({
                            erro: 'não foi possivel enviar o email'
                        });
                    }else{
                        return res.status(200).send({
                            sucesso: 'email enviado com sucesso'
                        });
                    }

            })})

                } catch (err) {
                    
                    return res.status(400).send({
                        erro: "não foi possivel enviar o email, tente novamente."
                    });
                }
     },


     AssSendSmtpIke: async (req, res) => {

                    const {
                        user
                    } = req.body;

                    try{

                    data_arquivo_txt = new Date()
                    diaHoje = ("0" + data_arquivo_txt.getDate()).slice(-2)
                    mesHoje = ("0" + (data_arquivo_txt.getMonth() + 1)).slice(-2)
                    anoHoje = data_arquivo_txt.getFullYear()
                    data_geracao_arquivo = anoHoje + mesHoje + diaHoje //incluir hora minuto e segundo

                    var SftpUpload = require('sftp-upload'),
                    fs = require('fs');
            
                        var options = {
                            host: "201.116.36.203",
                            username: "Mais_Valor",
                            path: '../API_Portal_GMVB/temp/arquivoIke/GMVB_L1_20210514.txt',//colocar as horas nesse arquivo 
                            remoteDir: '/REMESSA',
                            excludedFolders: ['**/.git', 'node_modules'],
                            exclude: ['.gitignore', '.vscode/tasks.json'],
                            password: 'gO\\7&Q+TN2', //senha com 1 barra foram usadas 2 pois tem um caractere de escape
                            dryRun: false,
                        },
                        sftp = new SftpUpload(options);
                        sftp.on('error', function(err) {
                            throw err;
                        })
                        .on('uploading', function(progress) {
                            console.log('Uploading', progress.file);
                            console.log(progress.percent+'% completed');
                        })
                        .on('completed', function() {
                            console.log('Upload Completed');
                            return res.status(200).send({
                                sucesso: 'sftp enviado com sucesso'
                            });
                            
                        })
                        .upload();

                    }catch(error){
                        return res.status(400).send({
                            erro: error
                        });
                    }
                      
        
            }



}
module.exports = AssistenciaController;
