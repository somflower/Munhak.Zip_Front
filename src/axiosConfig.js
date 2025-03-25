import axios from 'axios';
import { useHistory } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 서버 주소
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // 세션이 만료된 경우 로그인 페이지로 리디렉션
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // 토큰 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 토큰이 있을 때만 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
