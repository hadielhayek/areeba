import axios from '../../plugins/http.service';
const axiosFunction = {
    getCustomers() {
        return axios.get("customer");
    },
    delete(id) {
        return axios.delete(`customer/${id}`);
    },
};
export default axiosFunction;