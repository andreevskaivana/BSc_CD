"use client"; // Mark this as a client component

import { searchCars, searchCarsByFuelTypeAndYear } from '@/utils';
import React, { useState } from 'react';
import { fuels, yearsOfProduction } from '@/constants'; // Import constants

interface SearchCarsProps {
    onSearchResults: (results: any[]) => void; // Callback to pass search results to the parent
    onClearFilters: () => void; // Callback to clear filters
}

const SearchCars = ({ onSearchResults, onClearFilters }: SearchCarsProps) => {
    const [manufacturer, setManufacturer] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [fuelType, setFuelType] = useState<string>('');
    const [yearOfProduction, setYearOfProduction] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        setIsLoading(true);

        try {
            let results;
            if (manufacturer || model) {
                // Search by manufacturer and model
                results = await searchCars(manufacturer, model);
            } else if (fuelType || yearOfProduction) {
                // Search by fuel type and year of production
                results = await searchCarsByFuelTypeAndYear(fuelType, yearOfProduction ? parseInt(yearOfProduction) : null);
            } else {
                // If no filters are selected, fetch all cars
                results = await searchCars('', '');
            }
            onSearchResults(results); // Pass results to the parent
        } catch (error) {
            console.error("Error searching cars:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearFilters = () => {
        setManufacturer('');
        setModel('');
        setFuelType('');
        setYearOfProduction('');
        onClearFilters(); // Notify the parent to clear filters
    };

    return (
        <div className="padding-x padding-y max-width">
            <form onSubmit={handleSearch} className="searchbar">
                <div className="searchbar__item">
                    <input
                        id="manufacturer"
                        type="text"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        placeholder="Enter manufacturer"
                        className="searchbar__input"
                    />
                </div>
                <div className="searchbar__item">
                    <input
                        id="model"
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Enter model"
                        className="searchbar__input"
                    />
                </div>
                <div className="searchbar__item">
                    <select
                        id="fuelType"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="searchbar__input"
                    >
                        {fuels.map((fuel) => (
                            <option key={fuel.value} value={fuel.value}>
                                {fuel.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="searchbar__item">
                    <select
                        id="yearOfProduction"
                        value={yearOfProduction}
                        onChange={(e) => setYearOfProduction(e.target.value)}
                        className="searchbar__input"
                    >
                        {yearsOfProduction.map((year) => (
                            <option key={year.value} value={year.value}>
                                {year.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="custom-btn bg-primary-blue text-white rounded-full"
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
                <button
                    type="button"
                    onClick={handleClearFilters}
                    className="custom-btn bg-gray-500 text-white rounded-full ml-2"
                >
                    Clear Filters
                </button>
            </form>
        </div>
    );
};

export default SearchCars;