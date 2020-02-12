//@flow
import type { DepositFormEvent, DepositFormState } from '../../types/depositForm';

const initialState = {
  step: 'waiting',
};

export const initialized = (): DepositFormEvent => {
  const event = (state: DepositFormState = initialState) => state;
  return event;
};

export const deposited = (): DepositFormEvent => {
  const event = (state: DepositFormState) => ({
    ...state,
    step: 'convert',
  });
  return event;
};

export const confirmed = (): DepositFormEvent => {
  const event = (state: DepositFormState) => ({
    ...state,
    step: 'confirm',
  });

  return event;
};


export default function depositFormDomain(state: DepositFormState) {
  return {
    getStep() {
      return state.step;
    },
  };
}
