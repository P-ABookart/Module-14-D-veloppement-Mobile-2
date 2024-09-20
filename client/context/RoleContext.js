import React, { createContext, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [accountType, setAccountType] = useState(null);

  const chooseAccount = (accountType) => {
    setAccountType(accountType);
  };

  return <RoleContext.Provider value={{ accountType, chooseAccount }}>{children}</RoleContext.Provider>;
};
