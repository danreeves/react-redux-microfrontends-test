import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { DynamicModuleLoader } from "redux-dynamic-modules";

const ModuleRegisterContext = createContext([]);

export function ModuleRegisterProvider({ children }) {
  const [modules, setModules] = useState([]);

  function addModule(module) {
    if (!modules.find((m) => m === module)) {
      setModules([...modules, module]);
    }
  }

  return (
    <>
      <DynamicModuleLoader key={modules.length} modules={modules} />

      <ModuleRegisterContext.Provider value={{ addModule }}>
        {children}
      </ModuleRegisterContext.Provider>
    </>
  );
}

export function useAddModule(module) {
  const { addModule } = useContext(ModuleRegisterContext);
  useEffect(() => {
    addModule(module);
  }, []);
}
