import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { productsData } from '../db';
import { AntDesign } from '@expo/vector-icons';

const SeachProbuctScreen = ({navigation}) => {
    //đếm số lượng sản phẩm tìm được
    const [resultsCount, setResultsCount] = useState(0)
    // all item
    const [allItem, setAllItem] = useState([])

    useEffect(() => {
        setAllItem(productsData)
    }, [])


    useEffect(() => {
        setResultsCount(10)
    }, [])
    return (
        <SafeAreaView>
            {/* main container Start */}
            <View style={{ marginTop: 20, height: '100%' }}>
                {/* HEader start */}
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <TextInput style={{ fontSize: 20 }} value='Mỳ trộn' placeholder='tìm' />
                    </View>

                </View>
                {/* HEader end */}
                {/* results count  */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Tìm được {String(resultsCount)} kết quả
                    </Text>
                </View>
                {/* end of results count  */}
                {/* all product item  */}
                <SafeAreaView style={{}}>
                    {/* one item  */}
                    {/* <View style={[{ marginTop: 40, height: 160, width: 140, borderRadius: 15, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center', margin: 20 }, styles.shadowEff]}>
                        <Image
                            source={require('../assets/hambuger.png')}
                            style={{ width: 100, height: 100, resizeMode: 'cover', top: -40 }}
                        />
                        <View style={{ top: -25 }}>
                            <Text style={{ fontSize: 18, fontWeight:'650' }}>
                                Mỳ
                            </Text>
                        </View>
                        <View style={{ top: -15 }}>
                            <Text style={{ fontSize: 18, fontWeight: 700, color: '#FA4A0C' }}>
                                20000 đ
                            </Text>
                        </View>
                    </View> */}
                    <FlatList
                        data={allItem}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[{ marginTop: 40, height: 160, width: 140, borderRadius: 15, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center', margin: 10 }, styles.shadowEff, index % 2 == 1 ? styles.oddnumitem :null, index==allItem.length-1?styles.lastITemStyle:null]}>
                                    <View style={{ width: 100, height: 100, resizeMode: 'cover',overflow:'hidden',borderRadius:50, top: -40 }}>
                                        <Image
                                            source={item.imgurl}
                                            style={{ width: 100, height: 100, resizeMode: 'cover' }}
                                        />
                                    </View>
                                    <View style={{ top: -25 ,justifyContent:'center'}}>
                                        <Text style={{ fontSize: 18, fontWeight: '600',justifyContent:'center',alignItems:'center' }}>
                                            {item.Name}
                                        </Text>
                                    </View>
                                    <View style={{ top: -15 }}>
                                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#FA4A0C' }}>
                                            20000 đ
                                        </Text>
                                    </View>
                                </View>
                            )
                        }}
                        numColumns={2}
                        style={{ paddingLeft: 30, paddingTop: 30}}
                        keyExtractor={(item) => item.id}
                    />

                    {/* end of one item */}
                </SafeAreaView>
                {/* end of all product item  */}




                <Text>SeachProbuctScreen</Text>
            </View>
            {/* main container end */}
        </SafeAreaView>
    )
}

export default SeachProbuctScreen

const styles = StyleSheet.create({
    shadowEff: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    oddnumitem: {
        marginTop: 80
    },
    lastITemStyle:{
        marginBottom:200
    }
})