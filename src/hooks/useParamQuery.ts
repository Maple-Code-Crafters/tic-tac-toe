import { useLocation } from "react-router";

export const useParamQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
