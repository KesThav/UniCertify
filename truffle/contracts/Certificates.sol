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

    //address => userRole
    event RoleEvent(string error);

    struct UserRole{
        address user;
        string role;
    }

    //access management
    mapping(address => UserRole) userRoles;
    mapping(string => bool) role;
    string[] roleList;
    
    //-----------------------------------------roles-----------------------------------------
    function createRole(string memory _role) public {
        if(role[_role]==true){
            emit RoleEvent("Role already existed !");
        }else{
            roleList.push(_role);
            role[_role] = true;
            emit RoleEvent("Role created !");
        }
    }

    function getRoles() public view returns(string[] memory){
        return roleList;
    }


    function grantRole(address _user, string memory _role) public{
        if(role[_role]==false){
            emit RoleEvent("Role does not exist!");
        }else{
            userRoles[_user] = UserRole(_user,_role);
            emit RoleEvent("Role granted!");
        }
    }

    function removeRole(address _user, string memory _role) public{
        if(role[_role]==false){
            emit RoleEvent("Role does not exist!");
        }else{
            if(keccak256(abi.encodePacked(userRoles[_user].role)) == keccak256(abi.encodePacked(_role))){
                userRoles[_user] = UserRole(_user,"");
            }else{
                emit RoleEvent("Can not remove undefined role!");
            }
        }
    }

    function getUsersAndRoles() public view returns(UserRole[] memory){
        UserRole[] memory temp = new UserRole[](addresses.length);
        for(uint i = 0; i < addresses.length;i++){
            temp[i] = userRoles[addresses[i]];
        }
        return temp;
    }


    //-----------------------------------------certificates-----------------------------------------
    function addCert(uint256 _startdate, uint256 _enddate, string memory _fname, string memory _lname, string memory _certName,string memory _studentid, string memory _hash) external {
        certificates.push(MyCerti(msg.sender, _startdate, _enddate, _fname, _lname, _certName,_studentid,_hash));
    }

    function getCert() public view returns(MyCerti[] memory){
        return certificates;
    }

    //-----------------------------------------students-----------------------------------------
    function getStudents() public view returns(MyStudent[] memory){
        return students;
    }

    function addStudent(string memory _fname, string memory _lname,string memory _studentid) external {
        students.push(MyStudent(_fname,_lname,_studentid,msg.sender));
    }

    //-----------------------------------------university-----------------------------------------
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
            userRoles[msg.sender] = UserRole(msg.sender,"None");
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