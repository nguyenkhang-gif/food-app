import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

const LoginRegisterScreen = () => {

  // sử lý nhấn tab login logout
  const [LoginlogOut, setLoginLogout] = useState([true, false])

  useEffect(() => {
    setLoginLogout([true, false])
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
                Login
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
              style={{ height: 20 }}
              placeholder='your email'
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
            />
          </View>
        </KeyboardAvoidingView>

      </ScrollView> : null}
      {LoginlogOut[1] ? <ScrollView style={{ flex: 1, marginHorizontal: 30, marginTop: 30 }}>
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
            />
          </View>
        </KeyboardAvoidingView>

      </ScrollView> : null}
      {/* end of  main login-logout container */}
      {/* container button  */}
      {LoginlogOut[0] ?
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <TouchableOpacity>
            <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
              <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        : LoginlogOut[1]?
        <View style={{ justifyContent: 'center',padding:40, alignItems: 'center' }}>
        <TouchableOpacity>
          <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
            <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
              Sign in
            </Text>
          </View>
        </TouchableOpacity>
      </View>:null
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