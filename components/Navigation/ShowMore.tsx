"use client";

import React from "react";

interface ShowMoreProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const ShowMore: React.FC<ShowMoreProps> = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
      >
        Previous
      </button>
      <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
      >
        Next
      </button>
    </div>
  );
};

export default ShowMore;