from miner import Miner

abi = []
address = "0x2B50CCaDEC6899754B243ED139ef53480762a1cd"

if __name__ == "__main__"
    print("Creating Miner")
    my_miner = Miner("f848e446cf67415b9298d593d547936b")
    my_miner.connect(address, abi)
    my_miner.run()
