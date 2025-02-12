"use client"; 

import { searchCars, searchCarsByFuelTypeAndYear } from '@/utils';
import React, { useState } from 'react';
import { fuels, yearsOfProduction } from '@/constants'; 

interface SearchCarsProps {
    onSearchResults: (results: any[]) => void; 
    onClearFilters: () => void; 
}

const SearchCars = ({ onSearchResults, onClearFilters }: SearchCarsProps) => {
    const [manufacturer, setManufacturer] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [fuelType, setFuelType] = useState<string>('');
    const [yearOfProduction, setYearOfProduction] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setIsLoading(true);

        try {
            let results;
            if (manufacturer || model) {
                results = await searchCars(manufacturer, model);
            } else if (fuelType || yearOfProduction) {
                results = await searchCarsByFuelTypeAndYear(fuelType, yearOfProduction ? parseInt(yearOfProduction) : null);
            } else {
                results = await searchCars('', '');
            }
            onSearchResults(results); 
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
        onClearFilters(); 
    };

    return (
        <div className="padding-x padding-y max-width">
       <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-4">
    <input
        id="manufacturer"
        type="text"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        placeholder="Enter manufacturer"
        className="border border-gray-300 rounded-lg px-4 py-2 w-48"
    />
    <input
        id="model"
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Enter model"
        className="border border-gray-300 rounded-lg px-4 py-2 w-48"
    />
    <select
        id="fuelType"
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2"
    >
        {fuels.map((fuel) => (
            <option key={fuel.value} value={fuel.value}>
                {fuel.title}
            </option>
        ))}
    </select>
    <select
        id="yearOfProduction"
        value={yearOfProduction}
        onChange={(e) => setYearOfProduction(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2"
    >
        {yearsOfProduction.map((year) => (
            <option key={year.value} value={year.value}>
                {year.title}
            </option>
        ))}
    </select>
    <button
        type="submit"
        disabled={isLoading}
        className="bg-primary-blue text-white rounded-lg px-6 py-2 min-w-[120px] hover:bg-blue-700 transition"
    >
        {isLoading ? 'Searching...' : 'Search'}
    </button>
    <button
        type="button"
        onClick={handleClearFilters}
        className="bg-gray-500 text-white rounded-lg px-6 py-2 min-w-[120px] hover:bg-gray-600 transition"
    >
        Clear Filters
    </button>
</form>

        </div>
    );
};

export default SearchCars;