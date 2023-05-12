import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../context/authcontext';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getAllProduct, getOrder, updateUserInfo } from '../apicalls';
import { productsData } from '../db';
const OrderDetailSceen = ({ navigation,route }) => {
    const { curentUser, setCurentUser, refresh, setRefresh,OrderRefresh,setOrderRefresh } = useContext(AuthContext)
    const data = route.params.data
    const phonenum = route.params.phonenum
    const address = route.params.address
    const [mainData, setMainData] = useState()
    const [phone,setPhone]= useState()
    const [addre,setAddress]=useState()
    const [productsData2,setProductData2] = useState([])
    useEffect(() => {
        // setMainData(allcartitem)
        if(curentUser){

            // getFav(curentUser[0].id,[mainData, setMainData])
            getAllProduct([productsData2,setProductData2])
        }
        }, [curentUser])
    // const [phonenumberArray, setPhonenumberArray] = useState([])
    // sủ lý thêm sđt 
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
    const [isLoadData, setIsLoadData] = useState(false)
    const [allOrders, setallOrders] = useState([])
    useEffect(() => {
        // if (curentUser) {
        setMainData(data)
        setAddress(address)
        setPhone(phonenum)
        //   // console.log('getdata',getPhonenum(curentUser[0].id,[phonenumberArray,setPhonenumberArray]))
        //   setIsLoadData(true)
        // }
        if(data)console.log('order detail info: ', data)
    }, [curentUser,data,phonenum,address])
    useEffect(()=>{
        if (curentUser) {
            getOrder(curentUser[0].id, [allOrders, setallOrders])
        }
    },[OrderRefresh])
    const [mainStatus,setmainStatus]= useState('')
    useEffect(()=>{
        // console.log("change")
        if(allOrders.length){
            allOrders.forEach(item=>{
                if(item.ID==route.params.orderID){
                    setmainStatus(item.status)
                }
            })
        }
    },[allOrders])
    return (
        <View style={{ marginTop: 25, height: '100%' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        OrderInfo
                    </Text>
                </View>
                <View>
                </View>
            </View>
            {/* end of Header */}


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
                    {/* <Text
                        style={{
                            fontSize: 30,
                            fontWeight: '700'
                        }}
                    >
                        Delivery
                    </Text> */}
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
                            {addre?addre:null}
                        </Text>
                        <Text style={{ margin: 10, paddingBottom: 10, marginHorizontal: 20, fontSize: 20 }}>
                            {phone?phone:null}
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
                        {/* <Checkbox checked={deliveryPickup[0]} onchange={() => { setDeliveryPickup([true, false]) }} /> */}
                        <Text style={{ marginLeft: 30, fontSize: 20, fontWeight: '600' }}>
                            Giao tận nhà
                        </Text>
                    </View>
                   
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 27,marginTop:10   }}>
                    <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', marginTop: 30, paddingBottom: 20, borderBottomColor: '#000000', borderBottomWidth: 0.5 }}>
                        {/* <Checkbox checked={deliveryPickup[0]} onchange={() => { setDeliveryPickup([true, false]) }} /> */}
                        <Text style={{ marginLeft: 30, fontSize: 20, fontWeight: '600' }}>
                            status : {mainStatus?mainStatus:null}
                        </Text>
                    </View>
                   
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 27,marginTop:10 }}>
                    <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', marginTop: 30, paddingBottom: 20, borderBottomColor: '#000000', borderBottomWidth: 0.5 }}>
                        {/* <Checkbox checked={deliveryPickup[0]} onchange={() => { setDeliveryPickup([true, false]) }} /> */}
                        <Text style={{ marginLeft: 30, fontSize: 20, fontWeight: '600' }}>
                            Item info
                        </Text>
                    </View>
                   
                {/* end of  Door delivery or Pick up */}
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
                                                {productsData2&&getNameWithID(item.itemID)}
                                            </Text>
                                            <Text style={{ fontSize: 17, fontWeight: '600', color: '#FA4A0C' }}>
                                                Amount:{item.amount}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* amount */}
                                    

                                    {/* end of amount */}
                                    {/* remove one item */}
                                    {/* <View style={{ position: 'absolute', right: 7, top: 6 }}>
                                        <TouchableOpacity onPress={()=>{console.log(`handle delete userID ${curentUser[0].id} and itemID: ${item.itemID}`);handleDelete(item.itemID)}}>
                                            <AntDesign name="close" size={24} color="black" style={{fontWeight:'900'}} />
                                        </TouchableOpacity>
                                    </View> */}
                                    {/* end of remove one item */}
                                </View>
                            )
                        }}
                    />
                </View>

                {/* end of delivery methods */}

            </ScrollView>


            {/* end of main */}
        </View>
    )
}

export default OrderDetailSceen


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