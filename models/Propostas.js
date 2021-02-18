module.exports = (sequelize, DataTypes) => {
    const propostaOriginal = sequelize.define('propostas', {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        mes:DataTypes.STRING, 
        data_envio:DataTypes.STRING, 
        parceiro:DataTypes.STRING, 
        supervisor:DataTypes.STRING, 
        proposta:DataTypes.STRING, 
        nome:DataTypes.STRING, 
        cpf:DataTypes.STRING, 
        entregue:DataTypes.STRING, 
        convenio:DataTypes.STRING, 
        tipo:DataTypes.STRING, 
        status:DataTypes.STRING, 
        novo_proposta:DataTypes.STRING, 
        numero_portabilidade:DataTypes.STRING, 
        previsao_retorno:DataTypes.STRING, 
        observacao:DataTypes.STRING,
        empresa:DataTypes.STRING, 
        responsavel:DataTypes.STRING, 
        data_atualizacao:DataTypes.STRING, 
        arquivo1:DataTypes.STRING, 
        arquivo2:DataTypes.STRING, 
        arquivo3:DataTypes.STRING, 
        arquivo4:DataTypes.STRING, 
        arquivo5:DataTypes.STRING, 
        arquivo6:DataTypes.STRING, 
        arquivo7:DataTypes.STRING, 
        arquivo8:DataTypes.STRING, 
        valor_troco:DataTypes.STRING, 
        dados_bancarios:DataTypes.STRING, 
        duracao_responsavel:DataTypes.STRING, 
        arquivo9:DataTypes.STRING, 
        arquivo10:DataTypes.STRING, 
        arquivo11:DataTypes.STRING, 
        arquivo12:DataTypes.STRING, 
        arquivo13:DataTypes.STRING, 
        arquivo14:DataTypes.STRING, 
        arquivo15:DataTypes.STRING, 
        arquivo16:DataTypes.STRING, 
        arquivo17:DataTypes.STRING, 
        arquivo18:DataTypes.STRING, 
        arquivo19:DataTypes.STRING, 
        arquivo20:DataTypes.STRING, 
        arquivo21:DataTypes.STRING, 
        arquivo22:DataTypes.STRING, 
        arquivo23:DataTypes.STRING, 
        arquivo24:DataTypes.STRING, 
        arquivo25:DataTypes.STRING, 
        arquivo26:DataTypes.STRING, 
        banco:DataTypes.STRING, 
        dados_telefonicos:DataTypes.STRING, 
        status_2:DataTypes.STRING, 
        telefone:DataTypes.STRING, 
        telefone_confirmacao:DataTypes.STRING, 
        dados_telefonicos2:DataTypes.STRING, 
        tipo_parceiro:DataTypes.STRING, 
        gravacao:DataTypes.STRING, 
        tipo_cliente:DataTypes.STRING, 
        salario:DataTypes.STRING, 
        margem:DataTypes.STRING, 
        data_nascimento:DataTypes.STRING, 
        tipo_conta:DataTypes.STRING, 
        parcela:DataTypes.STRING, 
        conjuge:DataTypes.STRING, 
        estado_civil:DataTypes.STRING, 
        orgao_emissor:DataTypes.STRING, 
        documento_numero:DataTypes.STRING, 
        data_emissao:DataTypes.STRING, 
        uf_naturalidade:DataTypes.STRING, 
        matricula:DataTypes.STRING, 
        conta_cliente:DataTypes.STRING, 
        data_admissao:DataTypes.STRING, 
        agencia_cliente:DataTypes.STRING, 
        rg:DataTypes.STRING, 
        nome_mae:DataTypes.STRING, 
        nome_pai:DataTypes.STRING, 
        naturalidade:DataTypes.STRING, 
        banco_cliente:DataTypes.STRING, 
        cep:DataTypes.STRING, 
        endereco:DataTypes.STRING, 
        numero_endereco:DataTypes.STRING, 
        complemento:DataTypes.STRING, 
        uf:DataTypes.STRING, 
        municipio:DataTypes.STRING, 
        bairro:DataTypes.STRING, 
        parceiro_cadastro:DataTypes.STRING(2), 
        status_fisico:DataTypes.STRING, 
        sub_status:DataTypes.STRING, 
        agencia:DataTypes.STRING, 
        siglae:DataTypes.STRING, 
        arquivo_rc:DataTypes.STRING, 
        horario:DataTypes.STRING, 
        gravacao2:DataTypes.STRING, 
        arquivo_proposta:DataTypes.STRING, 
        cip:DataTypes.STRING, 
        classificacao:DataTypes.STRING, 
        telefone1:DataTypes.STRING, 
        telefone2:DataTypes.STRING, 
        telefone3:DataTypes.STRING, 
        telefone4:DataTypes.STRING, 
        numero_chamado:DataTypes.STRING, 
        chamado:DataTypes.STRING, 
        correntista:DataTypes.STRING, 
        gerente:DataTypes.STRING, 
        vendedor:DataTypes.STRING, 
        tipo_funcionario:DataTypes.STRING, 
        venda_promotora:DataTypes.STRING, 
        cpf_profissional_certificado:DataTypes.STRING, 
        regra:DataTypes.STRING, 
        pab:DataTypes.STRING, 
        beneficiario:DataTypes.STRING, 
        forma_liberacao:DataTypes.STRING, 
        data_liberacao:DataTypes.STRING, 
        documento_tipo:DataTypes.STRING(2), 
        documento_pais:DataTypes.STRING, 
        sexo:DataTypes.STRING, 
        nacionalidade:DataTypes.STRING, 
        pais_nascimento:DataTypes.STRING, 
        codigo_profissao:DataTypes.STRING, 
        identificacao_pep:DataTypes.STRING, 
        endereco_tipo_residencial:DataTypes.STRING, 
        telefone_tipo_1:DataTypes.STRING, 
        telefone_ddd_1:DataTypes.STRING, 
        telefone_numero_1:DataTypes.STRING, 
        pagamento_dv:DataTypes.STRING, 
        pagamento_tipo_conta:DataTypes.STRING, 
        data_averbacao:DataTypes.STRING, 
        resultado_averbacao:DataTypes.STRING, 
        documento_uf:DataTypes.STRING, 
        documento_data_validade:DataTypes.STRING, 
        documento_pais_origem:DataTypes.STRING, 
        acao_comercial:DataTypes.STRING(2), 
        acao_comercial_1:DataTypes.STRING(2), 
        acao_comercial_2:DataTypes.STRING(2), 
        valor_patrimonio_resumindo:DataTypes.STRING(2), 
        cep_comercial:DataTypes.STRING(2), 
        endereco_logradouro_comercial:DataTypes.STRING(2), 
        endereco_numero_comercial:DataTypes.STRING(2), 
        endereco_complemento_comercial:DataTypes.STRING(2), 
        endereco_uf_comercial:DataTypes.STRING(2), 
        endereco_municipio_comercial:DataTypes.STRING(2), 
        endereco_bairro_comercial:DataTypes.STRING(2), 
        telefone_classe_1:DataTypes.STRING(2), 
        telefone_ramal_1:DataTypes.STRING(2), 
        telefone_classe_2:DataTypes.STRING(2), 
        telefone_ddd_2:DataTypes.STRING(2), 
        telefone_numero_2:DataTypes.STRING(2), 
        telefone_ramal_2:DataTypes.STRING(2), 
        telefone_classe_3:DataTypes.STRING(2), 
        telefone_tipo_3:DataTypes.STRING(2), 
        telefone_ddd_3:DataTypes.STRING(2), 
        telefone_numero_3:DataTypes.STRING(2), 
        telefone_ramal_3:DataTypes.STRING(2), 
        beneficio_cartao:DataTypes.STRING(2), 
        taxa:DataTypes.STRING, 
        taxaespecial:DataTypes.STRING, 
        codigo_validacao:DataTypes.STRING,
        defesa_taxa:DataTypes.STRING, 
        valor_patrimonio_resumido:DataTypes.STRING(2), 
        telefone_tipo_2:DataTypes.STRING(2), 
        arquivo_robo: DataTypes.STRING, 
        codigo_proposta:DataTypes.STRING, 
        seguro:DataTypes.STRING, 
        data_status:DataTypes.STRING, 
        data_log:DataTypes.STRING, 
        email_cliente:DataTypes.STRING, 
        margem_ole:DataTypes.STRING, 
        cartao_ole:DataTypes.STRING, 
        produto:DataTypes.STRING, 
        banco_origi:DataTypes.STRING, 
        saque:DataTypes.STRING, 
        valor_saque:DataTypes.STRING,
        usuario_master:DataTypes.STRING, 
        validade_contrato:DataTypes.STRING, 
        data_corte:DataTypes.STRING, 
        primeiro_vencimento:DataTypes.STRING, 
        ultimo_vencimento:DataTypes.STRING, 
        master:DataTypes.STRING, 
        sms:DataTypes.STRING, 
        parcela_refin1:DataTypes.STRING, 
        parcela_refin2:DataTypes.STRING, 
        parcela_refin3:DataTypes.STRING, 
        parcela_refin4:DataTypes.STRING, 
        parcela_refin5:DataTypes.STRING, 
        parcela_refin6:DataTypes.STRING, 
        vincular:DataTypes.STRING, 
        tel_procedente:DataTypes.STRING,
        sistema_tel:DataTypes.STRING, 
        robo:DataTypes.STRING, 
        especie:DataTypes.STRING, 
        iporigem:DataTypes.STRING, 
        navegador:DataTypes.STRING(2), 
        extrato_inss:DataTypes.INTEGER,
        banco_port1:DataTypes.STRING, 
        saldo_port1:DataTypes.STRING, 
        valorp_port1:DataTypes.STRING, 
        qtdp_port1:DataTypes.STRING, 
        qtdp_pagaport1:DataTypes.STRING, 
        qtdp_vencerport1:DataTypes.STRING, 
        valor_parcela:DataTypes.STRING, 
        banco_port2:DataTypes.STRING, 
        saldo_port2:DataTypes.STRING, 
        valorp_port2:DataTypes.STRING, 
        qtdp_port2:DataTypes.STRING, 
        qtdp_pagaport2:DataTypes.STRING, 
        qtdp_vencerport2:DataTypes.STRING, 
        banco_port3:DataTypes.STRING, 
        saldo_port3:DataTypes.STRING, 
        valorp_port3:DataTypes.STRING, 
        qtdp_port3:DataTypes.STRING, 
        qtdp_pagaport3:DataTypes.STRING, 
        qtdp_vencerport3:DataTypes.STRING, 
        banco_port4:DataTypes.STRING, 
        saldo_port4:DataTypes.STRING, 
        valorp_port4:DataTypes.STRING, 
        qtdp_port4:DataTypes.STRING, 
        qtdp_pagaport4:DataTypes.STRING, 
        qtdp_vencerport4:DataTypes.STRING, 
        banco_port5:DataTypes.STRING, 
        saldo_port5:DataTypes.STRING, 
        valorp_port5:DataTypes.STRING, 
        qtdp_port5:DataTypes.STRING, 
        qtdp_pagaport5:DataTypes.STRING, 
        qtdp_vencerport5:DataTypes.STRING, 
        banco_port6:DataTypes.STRING, 
        saldo_port6:DataTypes.STRING, 
        valorp_port6:DataTypes.STRING, 
        qtdp_port6:DataTypes.STRING, 
        qtdp_pagaport6:DataTypes.STRING, 
        qtdp_vencerport6:DataTypes.STRING, 
        banco_port7:DataTypes.STRING, 
        saldo_port7:DataTypes.STRING, 
        valorp_port7:DataTypes.STRING, 
        qtdp_port7:DataTypes.STRING, 
        qtdp_pagaport7:DataTypes.STRING, 
        qtdp_vencerport7:DataTypes.STRING, 
        banco_port8:DataTypes.STRING, 
        saldo_port8:DataTypes.STRING, 
        valorp_port8:DataTypes.STRING, 
        qtdp_port8:DataTypes.STRING, 
        qtdp_pagaport8:DataTypes.STRING, 
        qtdp_vencerport8:DataTypes.STRING, 
        banco_port9:DataTypes.STRING, 
        saldo_port9:DataTypes.STRING, 
        valorp_port9:DataTypes.STRING, 
        qtdp_port9:DataTypes.STRING, 
        qtdp_pagaport9:DataTypes.STRING, 
        qtdp_vencerport9:DataTypes.STRING, 
        contrato_1:DataTypes.STRING, 
        contrato_2:DataTypes.STRING, 
        contrato_3:DataTypes.STRING, 
        contrato_4:DataTypes.STRING, 
        contrato_5:DataTypes.STRING, 
        contrato_6:DataTypes.STRING, 
        contrato_7:DataTypes.STRING, 
        contrato_8:DataTypes.STRING, 
        id_indica:DataTypes.STRING, 
        campanha:DataTypes.STRING, 
        cartao_m:DataTypes.STRING, 
        arquivo_prev:DataTypes.STRING, 
        substatus_robo:DataTypes.STRING, 
        proposta_rc:DataTypes.STRING, 
        dia:DataTypes.STRING, 
        motivo_new:DataTypes.STRING, 
        atualizacao_new:DataTypes.STRING, 
        status_new:DataTypes.STRING, 
        qtd_robo:DataTypes.STRING,
        responsavel2:DataTypes.STRING, 
        tipo_parceiro2:DataTypes.STRING, 
        data_vinculo:DataTypes.STRING, 
        contrato_ole:DataTypes.STRING, 
        obs_pendencia: DataTypes.STRING,
        refin_ole:DataTypes.STRING,
        empresa_sms:DataTypes.STRING, 
        id_acesso:DataTypes.STRING, 
        robo_2:DataTypes.STRING,
        venda_sms:DataTypes.STRING, 
        auditoria_sms:DataTypes.STRING, 
        cetelem:DataTypes.STRING, 
        parcela_desconto:DataTypes.STRING, 
        arquivo_saldo:DataTypes.STRING, 
        agendamento:DataTypes.STRING,
        sigla_chamado:DataTypes.STRING,
        novo_proposta2:DataTypes.INTEGER, 
        tfc:DataTypes.STRING,
        dig_sms:DataTypes.STRING,
        par_paga:DataTypes.STRING, 
        arquivo1n:DataTypes.INTEGER, 
        arquivo2n:DataTypes.INTEGER, 
        arquivo3n:DataTypes.INTEGER, 
        arquivo4n:DataTypes.INTEGER, 
        arquivo5n:DataTypes.INTEGER, 
        arquivo6n:DataTypes.INTEGER, 
        arquivo7n:DataTypes.INTEGER, 
        arquivo8n:DataTypes.INTEGER, 
        arquivo9n:DataTypes.INTEGER, 
        arquivo10n:DataTypes.INTEGER, 
        arquivo11n:DataTypes.INTEGER, 
        arquivo12n:DataTypes.INTEGER, 
        arquivo13n:DataTypes.INTEGER, 
        arquivo14n:DataTypes.INTEGER, 
        arquivo15n:DataTypes.INTEGER, 
        arquivo16n:DataTypes.INTEGER, 
        arquivo17n:DataTypes.INTEGER, 
        arquivo18n:DataTypes.INTEGER, 
        arquivo19n:DataTypes.INTEGER, 
        arquivo20n:DataTypes.INTEGER, 
        arquivo21n:DataTypes.INTEGER, 
        arquivo22n:DataTypes.INTEGER, 
        arquivo23n:DataTypes.INTEGER, 
        arquivo24n:DataTypes.INTEGER, 
        arquivo25n:DataTypes.INTEGER, 
        arquivo26n:DataTypes.INTEGER, 
        arquivo27n:DataTypes.INTEGER, 
        arquivo28n:DataTypes.INTEGER, 
        arquivo29n:DataTypes.INTEGER, 
        arquivo30n:DataTypes.INTEGER, 
        gravacaon:DataTypes.INTEGER, 
        arquivo_rcn:DataTypes.INTEGER, 
        gravacao2n:DataTypes.INTEGER, 
        arquivo_propostan:DataTypes.INTEGER, 
        arquivo_prevn:DataTypes.INTEGER, 
        arquivo_saldon:DataTypes.INTEGER, 
        inssn:DataTypes.INTEGER, 
        nome_contrato:DataTypes.STRING,
        codigo_averbacao:DataTypes.STRING,
        arq_cad1:DataTypes.STRING,
        arq_cad2:DataTypes.STRING,
        arq_cad3:DataTypes.STRING,
        arq_cad4:DataTypes.STRING,
        arq_cad1n:DataTypes.INTEGER, 
        arq_cad2n:DataTypes.INTEGER, 
        arq_cad3n:DataTypes.INTEGER, 
        arq_cad4n:DataTypes.INTEGER, 
        parceiro_indica:DataTypes.STRING, 
        supervisor_indica:DataTypes.STRING, 
        gerente_indica:DataTypes.STRING, 
        arquivo_pendente1:DataTypes.STRING, 
        arquivo_pendente2:DataTypes.STRING, 
        arquivo_pendente1n:DataTypes.STRING,
        arquivo_pendente2n:DataTypes.STRING,
        f5:DataTypes.STRING, 
        data_validade:DataTypes.STRING, 
        obs_auditoria:DataTypes.STRING,
        status_auditoria:DataTypes.STRING, 
        exercito:DataTypes.STRING,
        senha_exercito:DataTypes.STRING, 
        termo:DataTypes.STRING, 
        pend1:DataTypes.STRING, 
        pend2:DataTypes.STRING, 
        login_cetelem:DataTypes.STRING,
        email_parceiro:DataTypes.STRING,
        email_supervisor:DataTypes.STRING,
        email_gerente:DataTypes.STRING, 
        patrimonio:DataTypes.STRING, 
        genero:DataTypes.STRING, 
        piloto_ola:DataTypes.STRING,
        digito_conta:DataTypes.STRING,
        email:DataTypes.STRING, 
        id_sim:DataTypes.STRING,
        url:DataTypes.STRING 
    }, 
        {
        tableName: 'propostas',
        timestamps: false
    })
    return propostaOriginal;
};