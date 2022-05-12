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
        string studentid;
        string hash;
    }

    struct MyStudent {
        string fname;
        string lname;
        string studentid;
        address sender;
    }

    MyCerti[] public certificates;

    MyStudent[] public students;

    function addCert(uint256 _startdate, uint256 _enddate, string memory _fname, string memory _lname, string memory _certName,string memory _studentid, string memory _hash) external {
        certificates.push(MyCerti(msg.sender, _startdate, _enddate, _fname, _lname, _certName,_studentid,_hash));
    }

    function getCert() public view returns(MyCerti[] memory){
        return certificates;
    }

    function getStudent() public view returns(MyStudent[] memory){
        return students;
    }

    function addStudent(string memory _fname, string memory _lname,string memory _studentid) external {
        students.push(MyStudent(_fname,_lname,_studentid,msg.sender));
    }


}