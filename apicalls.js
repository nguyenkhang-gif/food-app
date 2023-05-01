import axios from "axios";
export  const getAllProduct = async ([data,setdata]) => {
    // let final
    try{
        axios.get(`http://10.0.2.2//food-app-api/product/read.php`)
        .then((res) => {
            // console.log(res.data)
            setdata(res.data)
        })
    }catch(err){

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