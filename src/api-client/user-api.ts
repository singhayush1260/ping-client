const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getCurrentUser = async ()=> {
    const response = await fetch(`${API_BASE_URL}/api/user/current-user`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error fetching current user");
    }
    return response.json(); 
  }; 

  export const getUserById=async(userId:string)=>{
    
    const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error getting user by id");
      }
    return response.json();
}

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/all`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const updateUser = async (formData: any) => {

    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "PUT",
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

