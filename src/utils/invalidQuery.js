import { queryClient } from "../index"
// import { useQueryClient} from '@tanstack/react-query'

const invalidQuery = ({queryKey = [], predicate}) => {
    // const queryClient = useQueryClient();
    let query = {}
    if(queryKey?.length >= 1){
        query.queryKey = queryKey
    }
    if(predicate){
        query.predicate = predicate
    }
    if(Object.keys(query)?.length >= 1){
        queryClient.invalidateQueries(
            query,
        );
        return;
    }
    else{
        return null;
    }
}

export default invalidQuery