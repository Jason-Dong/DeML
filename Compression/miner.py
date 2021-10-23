from miner_api import MinerAPI

class Miner:
    def __init__(self, infura_api_key):
        self.infura_api_key = infura_api_key

    def connect(self, contract_address, contract_abi):
        try:
            self.miner_api = MinerAPI(self.infura_api_key, contract_address, contract_abi)
        except ValueError as error:
            raise error
    
    def run():
        while True:
            job = self.miner_api.get_job()
            if job is not None:
                model_bytes = job["bytes_model"]
                compressor = Model("TF")
                model = compressor.decompress(model_bytes)
                X_train, y_train = job["dataset"]
                accuracy = model.accuracy(X_train, y_train)
                try:
                    self.miner_api.send_to_contract(model, accuracy)
                except:
                    continue    
                job = None
