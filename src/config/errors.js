export default {
  invalidJSON: 'invalid json response',
  insufficientBuyTokenBalance: 'insufficient buy token balance',
  insufficientSellTokenBalace: 'insufficient sell token balance',
  invalidAddress: 'invalid input argument (arg="_to", reason="invalid address", value=null, version=4.0.4)',
  cannotReadLowerCaseOfUndefined: "Cannot read property 'toLowerCase' of undefined"
}

export const errorMessages = {
  invalidJSON: 'invalid json response',
  insufficientBuyTokenBalance: 'insufficient buy token balance',
  insufficientSellTokenBalace: 'insufficient sell token balance',
  invalidAddressInputArgument: 'invalid input argument (arg="_to", reason="invalid address", value=null, version=4.0.4)',
  invalidValueInputArgument: 'invalid input argument (arg="_value", reason="invalid number value"',
  invalidDecimalValue: 'invalid decimal value (arg="value"',
  cannotReadLowerCaseOfUndefined: "Cannot read property 'toLowerCase' of undefined",
  ioTimeout: 'timeout',
  callException: 'call exception',
  contractNotDeployed: 'contract not deployed'
}


export const parseQueryAccountDataError = (error: Error) => {
  let errorMessage = error.message

  if (errorMessage.includes(errorMessages.invalidJSON)) return 'Could not connect to the server'

  return errorMessage
}

export const parseQueryMarketDataError = (error: Error) => {
  let errorMessage = error.message

  return errorMessage
}





export const parseNewOrderError = (error: Error) => {
  let errorMessage = error.message

  window.errorMessage = errorMessage

  if (errorMessage.includes(errorMessages.invalidJSON)) return 'Connection error'
  if (errorMessage.includes(errorMessages.ioTimeout)) return 'Connection was broken and re-opened. Please try again'


  return errorMessage
}

export const parseCancelOrderError = (error: Error) => {
  let errorMessage = error.message

  if (errorMessage.includes(errorMessages.invalidJSON)) return 'Connection error'
  if (errorMessage.includes(errorMessages.ioTimeout)) return 'Connection was broken and re-opened. Please try again'

  return errorMessage
}

