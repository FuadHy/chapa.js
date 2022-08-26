import { config } from "dotenv";
import { Chapa } from "./index.js";

config();

let myChapa = new Chapa(process.env.SECRET_KEY);

let txnReference = "tx-businessname" + Date.now(); // Substitute your business name
myChapa
  .initialize({
    amount: "100",
    currency: "ETB",
    email: "abebe@bikila.com",
    first_name: "Abebe",
    last_name: "Bikila",
    tx_ref: txnReference,
    "customization[title]": "I love e-commerce",
    "customization[description]": "It is time to pay",
  })
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

/* The code below initiated from your callback URL after initializing a transaction */

// myChapa
//   .verify(txnReference)
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));
