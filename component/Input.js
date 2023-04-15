import { View, Text, TextInput,StyleSheet } from 'react-native'
import React, { useState } from 'react'

const Input = ({placeholder,label, password,onChangeText,...props}) => {
    const [hideInput,setHideInput]= useState(password)
    const [isFocus,setIsFocus]=useState(false)
    const [inputContent,setInputContent]= useState('')
  return (
    <View>
      <Text>{label}</Text>
      <View style={[styles.inputContainer,!isFocus? styles.Blur:null]}>
          <TextInput 
          placeholder={placeholder}  
          onFocus={()=>setIsFocus(true)} 
          onBlur={()=>setIsFocus(false)} 
          secureTextEntry={password}
          // {...props}
          onChangeText={text=>{onChangeText(text)}}
          
          />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  inputContainer:{
    padding:10,
    backgroundColor:'white',
    width:250,
    margin:10,
    bborderBottomColor: '#000000',
    borderBottomWidth: 1,
    opacity:1
  },
  Blur:{
    
    opacity:0.5
  }
})
export default Input