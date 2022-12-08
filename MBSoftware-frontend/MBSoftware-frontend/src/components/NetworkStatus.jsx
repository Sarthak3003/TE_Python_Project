import React from 'react';
import { toast } from 'react-toastify';



const NetStatusNotification = (isOnline , message ) => {
    if(isOnline){
        // alert(message)
    }
    else{
        alert(message)
    }
}

const networkStatus = () => {
    window.addEventListener("load", () => {
      // 1st, we set the correct status when the page loads
      navigator.onLine
        ? NetStatusNotification(true, "You are online")
        : NetStatusNotification(false, "You are offline.Please try reconnecting to the internet");
  
      // now we listen for network status changes
      window.addEventListener("online", () => {
        NetStatusNotification(true, "You are online back !!");
      });
  
      window.addEventListener("offline", () => {
        NetStatusNotification(false, "Lost Network Connection !!");
      });
    });
  
    return <>
    {}
    </>;
  };

  export default networkStatus;

  