import ClassContext from "context/classContext";
import { useContext } from "react";

const useClass = () => {
  return useContext(ClassContext);
};

export default useClass;
