import axios from "axios";
export const getAllProduct = async ([data, setdata]) => {
    // let final
    try {
        axios.get(`http://10.0.2.2//food-app-api/product/read.php`)
            .then((res) => {
                // console.log(res.data)
                setdata(res.data)
            })
    } catch (err) {

    }
    // axios.post(`http://10.0.2.2//food-app-api/test.php`, { content: 'nguyen', dcontent: 1 })
    // .then((res) => {
    //     console.log(JSON.stringify(res.data[0]))
    //     setTempData(res.data)
    //     alert('work')
    // }) .catch((error) => {
    //     // Handle any errors that occur
    //     console.error(error);
    // });

    // return final
}

export const register = async (data) => {
    // console.log(data.email)
    try {
        axios.post(`http://10.0.2.2//food-app-api/user/register.php`, { email: data.email, password: data.password })
            .then((res) => {
                console.log("user have been create")
                // setdata(res.data)
            })
    } catch (err) {
        console.log(err)
    }
}
export const updateUserInfo = async (data) => {
    // // console.log(data.email)
    try {
        axios.post(`http://10.0.2.2//food-app-api/user/update.php`,
            {
                id: data.id,
                email: data.email,
                password: data.password,
                name: data.Name,
                username:data.userName
            })
            .then((res) => {
                console.log("user have been create")
                // setdata(res.data)
            })
    } catch (err) {

    }
    console.log(data.id)
}


// phone num section


export const updatePhoneNum = async (ID, desc) => {
    try {
        axios.post(`http://10.0.2.2//food-app-api/phonenum/update.php`, { userID: ID, des: desc })
            .then((res) => {
                console.log("phone num has been edited")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const createPhoneNum = async (ID, desc) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://10.0.2.2//food-app-api/phonenum/create.php`, { userID: ID, des: desc })
            .then((res) => {
                console.log("phone num has been added")
                // setdata(res.data)
            })
    } catch (err) {

    }
}



// fav option
export const createFav = async (userID,itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://10.0.2.2//food-app-api/fav/create.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("fav num has been added")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const getFav = async (userID,[data, setdata]) => {//ID là user ID desc là sđt của user 
    
    try {
        axios.post(`http://10.0.2.2//food-app-api/fav/read.php`, { userID: userID})
            .then((res) => {
                console.log("fav num has been calls: ", res.data)
                if(res.data!='none'){
                    console.log('there is a res')
                    setdata(res.data)
                }
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const deleteFav = async (userID,itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://10.0.2.2//food-app-api/fav/delete.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("fav num has been delete")
                // setdata(res.data)
            })
    } catch (err) {

    }
}





//  cart
export const createCart = async (userID,itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://10.0.2.2//food-app-api/cart/create.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("fav num has been added")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const deleteCart = async (userID,itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://10.0.2.2//food-app-api/cart/delete.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("cart num has been delete")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const updateCart = async (userID,itemID,amount) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://10.0.2.2//food-app-api/cart/update.php`, { userID: userID, itemID: itemID,amount:amount })
            .then((res) => {
                console.log("fav num has been added")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const getCart = async (userID,[data,setdata]) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://10.0.2.2//food-app-api/cart/read.php`, { userID: userID})
            .then((res) => {
                console.log("fav num has been added")
                if(res.data!='none')setdata(res.data)
            })
    } catch (err) {

    }
}