import apiClient from "../data/http-common";

export const getAllMessages = (requestOptions) => {
  return apiClient
    .get("messages/get-all-messages", requestOptions)
    .then((res) => res.data);
};
