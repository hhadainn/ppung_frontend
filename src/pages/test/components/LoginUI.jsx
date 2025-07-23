import '../../../styles/login.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBGMStore } from "../../../store/backgroundSound";
import { useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import AlertConfirm from '../../../components/AlertConfirm';
import classNames from 'classnames';
import useMutateCreateUser from '../../../hooks/mutation/useMutateCreateUser';
import useMutateLogin from '../../../hooks/mutation/useMutateLogin';
import useMutateVerifyEmail from '../../../hooks/mutation/useMutateVerifyEmail';
import useMutateCheckEmail from '../../../hooks/mutation/useMutateCheckEmail';
import Loading from '../../../components/Loading';
import AlertToast from '../../../components/AlertToast';
const LoginUI = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [joinusername, setjoinUsername] = useState('');
  const [joinpassword, setjoinPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successVerify, setSuccessVerify] = useState(false)
  const [isMember, setIsMember] = useState(false);
  const [code, setCode] = useState('');
  const pauseBackgroundSound = useBGMStore(state => state.pause)
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const isPasswordValid = joinpassword.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(joinpassword);
  const passwordsMatch = joinpassword === confirmPassword;
  const allFieldsFilled = joinusername && joinpassword && confirmPassword;

	const handleLogin = () => {
		if(loadingCheckEmail|| loadingLogin || loadingVerifyEmail || loadingCreateUser) return;
		if(!username){
			AlertToast({toastId:'login',text: '아이디를 입력해주세요.'})
			return;
		}
		else if(!password){
			AlertToast({toastId:'login',text: '비밀번호를 입력해주세요.'})
			return;
		}
		mutateLogin({password: password, email: username})
	}
	const {mutate: mutateLogin, isPending: loadingLogin} = useMutateLogin({
		onSuccess:(data) => {
			if (data.message === 'success') {
				window.localStorage.setItem('ppung_email', data.email)
				AlertToast({toastId:'login',text: '로그인 성공', type:'success'});
				pauseBackgroundSound(); 
				navigate('/main?play=true');
			  } else {
				AlertToast({toastId:'login',text: '로그인 실패', isWarnIcon:true, type:'warn'});
			  }
		}
	})
  const handleCreateUser = () => {
	if(loadingCheckEmail|| loadingLogin || loadingVerifyEmail || loadingCreateUser) return;
	if(!successVerify){

		AlertToast({toastId:'login',text: '이메일 인증을 진행해주세요.'})
		return;
	}
	mutateCreateUser({password: joinpassword, email: joinusername, name: name})
  }
  const {mutate: mutateCreateUser, isPending: loadingCreateUser} = useMutateCreateUser({
	onSuccess:(data) => {
		if (data.message === 'exist') {
			AlertToast({toastId:'login',text: '이미 존재합니다', isWarnIcon: true, type:'warn'});
		  } else {
			AlertToast({toastId:'login',text: '계정 생성 성공', type:'success'});
			pauseBackgroundSound(); 
			navigate('/main?play=true');
		  }
	}
  })
  const handleVerifyEmail = () => {
	if(loadingCheckEmail|| loadingLogin || loadingVerifyEmail || loadingCreateUser) return;

	if(successVerify) return;
	mutateVerifyEmail({email: joinusername})
  }
  const {mutate: mutateVerifyEmail, isPending: loadingVerifyEmail} = useMutateVerifyEmail({
	onSuccess:(data) => {
		if (data.message === 'is_send') {
			AlertToast({toastId:'login',text: '이미 발송했습니다.'});
		  } else if(data.message === 'is_user'){
			AlertToast({toastId:'login',text: '사용할 수 없는 이메일입니다.', isWarnIcon: true, type:'warn'});
			setjoinUsername('')
		  } else {
			AlertToast({toastId:'login',text: '이메일 발송 완료', type:'success'});
		  }
	}
  })
  const handleCheckEmail = () => {

	if(loadingCheckEmail|| loadingLogin || loadingVerifyEmail || loadingCreateUser) return;
	if(successVerify) return;
	mutateCheckEmail({email: joinusername, code: code})
  }
  const {mutate: mutateCheckEmail, isPending: loadingCheckEmail} = useMutateCheckEmail({
	onSuccess:(data) => {
		if (data.message === 'success') {
			setSuccessVerify(true)
			AlertToast({toastId:'login',text: '인증 성공', type:'success'});
		  } else {
			AlertToast({toastId:'login',text: '인증 실패', type:'warn', isWarnIcon:true});
		  }
	}
  })

    useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!isMember) {
        // 로그인 모드일 때
        handleLogin();
      } else {
        // 회원가입 모드일 때: 입력 다 채웠는지 확인
        if (joinusername && joinpassword && confirmPassword && passwordsMatch && isPasswordValid) {
          handleCreateUser();
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
	<>
	<Loading loading={loadingCheckEmail|| loadingLogin || loadingVerifyEmail || loadingCreateUser}/>
		<div className='login-container'>
		{isMember ? (
			<>
			<h2>회원가입</h2>
			<div className='input-with-button'>
				<input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className="input-box" />
			</div>
			
			<div 
				className="input-with-button" 
				>
					{successVerify && 
					<div 
						style={{width:'100%',position:'absolute', height:'100%', background:'transparent'}}
						onClick={() => {
							if(successVerify){
								AlertConfirm({
									text:'다른 이메일로 가입하시겠습니까?',
									isConfirmed:() => {
										setjoinUsername('')
										setCode('')
										setSuccessVerify(false)
									},
									isDenied:() => null
								})
							}
						}}
					/>
					}
				<input
					type="text"
					placeholder="이메일"
					value={joinusername}
					disabled={successVerify}
					onChange={(e) => {
						setjoinUsername(e.target.value)
					}}
					className="input-box"
				/>
				<div className={classNames("verify-button", {'disabled-button': successVerify})}onClick={handleVerifyEmail}>
					{!successVerify ? '이메일 인증' : <FaCheckCircle/>}
				</div>
			</div>

			<div className="input-with-button">
			<input
				type="text"
				placeholder="인증번호"
				value={code}
				disabled={successVerify}
				onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
				className="input-box"
			/>
			<div className={classNames("verify-button", {'disabled-button': successVerify})} onClick={handleCheckEmail}>
				{!successVerify ? '인증번호 확인' : <FaCheckCircle/>}
			</div>
			</div>
			<div className="input-with-button">
			<input type="password" placeholder="비밀번호" value={joinpassword} onChange={(e) => setjoinPassword(e.target.value)} className="input-box" />
			</div>
			<div className="input-with-button">
			<input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-box" />
			</div>
			{!isPasswordValid && joinpassword.length > 0 && <div className="error-message">비밀번호는 8자 이상이며 특수문자를 포함해야 합니다</div>}
			{!passwordsMatch && confirmPassword.length > 0 && <div className="error-message">비밀번호가 일치하지 않습니다</div>}
			<button className="login-button" onClick={handleCreateUser} disabled={!allFieldsFilled || !passwordsMatch || !isPasswordValid || !successVerify}>
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
			<button className="login-button" onClick={handleLogin}>로그인</button>
			</>
		)}
		</div>
	</>
  );
};

export default LoginUI;
