import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch({
  endpoint,
  queryKey = "q",
  searchValue,
  headers = {},
  enabled = true,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !endpoint) return;

    if (!searchValue) {
      setData([]);
      return;
    }

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${endpoint}?${queryKey}=${encodeURIComponent(searchValue)}`;
        const res = await axios.get(url, {
          headers,
          cancelToken: source.token,
        });

        const json = res.data;

        if (Array.isArray(json)) {
          setData(json);
        } else if (Array.isArray(json.data)) {
          setData(json.data);
        } else if (Array.isArray(json.taskers)) {
          setData(json.taskers);
        } else {
          setData([]);
        }
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
  }, [endpoint, queryKey, searchValue, enabled]);

  return { data, loading, error };
}
