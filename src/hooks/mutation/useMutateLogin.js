import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import url from '../../utils/backend'
import digestPW from "../../utils/digestPw";
const login = async ({email, password}) => {
	const encryptedPW = await digestPW(password)
	const res = await axios.post(url + '/user/login', { email: email, password: encryptedPW });
	return res.data
  };
const useMutateLogin = ({onSuccess}) => {
	
	return useMutation({
		mutationFn: login,
        onSuccess:(data) => {
			if(onSuccess) onSuccess(data)
        },
		onError:(err) => {
			console.log(err)
		}
    })
}
export default useMutateLogin