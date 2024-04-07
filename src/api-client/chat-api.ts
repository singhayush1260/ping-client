const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createChat=async(formData:any)=>{

  const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method:"POST",
      credentials: "include",
      body:formData
    });
    if(!response.ok){
      if (response.status === 400) {
            const error = await response.json();
            throw new Error(error.message || "Bad Request");
          }
          else{
            throw new Error("Failed to create chat");
          }
    }
   return response.json();
}


export const getChatById=async(chatId:string)=>{
    const response = await fetch(`${API_BASE_URL}/api/chat/${chatId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error getting chat by Id");
      }
    return response.json();
}


export const getAllChats=async()=>{
    const response = await fetch(`${API_BASE_URL}/api/chat/`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error getting  all chats");
      }
    return response.json();
}

export const editGroupChat=async(formData:any)=>{
console.log("formdata from editGroupChat",formData.get("newThumbnail"))
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method:"PUT",
      credentials: "include",
      body:formData
    });
    if(!response.ok){
      if (response.status === 400) {
            const error = await response.json();
            throw new Error(error.message || "Bad Request");
          }
          else{
            throw new Error("Something went wrong!.");
          }
    }
   return response.json();
}

export const deleteChatById=async(chatId:string)=>{
  const response = await fetch(`${API_BASE_URL}/api/chat/${chatId}`, {
      method:"DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error deleting chat");
    }
  return response.json();
}



