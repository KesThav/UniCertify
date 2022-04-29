import React,{useContext, useEffect, useState} from 'react'
import { ContextAPI } from '../Middlewares/ContextAPI';
import Card from '../Components/Card'

const Certificates = (props) => {



    const {getData,data} = useContext(ContextAPI);
    const[count, setCount] = useState(0);

    useEffect(() => {
        getData();
        !data && setCount(count => count+1)
    },[count])
  return (
    <div>{!data ? <h3>Loading...</h3> :
   data.map(item => (<Card fname={item.fname} lname={item.lname} c_name={item.c_name} s_date={item.s_date} e_date={item.e_date} hash={item.hash} sender={item.sender} />)) } </div>
  )
}

export default Certificates