"use client"; // Mark this as a client component

import { CarCard, Hero } from "@/components";
import SearchCars from "@/components/filtering/SearchCars";
import { fetchCars } from "@/utils";
import React, { useState, useEffect } from "react";

export default function Home() {
    const [allCars, setAllCars] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 6; // Number of cars per page

    // Fetch all cars when the app loads
    useEffect(() => {
        const fetchAllCars = async () => {
            try {
                const cars = await fetchCars();
                setAllCars(cars);
                setSearchResults(cars); // Initially, display all cars
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };
        fetchAllCars();
    }, []);

    const handleSearchResults = (results: any[]) => {
        setSearchResults(results);
        setIsSearching(true);
        setCurrentPage(1); // Reset to first page after search
    };

    const handleClearFilters = async () => {
        setSearchResults(allCars);
        setIsSearching(false);
        setCurrentPage(1); // Reset to first page
    };

    const isDataEmpty = !Array.isArray(searchResults) || searchResults.length < 1 || !searchResults;

    // Pagination Logic
    const totalPages = Math.ceil(searchResults.length / carsPerPage);
    const startIndex = (currentPage - 1) * carsPerPage;
    const displayedCars = searchResults.slice(startIndex, startIndex + carsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <main className="overflow-hidden">
            <Hero />

            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore our cars you might like</p>
                </div>
                <SearchCars onSearchResults={handleSearchResults} onClearFilters={handleClearFilters} />

                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {displayedCars.map((car, index) => (
                                <CarCard key={index} car={car} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6 space-x-4">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                                >
                                    Previous
                                </button>
                                <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2 className="text-black text-xl font-bold">Oops, no results</h2>
                        <p>No cars match your search criteria.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
