import apiClient from "../data/http-common";

export const getAllProject = (requestOptions) => {
  return apiClient.get(`Project`, requestOptions).then((res) => res.data);
};

export const getProjectByCode = (code, requestOptions) => {
  return apiClient
    .get(`Project/get-project-code/${code}`, requestOptions)
    .then((res) => res.data);
};

export const getHistorialProject = (code, requestOptions) => {
  return apiClient
    .get(`HistorialProject/${code}`, requestOptions)
    .then((res) => res.data);
};

export const getProjectByDocument = (document, requestOptions) => {
  return apiClient
    .get(`Project/get-projects-document/${document}`, requestOptions)
    .then((res) => res.data);
};

export const getProjectsByTitle = (title, requestOptions) => {
  return apiClient
    .get(`Project/get-projects-title/${title}`, requestOptions)
    .then((res) => res.data);
};

export const getStatisticsProjectByProfessor = (document, requestOptions) => {
  return apiClient
    .get(
      `Project/general-statistics-project-professor/${document}`,
      requestOptions
    )
    .then((res) => res.data);
};

export const getStatisticsProjectByStudent = (document, requestOptions) => {
  return apiClient
    .get(
      `Project/general-statistics-project-student/${document}`,
      requestOptions
    )
    .then((res) => res.data);
};

export const getStatisticsProject = (requestOptions) => {
  return apiClient
    .get(`Project/general-statistics-project`, requestOptions)
    .then((res) => res.data);
};

export const updateProjectEvaluator = (data, requestOptions) => {
  return apiClient
    .put(`Project/update-evaluator-project`, data, requestOptions)
    .then((res) => res.data);
};

export const updateProjectTutor = (data, requestOptions) => {
  return apiClient
    .put(`Project/update-tutor-project`, data, requestOptions)
    .then((res) => res.data);
};

export const getProjectByProfessorDocument = (document, requestOptions) => {
  return apiClient
    .get(`Project/get-projects-professor/${document}`, requestOptions)
    .then((res) => res.data);
};

export const deleteProjectByCode = (code, requestOptions) => {
  return apiClient
    .delete(`Project/${code}`, requestOptions)
    .then((res) => res.data);
};
