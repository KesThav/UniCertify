//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;


contract MyContract {

    uint256 a;

    struct MyArray{
        string name;
        string surname;
    }

    MyArray[] public arr;


    function addData(string memory _name, string memory _surname) public {
        arr.push(MyArray(_name,_surname));
    }

    function getData() public view returns(MyArray[] memory){
        return arr;
    }

}