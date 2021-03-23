var axios = require('axios');

const PanService = {

 Auth: async (req, res) =>{
    var data = JSON.stringify({"username": "00000000001_000001","password": "test@123","grant_type": "client_credentials+password"});
    var config = {
      method: 'post',
      url: 'https://sandbox.bancopan.com.br/consignado/v0/tokens',
      headers: { 
        'Authorization': 'Basic bDcwY2I4MTNlYTUyMDM0Y2EyYjQ5ZmUwNjQ2MWE4NDhjMjo0Y2E1MTI5Y2ZhNDM0YTU1OTg5ZTMwMTEyNjVkY2Q0OA==', 
        'ApiKey': 'l70cb813ea52034ca2b49fe06461a848c2', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
     await axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
    //   console.log(error);
      res.status(200).json({'erro':'sistema indisponivel'})
    });
    
 },
 FindUser: async (req, res) =>{
    const { token, cpf } =req.body;
   
    var config = {
        method: 'get',
        url: `https://sandbox.bancopan.com.br/consignado/v0/usuarios?cpf=${cpf}`,
        headers: { 
          'ApiKey': 'l70cb813ea52034ca2b49fe06461a848c2', 
          'Authorization': `Bearer ${token}`
        }
      };
      
      await axios(config)
      .then(function (response) {
       
        res.status(200).json(response.data)
      })
      .catch(function (error) {
       
        res.status(400).json(error)
      });
  },
  ConsultarContratos: async(req, res)=>{
    const {codigo_promotora,codigo_convenio,cpf,matricula}= req.body

    res.status(200).send({
      
        "contratos":[{
          "Saldo": "5000,00",
          "Valor Parcela": 231.00,
          "Total Parcelas": 44,
          "Parcelas em Aberto": 30,
          "Há Vencer": 16,
          "Vencidas": 0
        },{
          "Saldo": "5000,00",
          "Valor Parcela": 231.00,
          "Total Parcelas": 44,
          "Parcelas em Aberto": 30,
          "Há Vencer": 16,
          "Vencidas": 0
        }]
      
    })
  }
}

module.exports = PanService