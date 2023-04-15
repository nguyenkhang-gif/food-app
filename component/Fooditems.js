import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Fooditems = ({name,price,imgUrl,onPress,...props}) => {
  return (
    <TouchableOpacity onPress={()=>{onPress()}}>
      <View style={[{flex:1,maxHeight:200,width:140,margin:20,alignItems:'center',borderRadius:20,padding:10},styles.shadowEff]}>
        <Image
          style={[{width:'80%',height:'70%', resizeMode:'contain',marginBottom:10,bottom:30},styles.shadowEff]}
          source={require(`../assets/food_img/${imgUrl}.png`)}
          />
        <Text style={{color:'#FA4A0C',fontWeight:500}}>{name}</Text>
        <Text>{price}</Text>      
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    shadowEff:{
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

export default Fooditems