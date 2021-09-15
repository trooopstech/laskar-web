import ClassDetailContext from "context/ClassDetail";
import { useContext } from "react";

const useClassDetail = () => {
  return useContext(ClassDetailContext);
};

export default useClassDetail;
