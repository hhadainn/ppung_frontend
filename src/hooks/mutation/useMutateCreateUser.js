import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import url from '../../utils/backend'
import digestPW from "../../utils/digestPw";
const createUser = async ({password, email, name}) => {
	const encryptedPW = await digestPW(password);
	const res = await axios.put(url + '/user/create', {
	  email: email,
	  password: encryptedPW,
	  name: name
	});
	return res.data
};
const useMutateCreateUser = ({onSuccess}) => {
	
	return useMutation({
		mutationFn: createUser,
        onSuccess:(data) => {
			if(onSuccess) onSuccess(data)
        },
		onError:(err) => {
			console.log(err)
		}
    })
}
export default useMutateCreateUser