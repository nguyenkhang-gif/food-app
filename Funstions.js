import { productsData } from "./db"



export  const getimurlwithID = (ID) => {
    let temp
    productsData.forEach(item => {
        if (item.id == ID) {
            temp = item.imgurl
        }
    })
    return temp
}


export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };