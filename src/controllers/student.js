import apiClient from "../data/http-common";

export const getStudent = (personDocument, requestOptions) => {
  return apiClient
    .get(`students/${personDocument}`, requestOptions)
    .then((res) => res.data);
};
