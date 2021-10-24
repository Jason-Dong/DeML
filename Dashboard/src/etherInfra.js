import { ethers } from "ethers";
import { abi } from "assets/abi"

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


const getContract = () => {
  return contract;
}


const setContract = (address) => {
  console.log(abi);
  contract = new ethers.Contract(address, abi, getSigner())
  return true;
}


const getDatasetLink = async () => {
  const link = await contract.dataset_link.call()
  if (link) {
    return link
  }
  return null
}


 const uploadModel = (modelBytestring) => {
   console.log("HERE!!!")
   contract.submitModel(modelBytestring).then(
       (resp) => console.log(resp)
   ).catch(
           (err) => new Error(err.message)

   )
 }


export {setupProvider, getProvider, getSigner, getContract, setContract, getDatasetLink, uploadModel}
