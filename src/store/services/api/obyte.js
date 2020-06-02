import { ENGINE_WS_URL } from '../../../config/urls';

const obyte = require('obyte');

const client = new obyte.Client(`${ENGINE_WS_URL}/bb`);

export const getAaStateVars = address =>
  new Promise((resolve, reject) => {
    const params = {
      address,
    };

    client.api.getAaStateVars(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
