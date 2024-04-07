import {getAllUsers } from '@/api-client/user-api';
import { User } from '@/types';
import { useQuery } from 'react-query';

const useAllUsers = () => {
  
  const{data,isLoading,isError}=useQuery("getAllUsers",getAllUsers);
 
   const otherUsers:User[]=data?.users;

  return { otherUsers, isLoading, isError };
};

export default useAllUsers;
