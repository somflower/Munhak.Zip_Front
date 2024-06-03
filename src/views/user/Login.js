import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from '../api/axiosInstance';

const Login = () => {
    const [userId, setUserId] = useState(''); // userId 상태 변수
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                userId: userId, // userId 필드 사용
                password: password
            }, { withCredentials: true });
            alert(response.data);
        } catch (error) {
            alert('Invalid userId or password');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>UserId:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );

    //const [userId, setUserId] = useState("");
    //const [pw, setPw] = useState("");

    // const handleSubmit = async (event) => { // 폼이 제출될 때 호출
    //     event.preventDefault(); // 폼의 기본 동작(페이지 리로드)을 방지
    //
    //     try {
    //         const response = await axios.post('/login', {
    //             username,
    //             password,
    //         });
    //
    //         if (response.status === 200) {
    //             // 로그인 성공 후 리다이렉트
    //             window.location.href = '/main';
    //         }
    //     } catch (error) {
    //         console.error('로그인 실패', error);
    //         alert('로그인에 실패했습니다.');
    //     }
    // };
    //
    // return (
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             <label>Username:</label>
    //             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
    //         </div>
    //         <div>
    //             <label>Password:</label>
    //             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    //         </div>
    //         <button type="submit">Login</button>
    //
    //
    //         <br/>
    //         <Link to={"/signUp"}>
    //             <button>회원가입</button>
    //         </Link>
    //         <Link to={"/findId"}>
    //             <button>ID찾기</button>
    //         </Link>
    //         <Link to={"/findPw1"}>
    //             <button>PW찾기</button>
    //         </Link>
    //     </form>
    // );
}
export default Login;
