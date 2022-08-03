import axios from "axios";
let API_ENDPOINT = "http://localhost:3001/";   /// local
let config = {
  baseURL: `${API_ENDPOINT}`,
};
const httpClient = axios.create(config);
export { API_ENDPOINT };
export default httpClient;

