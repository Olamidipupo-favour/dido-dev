// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract Dido  {

    address payable owner;

    struct Donation {
        uint256  id;
        address recipient; // person that posted
        string fullname;
        string contact;
        string email;
        string title;
        string description;
        string links; 
        string imagesUrl; 
        uint256 target;
        uint256 raised;
        bool completed;
    } 


    mapping (address => uint256) public donated;
    mapping (uint256 => Donation) public donations;

    // donation mappings for particular donations (ID)
    mapping(uint256 => mapping (address => uint256)) public eachDonated;

    address public topDonor;
    uint256 public topDonorAmount;


    mapping (uint256 => address) public eachTopDonor;
    mapping (uint256 => uint256) public eachTopDonorAmount;

    uint256 public donationsCount = 0;

    event Donate(address from, address to, uint256 amount);


    constructor () {
        owner = payable(msg.sender);
    }

    function generalDonate() public payable {

        donated[msg.sender] += msg.value;
        if(donated[msg.sender] > topDonorAmount){
            topDonor = msg.sender;
            topDonorAmount = donated[msg.sender];
        }

        emit Donate(msg.sender, address(this), msg.value);
    }

    function postDonation( string memory _fullname, string memory _contact, string memory _email, string memory _title, string memory _description,  string memory _links, string memory _imagesUrl, uint256 _target, uint256 _raised) public {
        // create donation  struct
        uint256 Id = donationsCount;
        Donation memory donation = Donation(Id, msg.sender, _fullname, _contact, _email, _title, _description, _links, _imagesUrl, _target, _raised, false);

        // save donation struct
        donations[Id] = donation;

        donationsCount ++;
    }

    function donateAddress(uint _donationId, uint256 realMoney) public payable {

        // recipient can't donate to himself.
        require(msg.sender != donations[_donationId].recipient, "Recipient of donation can not donate to himself");
        require(realMoney < msg.value, "A fee must be added");
        
        payable(donations[_donationId].recipient).transfer(realMoney);

        // save to general
        donated[msg.sender] += realMoney;
        if(donated[msg.sender] > topDonorAmount){
            topDonor = msg.sender;
            topDonorAmount = donated[msg.sender];
        }

        //save to each
        eachDonated[_donationId][msg.sender] += realMoney;
        if(eachDonated[_donationId][msg.sender] > eachTopDonorAmount[_donationId]){
            eachTopDonor[_donationId] = msg.sender;
            eachTopDonorAmount[_donationId] = eachDonated[_donationId][msg.sender];
        }
        //add to amount raised]
        donations[_donationId].raised += realMoney;

        if(donations[_donationId].raised >= donations[_donationId].target){
            donations[_donationId].completed = true;
        }   

        emit Donate(msg.sender, donations[_donationId].recipient, realMoney);

    }

    function approveRequestEth(address _recipientAddress, uint256 _amount) public {
        require(msg.sender == owner, "Only deployer can call approve request ETH");
        require(address(this).balance > _amount, "Insufficient balance");
        payable(_recipientAddress).transfer(_amount);
            
    }    
}