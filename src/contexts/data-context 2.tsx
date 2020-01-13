import React, { useState } from "react";
import { Contact } from "../pages/contacts-page/contact-model";

export interface DataModel {
  contacts: Contact[],
}

export interface DataContextModel {
  data: DataModel
  setData: (data: Partial<DataModel>)=>void
}

const dataModel: DataModel = {
  contacts: [{
    firstName: "Jiyoung",
    lastName: "Park",
    email: "test@live.com",
    role: "Datacom"
  }],
}

export const DataContext = React.createContext({} as DataContextModel);

export const DataContextProvider: React.FC = (props: any) => {
  
  const [data, setData] = useState(dataModel);

  const setContextData = (newData: Partial<DataModel>) => {
    console.log("setting data with:", newData)
    setData({...data, ...newData});
  }
  
  const contextModel: DataContextModel = {
    data: dataModel,
    setData: setContextData
  };
  
  return (<DataContext.Provider value={contextModel}>{props.children}</DataContext.Provider>)
}

export default DataContextProvider;