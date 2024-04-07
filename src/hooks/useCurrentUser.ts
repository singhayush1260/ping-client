import { getCurrentUser } from '@/api-client/user-api';
import { User } from '@/types';
import { useQuery } from 'react-query';

const useCurrentUser = () => {
  
  const{data,isLoading,isError}=useQuery("getCurrentUser",getCurrentUser);
    
   //console.log("current user from useCrrentUser",data);
 
   const currentUser:User=data;

  return { currentUser, isLoading, isError };
};

export default useCurrentUser;
