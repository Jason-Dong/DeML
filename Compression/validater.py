import miner_api


class Validater:
    def __init__(self, contract_address, contract_abi):
        connected = False
        self.job = None
        self.address = 12345
        self.contract_address = contract_address
        self.contract_abi = contract_abi
        while not connected:
            try:
                self.contract = self.connect()
                connected = True
            except:
                print("Failed to connect")
                connected = False


    def connect(self):
        return validater_api.connect_to_contract(self.contract_address, self.contract_abi)
    

    def run():
        if not self.contract:
            raise Exception()

        while True:
            if self.job != job:
                job = validater_api.get_job(self.contract)
                self.job = job
                model_bytes = job["bytes_model"]
                compressor = Model("TF")
                model = compressor.decompress(model_bytes)
                X_train, y_train = job["dataset"]
                accuracy = model.accuracy(X_train, y_train)
                validater_api.send_to_contract(self.contract, self.address, accuracy)

