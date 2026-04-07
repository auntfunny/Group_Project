import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(
  url,
  {method, body, header, authentication} = {}
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchURL() {
      setLoading(true);
      try {
        const { data } = await axios({
          method: method ? method : "GET",
          url: url,
          data: body ? { body } : null,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        setData(data);
      } catch (error) {
        setError(error);
        console.error("Something went wrong: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchURL();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
