import createStore from '../../store/configureStore';
import getTransferTokensFormSelector from './transferTokensForm';
import * as actionCreators from './transferTokensForm';

import * as services from '../services/index.js'



let selector;


beforeEach(() => {
  jest.resetAllMocks();
  services.mixpanel = { track: jest.fn() }
});

describe('transferTokensForm', () => {




  it('handles sendTransferTokens (throwing an error) correctly', async () => {

  });

})