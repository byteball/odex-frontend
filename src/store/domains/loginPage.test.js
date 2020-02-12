import getLoginPageDomain from './loginPage';
import * as eventCreators from './loginPage';

function getDomain(events) {
  const state = events.reduce((state, event) => event(state), undefined);
  return getLoginPageDomain(state);
}

it('handles initialized event', () => {
  const domain = getDomain([eventCreators.initialized()]);
  expect(domain.loading).toEqual(false);
  expect(domain.error).toEqual('');
});

it('handles loginRequested event', () => {
  const domain = getDomain([eventCreators.initialized(), eventCreators.loginRequested()]);

  expect(domain.loading).toEqual(true);
  expect(domain.error).toEqual('');
});

it('handles loginFailed event', () => {
  const domain = getDomain([eventCreators.initialized(), eventCreators.loginFailed('Metamask not found')]);

  expect(domain.loading).toEqual(false);
  expect(domain.error).toEqual('Metamask not found');
});

it('handles authenticated event properly', () => {
  const domain = getDomain([eventCreators.initialized(), eventCreators.authenticated()]);

  expect(domain.loading).toEqual(false);
  expect(domain.error).toEqual('');
});
