import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import url from '../../utils/backend'
import digestPW from "../../utils/digestPw";
const login = async ({email}) => {
	const res = await axios.post(url + '/user/verify/email', { email: email });
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