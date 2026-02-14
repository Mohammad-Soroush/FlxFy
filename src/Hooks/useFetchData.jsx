import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Generic fetch hook
 * @param {string} endpoint API endpoint
 * @param {boolean} enabled فعال بودن hook
 */
export default function useFetchData({ endpoint, enabled = true }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !endpoint) return;

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          cancelToken: source.token,
        });

        setData(res.data.data || res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => source.cancel("Operation canceled by the user.");
  }, [endpoint, enabled]);

  return { data, loading, error };
}
