# Landlord API

> This is a mongo API that allous to create, get, update and delete data of payments for a landlord

## Architecture

> REST API created with node, typescript and mongodb to handle data for payments
> Endpoints:

> - GET /payments -> get all payments
> - GET /payments/:contractId -> get all payments for an specific contract
> - POST /payments -> create a new payment, please provide in the body the values {contractId: number, description: string, value: number, time: date}
> - PUT /payments/:paymentId -> update a payment with the given paymentId , please provide the updated data described above
> - DELETE /payments/:paymentId -> deletes a payment with the given paymentId

## Libraries

> - node
> - typescript
> - mongodb

## How to run

> Please before run the app, take into account to have a mongodb where the app can be connected (configure it in the .env file or have equivalent env variables in your system)

> 1. `npm run build`
> 2. `npm start`

> This this serve the API server in the specified port (the the .env file), by default 8080 on your machine.
> You can start making request to the endpoint "http://localhost:8080/payments"

## Deployment

> The API is deployed in heroku, please use this endpoint [https://propietario.herokuapp.com/payments](https://propietario.herokuapp.com/payments)

## Author

> Jorge Ramirez
