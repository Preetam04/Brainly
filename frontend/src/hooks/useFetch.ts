import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetch = (service: () => Promise<any>) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await service();
      console.log(response);
      setData(response.data.data);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Error Fetching the data");
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
