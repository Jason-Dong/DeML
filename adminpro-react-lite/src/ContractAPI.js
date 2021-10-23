import { ethers } from "ethers";
import {setupProvider, getProvider, getSigner} from "etherInfra"


class ContractAPI {
    constructor(abi, address) {
        setupProvider()
        this.contract = new ethers.Contract(address, abi, getSigner())
    }

    getDatasetLink() {
        return this.contract.dataset_link
    }

    uploadModel(modelBytestring) {
        return this.contract.submitModel(modelBytestring).then(
            () => "Success"
        ).catch(
            (err) => new Error(err.message)
        )
    }
}