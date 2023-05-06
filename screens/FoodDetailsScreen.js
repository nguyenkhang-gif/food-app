import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { productsData } from '../db';
import { ScrollView } from 'react-native';
import { createCart, createFav, deleteFav, getAllProduct, getCart, getFav, updateCart } from '../apicalls';
import { getimurlwithID } from '../Funstions';
import { AuthContext } from '../context/authcontext';

const FoodDetailsScreen = ({navigation, route }) => {
    // sử lý khi nhấn nút tim thích or not
    const [isFav, setIsfav] = useState(false)
    const [itemInfo, setItemInfo] = useState()
    const fetchData = () => {
        setItemInfo(productsData[ID-1])
    }
    const {curentUser,setRefresh,refresh} = useContext(AuthContext)
    const [mainData,setMainData]= useState([])
    const [allFav,setAllFav]= useState([])
    // lấy "link" 
    const ID = route.params.ID // xem như đây là prop sẽ truyen2 vào 
    // sử lý fav khi click 
    const handleFavClick = ()=>{
        if(!isFav){
            if(curentUser) {createFav(curentUser[0].id,ID)}
            setIsfav(true)
        }
        if(isFav) {
            setIsfav(false)
            if(curentUser)deleteFav(curentUser[0].id,ID)
        }
        setRefresh(!refresh)
        // console.log('refresh change')
    }



    // sử lý check all fav của 1 user 

    useEffect(()=>{
        // console.log('debug')
        if(curentUser){ allFav.forEach(item=>{
            if(item.itemID==ID)setIsfav(true)
        })}
    },[allFav])

    useEffect(()=>{
        if(curentUser)getFav(curentUser[0].id,[allFav,setAllFav])
    },[curentUser])

    useEffect(() => {
        fetchData()
        getAllProduct([mainData,setMainData])
        // if(curentUser)getFav(curentUser[0].id,[allFav,setAllFav])
        // console.log("itemID",ID)
        // console.log("userID",curentUser[0].id)
    }, [])
    useEffect(() => {
        mainData.forEach(item=>{
            if(item.ID==ID){
                setItemInfo(item)
            }
        })
    }, [mainData])

    const [tempData,setTempData]= useState([])
    // sử lý thêm cart
    useEffect(()=>{
        if(curentUser){
            getCart(curentUser[0].id,[tempData,setTempData])
        }
    },[])
     // sử lý thêm vào giỏ hàng 
     const handleAddCart = ()=>{
        if(!curentUser){
            alert('bạn chưa đăng nhập')
        }else {
            // nếu chưa có sản phẩm trong cart 
            if(!tempData.length){
                createCart(curentUser[0].id,ID)
                // setTempData([{ID:curentUser[0].id,itemID:ID,amount:1}])
                getCart(curentUser[0].id,[tempData,setTempData])
                alert('thêm thành công')
            }
            if(tempData.length){
                let isInCart = false;
                tempData.forEach(item=>{
                    if(item.itemID==ID){
                        console.log('update: ',item.amount+1)
                        updateCart(curentUser[0].id,ID,Number(item.amount)+1)
                        // getCart(curentUser[0].id,[tempData,setTempData])
                        alert('đã thêm 1 sản phẩm cùng tên vào giỏ hàng')
                        isInCart=true
                    }
                })
                if(!isInCart){
                    createCart(curentUser[0].id,ID)
                    alert('đã thêm 1 sản phẩm  vào giỏ hàng')
                }
                getCart(curentUser[0].id,[tempData,setTempData])
            }
        }
    }


    return (
        // <SafeAreaView>
            <View style={{ marginTop: 25, height: '100%' }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} >
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    {/* isFav ? setIsfav(false); : setIsfav(true)  */}
                    <TouchableOpacity onPress={() => { handleFavClick()}}>
                        {!isFav ? <AntDesign name="hearto" size={24} color="black" /> : <AntDesign name="heart" size={24} color="black" />}
                    </TouchableOpacity>
                </View>
                {/* end of Header */}

                {/* item image  */}
                <ScrollView>

                    <View>
                        {itemInfo ?
                            <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                                <View style={[{ backgroundColor: 'white', borderRadius: 125, width: 250, height: 250 ,overflow:'hidden'}, styles.shadowEff]}>
                                    <Image
                                        source={getimurlwithID(itemInfo.ID)}
                                        style={{ width: 250, height: 250, resizeMode: 'cover' }}
                                    />
                                </View>
                                <Text style={{ marginTop: 20, fontSize: 30, fontWeight: '600' }}>
                                    {itemInfo.Name}
                                </Text>
                                <Text style={{ marginTop: 20, fontSize: 25, fontWeight: '700', color: '#FA4A0C' }}>
                                    {itemInfo.price}đ
                                </Text>
                                {/* container policy */}
                                <View>
                                    <View style={{ width: 300 }}>
                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>
                                            Thông tin của món ăn
                                        </Text>
                                        <Text style={{ minHeight: 60, fontSize: 18 }} >
                                            {itemInfo.des}
                                        </Text>
                                    </View>

                                    <View style={{ width: 300 }}>
                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>
                                            chính sách giao hàng tận nhà
                                        </Text>
                                        <Text style={{ minHeight: 60, fontSize: 18 }} >
                                            Thức ăn luôn nóng khi đến tay khách hàng, nếu không sẽ hoàn trả 200% giá tiền món ăn
                                        </Text>
                                    </View>
                                </View>
                                {/* end of container policy */}
                            </View> : null}

                        {/* button thêm vào  */}
                        <View style={{ alignItems: 'center',marginVertical:20,marginBottom:100 }}>
                            <TouchableOpacity onPress={()=>{handleAddCart()}}>
                                <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
                                    <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                                        Thêm vào giỏ hàng
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* end of button thêm vào  */}

                    </View>
                </ScrollView>
                {/* end of item image  */}



                {/* <Text>FoodDetailsScreen</Text> */}
            </View>
        // {/* </SafeAreaView> */}
    )
}

export default FoodDetailsScreen

const styles = StyleSheet.create({
    shadowEff: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})
