import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../axiosConfig';
import qs from 'qs'; // URL-encoded 형식으로 변환하기 위해 qs 라이브러리 사용
import '../../resources/css/User/Login.css';
import Modal from '../../components/Modal/Modal'
import Interest from '../../components/interest/Interest';
import Modalcss from '../../resources/css/Modal/Modal.css';
import Interestcss from '../../resources/css/Interest/interest.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // Interest 모달 창 상태 추가

    useEffect(() => {
        const checkAuthentication = async () => {
            console.log('**');

            try {
                const response = await axiosInstance.get("/auth-check", { withCredentials: true });
                console.log('****');

                if (response.data) {
                    alert("이미 로그인된 사용자입니다.");
                    navigate("/"); // Redirect to home or any other page
                }

                console.log('******');
            } catch (error) {
                console.error("Authentication check failed:", error);
            }
        };
        checkAuthentication();
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginDTO = {
            username: username,
            password: password,
        };

        try {
            // 로그인 요청을 axiosInstance를 사용하여 처리
            const response = await axiosInstance.post("/login", loginDTO, {
                headers: { 'Content-Type': 'application/json', },
                withCredentials: true, // 쿠키 기반 인증 정보를 포함
            });

            if (response.status === 200) {
                const { token } = response.data;  // 서버에서 받은 token
                localStorage.setItem('authToken', token); // 토큰을 로컬스토리지에 저장 (옵션)

                // if (token) {
                //     console.log('JWT 토큰:', token);
                // } else {
                //     console.log('JWT 토큰이 저장되지 않았습니다.');
                // }

                // 로그인 성공 후 처리
                const userIdResponse = await axiosInstance.get('/getId', {
                    headers: {
                        'Authorization': `Bearer ${token}`  // 토큰을 Authorization 헤더에 포함
                    }
                });


                if (userIdResponse.status === 200) {
                    // console.log('200');

                    const userId = userIdResponse.data; // 서버에서 받은 userId
                    // console.log('응답 userId:', userId);

                    const interestResponse = await axiosInstance.post('/checkExistInterestById', { id: userId }, {
                        headers: {
                            'Authorization': `Bearer ${token}`  // 토큰을 Authorization 헤더에 포함
                        }
                    });

                    if (interestResponse.data) {
                        navigate("/"); // 이미 관심사 존재하면 메인 페이지로 이동
                    } else {
                        setShowModal(true); // 관심사가 없으면 모달 열기
                    }
                } else {
                    console.error("Error fetching user ID:", userIdResponse.data);
                }
            } else {
                console.error("Error during login:", response.data);
            }
        } catch (error) {
            if (error.response) {
                // 서버에서 응답이 있을 경우 처리
                console.error("Network error:", error.response.data);
            } else if (error.request) {
                // 요청은 보냈으나 응답이 없는 경우 처리
                console.error("Network error: No response received", error.request);
            } else {
                // 그 외의 오류 처리
                console.error("Error during request:", error.message);
            }
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID"
                    value={username}
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="PW"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
            </form>
            <div className="links">
                <Link to="/signUp">회원가입</Link> | <Link to="/findId">ID 찾기</Link> | <Link to="/findPw1">PW 찾기</Link>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {/* 모달 창 내용에 username과 userId 전달 */}
                <Interest/>
            </Modal>
        </div>
    );
};

export default Login;
