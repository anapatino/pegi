import apiClient from "../data/http-common";

export const getAllProposal = (requestOptions) => {
  return apiClient.get(`Proposals`, requestOptions).then((res) => res.data);
};

export const getProposalByCode = (code, requestOptions) => {
  return apiClient
    .get(`Proposals/get-proposal-code/${code}`, requestOptions)
    .then((res) => res.data);
};

export const getProposalByTitle = (title, requestOptions) => {
  return apiClient
    .get(`Proposals/get-proposals-by-title/${title}`, requestOptions)
    .then((res) => res.data);
};

export const getHistorialPropose = (code, requestOptions) => {
  return apiClient
    .get(`HistorialPropose/${code}`, requestOptions)
    .then((res) => res.data);
};

export const getProposalByDocument = (document, requestOptions) => {
  return apiClient
    .get(`Proposals/get-proposals-document/${document}`, requestOptions)
    .then((res) => res.data);
};

export const getStatisticsProposalByProfessor = (document, requestOptions) => {
  return apiClient
    .get(
      `Proposals/general-statistics-proposal-professor/${document}`,
      requestOptions
    )
    .then((res) => res.data);
};

export const getStatisticsProposalByStudent = (document, requestOptions) => {
  return apiClient
    .get(
      `Proposals/general-statistics-proposal-student/${document}`,
      requestOptions
    )
    .then((res) => res.data);
};

export const getStatisticsProposal = (requestOptions) => {
  return apiClient
    .get(`Proposals/general-statistics-proposal`, requestOptions)
    .then((res) => res.data);
};

export const updateProposalEvaluator = (data, requestOptions) => {
  return apiClient
    .put(`Proposals/update-evaluator-proposal`, data, requestOptions)
    .then((res) => res.data);
};

export const updateProposal = (data, requestOptions) => {
  return apiClient
    .put(`Proposals/`, data, requestOptions)
    .then((res) => res.data);
};

export const updateProposalTutor = (data, requestOptions) => {
  return apiClient
    .put(`Proposals/update-tutor-proposal`, data, requestOptions)
    .then((res) => res.data);
};

export const getProposalByProfessorDocument = (document, requestOptions) => {
  return apiClient
    .get(`Proposals/get-proposals-professor/${document}`, requestOptions)
    .then((res) => res.data);
};

export const deleteProposalByCode = (code, requestOptions) => {
  return apiClient
    .delete(`Proposals/${code}`, requestOptions)
    .then((res) => res.data);
};
