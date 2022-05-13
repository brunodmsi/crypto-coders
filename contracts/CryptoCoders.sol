pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CryptoCoders is ERC721 {
	string[] public coders;

	constructor() ERC721("CryptoCoders", "CCD") {}

	function mint(string memory coder) public {
		coders.push(coder);
	}
}