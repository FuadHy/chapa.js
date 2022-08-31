/**
 * Unofficial node.js library for Chapa API
 */

import fetch from "node-fetch";

const BASE_URL = "https://api.chapa.co/v1/transaction";

export class Chapa {
  constructor(secret_key) {
    this.secret_key = secret_key;
  }
  /**
   *
   * @param {object} data customer information, refer: https://developer.chapa.co/docs/accept-payments/
   *
   * @returns Promise
   */
  initialize(data) {
    let required_fields = [
      "amount",
      "currency",
      "email",
      "first_name",
      "last_name",
      "tx_ref",
    ];

    let errors = [];

    required_fields.forEach((field) => {
      if (!data[field]) errors.push(field + " is required!");
    });

    if (errors.length > 0) {
      throw new Error(JSON.stringify({ Error: errors }));
    }

    return new Promise((resolve, reject) => {
      fetch(BASE_URL + "/initialize", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.secret_key,
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.status != 200) return reject(await response.json());
          resolve(await response.json());
        })
        .catch((e) => reject(e));
    });
  }

  /**
   *
   * @param {string} txnRef transaction reference, refer https://developer.chapa.co/docs/verify-payments/
   * @returns Promise
   */
  verify(txnRef) {
    if (!txnRef) throw new Error("Transaction reference is required!");
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + "/verify/" + txnRef, {
        method: "get",
        headers: {
          Authorization: "Bearer " + this.secret_key,
        },
      })
        .then(async (response) => {
          if (response.status != 200) return reject(await response.json());
          resolve(await response.json());
        })
        .catch((e) => reject(e));
    });
  }
}
