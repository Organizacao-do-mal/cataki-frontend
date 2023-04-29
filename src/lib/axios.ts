import axios from "axios";

export const googleMapApi = axios.create({
  baseURL: process.env.API_GOOGLE_MAPS_GEOLOCATION,
});
