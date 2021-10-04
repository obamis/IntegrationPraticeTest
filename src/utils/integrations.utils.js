const Balance = require("../models/Balance");
const axios = require("axios");
const jsontoxml = require("jsontoxml");

const {
  create_deal,
  get_all_Deals,
  filter_won_Deals,
  update_deal,
} = require("../utils/pipedrive.utils");
const { get_orders } = require("../utils/bling.utils");

// convert json to xml
const xml_request = async function (newOrder) {
  const xml = jsontoxml(
    {
      pedido: [
        {
          name: "cliente",
          children: [
            {
              name: "nome",
              text: newOrder.org_name || "Dunder Mifflin",
            },
            { name: "tipoPessoa", text: "J" },
            { name: "endereco", text: "Av. Paulista" },
            { name: "ie_rg", text: "3067663210" },
            { name: "numero", text: "1200" },
            { name: "bairro", text: "Bela Vista" },
            { name: "cep", text: "01310-100" },
            { name: "cidade", text: "Sao Paulo" },
            { name: "uf", text: "SP" },
            { name: "fone", text: "5481153381" },
            {
              name: "email",
              text: newOrder.cc_email
                ? "dunderMifflin@gmail.com"
                : newOrder.cc_email,
            },
          ],
        },
        {
          name: "transporte",
          children: [
            { name: "transportadora", text: "Transportadora XYZ" },
            { name: "tipo_frete", text: "R" },
            { name: "servico_correios", text: "SEDEX - CONTRATO" },
            {
              name: "dados_etiqueta",
              children: [
                { name: "nome", text: "Endereco de entrega" },
                { name: "endereco", text: "Rua Visconde de Sao Gabriel" },
                { name: "numero", text: "392" },
                { name: "complemento", text: "Sala 59" },
                { name: "municipio", text: "Bento Goncalves" },
                { name: "uf", text: "RS" },
                { name: "cep", text: "95.700-000" },
                { name: "cidade", text: "Cidade Alta" },
              ],
            },
            {
              name: "volumes",
              children: [
                {
                  name: "volume",
                  children: [
                    {
                      name: "servico",
                      text: "SEDEX - CONTRATO",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "itens",
          children: [
            {
              name: "item",
              children: [
                { name: "codigo", text: 1 },
                { name: "descricao", text: "Won deal" },
                { name: "un", text: "Un" },
                { name: "qtde", text: 1 },
                {
                  name: "vlr_unit",
                  text: newOrder.value | 5,
                },
              ],
            },
          ],
        },
        {
          name: "parcelas",
          children: [
            {
              name: "parcela",
              children: [
                {
                  name: "vlr",
                  text: 0,
                  // text: deal.value || 0,
                },
              ],
            },
          ],
        },
      ],
    },
    false
  );
  return xml;
};

const won_deals = async function () {
  const { add_order } = require("../utils/bling.utils");
  try {
    // ***Pega todas as transações com status === won e a qtd de transações
    let won_deals = await filter_won_Deals();
    let added_deals = won_deals.length;

    //Verificação caso não haja nenhuma "deal" disponível
    if (added_deals === 0) return "Nenhuma deal disponível no momento";

    // ***pegar as infos necessárias como titulo, valor e afins
    let created_orders = [];
    let created_orders_errors = [];

    for (const deals of won_deals) {
      //***  steps:

      //*** chama a função assíncrona aqui dentro para converter request json em xml

      //*** add a nova order no bling
      try {
        let newOrder = await add_order(deals);

        //**As deals que foram cadastradas com sucesso e que ainda não haviam sido cadastradas anteriormente
        //**são adicionadas no array

        if (!newOrder.retorno.erros) created_orders.push(newOrder.retorno);
        else created_orders_errors.push(newOrder.retorno.erros[0].erro);
      } catch (error) {
        console.log(error);
      }
    }

    // ***Steps
    // *** pegar tamanho do array, fazer a somatória dos valores salvos das "orders"
    // ***pegar as datas
    // *** salvar no banco

    //um obj com informações das deals que deram certo e as que deram errado, contendo uma mensagem explicando o motivo do erro
    let orders_resume = { created_orders, created_orders_errors };

    return orders_resume;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { xml_request, won_deals };
