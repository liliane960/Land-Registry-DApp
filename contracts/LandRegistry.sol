// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LandRegistry is Ownable {
    struct Land {
        string location;
        uint256 size;
        address owner;
        bool isRegistered;
    }

    mapping(uint256 => Land) public lands;
    uint256 public totalLands;

    event LandRegistered(uint256 indexed landId, string location, uint256 size, address owner);
    event OwnershipTransferred(uint256 indexed landId, address indexed previousOwner, address indexed newOwner);
    event OwnershipRenounced(address indexed previousOwner); // Event for ownership renouncement

    // Updated constructor for OpenZeppelin Ownable v5+
    constructor() Ownable(msg.sender) {}

    function registerLand(
        uint256 _landId,
        string memory _location,
        uint256 _size,
        address _owner
    ) public onlyOwner {
        require(!lands[_landId].isRegistered, "Land already registered");
        require(_owner != address(0), "Invalid owner address");

        lands[_landId] = Land({
            location: _location,
            size: _size,
            owner: _owner,
            isRegistered: true
        });

        totalLands++;
        emit LandRegistered(_landId, _location, _size, _owner);
    }

    function transferLandOwnership(uint256 _landId, address _newOwner) public onlyOwner {
        require(lands[_landId].isRegistered, "Land not registered");
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != lands[_landId].owner, "New owner must be different from current owner");

        address previousOwner = lands[_landId].owner;
        lands[_landId].owner = _newOwner;

        emit OwnershipTransferred(_landId, previousOwner, _newOwner);
    }

    // Function to renounce contract ownership
    function renounceContractOwnership() public onlyOwner {
        address previousOwner = owner();
        _transferOwnership(address(0)); // Transfers ownership to the zero address (renounces ownership)
        emit OwnershipRenounced(previousOwner); // Emit an event for the renouncement
    }

    function getLandDetails(uint256 _landId) public view returns (
        string memory location,
        uint256 size,
        address owner,
        bool isRegistered
    ) {
        Land memory land = lands[_landId];
        return (land.location, land.size, land.owner, land.isRegistered);
    }

    function isLandRegistered(uint256 _landId) public view returns (bool) {
        return lands[_landId].isRegistered;
    }
}
