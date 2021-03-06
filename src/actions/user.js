import * as contracts from '../contracts'

import {
  RECEIVE_ACCOUNT,
  RECEIVE_HAS_WEB3,
  RECEIVE_IS_CONNECTED,
  RECEIVE_USER_NOT_AUTHENTICATED,
  RECEIVE_USER_NUM_DID,
  RECEIVE_USER_NUM_ETHER
} from '../constants/actionTypes'

import { setDefaultStatus } from './status'

const receiveAccountAction = account => ({
  type: RECEIVE_ACCOUNT,
  account
})

const receiveHasWeb3 = () => ({
  type: RECEIVE_HAS_WEB3
})

const receiveIsConnected = () => ({
  type: RECEIVE_IS_CONNECTED
})

export const receiveUserNotAuthenticated = () => ({
  type: RECEIVE_USER_NOT_AUTHENTICATED
})

export const receiveAccountNumDID = numDIDOwned => ({
  type: RECEIVE_USER_NUM_DID,
  numDIDOwned
})

export const receiveAccountNumEther = numEther => ({
  type: RECEIVE_USER_NUM_ETHER,
  numEther
})

export const getNumDIDByAddress = async address => {
  const { balances } = await contracts.DIDToken
  return await balances(address)
}

export const selectUserAccountInfo = () => async dispatch => {
  /*global web3 */
  /*eslint no-undef: "error"*/
  const hasWeb3 = web3
  let isConnected = false
  if (hasWeb3) {
    isConnected = web3.isConnected()
    if (isConnected) {
      console.log(`web3: isConnected`)
      const accounts = web3.eth.accounts
      if (accounts && accounts.length) {
        const coinbase = accounts[0]
        dispatch(receiveAccountAction(coinbase))
        let numDIDOwned = await getNumDIDByAddress(coinbase)
        numDIDOwned = numDIDOwned.toString()
        console.log(`coinbase owns: ${coinbase} ${numDIDOwned} DID`)
        dispatch(receiveAccountNumDID(numDIDOwned))
        web3.eth.getBalance(coinbase, (err, numEther) => {
          numEther = web3.fromWei(numEther)
          console.log(`coinbase owns: ${numEther} ether`)
          dispatch(receiveAccountNumEther(numEther.toString()))
        })
      } else {
        console.error(`No accounts found`)
      }
    }
  }
  dispatch(receiveHasWeb3(hasWeb3))
  dispatch(receiveIsConnected(isConnected))
  dispatch(setDefaultStatus())
}
