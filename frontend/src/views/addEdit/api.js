import axios from '../../plugins/http.service';
const axiosFunction = {
    add(data) {
        return axios.post("customer",data);
    },
    getCustomerById(id){
        return axios.get(`customer/${id}`)
    },
    update(id,data){
        return axios.put(`customer/${id}`,data)
    }
    
};
export default axiosFunction;