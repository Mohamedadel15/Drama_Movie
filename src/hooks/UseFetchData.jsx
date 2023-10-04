import { useState, useEffect } from "react";
import getData from "../utils/api";

export default function UseFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    getData(url)
    .then((res) => {
        setLoading(false);
        setData(res);  
    })
    .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
    });
  }, [url]);
  return {data, loading, error};
}
