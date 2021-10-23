import miner_api

class Miner:
    def __init__(self, infura_api_key, contract_address, contract_abi):
        connected = False
        self.miner_api = MinerAPI(infura_api_key)
        self.job = None

        while not connected:
            try:
                self.connect(contract_address, contract_abi)
                connected = True
            except:
                print("Failed to connect")
                connected = False


    def connect(self, contract_address, contract_abi):
        return self.miner_api.connect(contract_address, contract_abi)
    

    def run():
        while True:
            if self.job != job:
                job = self.miner_api.get_job()
                self.job = job
                model_bytes = job["bytes_model"]
                compressor = Model("TF")
                model = compressor.decompress(model_bytes)
                X_train, y_train = job["dataset"]
                accuracy = model.accuracy(X_train, y_train)
                self.miner_api.send_to_contract(model, accuracy)

