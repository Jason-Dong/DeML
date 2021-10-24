import random
import numpy as np
import tensorflow as tf
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
            inputs, targets = self.minor_api.get_dataset()
            # self.dataset = tf.data.Dataset.from_tensor_slices(
            #     (
            #         tf.cast(inputs, tf.int32),
            #         tf.cast(targets, tf.int32)
            #     )
            # )
            self.inputs = tf.convert_to_tensor(inputs.to_numpy())
            self.targets = tf.convert_to_tensor(targets.to_numpy())
        except ValueError as error:
            raise error

    def run(self):
        while True:
            jobs = self.minor_api.get_jobs()
            if jobs is not None:
                # model_bytes = jobs[0]
                model_bytes = bytes(b'\xab\xcd')
                print(model_bytes)
                # model_bytes = random.choice(jobs)
                # compressor = ModelProcess("TF")
                # model = compressor.decompress(model_bytes)
                # model.compile(
                #     optimizer=tf.keras.optimizers.RMSprop(),  # Optimizer
                #     # Loss function to minimize
                #     loss=tf.keras.losses.SparseCategoricalCrossentropy(),
                #     # List of metrics to monitor
                #     metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
                # )
                # # print(tf.transpose(self.inputs).shape)
                # # print(tf.transpose(self.targets).shape)
                # accuracy = model.evaluate(self.dataset) * 100000
                accuracy = int(random.randrange(0, 100) * 100000)
                print(accuracy)
                try:
                    self.minor_api.send_to_contract(model_bytes, accuracy)
                except exceptions.SolidityError as error:
                    print("Send Failed:", error)
                    continue
                jobs = None
