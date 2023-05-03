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