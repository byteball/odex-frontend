import React from 'react';
import { shallow } from 'enzyme';
import DepositForm from './DepositForm';
import { mockAddress, mockTokens } from '../../mockData';


describe('Rendering', () => {
  it('renders without crashing', () => {
    shallow(
      <DepositForm
        step="waiting"
        balances={{ ETH: '1000 ' }}
        address={mockAddress}
        tokens={mockTokens}
        queryBalances={jest.fn()}
        subscribeBalance={jest.fn()}
        confirmTokenDeposit={jest.fn()}
      />
    );
  });
});

describe('Component methods', () => {
  let wrapper, instance;
  let queryBalances = jest.fn();
  let unsubscribe = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <DepositForm
        step="waiting"
        balances={{ ETH: '1000 ' }}
        address={mockAddress}
        tokens={mockTokens}
        queryBalances={queryBalances}
      />
    );

    instance = wrapper.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls queryBalances and subscribe on mount', () => {
    expect(queryBalances).toHaveBeenCalled();
  });

  it('unsubscribes on unmount', () => {
    wrapper.unmount();
  });

  it('unsubscribes before subscribing to new balance', () => {

  });

  it('handlesChangeToken sets state correctly', () => {
    instance.handleChangeToken(mockTokens[2]);
    expect(wrapper.state('inputToken')).toEqual(mockTokens[2]);
  });


  it('handleSubmitChangeToken sets token correctly', () => {
    wrapper.setState({ inputToken: mockTokens[2] });
    instance.handleSubmitChangeToken();

    expect(wrapper.state('token')).toEqual(mockTokens[2]);
    // Currently we are subscribing to anything and keeping the original subscriptions
    // expect(subscribeBalance).toHaveBeenCalledWith(mockTokens[2]);
    // expect(unsubscribe).toHaveBeenCalledTimes(1);
  });


});
