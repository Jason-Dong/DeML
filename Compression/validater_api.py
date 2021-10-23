from web3 import Web3


_INFURA_API_KEY = ""
INFURA_URL = f"https://mainnet.infura.io/v3/{_INFURA_API_KEY}"

web3 = Web3(Web3.HTTPProvider(INFURA_URL))


def connect_to_contract(address, abi):
    # Assumes no errors occur
    return web3.eth.contract(address=address, abi=abi)


def send_to_contract(contract, validater_address, accuracy):
    # Assumes no errors occur
    contract.functions.submit().call(validater_address, accuracy)


def get_job(contract):
    # Assumes no errors occur
    return contract.functions.get().call()
