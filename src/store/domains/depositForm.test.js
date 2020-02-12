import depositFormDomain from './depositForm';
import * as eventCreators from './depositForm';


function getDomain(events) {
  const state = events.reduce((state, event) => event(state), undefined);
  return depositFormDomain(state);
}

it('handles initialized event properly', () => {
  const domain = getDomain([eventCreators.initialized()]);

  expect(domain.getStep()).toEqual('waiting');
});


