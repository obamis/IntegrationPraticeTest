# Integração entre as plataformas Bling e Pipedrive

Construindo uma API RESTful usando
NodeJS.

## 🚀 Começando

Endpoints:
### POST /addDeal
Permite cria uma deal no Pipedrive
Para funcionar é necessário que seja enviado no body da requisição 
 Exemplo: <br>
{
  "title":"Dunder MIfflin",
	"org_id":"45",
	"value":"586.00",
	"status":"won"
	
}
<br> <br>

### PUT /dealUpdate
Permite alterar o algum dado da dela criada, incluindo o status, para que a mesma possa ser processada.
  Os campos "id" e "title" são obrigatórios
  Exemplo: <br>
{	"id":"26",
	"title":"Siri Cascudo",
	"status":"won"
}


Os demais endpoints: /wonDeals, /deals, /integrate, /save, /sort, /getOrders

<br>

### GET/getOrders : Retorna todas as orders		

### GET/wonDeals : Retorna as deals com status won

### GET/deals : Retorna todas as deals

### GET/integrate : Ao acessar o endpoint, são geradas orders na plataforma  da Bling a partir das Deals disponíveis

### GET/save : Registra em banco

### GET/sort : Retorna as transações do banco ordenadas por data e valor total

## A api se encontra disponível em : <br> https://praticeintegration.herokuapp.com <br> Sendo necessário apenas o uso do insomnia ou postman para a realização dos testes<br>



<br><br>
![hi](https://user-images.githubusercontent.com/56206316/135991701-0b9080a9-c1d8-4bb6-81a4-bf21105f48a4.jpeg)
