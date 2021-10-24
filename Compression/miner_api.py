from web3 import Web3, exceptions
import requests
import pandas as pd

class MinerAPI:
    def __init__(self, api_key, address, abi):
        # Creates a connection as soon as it's initialized
        self.web3 = Web3(Web3.HTTPProvider(f"https://mainnet.infura.io/v3/{api_key}"))
        if not self.web3.isConnected():
            raise ValueError("Invalid API Key")

        try:
            self.contract = self.web3.eth.contract(address=address, abi=abi)
        except Exception as error:
            raise error


    def send_to_contract(self, accuracy):
        try:
            self.contract.functions.minerGuess().call(accuracy)
        except exceptions.SolidityError as error:
            raise error


    def get_job(self):
        try:
            dataset_link = self.contract.functions.dataset_link().call()
            res = requests.get(dataset_link)
            dataset = pd.read_csv(res.content)
            return {
                "models": self.contract.functions.getModels().call(), 
                "dataset": dataset
            }
        except exceptions.SolidityError:
            return None
