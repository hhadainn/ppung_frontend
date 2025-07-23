import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import url from '../../utils/backend'
import digestPW from "../../utils/digestPw";
const verifyEmail = async ({email}) => {
	const res = await axios.post(url + '/user/verify/email', { email: email });
	return res.data
  };
const useMutateVerifyEmail = ({onSuccess}) => {
	
	return useMutation({
		mutationFn: verifyEmail,
        onSuccess:(data) => {
			if(onSuccess) onSuccess(data)
        },
		onError:(err) => {
			console.log(err)
		}
    })
}
export default useMutateVerifyEmail