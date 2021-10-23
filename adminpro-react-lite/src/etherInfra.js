import { ethers } from "ethers";
var provider = null;
var signer = null;
var contract = null;
const setupProvider = async () => {
  const result =  await window.ethereum.enable();
  if (result) {

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
  return result;
  };
const getProvider = ()=> {
  return provider;
}
const getSigner = ()=> {
  return signer;
}
const getContract = (address) => {
 // get contract from address
 return true;
}
export {setupProvider, getProvider, getSigner, getContract}
