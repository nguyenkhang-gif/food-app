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