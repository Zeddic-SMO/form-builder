import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// Define Global context types
interface AppContextProps {
  containerId: string | null;
  setContainerId: Dispatch<SetStateAction<string | null>>;
}

export const AppGlobalContext = createContext<AppContextProps | undefined>(
  undefined
);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [containerId, setContainerId] = useState<string | null>(null);

  //   Store Values
  const store = {
    containerId,
    setContainerId,
  };

  return (
    <AppGlobalContext.Provider value={store}>
      {children}
    </AppGlobalContext.Provider>
  );
};

export const useAppGlobalContext = (): AppContextProps => {
  const context = useContext(AppGlobalContext);
  if (!context) {
    throw new Error(
      "useAppGlobalContext must be used within the AppGlobalProvider"
    );
  }
  return context;
};
