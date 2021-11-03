import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SkeletonTheme } from "react-loading-skeleton";

interface StyleContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const StyleContext = createContext<StyleContextType>({} as StyleContextType);

export function StyleProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const memoedValue = useMemo(
    () => ({
      isSidebarOpen,
      setIsSidebarOpen,
    }),
    [isSidebarOpen]
  );

  return (
    <StyleContext.Provider value={memoedValue}>
      <SkeletonTheme color="#838487" highlightColor="#989898">
        {children}
      </SkeletonTheme>
    </StyleContext.Provider>
  );
}

const useStyle = () => {
  return useContext(StyleContext);
};

export default useStyle;
