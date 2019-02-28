pragma solidity >0.4.99 <0.6.0;
pragma experimental ABIEncoderV2;
import "./Owned.sol";

contract Roulette is Owned{

    // owner can deploy contract at once;
    uint public deployTime = 0;

    constructor() public{
        ownerAddr = msg.sender;
        deployTime += 1;
    }

    modifier onlyOnce{
        require(deployTime == 0);
        _;
    }

    // candidates
    string[] public userNames;

    // roulette winner
    uint public winner ;

    uint public test = 10;

    mapping(address => uint ) public makeRandomNumberTimes;

    function setUserName(string[] memory _users) public returns(string[] memory){
        for(uint i=0;i<_users.length;i++){
            userNames.push(_users[i]);
        }
        return userNames;
    }

    function getTest() public view returns(uint){
        return test;
    }

    function setTest(uint  _value) public  {
        test = _value;
    }

    function getUserNames() public returns(string[] memory){
        return userNames;
    }

    // NOTE : this function uses blockhash and it is NOT secure !
    function generateRandomNumber() public returns(uint){
        //TODO:テストのためにrequireをコメントアウトしているので戻す事
        // require(makeRandomNumberTimes[msg.sender] == 0,"you already make random number");
        makeRandomNumberTimes[msg.sender]++;

        uint userNumber = userNames.length;
        bytes32 blockhash = blockhash(block.number - 1);
        uint myWinner = uint(blockhash) % (userNumber+1);
        winner = myWinner;
        return winner;
    }

    function getCount(address _address) public returns(uint){
        return makeRandomNumberTimes[msg.sender];
    }

    // return wineer name
    function viewResult() public view returns(string memory){
        return userNames[winner];
    }

    function viewUsers() public view returns(uint){
        return userNames.length;
    }

    function getWinner() public view returns(uint){
        return winner;
    }
}