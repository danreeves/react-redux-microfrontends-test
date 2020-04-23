import React, { createContext, useState, useContext, useEffect } from 'react'

const ModuleRegisterContext = createContext([])

export function ModuleRegisterProvider ({children}) {
  const [modules, setModules] = useState([])

  function addModule(module) {
    setModules([...modules, module])
  }

  return <DynamicModuleLoader modules={modules}>
    <ModuleRegisterContext.Provider value={{modules, addModule}}>
      {children}
    </ModuleRegisterContext.Provider>
  </DynamicModuleLoader>
}

function useAddModule(module) {
  const { addModule } = useContext(ModuleRegisterContext)
  useEffect(() => {
    addModule(module)
  }, [addModule, module])
}
