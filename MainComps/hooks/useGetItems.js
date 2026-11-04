import { useEffect, useRef, useState } from "react";
import { request } from "../services/requests/request";

export function useGetItems(queryName, params = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const abortControllerRef = useRef(null);

  const shouldSkip = params.__skip === true;

  const fetchData = async () => {
    if (shouldSkip) {
      setLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError("");

    try {
      const data = await request(queryName, params);

      if (!signal.aborted) {
        setItems(data || []);
      }
    } catch (fetchError) {
      if (!signal.aborted) {
        setError(fetchError.message);
        setItems([]);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [queryName, JSON.stringify(params), shouldSkip]);

  return { items, loading, error, refetch: fetchData };
}
