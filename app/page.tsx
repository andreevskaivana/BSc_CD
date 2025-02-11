"use client";

import { CarCard, Hero } from "@/components";
import SearchCars from "@/components/Filtering/SearchCars";
import ShowMore from "@/components/Navigation/ShowMore";
import { fetchCars } from "@/utils";
import React, { useState, useEffect } from "react";

export default function Home() {
    const [allCars, setAllCars] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 8;

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
        setCurrentPage(1);
    };

    const handleClearFilters = async () => {
        setSearchResults(allCars);
        setIsSearching(false);
        setCurrentPage(1);
    };

    const isDataEmpty = !Array.isArray(searchResults) || searchResults.length < 1 || !searchResults;

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

                        {totalPages > 1 && (
                            <ShowMore
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onNextPage={handleNextPage}
                                onPrevPage={handlePrevPage}
                            />
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