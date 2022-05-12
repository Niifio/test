import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaceConfig";
import { createContext, useState } from "react";

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [isSelected, setIsSelected] = useState([]);
  const [workForceData, setWorkForceData] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "workforce"));
    let records = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      records.push(data);
    });
    setWorkForceData(records);
  };

  const onClick = (e) => {
    e.preventDefault();
    let select = e.target.id;
    let collected = [];
    for (let i = 0; i < workForceData.length; i++) {
      if (workForceData[i].id == select) {
        collected.push(workForceData[i]);
      }
    }
    setIsSelected(collected);
  };

  return (
    <TableContext.Provider
      value={{
        isSelected,
        setIsSelected,
        onClick,
        workForceData,
        setWorkForceData,
        fetchData,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;
