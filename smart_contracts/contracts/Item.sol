// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ItemRegistry {
    struct Item {
        uint256 id;
        string name;
        uint256 quantity;
    }

    Item[] public items;

    function addItem(string memory _name, uint256 _quantity) public {
        uint256 itemId = items.length;
        items.push(Item(itemId, _name, _quantity));
    }

    function getAllItems() public view returns (Item[] memory) {
        return items;
    }
}
