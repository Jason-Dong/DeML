from web3 import Web3, exceptions
import requests
import pandas as pd

NONCE = 300
class MinorAPI:
    def __init__(self, api_key, address, abi):
        # Creates a connection as soon as it's initialized
        self.web3 = Web3(Web3.HTTPProvider("https://ropsten.infura.io/v3/" + str(api_key)))
        if not self.web3.isConnected():
            raise ValueError("Invalid API Key")

        try:
            self.contract = self.web3.eth.contract(address=address, abi=abi)
        except Exception as error:
            raise error


    def send_to_contract(self, model_bytes, accuracy):
        global NONCE
        try:
            transaction = self.contract.functions.minerGuess(model_bytes, accuracy).buildTransaction({'chainId': 3, 'gas': 70000,'maxFeePerGas': self.web3.toWei('2', 'gwei'),'maxPriorityFeePerGas': self.web3.toWei('1', 'gwei'),'nonce':NONCE})
            NONCE+=1
            private_key = '0x8108314f2f8d55fd5d9a89bb64c8d239e95ad0f7cf74a641ce21e0bce5984e99'
            signed_txn = self.web3.eth.account.sign_transaction(transaction, private_key=private_key)
            self.web3.eth.send_raw_transaction(signed_txn.rawTransaction)  
        except exceptions.SolidityError as error:
            raise error

    
    def get_dataset(self):
        dataset_link = self.contract.functions.dataset_link().call()
        df = pd.read_csv(dataset_link)
        # Assume labels always stored in first column
        inputs, targets = df.iloc[:, 2:], df.iloc[:, 1:2]
        return inputs, targets


    def get_jobs(self):
        try:
            return self.contract.functions.getModels().call()
        except exceptions.SolidityError:
            return None
