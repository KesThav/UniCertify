//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract MyCertificates {

    struct MyCerti{
        address uni;
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
        address uni;
    }

    MyCerti[] public certificates;

    MyStudent[] public students;

    struct MyUni {
        address uni;        
        string name;
        bool registered;

    }

    //store all registered adresses
    mapping(address => MyUni) public uniNames;
    address[] addresses;

    function addCert(uint256 _startdate, uint256 _enddate, string memory _fname, string memory _lname, string memory _certName,string memory _studentid, string memory _hash) external {
        certificates.push(MyCerti(msg.sender, _startdate, _enddate, _fname, _lname, _certName,_studentid,_hash));
    }

    function getCert() public view returns(MyCerti[] memory){
        return certificates;
    }

    function getStudents() public view returns(MyStudent[] memory){
        return students;
    }

    function addStudent(string memory _fname, string memory _lname,string memory _studentid) external {
        students.push(MyStudent(_fname,_lname,_studentid,msg.sender));
    }

    function updateUniName(string memory _uniName) external {
        uniNames[msg.sender] = MyUni(msg.sender,_uniName,true);
        uint j = 0;
        for(uint i = 0; i < addresses.length; i++){
            if(addresses[i] == msg.sender){
                j++;
            }
        }
        if(j == 0){
            addresses.push(msg.sender);
        }

    }

    function getUniNames() public view returns(MyUni[] memory){
        MyUni[] memory ret = new MyUni[](addresses.length);
        for (uint i = 0; i < addresses.length;i++) {
            ret[i] = uniNames[addresses[i]];
        }
        return ret;
    }


}