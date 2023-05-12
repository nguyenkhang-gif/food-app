import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../context/authcontext';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getOrder, updateUserInfo } from '../apicalls';
const AllOrderScreen = ({ navigation }) => {
    const { curentUser, setCurentUser, refresh, setRefresh,OrderRefresh,setOrderRefresh } = useContext(AuthContext)

    const [mainData, setMainData] = useState([])

    // const [phonenumberArray, setPhonenumberArray] = useState([])
    // sủ lý thêm sđt 

    useEffect(() => {
        if (curentUser) {
            getOrder(curentUser[0].id, [mainData, setMainData])
        }
        console.log(mainData)
    }, [curentUser, refresh,OrderRefresh])
    useEffect(() => {
        if (mainData.length) {
            // console.log("orders: ", JSON.parse(mainData[0].OrderInfo)[0].itemID)

        }
    }, [mainData])

    const [isLoadData, setIsLoadData] = useState(false)
    useEffect(() => {
        // if (curentUser) {

        //   // console.log('getdata',getPhonenum(curentUser[0].id,[phonenumberArray,setPhonenumberArray]))
        //   setIsLoadData(true)
        // }

    }, [curentUser])


    return (
        <View style={{ marginTop: 25, height: '100%' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Orders
                    </Text>
                </View>
                <View>
                </View>
            </View>
            {/* end of Header */}


            {/* main */}
            {curentUser ?
                <ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
                    {/* name */}
                    {/* 1 order */}
                    <TouchableOpacity >
                        <View style={[{ flexDirection: 'row', height: 50, backgroundColor: 'white', marginTop: 10, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 20 }, styles.shadowEff]}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>
                                ID
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>
                                Total
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>
                                status
                            </Text>

                        </View>
                    </TouchableOpacity>

                    {mainData.length ?
                        <FlatList
                            data={mainData}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => { navigation.navigate('orderDetail',{data:JSON.parse( item.OrderInfo),phonenum:item.phonenumID,address:item.addressID,status:item.status,orderID:item.ID}) }}>
                                        <View style={[{ flexDirection: 'row', height: 50, backgroundColor: 'white', marginTop: 10, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 20 }, styles.shadowEff]}>
                                            <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                                {item.ID}
                                            </Text>
                                            <Text style={{ fontSize: 16, fontWeight: '500',color:'#FA4A0C' }}>
                                                {item.Total} đ
                                            </Text>
                                            {item.status == "on Going" ?
                                                <Text style={{ fontSize: 16, fontWeight: '500', color: 'red' }}>
                                                    {item.status}
                                                </Text>
                                                : item.status == "Done" ?
                                                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'green' }}>
                                                        {item.status}
                                                    </Text>
                                                    : null}

                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        : null}


                    {/* end of name */}

                </ScrollView>
                : null}



            {/* end of main */}
        </View>
    )
}

export default AllOrderScreen


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
    },
    buttonShadowEff: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    }
})