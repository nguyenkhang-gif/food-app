import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { productsData, profile } from '../db';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../context/authcontext';
import EditUserInfoScreen from './EditUserInfoScreen';

const ProfileScreen = ({navigation}) => {
    // lấy user info 
    const [userInfo, setUserInfo] = useState()
    const { curentUser,logout,refresh, setRefresh } = useContext(AuthContext)
    useEffect(() => {
        setUserInfo(profile[0])
        // setOpenUpdate(false)
    }, [])
    // sử lý update
    const [openUpdate,setOpenUpdate] =useState(false)

    return (
        <SafeAreaView>
            {curentUser!=null ?
                <View style={{ marginTop: 25, height: '100%' }}>
                    {/* Header */}
                    <View style={{ flexDirection: 'row', height: 26, marginTop: 20, marginBottom: 20, position: 'relative' }}>
                        <TouchableOpacity style={{ position: 'absolute', left: 20 }}>
                            {/* <AntDesign name="left" size={24} color="black" />    */}
                        </TouchableOpacity>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>
                                My Profile
                            </Text>
                        </View>
                    </View>
                    {/* end of Header */}
                    {/* basic info container */}
                    <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                        <Text style={{ marginBottom: 15, fontSize: 20, fontWeight: '600' }}>
                            Information
                        </Text>
                        {/* container main */}
                        {userInfo ? <View style={[{ flexDirection: 'row', padding: 10, backgroundColor: 'white', borderRadius: 20 }, styles.shadowEff]}>
                            <Image
                                source={userInfo.imgurl}
                                style={{ resizeMode: 'cover', height: 100, width: 100, borderRadius: 20, marginBottom: 40 }}
                            />
                            <View style={{ justifyContent: 'space-around' }}>
                                <Text style={{ fontSize: 25, fontWeight: '700' }}>
                                    {curentUser ? curentUser[0].Name : 'null'}
                                </Text>
                                <Text>
                                    {curentUser ? curentUser[0].Email : null}
                                </Text>
                                <Text>
                                    {userInfo ? userInfo.des : null}
                                </Text>

                            </View>
                        </View> : null}


                        {/* end of container main */}
                    </View>
                    {/* end of basic info contianer */}

                    {/* Orders and review pending */}
                    <View>
                        <TouchableOpacity onPress={()=>{navigation.navigate('allOrder')}}>
                            <View style={[{ flexDirection: 'row', height: 50, backgroundColor: 'white', marginTop: 20, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 20 }, styles.shadowEff]}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                    Orders
                                </Text>
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
                            <View style={[{ flexDirection: 'row', height: 50, backgroundColor: 'white', marginTop: 20, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 20 }, styles.shadowEff]}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                    pending review
                                </Text>
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    {/* end of Orders and review pending */}
                    {/* update button */}
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('editProfile');setRefresh(!refresh)}}>
                            <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
                                <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                                    Update
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{logout()}}>
                            <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center',marginTop:20 }, styles.buttonShadowEff]}>
                                <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                                    logout
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text>ProfileScreen</Text>
                </View>
                : <View style={{ marginTop: 25, height: '100%' }}>
                     {/* Header */}
                     <View style={{ flexDirection: 'row', height: 26, marginTop: 20, marginBottom: 20, position: 'relative' }}>
                        <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={()=>{navigation.goBack()}}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>
                                alert
                            </Text>
                        </View>
                    </View>
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
                </View>}
            
        </SafeAreaView>
    )
}

export default ProfileScreen

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