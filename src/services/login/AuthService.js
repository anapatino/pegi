import apiClient from "../../data/http-common";
import { useQuery } from "react-query";

const AuthService = () => {
  const LoginRequest = {
    name: "jeison",
    password: "jeisddon",
  };
  const getUser = () => {
    return apiClient
      .post("login", {
        name: LoginRequest.name,
        password: LoginRequest.password,
      })
      .then((res) => res.data);
  };

  const query = useQuery("auth", getUser);
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
