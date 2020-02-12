// @flow

type TransferTokensFormState = {
}

const initialState: TransferTokensFormState = {
};

export const initialized = () => {
  const event = (state: TransferTokensFormState = initialState) => state;
  return event;
};



export default function transferTokensFormDomain(state: TransferTokensFormState) {
  return {
    getState: () => state,
  };
}
