import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import url from '../../utils/backend'
import digestPW from "../../utils/digestPw";
const updateScore = async ({email, score}) => {
	console.log(score, 2)
	const res = await axios.post(url + '/user/score', { email: email, score: score });
	return res.data
  };
const useMutateUpdateScore = ({onSuccess}) => {
	
	return useMutation({
		mutationFn: updateScore,
        onSuccess:(data) => {
			if(onSuccess) onSuccess(data)
        },
		onError:(err) => {
			console.log(err)
		}
    })
}
export default useMutateUpdateScore