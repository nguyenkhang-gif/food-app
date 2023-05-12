import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../context/authcontext';
import { ScrollView } from 'react-native-gesture-handler';
import {  updateUserInfo } from '../apicalls';
// import { Entypo } from '@expo/vector-icons';

import  * as Location from "expo-location"


const EditUserInfoScreen = ({ navigation }) => {
  const { curentUser, setCurentUser, refresh, setRefresh } = useContext(AuthContext)
  const [Name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phonenumber, setPhonenum] = useState('')
  const [address, setAddress] = useState('')



  // sử lý lấy vị trí hiện tại
  const [curlocation, setLocation] = useState( )
  const getPermission = async ()=>{
    let {status} = await Location.requestForegroundPermissionsAsync()
    if(status!='granted'){
      console.log("Pls granted permision")
      return
    }
    

    let currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000})
    setLocation(currentLocation);
    // console.log('location')
    console.log(curlocation)
  }
  // useEffect(()=>{
   
  //   getPermission()
  // },[])


  const [currentAddress, setCurrentAddress] = useState()
  const revesreGeoCode = async ()=>{
    const result = await Location.reverseGeocodeAsync({
      longitude : curlocation.coords.longitude,
      latitude : curlocation.coords.latitude
    })
    let final = ''
    if(result[0].city) final+=result[0].city+','
    if(result[0].country) final+=result[0].country+','
    if(result[0].district) final+=result[0].district+','
    if(result[0].region) final+=result[0].region+','
    if(result[0].street) final+=result[0].street+','
    if(result[0].streetNumber) final+=result[0].streetNumber+','
    if(result[0].subregion) final+=result[0].subregion+''
    setCurrentAddress(final)
  }

  useEffect(()=>{
    if(currentAddress){
      setAddress(currentAddress)
    }
  },[currentAddress])

  // const [phonenumberArray, setPhonenumberArray] = useState([])
  // sủ lý thêm sđt 

  useEffect(() => {
    setName(curentUser[0].Name)
    setUserName(curentUser[0].Username)
    setEmail(curentUser[0].Email)
    setPassword(curentUser[0].Password)
    setPhonenum(curentUser[0].phonDes)
    setAddress(curentUser[0].addressDes)
    setIsLoadData(false)
    // setPhonenumberArray([])
  }, [curentUser, refresh])
  const [isLoadData, setIsLoadData] = useState(false)
  useEffect(() => {
    if (curentUser) {
    
      // console.log('getdata',getPhonenum(curentUser[0].id,[phonenumberArray,setPhonenumberArray]))
      setIsLoadData(true)
    }

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
            My Profile
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
          <View style={{ flex: 1 }}>
            <Text>Name</Text>
            <TextInput style={{ padding: 10, borderColor: 'black', borderWidth: 2 }} value={Name ? Name : null} onChangeText={(text) => { setName(text) }} />
            <Text>UserName</Text>
            <TextInput style={{ padding: 10, borderColor: 'black', borderWidth: 2 }} value={userName ? userName : null} onChangeText={(text) => { setUserName(text) }} />
            <Text>Email</Text>
            <TextInput style={{ padding: 10, borderColor: 'black', borderWidth: 2 }} value={email ? email : null} onChangeText={(text) => { setEmail(text) }} />
            <Text>Password</Text>
            <TextInput style={{ padding: 10, borderColor: 'black', borderWidth: 2 }} value={password ? password : null} onChangeText={(text) => { setPassword(text) }} secureTextEntry={true} />
            <Text>phone Num</Text>
            <TextInput style={{ padding: 10, borderColor: 'black', borderWidth: 2 }} value={phonenumber ? phonenumber : null} onChangeText={(text) => { setPhonenum(text) }}  />
            <Text>address</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TextInput style={{flex:1, padding: 10, borderColor: 'black', borderWidth: 2,marginRight:10 }} value={address ? address : null} onChangeText={(text) => { setAddress(text) }}  />
            <TouchableOpacity 
            onPress={()=>{getPermission()}}
            style={{alignSelf:'center',margin:10}}>

            <Entypo name="location" size={24} color="black" />
            </TouchableOpacity>
            </View>

          </View>
          {/* end of name */}
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
              revesreGeoCode()
              console.log('location:',curlocation)
              updateUserInfo({ Name, userName, userName, email, password,phonenumber,address, id: curentUser[0].id });
              setCurentUser([{ Email: email, Name: Name, Password: password, Username: userName,phonDes:phonenumber,addressDes:address, id: curentUser[0].id, }])
            }}>
              <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginTop: 20 }, styles.buttonShadowEff]}>
                <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                  update
                </Text>
              </View>

            </TouchableOpacity>
            {/* addd phone number */}

          </View>
        </ScrollView>
        : null}



      {/* end of main */}
    </View>
  )
}

export default EditUserInfoScreen


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