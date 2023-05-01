import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const Checkbox = ({ checked, onchange }) => {
    const [ischecked, setIsChecked] = useState()
    useEffect(() => {
        setIsChecked(checked)
    }, [checked])
    return (
        <View >
            {ischecked == true ?
                <TouchableOpacity onPress={() => onchange()}>
                    <FontAwesome5 name="dot-circle" size={24} color="#FA4A0C" />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => onchange()}>
                    <Entypo name="circle" size={24} color="black" />
                </TouchableOpacity>
            }
        </View>
    )
}

export default Checkbox

const styles = StyleSheet.create({})