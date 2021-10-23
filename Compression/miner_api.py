from web3 import Web3, exceptions

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
            return self.contract.functions.get().call()
        except exceptions.SolidityError:
            return None
