import  { createContext, useContext, useState } from "react";

interface Filter{
  filterType:"ALL USERS" | "CONNECTIONS" | "ACTIVE CONNECTIONS" | "BY COUNTRY";
  filterPayload:any;
}


const SidebarContext = createContext<any | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarContext can only be used inside SidebarContextProvider");
  }
  return context;
};

export const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {

  const[filter,setFilter]=useState<Filter>({
    filterType:"ALL USERS",
    filterPayload:undefined
  });
  

  const value = {
    filter,
    setFilter
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};
