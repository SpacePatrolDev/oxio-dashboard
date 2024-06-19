import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "./components/TablePage";
import VisualizationPage from "./components/VisualizationPage";
import DataEntryForm from "./components/DataEntryForm";
import NavigationBar from "./components/NavigationBar";
import { DataProvider } from "./contexts/DataContext";

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/table" element={<TablePage />} />
            <Route path="/visualization" element={<VisualizationPage />} />
            <Route path="/data-form" element={<DataEntryForm />} />
            <Route path="/" element={<TablePage />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
