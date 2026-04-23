import {  createContext, useState } from "react";


import { BASE_URL } from "../utils/config";
import { useFetchData } from "../Hook/useFetchData";
import { Loading } from "../pages/Loading";
export const Appcontext=createContext()

export const AppcontextProvider=({children})=>
{
    const[query,setquery]=useState('')
    console.log(query,"this is query ok ok okok")
  const{data,loading,error}=useFetchData(`${BASE_URL}/doctor?query=${query}`,)
  console.log(data)

    if (loading) return <Loading />;

    if (error) {
        return <div className="text-red-500 p-4">Failed to load data: {error.message}</div>;
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