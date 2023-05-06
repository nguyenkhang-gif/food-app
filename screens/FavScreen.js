import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import { productsData, allcartitem } from '../db.js'
import { deleteCart, deleteFav, getAllProduct, getFav, updateCart } from '../apicalls.js';
import { getCart } from '../apicalls.js';
import { AuthContext } from '../context/authcontext.js';
const FavScreen = ({ navigation, route }) => {
    const {curentUser} = useContext(AuthContext)
    const {refresh} = useContext(AuthContext)
    const [mainData, setMainData] = useState([])
    const [productsData2,setProductData2] = useState([])
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
   
    // sử lý thêm số lượng or giảm số lượng
   

    useEffect(() => {
        // setMainData(allcartitem)
        if(curentUser){

            getFav(curentUser[0].id,[mainData, setMainData])
            getAllProduct([productsData2,setProductData2])
        }
        }, [curentUser])
    
    useEffect(()=>{
        console.log('refesh')
        if(curentUser)getFav(curentUser[0].id,[mainData, setMainData])
    },[refresh])
    // handle xóa item
    const handleDelete = (itemID)=>{
        deleteFav(curentUser[0].id,itemID)
        getFav(curentUser[0].id,[mainData, setMainData])
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
                        Fav
                    </Text>
                </View>
            </View>
            {/* end of header */}



            {mainData&&curentUser ?
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
                                                {productsData2&&getNameWithID(item.itemID)}
                                            </Text>
                                            <Text style={{ fontSize: 17, fontWeight: '600', color: '#FA4A0C' }}>
                                                {productsData2&&getPriceWithID(item.itemID)} đ
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* amount */}
                                    

                                    {/* end of amount */}
                                    {/* remove one item */}
                                    <View style={{ position: 'absolute', right: 7, top: 6 }}>
                                        <TouchableOpacity onPress={()=>{console.log(`handle delete userID ${curentUser[0].id} and itemID: ${item.itemID}`);handleDelete(item.itemID)}}>
                                            <AntDesign name="close" size={24} color="black" style={{fontWeight:'900'}} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* end of remove one item */}
                                </View>
                            )
                        }}
                    />


                    {/* end of main cart where all item in cart  */}
                </View>

                :!curentUser?
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 25, height: '100%' }}>
                     {/* Header */}
                     
                    {/* end of Header */}
                    <View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Loginregisterscreen')}}>
                            <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center',marginTop:20 }, styles.buttonShadowEff]}>
                                <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                                    login
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>:null
            }
           
        </View>
    )
}

export default FavScreen

const styles = StyleSheet.create({})