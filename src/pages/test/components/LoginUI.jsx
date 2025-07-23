import '../../../styles/login.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../../../utils/backend';
import { useBGMStore } from "../../../store/backgroundSound";
import digestPW from '../../../utils/digestPw';
import { useEffect } from 'react';

const LoginUI = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [joinusername, setjoinUsername] = useState('');
  const [joinpassword, setjoinPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [code, setCode] = useState('');
    const pauseBackgroundSound = useBGMStore(state => state.pause)
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const isPasswordValid = joinpassword.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(joinpassword);
  const passwordsMatch = joinpassword === confirmPassword;
  const allFieldsFilled = joinusername && joinpassword && confirmPassword;


  const login = async () => {
    try {
      const encryptedPW = await digestPW(password);
      const res = await axios.post(url + '/user/login', {
        email: username,
        password: encryptedPW
      });
      if (res.data.message === 'success') {
        alert('로그인 성공');
        pauseBackgroundSound(); 
        navigate('/main?play=true');
      } else {
        alert('로그인 실패');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createUser = async () => {
    try {
      const encryptedPW = await digestPW(joinpassword);
      const res = await axios.put(url + '/user/create', {
        email: joinusername,
        password: encryptedPW,
        name: name
      });
      if (res.data.message === 'exist') {
        alert('이미 존재합니다');
      } else {
        alert('계정 생성 성공');
        pauseBackgroundSound(); 
        navigate('/main?play=true');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const verifyEmail = async () => {
    try {
      const res = await axios.post(url + '/user/verify/email', { email: joinusername });
      if (res.data.message === 'is_send') {
        alert('이미 발송했습니다.');
      } else if(res.data.message === 'is_user'){
        alert('사용할 수 없는 이메일입니다.');
		setjoinUsername('')
	  } else {
        alert('이메일 발송 완료');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkEmail = async () => {
    try {
      const res = await axios.post(url + '/user/check/email', {
        email: joinusername,
        code: code
      });
      if (res.data.message === 'success') {
        alert('인증 성공');
      } else {
        alert('인증 실패');
      }
    } catch (e) {
      console.log(e);
    }
  };

    useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!isMember) {
        // 로그인 모드일 때
        login();
      } else {
        // 회원가입 모드일 때: 입력 다 채웠는지 확인
        if (joinusername && joinpassword && confirmPassword && passwordsMatch && isPasswordValid) {
          createUser();
        }
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [
  isMember,
  username,
  password,
  joinusername,
  joinpassword,
  confirmPassword,
  passwordsMatch,
  isPasswordValid
]);


  return (
    <div className='login-container'>
      {isMember ? (
        <>
          <h2>회원가입</h2>
          <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className="input-box" />
          
          <div className="input-with-button">
          <input
            type="text"
            placeholder="이메일"
            value={joinusername}
            onChange={(e) => setjoinUsername(e.target.value)}
            className="input-box"
          />
          <button className="verify-button" onClick={verifyEmail}>
            이메일 인증
          </button>
        </div>

          <div className="input-with-button">
          <input
            type="text"
            placeholder="인증번호"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            className="input-box"
          />
          <button className="verify-button" onClick={checkEmail}>
            인증번호 확인
          </button>
        </div>

          <input type="password" placeholder="비밀번호" value={joinpassword} onChange={(e) => setjoinPassword(e.target.value)} className="input-box" />
          <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-box" />
          {!isPasswordValid && joinpassword.length > 0 && <div className="error-message">비밀번호는 8자 이상이며 특수문자를 포함해야 합니다</div>}
          {!passwordsMatch && confirmPassword.length > 0 && <div className="error-message">비밀번호가 일치하지 않습니다</div>}
          <button className="login-button" onClick={createUser} disabled={!allFieldsFilled || !passwordsMatch || !isPasswordValid}>
            회원가입
          </button>
          <div className="signup-link" onClick={() => setIsMember(false)}>로그인하러가기</div>
        </>
      ) : (
        <>
          <h2>방구를 뿌우우웅~!</h2>
          <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} className="input-box" />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="input-box" />
          <div className="signup-link" onClick={() => setIsMember(true)}>회원가입하기</div>
          <button className="login-button" onClick={login} onEnter={login}>로그인</button>
        </>
      )}
    </div>
  );
};

export default LoginUI;
