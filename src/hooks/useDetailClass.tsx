import ClassDetailContext from "context/classDetailContext";
import { useContext } from "react";

const useClassDetail = () => {
  return useContext(ClassDetailContext);
};

export default useClassDetail;
