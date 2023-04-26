import { View, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'

const CheckoutScreen = ({ navigation,route }) => {
    return (
        <View style={{ marginTop: 20, flex: 1 }}>
            {/* headers */}
            <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', left: 10 }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Check out
                    </Text>
                </View>
            </View>


            {/* main */}
            
            {/* end of main */}
            <Text>CheckoutScreen</Text>
        </View>
    )
}

export default CheckoutScreen