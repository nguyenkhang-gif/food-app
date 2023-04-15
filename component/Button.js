import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import React from 'react'

const Buttons = ({content,navigattion,...props}) => {
  return (
    <View style={[styles.LoginBtnContainer,styles.shadowEff]}>
        <TouchableOpacity {...props}>
          <Text style={styles.BtnLogin}>{content}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  LoginBtnContainer:{
    // top:70,
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
  },
  shadowEff:{
    borderRadius:30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }
})

export default Buttons