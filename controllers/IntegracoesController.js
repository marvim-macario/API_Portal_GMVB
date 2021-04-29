const { cep }  = require('../models');

const { Op } = require("sequelize");

const IntegracoesController = {
    Read: async (req, res) => {
        const { cep_inserido } = req.query;
        try {
            const agencia1 = await cep.findOne({
                where: {
                    [Op.and]: [
                        {
                            cep_num : {
                            [Op.lte]:cep_inserido
                        } },{ 
                            id_cep :{

                                [Op.gte]:0
                            }}], 
                    
                },
                order:[
                    ['cep_num','desc']
                ] 
            })
    
                const agencia2 = await cep.findOne({
                    where: {
                        [Op.and]: [
                            {
                                cep_num : {
                                [Op.gte]:cep_inserido
                            } },{ 
                                id_cep :{
    
                                    [Op.gte]:0
                                }}], 
                        
                    },
                    order:[
                        ['cep_num']
                    ] 
                })
        
            res.status(200).json({'agencia1':agencia1,'agencia2':agencia2})
        
        } catch (error) {
            console.log(error)
            res.status(500).json({'erro':'internal error server'})
        }
    },

    login: (req, res) => {
        
        const { telefone }=req.query;
        
        var axios = require('axios');
        var data = JSON.stringify({
        "login": "acesso.nperturbe",
        "senha": "G45@@n_perturbe"
        });
        
        var config = {
        method: 'POST',
        url: 'http://api.erpmaisvalor.com.br/nperturbe/v1/login/',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        
        axios(config)
        .then(function (response) {

            consulta(response.data.jwt);
        })
        .catch(function (error) {
            console.log(error);
        });

        const consulta = (jwt) => {

            var axios = require('axios');
            var data = {
              "jwt":jwt
            };
            
            var config = {
              method: 'get',
              url: `http://api.erpmaisvalor.com.br/nperturbe/v1/blacklist/?telefone=${telefone}`,
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then(response=> res.status(200).json(response.data))
            .catch(data=>res.status(404).json(data.response.data));
                  
        }
        
}

}

module.exports = IntegracoesController;