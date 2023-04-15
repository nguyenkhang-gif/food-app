import { View, Text } from 'react-native'
import React from 'react'

const Fooditeminfo = ({navigation,route}) => {
    let info=route.params.info
  return (
    <View style={{flex:1,backgroundColor:'gray'}}>
      <Text>{info.item}</Text>
      <Text>{info.foodinfo}</Text>
    </View>
  )
}

export default Fooditeminfo