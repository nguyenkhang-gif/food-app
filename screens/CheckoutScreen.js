import { View, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'

const CheckoutScreen = ({ navigation }) => {
    return (
        <View style={{ marginTop: 20, flex: 1 }}>

            <View style={{ flexDirection: 'row', height: 26, marginTop: 20, marginBottom: 20, position: 'relative' }}>
                <TouchableOpacity style={{ position: 'absolute', left: 20 }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Check out
                    </Text>
                </View>
            </View>
            <Text>CheckoutScreen</Text>
        </View>
    )
}

export default CheckoutScreen