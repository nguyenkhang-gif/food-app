import { View, Text ,Button, TextInput, TouchableOpacity} from 'react-native'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Input from '../component/Input'
import Buttons from '../component/Button'

export default function Login({navigation,route}) {
 
  const [inputs,setInputs]=useState({
    email:'',
    password:'',
    username:''
  })

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  

  return (
    <View style={{
      flex:1,
      alignItems:'center',
      padding:10
    }}>
      <Text style={{top:30,fontSize:20}}>Login</Text>
      <View style={styles.LogincContainer}>
        <Input onChangeText={(text)=>{handleOnchange(text,'username');console.log(text)}} placeholder={'please enter your username'} label={'email'}  />
        <Input onChangeText={(text)=>{handleOnchange(text,'password');console.log(text)}} placeholder={'please enter your password'} label={'password'} password />
      </View>
      <View style={{top:40}}>
        <Text style={{textDecorationLine:'underline'}}>forget password?</Text>
      </View>
      <Buttons content={'Login'} styles={styles} onPress={()=>{handleLogin()}} />
    </View>
  )
}




const styles = StyleSheet.create({
  LogincContainer:{
    width:200,
    margin:50,
    // backgroundColor:'blue',
    top:70,
    left:-30
  },
  inputContainer:{
    padding:10,
    backgroundColor:'white',
    width:250,
    margin:10,
    bborderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  LoginBtnContainer:{
    top:70,
    left:2,
    width:240,
    alignContent:'center',
    justifyContent:'center',
    margin:10
  },
  BtnLogin:{
    fontWeight:400,
    color:'white',
    borderRadius:30,
    backgroundColor:'#FA4A0C',
    padding:10,
    textAlign:'center',
    justifyContent:'center',
    fontSize:20
  }
})