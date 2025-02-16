import axios from "axios";

const API_BASE_URL = "http://localhost:80/admin";

const MedicineService = {
  getAllMedicines: () => axios.get(`${API_BASE_URL}/get/allMedicines`),
  
  getMedicineById: (id) => axios.get(`${API_BASE_URL}/${id}`),

  fetchMedicineByMedicineCodeAndBatchNo: (medicineCode, batchNo) => 
    axios.get(`${API_BASE_URL}/get/medicine/${encodeURIComponent(medicineCode)}/${encodeURIComponent(batchNo)}`),


  addMedicine: (medicine) => axios.post(API_BASE_URL, medicine),

  updateMedicine: (id, medicine) => axios.put(`${API_BASE_URL}/${id}`, medicine),

  deleteMedicine: (id) => axios.delete(`${API_BASE_URL}/${id}`)
};

export default MedicineService;
