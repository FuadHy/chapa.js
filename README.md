# Unofficial Promise based Chapa API library for node js

```bash
$ npm install chapa
```

# Usage

```js
const Chapa = require('chapa')

const myChapa = new Chapa('secret-key')

// intializing transaction
myChapa.initialize({ ...customerInfo }).then(response => {
    console.log(response) // if success json response
}).catch(e => console.log(e)) // catch errors

// async/await
let response = await myChapa.initialize({ ...customerInfo })

// verify transaction

myChapa.verify('txn-reference').then(response => {
    console.log(response) // if success
}).catch(e => console.log(e)) // catch errors

// async/await
let response = await myChapa.verify('txn-reference')
```