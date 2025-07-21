import '../../styles/login.scss';
import React, { useState } from 'react';
import axios from 'axios'
import url from '../../utils/backend';
const Main = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [joinusername, setjoinUsername] = useState('');
    const [joinpassword, setjoinPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMember, setIsMember] = useState(false);
    const isPasswordValid = joinpassword.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(joinpassword);

    const testServer = async() => {
        try{
            const res = await axios.get(url + '/')
            console.log(res.data)
            return res.data
        }
        catch(e){
            console.log(e)
        }
    }


    const handleLogin = () => {
        testServer()
    // 로그인 처리 로직 나중에 여기에
    console.log('로그인 시도:', username, password);
  };

    const handleSignupClick = () => {
    setIsMember(true);
  };

    const handleSignup = () => {
        testServer()
    // console.log('회원가입 완료:', joinusername, joinpassword);
  };

  const passwordsMatch = joinpassword === confirmPassword;
  const allFieldsFilled = joinusername && joinpassword && confirmPassword;

  return(
    <div className='login-container'>
        {isMember ? 
        (  <>
          <h2>회원가입</h2>

          <input
            type="text"
            placeholder="아이디"
            value={joinusername}
            onChange={(e) => setjoinUsername(e.target.value)}
            className="input-box"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={joinpassword}
            onChange={(e) => setjoinPassword(e.target.value)}
            className="input-box"
          />

          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-box"
          />

          
          {!isPasswordValid && joinpassword.length > 0 && (
            <div className="error-message">비밀번호는 8자 이상이며 특수문자를 포함해야 합니다</div>
            )}

          {!passwordsMatch && confirmPassword.length > 0 && (
            <div className="error-message">비밀번호가 일치하지 않습니다</div>
          )}



          <button
            className="login-button"
            onClick={handleSignup}
            disabled={!allFieldsFilled || !passwordsMatch || !isPasswordValid}
          >
            회원가입
          </button>

          <div className="signup-link" onClick={() => setIsMember(false)}>
        로그인하러가기
        </div>
        </>):
        (  
            <>
            <h2>로그인</h2>
      <input

        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-box"
        />

        <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-box"
      />
      
        <div className="signup-link" onClick={handleSignupClick}>
        회원가입하기
        </div>
        <button className="login-button" onClick={handleLogin}>
            로그인
        </button>
    </>)}
      

    </div>

  );

};

export default Main;