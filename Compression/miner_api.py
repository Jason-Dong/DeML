from web3 import Web3

# TODO: Handle exceptions when interacting with a node

class MinerAPI:
    def __init__(self, api_key):
        self.web3 = Web3(Web3.HTTPProvider(f"https://mainnet.infura.io/v3/{api_key}"))
    
    
    def connect(self, address, abi):
        self.contract = self.web3.eth.contract(address=address, abi=abi)


    def send_to_contract(self, accuracy):
        self.contract.functions.minerGuess().call(accuracy)


    def get_job(self):
        return self.contract.functions.get().call()
