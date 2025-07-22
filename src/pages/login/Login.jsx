import '../../styles/login.scss';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import url from '../../utils/backend';
import digestPW from '../../utils/digestPw';
const Main = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [joinusername, setjoinUsername] = useState('');
    const [joinpassword, setjoinPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMember, setIsMember] = useState(false);
    const [code, setCode] = useState('');
    const[name,setName]= useState('');
    const navigate = useNavigate()
    const isPasswordValid = joinpassword.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(joinpassword);
//get(가져온다), post(수정한다), put(생성한다, 추가한다), delete(삭제한다)
    const testServer = async() => {
        try{
            const res = await axios.get(url + '/user/test')
            console.log(res.data)
            return res.data
        }
        catch(e){
            console.log(e)
        }
    }

     const createUser = async() => {
        try{
            const encryptedPW = await digestPW(joinpassword)
            const res = await axios.put(url + '/user/create',{
            email:joinusername, password:encryptedPW, name: name
        })
            console.log(res.data)
            if (res.data.message == 'exist'){
                alert('이미 존재합니다')
            }
            else {
                alert('계정 생성 성공')
                navigate('/main')
            }
            return res.data
        }
        catch(e){
            console.log(e)
        }
    }


         const login = async() => {
        try{
            const encryptedPW = await digestPW(password)
            const res = await axios.post(url + '/user/login',{
            email:username, password:encryptedPW
        })
            console.log(res.data)
            if (res.data.message == 'success'){
                alert('로그인 성공')
                navigate('/main')
            }
            else {
                alert('로그인 실패')
            }
            return res.data
        }
        catch(e){
            console.log(e)
        }
    }


    const handleLogin = () => {
        login()
    console.log('로그인 시도:', username, password);
  };

    const handleSignupClick = () => {
    setIsMember(true);
  };

    const handleSignup = () => {
        createUser()
    // console.log('회원가입 완료:', joinusername, joinpassword);
  };

  const passwordsMatch = joinpassword === confirmPassword;
  const allFieldsFilled = joinusername && joinpassword && confirmPassword;
  const verifyEmail= async () =>{
    try{
        const res = await axios.post(url+'/user/verify/email',{
            email:joinusername
        })
        if(res.data.message == 'exist'){
            alert('이미 발송했습니다.')
        }
        else{alert('이메일 발송 완료')}
        return res.data       
    }
    catch(e){
        console.log(e)
    }
  }

  const checkEmail= async () =>{
    try{
        const res = await axios.post(url+'/user/check/email',{
            email:joinusername,
            code: code
        })
        if(res.data.message == 'success'){
            alert('인증 성공')
        }
        else {alert('인증 실패')}
        return res.data       
    }
    catch(e){
        console.log(e)
    }
  }


  return(
    <div className='login-container'>
        {isMember ? 
        (  <>
          <h2>회원가입</h2>

          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-box"
          />
          
          <input
            type="text"
            placeholder="이메일"
            value={joinusername}
            onChange={(e) => setjoinUsername(e.target.value)}
            className="input-box"
          />

          <button onClick={verifyEmail}>
            이메일 인증
          </button>

             <input
            type="text"
            placeholder="인증번호"
            value={code}
            onChange={(e) => {
                let txt = e.target.value
                txt = txt.replace(/[^0-9]/g, '');
                setCode(txt)
            }}
            className="input-box"
          />

          <button onClick={checkEmail}>
            인증번호 확인
          </button>
            

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