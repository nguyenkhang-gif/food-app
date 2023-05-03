import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native';
import { validateEmail } from '../Funstions';
import { register } from '../apicalls';
import { AuthContext } from '../context/authcontext';


const LoginRegisterScreen = ({navigation}) => {

  const [tempCookies, setTempCookies] = useState('this')


  // sử lý login
  const {curentUser,login} = useContext(AuthContext)
  // sử lý lấy "cookies"
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'token',
        'cookies',
      );
    } catch (error) {
      // Error saving data
    }
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // sử lý logic login sign up 
  const handleValidateUser = (email, password, repassword) => {
    //  vlidate 
    let result = true
    if(!validateEmail(email)){
      // console.log('email good')
      result=false
    }
    if(!(password==repassword&&password!=''&&repassword!='')){
      // console.log('pass is good')
      result=false
    }
    if(result){
      return true
    }else{
      alert('mật khẩu or email chưa đúng thử lại ')
      return false
    }
  }

  // sử lý nhấn tab login logout
  const [LoginlogOut, setLoginLogout] = useState([true, false])

  useEffect(() => {
    setLoginLogout([true, false])
    // _storeData()
    console.log(curentUser)
  }, [])
  return (
    <View style={{ top: 20, flex: 1 }}>
      {/* big header */}
      <View style={{
        backgroundColor: 'white', height: 180, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
      }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/app-logo.jpg')}
            style={{ resizeMode: 'cover', height: 130, width: 130 }}
          />
        </View>

        <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { setLoginLogout([true, false]) }}>
            <View style={[{ height: 50, width: 140, justifyContent: 'center', alignItems: 'center' }, LoginlogOut[0] ? styles.BorderBottom : null]}>
              <Text style={{ fontSize: 20, fontWeight: 600 }}>
                Login:{tempCookies ? tempCookies : 'nothig'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setLoginLogout([false, true]) }}>
            <View style={[{ height: 50, width: 140, justifyContent: 'center', alignItems: 'center' }, LoginlogOut[1] ? styles.BorderBottom : null]}>
              <Text style={{ fontSize: 20, fontWeight: 600 }}>
                Sign up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* end of big header  */}

      {/* main login-logout container */}
      {LoginlogOut[0] ? <ScrollView style={{ flex: 1, marginHorizontal: 30, marginTop: 30 }}>
        <KeyboardAvoidingView behavior='padding' style={{ marginLeft: 15, marginTop: 5 }}>
          <Text style={{
            fontSize: 17,
            fontWeight: '500'
          }}>
            email
          </Text>
          <View style={{
            height: 50,
            paddingLeft: 20,
            justifyContent: 'center',
            borderBottomColor: 'black',
            borderBottomWidth: 2
          }}>
            <TextInput
              name='email'
              style={{ height: 20 }}
              placeholder='your email'
              onChangeText={
                text => { setEmail(text); }
              }
            />
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{ marginLeft: 15, marginTop: 5 }}>
          <Text style={{
            fontSize: 17,
            fontWeight: '500'
          }}>
            mật khẩu
          </Text>
          <View
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              height: 50,
              paddingLeft: 20,
              justifyContent: 'center',
              borderBottomColor: 'black',
              borderBottomWidth: 2
            }}>
            <TextInput
              style={{ height: 20 }}
              placeholder='your password'
              secureTextEntry={true}
              onChangeText={text => { setPassword(text) }}
            />
          </View>
        </KeyboardAvoidingView>

      </ScrollView> : null}
      {LoginlogOut[1] ? <ScrollView style={{ flex: 1, marginHorizontal: 30, marginTop: 30, height: 400 }}>
        <KeyboardAvoidingView behavior='padding' style={{ marginLeft: 15, marginTop: 5 }}>
          <Text style={{
            fontSize: 17,
            fontWeight: '500'
          }}>
            email
          </Text>
          <View style={{
            height: 50,
            paddingLeft: 20,
            justifyContent: 'center',
            borderBottomColor: 'black',
            borderBottomWidth: 2
          }}>
            <TextInput
              style={{ height: 20 }}
              placeholder='your email'
              onChangeText={text => { setEmail(text) }}
            />
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{ marginLeft: 15, marginTop: 5 }}>
          <Text style={{
            fontSize: 17,
            fontWeight: '500'
          }}>
            mật khẩu
          </Text>
          <View
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              height: 50,
              paddingLeft: 20,
              justifyContent: 'center',
              borderBottomColor: 'black',
              borderBottomWidth: 2
            }}>
            <TextInput
              style={{ height: 20 }}
              placeholder='your password'
              secureTextEntry={true}
              onChangeText={text => { setPassword(text) }}
            />
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{ marginLeft: 15, marginTop: 5 }}>
          <Text style={{
            fontSize: 17,
            fontWeight: '500'
          }}>
            viết lại mật khẩu
          </Text>
          <View
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              height: 50,
              paddingLeft: 20,
              justifyContent: 'center',
              borderBottomColor: 'black',
              borderBottomWidth: 2
            }}>
            <TextInput
              style={{ height: 20 }}
              placeholder='your password'
              secureTextEntry={true}
              onChangeText={text => { setRePassword(text) }}
            />
          </View>
        </KeyboardAvoidingView>

      </ScrollView> : null}
      {/* end of  main login-logout container */}
      {/* container button  */}
      {LoginlogOut[0] ?
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {login({email,password})? navigation.navigate('main'):alert('sai tài khoản hoặc mật khẩu') }}>
            <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
              <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        : LoginlogOut[1] ?
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', maxHeight: 100 }}>
            <TouchableOpacity onPress={() => { handleValidateUser(email, password, repassword)? register({email, password}) :null }}>
              <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
                <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                  Sign in
                </Text>
              </View>
            </TouchableOpacity>
          </View> : null
      }
      {/* end of container button  */}
      <Text>LoginRegisterScreen</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  BorderBottom: {
    borderBottomColor: '#FA4A0C',
    borderBottomWidth: 3
  },
});
export default LoginRegisterScreen