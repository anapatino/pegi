import apiClient from "../data/http-common";

export const getProfessorByPosition = (position, requestOptions) => {
  return apiClient
    .get(`Professor/get-professor-position/${position}`, requestOptions)
    .then((res) => res.data);
};

export const getProfessorByDocument = (document, requestOptions) => {
  return apiClient
    .get(`Professor/${document}`, requestOptions)
    .then((res) => res.data);
};

export const getProfessors = (requestOptions) => {
  return apiClient.get(`Professor`, requestOptions).then((res) => res.data);
};
