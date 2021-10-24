from web3 import Web3, exceptions
import requests
import pandas as pd
from io import StringIO

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
        try:
            self.contract.functions.minerGuess(model_bytes, accuracy).call()
        except exceptions.SolidityError as error:
            raise error

    
    def get_dataset(self):
        dataset_link = self.contract.functions.dataset_link().call()
        df = pd.read_csv(dataset_link)
        # Assume labels always stored in first column
        inputs, targets = df.iloc[:, 1:], df.iloc[:, :1]
        return inputs, targets


    def get_jobs(self):
        try:
            return self.contract.functions.getModels().call()
        except exceptions.SolidityError:
            return None
