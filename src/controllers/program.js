import apiClient from "../data/http-common";

export const getAllProgram = () => {
  return apiClient
    .get("AcademicsProgram/GetAllAcademicPrograms")
    .then((res) => res.data);
};

export const getAcademicsProgramByCode = (code, requestOptions) => {
  return apiClient.get(`AcademicsProgram/${code}`).then((res) => res.data);
};
