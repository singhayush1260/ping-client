
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendMessage=async(messageData:any)=>{
  const response = await fetch(`${API_BASE_URL}/api/message`, {
      method:"POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(messageData)
    });
    if (!response.ok) {
      throw new Error("Error sending message");
    }
  return response.json();
}

export const sendImage = async (formData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/message`, {
    method: "POST",
    credentials: "include",
    body: formData
  });

  if (!response.ok) {
    if (response.status === 400) {
      const error = await response.json();
      throw new Error(error.message || "Bad Request");
    } else {
      throw new Error("Failed to update user");
    }
  }
  return response.json();
};

export const markAsSeen=async(messageId:string)=>{

  const response = await fetch(`${API_BASE_URL}/api/message/seen`, {
      method:"POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({messageId})
    });
    if (!response.ok) {
   
      throw new Error("Error sending message");
    }
   
  return response.json();
}

export const getAllMessages=async(chatId:string)=>{
    const response = await fetch(`${API_BASE_URL}/api/message/${chatId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error getting  all chats");
      }
    return response.json();
}



