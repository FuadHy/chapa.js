/**
 * Unofficial node.js library for Chapa API
 */

 const fetch = require('node-fetch')
 const BASE_URL = 'https://api.chapa.co/v1'
 const INTIALIZE_PATH = '/transaction/initialize'
 const VERIFY_PATH = '/transaction/verify/'
 
 function Chapa(secret_key){
     this.secret_key = secret_key
 }
 
 /**
  * 
  * @param {object} data customer information, refer: https://developer.chapa.co/docs/accept-payments/
  *
  * @returns Promise
  */
 Chapa.prototype.initialize = function(data){
     var required_fields = [
         'amount', 'currency',
         'email', 'first_name',
         'last_name', 'tx_ref',
     ]
     required_fields.forEach(field => {
         if(!data[field]) throw new Error('field: ' + field + ' is required!')
     })
 
     return new Promise((resolve, reject) => {
         fetch(BASE_URL + INTIALIZE_PATH, {
             method: 'post',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + this.secret_key
             },
             body: JSON.stringify(data)
         }).then(async response => {
             if(response.status != 200) return reject(await response.json())
             resolve(await response.json())
         }).catch(e => reject(e))
     })
 }
 
 /**
  * 
  * @param {string} txnRef transaction reference, refer https://developer.chapa.co/docs/verify-payments/
  * @returns Promise
  */
 Chapa.prototype.verify = function(txnRef){
     if(!txnRef) throw new Error('Transaction reference is required!')
     return new Promise((resolve, reject) => {
         fetch(BASE_URL + VERIFY_PATH + txnRef, {
             method: 'get',
             headers: {
                 'Content-Type': 'application/json'
             }
         }).then(async response => {
             if(response.status != 200) return reject(await response.json())
             resolve(await response.json())
         }).catch(e => reject(e))
     })
 }
 
 module.exports = Chapa