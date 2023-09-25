'use client'

import React, { useContext } from "react";

const MyContext = React.createContext({ value: 'de' });

export const useLocale = () => { 
  const c = useContext(MyContext) 
  console.log(c);
  return c;
} ;

const Provider = ({ locale , children }) => {
  return <MyContext.Provider value={locale}>{children}</MyContext.Provider>
}

export default Provider;