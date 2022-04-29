//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract MyCertificates {

    struct MyCerti{
        address sender;
        uint256 startdate;
        uint256 enddate;
        string fname;
        string lname;
        string certName;
        string hash;
}

    MyCerti[] public certificates;


    function addCert(uint256 _startdate, uint256 _enddate, string memory _fname, string memory _lname, string memory _certName, string memory _hash) external {
        certificates.push(MyCerti(msg.sender, _startdate, _enddate, _fname, _lname, _certName, _hash));
    }

    function getCert() public view returns(MyCerti[] memory){
        return certificates;
    }


}