import { ethers } from "ethers";
var provider = null;
var signer = null;
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
export {setupProvider, getProvider, getSigner}
