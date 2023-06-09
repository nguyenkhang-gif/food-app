import { View, Text, TouchableOpacity, ScrollView, CheckBox, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { userInfo, alluserAdress } from '../db.js'
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from '../component/Checkbox.js';
import { AuthContext } from '../context/authcontext.js';
import { createOrder, deleteCart } from '../apicalls.js';
const CheckoutScreen = ({ navigation, route, mainData }) => {
    // user
    const [user, setUser] = useState()
    const data = route.params.mainData
    const { curentUser, logout, refresh, setRefresh } = useContext(AuthContext)

    // sử lý lấy địa chỉ bằng ID
    const getAddressWithID = (ID) => {
        let temp
        alluserAdress.forEach(item => {
            if (item.ID == ID) {
                temp = item.des
            }
        })

        return temp
    }
    const clearCart=()=>{
        data.forEach(item=>{
            deleteCart(curentUser[0].id,item.itemID)
        })
    }
    // sử lý check or uncheck
    const [deliveryPickup, setDeliveryPickup] = useState([true, false])


    useEffect(() => {
        setUser(userInfo[0])
        console.log(JSON.stringify(route.params.mainData))
    }, [])

    return (
        <View style={{ marginTop: 20, flex: 1, backgroundColor: '#EDEDED' }}>
            {/* headers */}
            <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', left: 10 }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>

                <View>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Check out
                    </Text>
                </View>
            </View>


            {/* main */}
            <ScrollView
                style={{
                    // backgroundColor: 'blue',
                    flex: 1,
                    paddingHorizontal: 30,
                }}
            >
                {/* Delivery header */}
                <View
                    style={{
                        alignItems: 'flex-start',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: '700'
                        }}
                    >
                        Delivery
                    </Text>
                </View>
                {/* end of Delivery header */}


                {/* Address detail and change */}
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '600'
                    }}  >
                        Address detail
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#F47B0A'
                        }}>
                            change
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* end of Address detail and change */}
                {/* user name adress phone Number */}
                {curentUser ?
                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 27, marginTop: 10 }}>
                        <Text style={{ margin: 10, paddingBottom: 10, borderBottomColor: '#000000', borderBottomWidth: 0.5, marginHorizontal: 20, fontSize: 20 }}>
                            {curentUser[0].Name}
                        </Text>
                        <Text style={{ margin: 10, paddingBottom: 10, borderBottomColor: '#000000', borderBottomWidth: 0.5, marginHorizontal: 20, fontSize: 20 }}>
                            {curentUser[0].addressDes}
                        </Text>
                        <Text style={{ margin: 10, paddingBottom: 10, marginHorizontal: 20, fontSize: 20 }}>
                            {curentUser[0].phonDes}
                        </Text>
                    </View>
                    : null}
                {/* end of user name adress phone Number */}


                {/* delivery methods */}
                {/* header delivery method */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '600'
                    }}>
                        Delivery method
                    </Text>
                </View>
                {/* end of  header delivery method */}

                {/* Door delivery or Pick up */}
                <View style={{ backgroundColor: 'white', borderRadius: 27 }}>
                    <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', marginTop: 30, paddingBottom: 20, borderBottomColor: '#000000', borderBottomWidth: 0.5 }}>
                        <Checkbox checked={deliveryPickup[0]} onchange={() => { setDeliveryPickup([true, false]) }} />
                        <Text style={{ marginLeft: 30, fontSize: 20, fontWeight: '600' }}>
                            Giao tận nhà
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', marginVertical: 10, paddingBottom: 20 }}>
                        <Checkbox checked={deliveryPickup[1]} onchange={() => { setDeliveryPickup([false, true]) }} />
                        <Text style={{ marginLeft: 30, fontSize: 20, fontWeight: '600' }}>
                            Nhận tại cửa hàng
                        </Text>
                    </View>
                </View>
                {/* end of  Door delivery or Pick up */}

                {/* end of delivery methods */}

            </ScrollView>
            {/* end of main */}
            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                <View style={{ margin: 10 }}>
                    <Text>
                        Tổng tiền: {route.params.total ? route.params.total : 0} đ
                    </Text>
                </View>
                {/* createOrder(curentUser[0].id,curentUser[0].addressDes,curentUser[0].phonDes,'on Going','',JSON.stringify(route.params.mainData),route.params.total) */}
                <TouchableOpacity onPress={() => {
                    console.log(`create order :${JSON.stringify(route.params.mainData)} and total: ${route.params.total}`); 
                    createOrder(curentUser[0].id, curentUser[0].addressDes, curentUser[0].phonDes, 'on Going', '', JSON.stringify(route.params.mainData), route.params.total);
                    clearCart()
                    setRefresh(!refresh)
                    alert('đặt thành công bạn có thể vào phần orders để check tiến độ')
                    navigation.navigate('homescreen')
                }}>
                    <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
                        <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                            xác nhận
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <Text>CheckoutScreen</Text> */}
        </View>
    )
}

export default CheckoutScreen

const styles = StyleSheet.create({})