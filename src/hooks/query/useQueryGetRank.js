import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import url from '../../utils/backend'
const getRank = async(email) => {
	const res = await axios.get(url + '/user/rank?email=' + encodeURIComponent(email));
	return res.data
}
const useQueryGetRank = ({email}) => {
	
	return useQuery({
		queryKey:['rank'],
		queryFn: () => getRank(email),
		enabled: !!email
    })
}
export default useQueryGetRank