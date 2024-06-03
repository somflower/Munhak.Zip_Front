import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
    baseURL: 'http://localhost:8080',  // 백엔드 API의 기본 URL
    withCredentials: true,  // 세션 쿠키를 포함하도록 설정
});

// 요청 인터셉터 설정 (선택 사항)
instance.interceptors.request.use(
    (config) => {
        // 추가 헤더나 설정이 필요하면 여기에 추가
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;