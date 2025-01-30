import { useState } from "react";
import Button from "./components/Button";
import DragDrop from "./components/DragDrop";
import Header from "./components/Header";
import RecentlySorted from "./components/RecentlySorted";
import SortingRules from "./components/SortingRules"; // Import Sorting Rules Modal
import SortFilesButton from "./components/SortFilesButton";

// Dashboard Layout
const App = () => {
  const [showSortingRules, setShowSortingRules] = useState(false); // Modal State

  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex flex-col items-center p-6">
      <Header />
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6 mb-6 flex justify-center items-center">
        <DragDrop />
      </div>
      <RecentlySorted />
      <div className="mt-6 flex gap-4">
        <Button
          label="Sorting Rules"
          icon="➕"
          onClick={() => setShowSortingRules(true)}
        />
        <Button label="My Folders" icon="📁" />
        <Button label="Settings" icon="⚙️" />
      </div>

      {/* Sorting Rules Modal */}
      {showSortingRules && (
        <SortingRules closeModal={() => setShowSortingRules(false)} />
      )}
      <SortFilesButton onSort={() => console.log("Sorting files...")} />
    </div>
  );
};

export default App;
