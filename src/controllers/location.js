import apiClient from "../data/http-common";

export const getCities = (city, requestOptions) => {
  return apiClient
    .get(`Locations/cities?departmentName=${city}`, requestOptions)
    .then((res) => res.data);
};

export const getAllDepartments = (requestOptions) => {
  return apiClient
    .get("Locations/departments", requestOptions)
    .then((res) => res.data);
};
