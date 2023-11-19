import React, { useEffect, useState } from "react";



const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData=()=>{
    fetch('people.json')
      .then(function(response){
        setData(response.json())
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetch;
