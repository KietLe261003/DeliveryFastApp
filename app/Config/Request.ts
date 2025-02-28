import axios from "axios";

// Tạo một instance axios với cấu hình mặc định
export const request = axios.create({
    baseURL: "http://localhost:8181/api/", // URL từ file cấu hình môi trường
    timeout: 0, // Không giới hạn thời gian request
    headers: { 'X-Custom-Header': 'foobar' } // Header mặc định
});

// Thêm interceptor để chèn token vào mỗi request nếu có
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config; 
    },
    (error) => {
        // Xử lý lỗi trước khi request được gửi đi
        return Promise.reject(error);
    }
);
request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized! Redirecting to login...");
        }
        return Promise.reject(error); 
    }
);