import random
import numpy as np
from web3 import exceptions

from minor_api import MinorAPI
from compress import ModelProcess


class Minor:
    def __init__(self, infura_api_key):
        self.infura_api_key = infura_api_key
        random.seed(int(infura_api_key, base=16))

    def connect(self, contract_address, contract_abi):
        try:
            self.minor_api = MinorAPI(self.infura_api_key, contract_address, contract_abi)
            self.inputs, self.targets = self.minor_api.get_dataset()
        except ValueError as error:
            raise error

    def run(self):
        while True:
            jobs = self.minor_api.get_jobs()
            if jobs is not None:
                model_bytes = jobs[1]
                # model_bytes = random.choice(jobs)
                compressor = ModelProcess("TF")
                model = compressor.decompress(model_bytes)
                accuracy = np.sum(model.predict(self.inputs) == self.labels) / len(self.inputs)
                # accuracy = int(random.randrange(0, 100) * 100000)
                print(accuracy)
                try:
                    self.minor_api.send_to_contract(compressor.compress(model), accuracy)
                except exceptions.SolidityError as error:
                    print("Send Failed:", error)
                    continue
                jobs = None
