"use client"; // Mark this as a client component

import { searchCars } from '@/utils';
import React, { useState } from 'react';
import CarCard from '../Car Display/CarCard';

const SearchCars = () => {
    const [manufacturer, setManufacturer] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        setIsLoading(true);

        try {
            const results = await searchCars(manufacturer, model);
            setSearchResults(results);
        } catch (error) {
            console.error("Error searching cars:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="padding-y max-width ">
            <form onSubmit={handleSearch} className="searchbar">
                <div className="searchbar__item">
                    <input
                        id="manufacturer"
                        type="text"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        placeholder="Enter manufacturer"
                        className="search-manufacturer__input"
                    />
                </div>
                <div className="searchbar__item">
                    <input
                        id="model"
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Enter model"
                        className="search-manufacturer__input"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="custom-btn bg-primary-blue text-white rounded-full"
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {searchResults.length > 0 ? (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold">Search Results:</h2>
                    <div className="home__cars-wrapper">
                        {searchResults.map((car, index) => (
                            <CarCard key={index} car={car} />
                        ))}
                    </div>
                </div>
            ) : (
                <></>)}
        </div>
    );
};

export default SearchCars;