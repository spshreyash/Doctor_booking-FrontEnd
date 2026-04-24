import {  createContext, useState } from "react";


import { BASE_URL } from "../utils/config";
import { useFetchData } from "../Hook/useFetchData";
import { Loading } from "../pages/Loading";
export const Appcontext=createContext()

export const AppcontextProvider=({children})=>
{
    const[query,setquery]=useState('')
    console.log(query,"this is query ok ok okok")
  const{data,loading,error}=useFetchData(`${BASE_URL}/doctor?query=${query}`)
  console.log(data,"t hsi is main dat ok ")
  console.log(`${BASE_URL}/doctor`,"this is url ")
  console.log( error,"this is errro ")
  console.log(loading,"this is loding")

    if (loading) return <Loading />;

    if (error) {
        return <div className="text-red-500 p-4">Failed to load data: {error}</div>;
      }

   
    const value={
        doctors:data || [],
        query,
        setquery,
        loading,
  error
    }

   return(
    <Appcontext.Provider value={value}>{children}</Appcontext.Provider>
   )
}