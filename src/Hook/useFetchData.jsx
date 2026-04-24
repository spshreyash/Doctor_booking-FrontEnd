

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Store/AuthContext';
import { toast } from 'react-toastify';

export const useFetchData = (url) => {
  const[data,setdata]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)

  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          
        },
        // credentials: 'include',
      });

      const result = await res.json();
      console.log(" full API result: ", result);

      if (res.ok) {
        if (result.user || result.doctor) {
          setdata(result.user || result.doctor);
        } else {
          throw new Error("Expected user/doctor data not found");
        }
      } else {
        throw new Error(result.msg || "Unknown error from API");
      }
    } catch (error) {
      console.error(" Error fetching data:", error);
      setError(error.message || "Fetch error");
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchData();
}, [url]);

  return { data, loading, error };
};
