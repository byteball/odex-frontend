import { DEFAULT_NETWORK_ID } from '../../../config/environment';
const testnet = DEFAULT_NETWORK_ID === 'testnet';

const obyte = require('obyte');

export const client = new obyte.Client(`wss://obyte.org/bb${testnet ? "-test" : ""}`, {
  testnet,
  reconnect: true
});

export const getAaStateVars = params =>
  new Promise((resolve, reject) => {

    client.api.getAaStateVars(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });

export const getWitnesses = () =>
  new Promise((resolve, reject) => {
    client.api.getWitnesses(function (err, witnesses) {
      if (err) {
        return reject(err);
      }
      resolve(witnesses);
    });
  });

export const getHistory = address =>
  new Promise((resolve, reject) => {
    getWitnesses()
      .then(witnesses => {
        const params = {
          witnesses,
          addresses: [address],
        };
        client.api.getHistory(params, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      })
      .catch(err => reject(err));
  });
