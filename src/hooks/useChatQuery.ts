import { getAllChats as getAllChatsApi, getChatById as getChatByIdApi } from "@/api-client/chat-api";
import { useQuery } from "react-query";



const useChatQuery=(chatId?:string)=>{
const {data:chats,isLoading:isLoadingAllChats,error:gettingAllChatsError,refetch:refetchAllChats}=useQuery("getAllChats",getAllChatsApi,{
    enabled:false
});

const {data:chat,isLoading:isLoadingChatById,error:gettingChatByIdError,refetch: refetchChatById}=useQuery(["getChatById",chatId],()=>getChatByIdApi(chatId || ""),{
    enabled:!!chatId
});


const getAllChats=()=>{
    refetchAllChats();
}

const getChatById=()=>{
    refetchChatById();
}


return {
    getAllChatQueryName:"getAllChats", getAllChats,chats,isLoadingAllChats,gettingAllChatsError,
    getChatById,chat,isLoadingChatById,gettingChatByIdError
}
}
export default useChatQuery;