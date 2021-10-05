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

### GET /dealUpdate
Permite alterar o algum dado da dela criada, incluindo o status, para que a mesma possa ser processada.
  Os campos "id" e "title" são obrigatórios
  Exemplo: <br>
{
	"id":"26",
	"title":"Siri Cascudo",
	"status":"won"
}
![hi](https://user-images.githubusercontent.com/56206316/135991701-0b9080a9-c1d8-4bb6-81a4-bf21105f48a4.jpeg)
