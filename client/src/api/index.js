import { toast } from "react-toastify";
import { auth } from "../config/fibase.config";
import { baseURL } from "../utils/helper";

export const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred
          .getIdToken()
          .then(async (token) => {
            try {
              const response = await fetch(`${baseURL}/validateUserJWTToken`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });

              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }

              const data = await response.json();
              resolve(data?.user);
            } catch (error) {
              console.error("Error during fetch:", error);
              reject(error);
            }
          })
          .finally(() => {
            // Make sure to stop the unsubscribe from the listener to prevent memory leaks
            unsubscribe();
          });
      } else {
        reject(new Error("User is not authenticated"));
        // Make sure to stop the unsubscribe from the listener to prevent memory leaks
        unsubscribe();
      }
    });
  });
};

export const saveAppDataToCloud = async (data) => {
  try {
    const res = await fetch(`${baseURL}/createNewApp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("failed to create an app");
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    // toast.success("Data saved in the cloud");
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

export const getAllAppsFromTheCloud = async () => {
  try {
    const res = await fetch(`${baseURL}/getAllApps`);
    if (!res.ok) {
      toast.error("failed to create an app");
    }
    const apps = await res.json();
    return apps;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

// delete app from cloud
export const deleteAnAppFromCloud = async (id) => {
  try {
    const res = await fetch(`${baseURL}/deleteAnApp?id=${id}`);
    if (!res.ok) {
      toast.error("Failed to delete an app");
    }
    const message = await res.json();
    return message;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

// function to call the api endpoint to getall users
export const getAllUsersFromTheCloud = async ()=>{
  try{
    const res=  await fetch(`${baseURL}/getAllUsers`)
    if(!res.ok){
      toast.error("failed to create an app")
    }
    const users = await res.json();
    return users;
  }catch (error) {
    toast.error(`Error: ${error}`);
  }
}

export const updateUserDataToCloud = async (data) => {
  try {
    const res = await fetch(`${baseURL}/updateTheUsersRole`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("failed to create an app");
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    // toast.success("Data saved in the cloud");
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};