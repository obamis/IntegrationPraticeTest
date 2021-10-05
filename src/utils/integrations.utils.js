const Balance = require("../models/Balance");
const axios = require("axios");
const jsontoxml = require("jsontoxml");
const moment = require("moment");
const { filterWonDeals } = require("../utils/pipedrive.utils");

// convert json to xml
const xml_request = async function (newOrder) {
  const xml = jsontoxml(
    {
      s: [
        {
          name: "cliente",
          children: [
            {
              name: "nome",
              text: newOrder.title || "Dunder Mifflin",
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

//save "deals" on "bling" as "order"
const won_deals = async function () {
  const { registerOrder } = require("../utils/bling.utils");
  try {
    let won_status_orders = await filterWonDeals();
    let added_deals = won_status_orders.length;

    //Check if there is no "deal" available
    if (added_deals === 0) return "No deals currently available";

    let created_orders = [];
    let error_created_orders = [];

    for (const deals of won_status_orders) {
      try {
        let newOrder = await registerOrder(deals);

        if (!newOrder) {
          error_created_orders.push(newOrder);
          continue;
        } else {
          created_orders.push(newOrder);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (created_orders.length === 0)
      created_orders = "No new orders to be added";
    return created_orders;
  } catch (error) {
    console.log(error);
  }
};

const save_orders = async function (orders) {
  try {
    const { getOrders } = require("../utils/bling.utils");
    let won_orders = await getOrders();

    let data = [];
    for (const order of won_orders) {
      let idPedido = parseInt(order.pedido.numero);
      let order_date = moment(order.pedido.data).toDate();
      let amount = order.pedido.totalprodutos;
      let orgName = order.pedido.cliente.nome;

      // check if it already exists in the database before saving
      let check = await check_before_save(idPedido);

      if (!check) {
        let created_data = await Balance.create({
          idPedido,
          order_date,
          amount,
          orgName,
        });

        data.push(created_data);
      } else {
        console.log("These data are already saved");
        continue;
      }
    }
    if (data.length === 0) return "These data are already saved";
    return data;
  } catch (error) {
    console.log(error);
  }
};

const sort_by_date_value = async function () {
  try {
    const orders_sort = await Balance.aggregate([
      {
        $sort: {
          amount: -1,
          idPedido: 1,
        },
      },
      {
        $project: {
          idPedido: "$idPedido",
          amount: "$amount",
          orgName: "$orgName",
          order_date: {
            $dateToString: { format: "%d/%m/%Y", date: "$order_date" },
          },
        },
      },
      {
        $group: {
          _id: "$order_date",
          orders: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    return orders_sort;
  } catch (error) {
    console.log(error);
  }
};

const check_before_save = async function (idPedido) {
  try {
    let query_idPedido = await Balance.findOne({
      idPedido: idPedido,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => console.log(error));

    return query_idPedido;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  xml_request,
  won_deals,
  save_orders,
  check_before_save,
  sort_by_date_value,
};
