import { CarProps, FilterProps } from "../types";

export const calculateCarRent = (
  city_mpg: number,
  year: number,
  basePricePerDay = 50,
  mileageFactor = 0.1,
  ageFactor = 0.05
) => {
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return Math.round(rentalRatePerDay); // Return as a rounded number
};
export async function fetchCars() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/cars/getAllCars`,

  );
  const result = await response.json();
  return result;
}

export async function searchCars(manufacturer: string, model: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/cars/search`);

  if (manufacturer) {
      url.searchParams.append("manufacturer", manufacturer);
  }
  if (model) {
      url.searchParams.append("model", model);
  }

  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Failed to fetch cars');
  }

  const result = await response.json();
  return result;
}


export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    // process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
    "img"
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);
  console.log(`${url}`);

  return `${url}`;
};
