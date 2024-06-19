import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

interface DataItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface DataContextProps {
  data: DataItem[];
  addData: (newData: DataItem) => void;
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>; //add setData to context
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addData = (newData: DataItem) => {
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <DataContext.Provider value={{ data, addData, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
