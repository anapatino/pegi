import apiClient from "../data/http-common";

export const getAllLines = (requestOptions) => {
  return apiClient
    .get(`research-lines/get-research-lines`, requestOptions)
    .then((res) => res.data);
};

export const getSubline = (codeLine, requestOptions) => {
  return apiClient
    .get(`research-sub-lines/${codeLine}`, requestOptions)
    .then((res) => res.data);
};

export const getThematicAreas = (codeSubline, requestOptions) => {
  return apiClient
    .get(`Thematic-areas/${codeSubline}`, requestOptions)
    .then((res) => res.data);
};

export const getResearchGroup = (requestOptions) => {
  return apiClient
    .get(`research-group/get-all-research-groups`, requestOptions)
    .then((res) => res.data);
};

export const getResearchGroupCode = (code, requestOptions) => {
  return apiClient
    .get(`research-group/${code}`, requestOptions)
    .then((res) => res.data);
};
