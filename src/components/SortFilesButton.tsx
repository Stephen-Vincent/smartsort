const SortFilesButton = ({ onSort }: { onSort: () => void }) => {
  return (
    <div className="w-full flex justify-center mt-6">
      <button
        onClick={onSort}
        className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all"
      >
        📂 Sort Files
      </button>
    </div>
  );
};

export default SortFilesButton;
