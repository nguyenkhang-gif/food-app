import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import { productsData, allcartitem } from '../db.js'
import { deleteCart, getAllProduct, updateCart } from '../apicalls.js';
import { getCart } from '../apicalls.js';
import { AuthContext } from '../context/authcontext.js';
const CartScreen = ({ navigation, route }) => {
    const { curentUser, refresh, setRefresh } = useContext(AuthContext)
    const [mainData, setMainData] = useState([])
    const [productsData2, setProductData2] = useState([])
    // sử lý lấy thông tin từ cart để render
    const getimgurlwithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.imgurl
            }
        })
        return temp
    }
    const getNameWithID = (ID) => {
        let temp
        productsData2.forEach(item => {
            if (item.ID == ID) {
                // console.log('name',item)
                temp = item.Name
            }
        })
        return temp
    }
    const getPriceWithID = (ID) => {
        let temp
        productsData2.forEach(item => {
            if (item.ID == ID) {
                temp = item.price
            }
        })
        return temp
    }
    const getTotalPRice = () => {
        let final = 0
        mainData.forEach(item => {
            final += getPriceWithID(item.itemID) * item.amount
        })
        return final
    }
    // sử lý thêm số lượng or giảm số lượng
    const updateAmount = (method, ID) => {
        let tempArray = [...mainData]
        if (method == '-') {
            tempArray.forEach(item => {
                if (item.itemID == ID) {
                    const temp = item.amount--
                    updateCart(curentUser[0].id, ID, Number(temp) - 1)
                }
            })
            setMainData(tempArray)

        }
        if (method == '+') {
            tempArray.forEach(item => {
                if (item.itemID == ID) {
                    // item.amount++
                    const temp = item.amount++
                    updateCart(curentUser[0].id, ID, Number(temp) + 1)
                }
            })
            setMainData(tempArray)
        }

    }

    useEffect(() => {
        // setMainData(allcartitem)
        if(curentUser){

            getCart(curentUser[0].id, [mainData, setMainData])
            getAllProduct([productsData2, setProductData2])
        }
    }, [refresh])

    // handle xóa item
    const handleDelete = (itemID) => {
        deleteCart(curentUser[0].id, itemID)
        getCart(curentUser[0].id, [mainData, setMainData])
        setRefresh(!refresh)
    }

    // const get time
    const getTime = () => {
        let ms = Date.now();
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;

        let years = Math.round(Date.now() / year);
        return years
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return (
        <View style={{ top: 20, flex: 1, position: 'relative' }}>
            {/* header */}
            <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', left: 10 }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Cart
                    </Text>
                </View>
            </View>
            {/* end of header */}



            {mainData ?
                <View style={{ flex: 1 }}>
                    {/* main cart where all item in cart  */}
                    <FlatList
                        data={mainData}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[{
                                    position: 'relative',
                                    height: 120,
                                    marginVertical: 5,
                                    marginHorizontal: 30,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    borderRadius: 20
                                },
                                index == mainData.length - 1 ? { marginBottom: 100 } : null
                                ]}>
                                    <View style={{ height: 75, width: 75, marginHorizontal: 20, borderRadius: 70, overflow: 'hidden' }}>
                                        <Image
                                            source={getimgurlwithID(item.itemID)}
                                            style={{ resizeMode: 'cover', height: 75, width: 75 }}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => { navigation.navigate('Fooditemdetails', { ID: item.itemID }) }} >

                                            <Text style={{ fontSize: 20, fontWeight: '700' }}>
                                                {productsData2 && getNameWithID(item.itemID)}
                                            </Text>
                                            <Text style={{ fontSize: 17, fontWeight: '600', color: '#FA4A0C' }}>
                                                {productsData2 && getPriceWithID(item.itemID)} đ
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* amount */}
                                    <View style={{ position: 'absolute', flexDirection: 'row', height: 30, width: 80, backgroundColor: '#FA4A0C', bottom: 20, right: 15, borderRadius: 20 }}>
                                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { updateAmount('-', item.itemID) }}>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', fontWeight: '800' }}>
                                                    -
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flex: 1 }} >
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                {/* ghi số vào */}
                                                <Text style={{ fontSize: 20, color: 'white', fontWeight: '600' }}>
                                                    {item.amount}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { updateAmount('+', item.itemID) }}>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 20, color: 'white', fontWeight: '600' }}>
                                                    +
                                                </Text>
                                            </View> 
                                        </TouchableOpacity>
                                    </View>

                                    {/* end of amount */}
                                    {/* remove one item */}
                                    <View style={{ position: 'absolute', right: 7, top: 6 }}>
                                        <TouchableOpacity onPress={() => { console.log(`handle delete userID ${curentUser[0].id} and itemID: ${item.itemID}`); handleDelete(item.itemID) }}>
                                            <AntDesign name="close" size={24} color="black" style={{ fontWeight: '900' }} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* end of remove one item */}
                                </View>
                            )
                        }}
                    />


                    {/* end of main cart where all item in cart  */}
                </View>

                :
                <View style={{ flex: 1 }}>
                    <Text>
                        không tìm thấy sản phẩm hoặc bạn chưa chọn sản phẩm
                    </Text>
                </View>
            }
            <View style={{ height: 100, width: '100%', position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                {/* total */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', paddingHorizontal: 10 }}>
                        Tổng tiền:
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: '600', }}>
                        {mainData ? getTotalPRice() : 0} đ
                    </Text>
                </View>
                {/* end of total */}
                <TouchableOpacity onPress={() => { navigation.navigate('Checkout', { mainData, total: getTotalPRice() }); console.log(formatDate( Date.now())) }}>
                    <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
                        <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                            Thanh toán
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({})