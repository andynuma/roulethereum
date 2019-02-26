pragma solidity >0.4.99 <0.6.0;

contract Owned {
    address public ownerAddr;

    modifier onlyOwner(){
        require(msg.sender == ownerAddr);
        _;
    }

    //ownerAddrを設定
    constructor() public{
        ownerAddr = msg.sender;
    }

    function transferOwnership(address _newOwner) public onlyOwner{
        // Only the current owner can set a new ownerAddr:
        require(msg.sender == ownerAddr);

        // The new address cannot be null:
        require(_newOwner != address(0));

        ownerAddr = _newOwner;
    }
}