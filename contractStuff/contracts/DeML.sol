//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DeML {
    string public dataset_link;
    address host;
    uint public registration_time;
    uint public competition_time;
    uint public prize_fund;
    uint public buy_in;
    uint mining_fees;
    uint mining_increment;
    uint byte_limit;
    uint bestPerformance; //Performance as % * 1000 (to 5 digits)
    string bestModel;
    address bestModelMaker;
    mapping(address=> bool) public registration;
    mapping(string=> address) public model_pool_ownership;
    mapping(string=> mapping(address=> uint)) public mining_ledger_guesses;
    mapping(string => address[]) public mining_ledger;


     constructor(string memory _ipfs_link, uint _registration_time, uint _competition_time, uint _byte_limit) payable {
        //require(_registration_time>40320, "Must allow at least one week to register");
        //require(_competition_time>40320, "Must allow at least one week to compete");
        dataset_link = _ipfs_link;
        registration_time = block.timestamp+_registration_time;
        competition_time = registration_time + _competition_time;
        prize_fund = msg.value;
        buy_in = prize_fund/10;
        mining_fees = prize_fund/5;
        prize_fund -= mining_fees;
        byte_limit = _byte_limit;
        host=msg.sender;
    }
    function register() public payable{
      require(msg.value> buy_in);
      require(block.timestamp<registration_time);
      require(registration[msg.sender] == false);
      registration[msg.sender] = true;
    }
    function submitModel(string memory model) public{
      require(block.timestamp>=registration_time);
      require(block.timestamp<competition_time);
      require(registration[msg.sender] == true);
      require(bytes(model).length < byte_limit);
      require(model_pool_ownership[model]==address(0));
      model_pool_ownership[model] = msg.sender;
    }
    function minerGuess(string memory model, uint performance) public payable{
      require(block.timestamp>=registration_time);
      require(block.timestamp<competition_time);
      require(mining_ledger_guesses[model][msg.sender] == 0);
      mining_ledger_guesses[model][msg.sender] = performance;
      mining_ledger[model].push(msg.sender);
      payable(msg.sender).transfer(mining_increment);
      if (mining_ledger[model].length==100) {
        uint total_guesses = 0;
        for(uint i=0;i<mining_ledger[model].length;i++) {
          total_guesses+=mining_ledger_guesses[model][mining_ledger[model][i]];
          delete mining_ledger_guesses[model][mining_ledger[model][i]];
        }
        uint modelPerformance = total_guesses/mining_ledger[model].length;
        if (modelPerformance>bestPerformance) {
          bestPerformance = modelPerformance;
          bestModel = model;
          bestModelMaker = model_pool_ownership[model];

        }
        model_pool_ownership[model] = address(0);
        delete mining_ledger[model];

      }

    }
    function withdraw() public{
      if(bestPerformance > 0) {
        require(msg.sender == bestModelMaker);
      }
      else {
        require(msg.sender == host);
      }
      payable(msg.sender).transfer(address(this).balance);
    }
}
//TODO:
//1. Figure out how to break ties
//2. Enable the whole (1std out will be rejected for miners).
//3. Accept miner collateral, and keep track of pools (maybe)
//4.
