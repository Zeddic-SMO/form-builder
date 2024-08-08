import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { FormLayoutComponentsType } from "../types/FormTemplateTypes";
import { saveToLocalStorage } from "../utils/common";

// Define Global context types
interface AppContextProps {
  containerId: string | null;
  setContainerId: Dispatch<SetStateAction<string | null>>;
  elementId: string | null;
  setElementId: Dispatch<SetStateAction<string | null>>;
  allFormLayoutComponents: FormLayoutComponentsType[] | null;
  setAllFormLayoutComponents: Dispatch<
    SetStateAction<FormLayoutComponentsType[] | null>
  >;
  handleSaveForm: () => void;
  surveryFormValues: {};
  setSurveyFormValues: Dispatch<SetStateAction<{}>>;
  handleElementChange: (name: string, value: any) => void;
  handleCheckboxChange: (name: any, value: any, checked: any) => void;
}

export const AppGlobalContext = createContext<AppContextProps | undefined>(
  undefined
);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [containerId, setContainerId] = useState<string | null>(null);
  const [elementId, setElementId] = useState<string | null>(null);
  const [allFormLayoutComponents, setAllFormLayoutComponents] = useState<
    FormLayoutComponentsType[] | null
  >(null);

  const [surveryFormValues, setSurveyFormValues] = useState({});

  const handleElementChange = (name: string, value: any) => {
    setSurveyFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: any, value: any, checked: any) => {
    setSurveyFormValues((prevValues) => {
      // @ts-ignore
      const existingValues = prevValues[name] || [];

      const newValues = checked
        ? [...existingValues, value]
        : existingValues.filter((val: any) => val !== value);
      return {
        ...prevValues,
        [name]: newValues,
      };
    });
  };

  const handleSaveForm = () => {
    allFormLayoutComponents &&
      saveToLocalStorage("forms", JSON.stringify(allFormLayoutComponents));
  };

  //   Store Values
  const store = {
    containerId,
    setContainerId,
    elementId,
    setElementId,
    allFormLayoutComponents,
    setAllFormLayoutComponents,
    handleSaveForm,
    surveryFormValues,
    setSurveyFormValues,
    handleElementChange,
    handleCheckboxChange,
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
