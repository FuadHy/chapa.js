import { Chapa } from "./index.js";

let myChapa = new Chapa("12345");

myChapa
  .initialize({
    amount: "100",
    currency: "ETB",
    email: "abebe@bikila.com",
    first_name: "Abebe",
    last_name: "Bikila",
    tx_ref: "tx-myecommerce12345",
    "customization[title]": "I love e-commerce",
    "customization[description]": "It is time to pay",
  })
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

// myChapa.verify('e3e3e3e3e').then(d => console.log(d)).catch(e => console.log(e))
