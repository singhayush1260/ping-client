const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendConnectionRequest = async (receiverId:string) => {
       const response = await fetch(`${API_BASE_URL}/api/connection-request/send`, {
         method: "POST",
         credentials: "include",
         headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({receiverId})
       });
   
       if (!response.ok) {
         if (response.status === 400) {
           const error = await response.json();
           throw new Error(error.message || "Bad Request");
         } else {
           throw new Error("Failed to send request");
         }
       }
       return response.json();
   };

   export const acceptConnectionRequest = async (connectionRequest:any) => {
       const response = await fetch(`${API_BASE_URL}/api/connection-request/accept`, {
         method: "POST",
         credentials: "include",
         headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({connectionRequest})
       });
   
       if (!response.ok) {
         if (response.status === 400) {
           const error = await response.json();
           throw new Error(error.message || "Bad Request");
         } else {
           throw new Error("Failed to accept request");
         }
       }
       return response.json();
   };

   export const declineConnectionRequest = async (connectionRequest:any) => {
       const response = await fetch(`${API_BASE_URL}/api/connection-request/decline`, {
         method: "POST",
         credentials: "include",
         headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({connectionRequest})
       });
   
       if (!response.ok) {
         if (response.status === 400) {
           const error = await response.json();
           throw new Error(error.message || "Bad Request");
         } else {
           throw new Error("Failed to decline request.");
         }
       }
       return response.json();
   };


   export const getConnectionRequests = async (type:"sent" | "received"|"") => {
       const response = await fetch(`${API_BASE_URL}/api/connection-request?type=${type}`, {
         method: "GET",
         credentials: "include",
         headers: {
          "Content-Type": "application/json",
        },
       });
   
       if (!response.ok) {
        throw new Error("Error getting chat by Id");
      }
    return response.json();
   };
  
  