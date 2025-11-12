import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
const[data, setData] = useState(null);
const[isloading, setIsloading] = useState(false)
const[error,setError]=useState(null);
useEffect(()=>{
if(!url)return;
const controller = new AbortController();
const FetchData = async() =>{
    try{
        setIsloading(true);
        setError(null);
        const response = await axios.get(url,{signal: controller.signal, headers:{Accept:"application/json"}});
        setData(response.data)
    }catch(err){
        
        if(axios.isCancel(err))return;
        setError(err.response?.data?.message || err.message || "Something went wrong");
    }finally{
        setIsloading(false);
    }
}
FetchData();

return ()=> controller.abort();
},[url]) 
    return {data,isloading};
}

export default useFetch