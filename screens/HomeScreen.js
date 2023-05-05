import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';
import { productsData } from '../db';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAllProduct } from '../apicalls';
import { AuthContext } from '../context/authcontext';
// import { Value } from 'react-native-reanimated';


const HomeScreen = ({ navigation }) => {

    const { curentUser } = useContext(AuthContext)

    const getimurlwithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.imgurl
            }
        })
        return temp
    }

    const [foodData, setFoodData] = useState([])

    useEffect(() => {

        getAllProduct([foodData, setFoodData])

        // setFoodData(productsData)
        // fetchFoodData()
    }, [])
    // fetch data

    // sử lý đi đến screen search 
    const [searchValue, SetSearchValue] = useState('')



    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* container all */}
            <View style={{ flex: 1, top: 20 }}>

                {/* topheader section */}
                <View style={{ height: 80, width: '100%', padding: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity>
                        {curentUser ?
                            <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                <Ionicons name="person" size={30} color="black" />
                                <View>
                                    <Text style={{fontWeight:'500'}}>@{curentUser[0].Username}</Text>
                                    <Text>{curentUser[0].Name}</Text>
                                </View>
                            </View>
                            : <Ionicons name="menu" size={24} color="black" onPress={() => { alert('handle menu click') }} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Cartscreen') }}>
                        <Feather name="shopping-cart" size={24} color="black" style={{ marginTop: 7 }} />
                    </TouchableOpacity>
                </View>
                {/* end of topheader section */}

                {/* title container */}
                <View style={{ marginLeft: 30 }}>
                    <Text style={{ fontSize: 24, fontWeight: 700 }}>
                        Delicious
                    </Text>
                    <Text style={{ fontSize: 24, fontWeight: 700 }}>
                        food for you
                    </Text>
                </View>
                {/* end of title container */}

                {/* search bar */}

                <View style={{ marginLeft: 30, marginTop: 20, marginRight: 30, borderColor: 'black', borderWidth: 1, borderRadius: 30 }}>
                    <View style={{ position: 'relative' }}>
                        <AntDesign name="search1" size={24} color="black" style={{ position: 'absolute', top: 10, left: 4 }} />
                        <TextInput onSubmitEditing={(e) => { navigation.navigate('SearchProduct', { searchValue }) }} placeholder='tìm' style={{ paddingLeft: 40, padding: 8 }} onChangeText={(e) => { SetSearchValue(e) }} />
                    </View>
                </View>
                {/* end of search bar */}

                {/* product section */}

                <View>
                    {/* catagory navbar */}
                    <View style={{ marginLeft: 30, marginTop: 20, flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <View style={{ paddingHorizontal: 20, paddingBottom: 10, borderColor: '#FA4A0C', borderBottomWidth: 2 }}>
                                <Text style={{ color: '#FA4A0C' }}>Foods</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                                <Text style={{ opacity: 0.8 }}>Drinks</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                                <Text style={{ opacity: 0.8 }}>Snack</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* end of catagory navbar  */}
                </View>


                {/* container all product */}
                <View style={{ marginTop: 40, position: 'relative' }}>
                    <View style={{
                        position: 'absolute',
                        right: 20,
                        top: -20
                    }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('SearchProduct', { searchValue: '' }) }}>
                            <Text style={{ color: '#FA4A0C', fontWeight: '600' }}>see more</Text>
                        </TouchableOpacity>
                    </View>
                    {/* start of one product */}
                    {/* <View style={[{ marginTop: 40, height: 160, width: 140, borderRadius: 15, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center' }, styles.shadowEff]}>
                        <Image
                            source={require('../assets/hambuger.png')}
                            style={{ width: 100, height: 100, resizeMode: 'cover', top: -40 }}
                        />
                        <View style={{ top: -25 }}>
                            <Text style={{ fontSize: 18, fontWeight: 650 }}>
                                Hủ Tiếu
                            </Text>
                        </View>
                        <View style={{ top: -15 }}>
                            <Text style={{ fontSize: 18, fontWeight: 700, color: '#FA4A0C' }}>
                                20000 đ
                            </Text>
                        </View>
                    </View> */}
                    <FlatList
                        data={foodData}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => { navigation.navigate('Fooditemdetails', { ID: item.ID }) }}>

                                    <View style={[{ marginTop: 40, height: 160, width: 140, borderRadius: 15, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center', margin: 20 }, styles.shadowEff]}>
                                        <Image
                                            source={getimurlwithID(item.ID)}
                                            style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 50, top: -40 }}
                                        />
                                        <View style={{ top: -25 }}>
                                            <Text style={{ fontSize: 18, fontWeight: '600' }}>
                                                {item.Name}
                                            </Text>
                                        </View>
                                        <View style={{ top: -15 }}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#FA4A0C' }}>
                                                {item.price} đ
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        horizontal={true}
                        keyExtractor={(item) => item.ID}
                    />
                    {/* end of one product */}
                </View>

                {/* end of container all product */}

                {/* end of product section */}
            </View>
        </SafeAreaView>
    )
}

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


export default HomeScreen