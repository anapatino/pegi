import apiClient from "../../data/http-common";
import { useMutation } from "react-query";

const AuthService = (LoginRequest) => {
  console.log(LoginRequest.name + LoginRequest.password);
  const getUser = () => {
    return apiClient
      .post("login", {
        name: LoginRequest.name,
        password: LoginRequest.password,
      })
      .then((res) => res.data);
  };

  const query = useMutation("auth", getUser);

  return (
    <div>
      {query.isLoading
        ? "Loading..."
        : query.isError
        ? "Error: " + query.error.response.data.message
        : query.data
        ? "Mesange: " + query.data
        : null}
    </div>
  );
};

export default AuthService;
