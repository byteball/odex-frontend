export const sendNewOrderMessage = async signedOrder => {
  if (!window.socket) throw new Error('Socket connection not established')

  let message = JSON.stringify({
    channel: 'orders',
    event: {
      type: 'NEW_ORDER',
      payload: signedOrder
    }
  })

  console.log(message)

  window.socket.send(message)
}

export const sendNewOrderCancelMessage = signedCancel => {
  if (!window.socket) throw new Error('Socket connection not established')

  let message = JSON.stringify({
    channel: 'orders',
    event: {
      type: 'CANCEL_ORDER',
      payload: signedCancel
    }
  })

  console.log(message)

  window.socket.send(message)
}

export const sendAddressMessage = address => {
  if (!window.socket) throw new Error('Socket connection not established')

  let message = JSON.stringify({
    channel: 'orders',
    event: {
      type: 'ADDRESS',
      payload: address
    }
  })

  console.log(message)

  window.socket.send(message)
}
