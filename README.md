# DeML -- Decentralized Machine Learning

**Award-winning project at [CalHacks](https://calhacks.io), the world's largest collegiate hackathon**

DeML is a blockchain-based platform for trustless, decentralized machine learning competitions. Participants submit trained models to an Ethereum smart contract, where a distributed network of miners independently evaluates each model against a shared dataset. Miner evaluations are aggregated on-chain to determine the winning model, and prize funds are distributed automatically -- no central authority required.

## Architecture

```
                        +---------------------+
                        |   Ethereum Network  |
                        |   (Smart Contract)  |
                        |                     |
                        |  - Registration     |
                        |  - Model storage    |
                        |  - Miner consensus  |
                        |  - Prize payout     |
                        +---------+-----------+
                                  |
                  +---------------+---------------+
                  |                               |
        +---------+---------+           +---------+---------+
        |  React Dashboard  |           |   Miner Network   |
        |                   |           |                   |
        |  - MetaMask auth  |           |  - Fetch models   |
        |  - Model upload   |           |  - Decompress     |
        |  - Leaderboard    |           |  - Evaluate       |
        |  - Data viewer    |           |  - Submit scores  |
        +-------------------+           +-------------------+
```

The system has three components:

**Smart Contract (Solidity)** -- Manages the full competition lifecycle: participant registration with buy-in, model submission within a time window, miner evaluation aggregation (consensus from 100 independent evaluations per model), and automated prize distribution to the best-performing model's author.

**Miner Network (Python)** -- Distributed workers that connect to the contract via Web3, retrieve submitted models, decompress them, evaluate accuracy against the on-chain dataset, and submit performance scores back to the contract. Each model requires 100 independent miner evaluations before a consensus score is finalized.

**Dashboard (React)** -- Web interface with MetaMask wallet integration for participants to upload compressed models, view the live leaderboard, and inspect the competition dataset.

## Key Technical Details

### Model Compression Pipeline

ML models must fit within the smart contract's byte limit. The compression pipeline supports both TensorFlow and PyTorch:

1. **Serialization** -- TensorFlow models are split into JSON architecture + weight arrays; PyTorch models are serialized directly via `dill`
2. **Encoding** -- Serialized output is base64-encoded
3. **Compression** -- zlib compression (level 9 for PyTorch) reduces the payload for on-chain storage

Miners reverse this process to reconstruct and evaluate models locally.

### Decentralized Consensus

Rather than trusting a single evaluator, DeML aggregates 100 independent miner evaluations per model. Each miner:
- Downloads the model from the contract
- Decompresses and reconstructs it
- Evaluates it against the shared dataset (stored via IPFS)
- Submits an accuracy score to the contract

The contract averages all 100 scores to produce a final performance metric (stored as percentage * 1000 for 5-digit precision). The model with the highest consensus score wins.

### Economic Incentives

- **Participants** pay a buy-in fee (10% of the prize fund) to register
- **Miners** receive incremental payments from a mining fee pool (20% of the prize fund) for each evaluation submitted
- **Winners** withdraw the remaining prize pool via the smart contract

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Smart Contract | Solidity, Hardhat, ethers.js |
| ML / Miners | Python, TensorFlow, PyTorch, scikit-learn, Web3.py |
| Compression | dill, zlib, base64 |
| Frontend | React, Reactstrap, Chart.js, ethers.js, MetaMask |
| Data | MNIST (CSV), IPFS |

## Project Structure

```
DeML/
  contractStuff/
    contracts/DeML.sol    # Core smart contract -- competition lifecycle + miner consensus
    test/                 # Contract tests (Hardhat/Waffle)
  Compression/
    compress.py           # Model serialization & compression (TF + PyTorch)
    minor.py              # Miner worker -- fetches, evaluates, and scores models
    minor_api.py          # Web3 interface for miner-contract interaction
  Dashboard/
    src/
      etherInfra.js       # Ethereum provider + contract abstraction layer
      components/         # Leaderboard, submission history charts, data viewer
      views/              # Model upload interface, dataset explorer
```

## Team

Built in 24 hours at CalHacks by UC Berkeley students:

- **Vincent Wang** ([@v-wangg](https://github.com/v-wangg))
- **Jason Dong** ([@Jason-Dong](https://github.com/Jason-Dong))
- **Rishabh Krishnan**
- **Tejvir Jogani**
