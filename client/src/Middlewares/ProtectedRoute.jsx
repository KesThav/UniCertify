import React from 'react'
import Register from '../Components/Register'

const ProtectedRoute = ({access,children}) => {
    if(access && access){
        return children
    }else{
        return <Register />
    }
}

export default ProtectedRoute