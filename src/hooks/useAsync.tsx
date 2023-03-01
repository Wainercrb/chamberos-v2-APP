import { useState, useEffect } from "react";
import { getErrorMessage } from "../utilities/catchError.utility";

type TProps = {
  asyncFunction: Function;
};

export function useAsync<T>({ asyncFunction }: TProps) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (error: unknown) {
        
        setError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [asyncFunction]);

  return { data, error, isLoading };
}

