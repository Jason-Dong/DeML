class Miner:
    def __init__(self):
        self.job = None
        x = True
        while x:
            try:
                self.connect()
                x = False
            except:
                print("Failed to connect")
                x = True


    def connect(self:
        self.address = miner_api.connect_to_smart_contract()
    
    def run():
        while True:
            if self.job != job:
                self.job = job
                job = miner_api.get_job()
                model_bytes = job["bytes_model"]
                compressor = Model("TF")
                model = compressor.decompress(model_bytes)
                X_train, y_train = job["dataset"]
                accuracy = model.accuracy(X_train, y_train)
                miner_api.send_to_contract(self.address, accuracy)


    
    def connect(selff)