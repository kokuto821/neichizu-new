import { useState, useCallback } from "react";

export const useChangeVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const changeVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);
  return { isVisible, changeVisible };
};
