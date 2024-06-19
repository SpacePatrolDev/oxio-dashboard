import React, { useState } from "react";
import "../styles/TablePage.css";
import { useData } from "../contexts/DataContext";
import { v4 as uuidv4 } from "uuid";

interface DataItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const TablePage: React.FC = () => {
  const { data, setData } = useData(); // use the context for data management

  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataItem;
    direction: string;
  } | null>(null);

  const sortData = (key: keyof DataItem) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof DataItem) => {
    if (!sortConfig) {
      return "⇅";
    }
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "⇧" : "⇩";
    }
    return "⇅";
  };

  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortData("userId")}>
                User ID
                <span className="sort-icon">{getSortIcon("userId")}</span>
              </th>
              <th onClick={() => sortData("id")}>
                ID <span className="sort-icon">{getSortIcon("id")}</span>
              </th>
              <th onClick={() => sortData("title")}>
                Title <span className="sort-icon">{getSortIcon("title")}</span>
              </th>
              <th onClick={() => sortData("body")}>
                Body <span className="sort-icon">{getSortIcon("body")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr key={uuidv4()}>
                  <td>{item.userId}</td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePage;
