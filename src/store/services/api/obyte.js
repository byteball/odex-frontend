import { ENGINE_WS_URL } from '../../../config/urls';

const obyte = require('obyte');

const client = new obyte.Client(`${ENGINE_WS_URL}/bb`);

export const getAaStateVars = address =>
  new Promise((resolve, reject) => {
    const params = {
      address,
    };

    client.api.getAaStateVars(params, function (err, result) {
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
