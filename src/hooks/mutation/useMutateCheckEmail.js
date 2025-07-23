import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import url from '../../utils/backend'
import digestPW from "../../utils/digestPw";
const checkEmail = async ({email, code}) => {
	const res = await axios.post(url + '/user/check/email', {
        email: email,
        code: code
      });
	return res.data
  };
const useMutateCheckEmail = ({onSuccess}) => {
	
	return useMutation({
		mutationFn: checkEmail,
        onSuccess:(data) => {
			if(onSuccess) onSuccess(data)
        },
		onError:(err) => {
			console.log(err)
		}
    })
}
export default useMutateCheckEmail