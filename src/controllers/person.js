import apiClient from "../data/http-common";

export const deletePerson = (document) => {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  localStorage.removeItem("personDocument");
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return apiClient
    .delete(`people/${document}`, requestOptions)
    .then((res) => res.data);
};

export const getPerson = (personDocument, requestOptions) => {
  return apiClient
    .get(`people/${personDocument}`, requestOptions)
    .then((res) => res.data);
};
