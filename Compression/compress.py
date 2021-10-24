import numpy as np
import math
from io import BytesIO
import dill,base64,tempfile
from joblib import load
from tensorflow.keras.models import model_from_json
import tensorflow as tf
import torch
import zlib
import sys

# for testing

# returns basic tensorflow model
def tensorflow_basic_model():
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.Dense(2, activation = tf.nn.softmax))
    model.add(tf.keras.layers.Dense(2, activation = tf.nn.relu))
    model.add(tf.keras.layers.Dense(1))
    model.build((None, 2, 1))
    model.compile(optimizer="rmsprop", loss="mse")
    #model.fit()
    return model

# returns basic pytorch model
def pytorch_basic_model():
    #model = torch.nn.Sequential()
    #conv1 = torch.nn.Conv2d(1,15,5)
    #conv2 = torch.nn.Conv2d(15, 15, 5)
    #model = torch.nn.functional(conv1())
    #return torch.nn.functional.relu(conv2(model))
    model = torch.nn.Sequential(torch.nn.Linear(2, 2), torch.nn.Linear(2, 2))
    return model

class ModelProcess:

    # consider pruning model for them

    def __init__(self, type_):
        '''
        Args:
        type_ : Type of model, TF or TORCH
        '''
        self.type = type_
        if type_ not in ["TORCH", "TF"]:
            raise "Argument type_ is incorrect. Has to be TF or TORCH"
        if type_ == "TORCH":
            import torch
        else:
            import tensorflow

    def compress(self, model):

        def base_64_convert(ObjectFile):
            bytes_container = BytesIO()
            dill.dump(ObjectFile, bytes_container)
            bytes_container.seek(0)
            bytes_file = bytes_container.read()
            base64File = base64.b64encode(bytes_file)
            return base64File

        if self.type == "TF":
            # save tensorflow model as bytes
            model_json = model.to_json()

            model_dict = {
                "model": model_json,
                "weights": model.get_weights()
            }

            model_bytes = base_64_convert(model_dict)
            compressed = zlib.compress(model_bytes)
            return compressed

        elif self.type == "TORCH":
            # save pytorch model as a sequence of bytes

            model_bytes = base_64_convert(model)
            compressed = zlib.compress(model_bytes, 9)
            return compressed

    # PRIMARILY FOR THE MINER
    def decompress(self, compressed_bytes_string):

        def base_64_invert(base64_File):
            loaded_binary = base64.b64decode(base64_File)
            loaded_object = tempfile.TemporaryFile()
            loaded_object.write(loaded_binary)
            loaded_object.seek(0)
            ObjectFile = load(loaded_object)
            loaded_object.close()
            return ObjectFile

        if self.type == "TF":
            # open tensorflow model as model
            uncompressed_bytes = zlib.decompress(compressed_bytes_string)
            model_dict_json = base_64_invert(uncompressed_bytes)
            model = model_from_json(model_dict_json["model"])
            model.set_weights(model_dict_json["weights"])
            return model

        elif self.type == "TORCH":
            # open pytorch model as a model
            uncompressed_bytes = zlib.decompress(compressed_bytes_string)
            model = base_64_invert(uncompressed_bytes)
            return model


if __name__ == "__main__":
    print("Running model compression test")
    #model = tensorflow_basic_model()
    model = tensorflow_basic_model()
    #compressor = ModelProcess("TF")
    compressor = ModelProcess("TF")
    compressed = compressor.compress(model)
    print(compressed)
    f = open('out', 'wb')
    f.write(compressed)
    f.close()
    print("Now compressed completely and decompressing it")
    with open('out', 'rb') as f:
        bytes_ = f.read()
    model = compressor.decompress(bytes_)
    model.summary()
