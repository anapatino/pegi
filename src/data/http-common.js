import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7239/",
});

/*export default axios.create({
  baseURL: "https://fafz3q9ih5.execute-api.us-east-2.amazonaws.com/pegi",
});*/