import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { productsData } from '../db.js'
const CartScreen = ({navigation}) => {

    const [mainData, setMainData] = useState([])


    useEffect(() => {
        setMainData(productsData)
    }, [])

    return (
        <View style={{ top: 20, flex: 1, position: 'relative' }}>
            {/* header */}
            <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{ position: 'absolute', left: 10 }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Cart
                    </Text>
                </View>
            </View>
            {/* end of header */}



            {mainData ?
                <View style={{ flex: 1 }}>
                    {/* main cart where all item in cart  */}
                    <FlatList
                        data={mainData}
                        renderItem={({ item }) => {
                            return (
                                <View style={{position:'relative', height:120, marginVertical: 5, marginHorizontal: 30, flexDirection: 'row',backgroundColor:'white',alignItems:'center' ,borderRadius:20}}>
                                    <View style={{ height: 75, width: 75,marginHorizontal:20,borderRadius:70,overflow:'hidden' }}>
                                        <Image
                                            source={item.imgurl}
                                            style={{ resizeMode: 'cover', height: 75, width: 75 }}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{fontSize:20,fontWeight:'700'}}>
                                            {item.Name}
                                        </Text>
                                        <Text style={{fontSize:17,fontWeight:'600',color:'#FA4A0C'}}>
                                            {item.Price} đ
                                        </Text>
                                    </View>
                                    {/* amount */}
                                    <View style={{position:'absolute',flexDirection:'row',height:30,width:60,backgroundColor:'#FA4A0C',bottom:20,right:15,borderRadius:20}}>
                                        <TouchableOpacity style={{flex:1}}>
                                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                <Text style={{fontSize:20,color:'white',fontWeight:'700'}}>
                                                    -
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex:1}}>
                                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                    {/* ghi số vào */}
                                                <Text style={{fontSize:20,color:'white',fontWeight:'600'}}>
                                                    0
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                      
                                        <TouchableOpacity style={{flex:1}}>
                                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                <Text style={{fontSize:20,color:'white',fontWeight:'600'}}>
                                                    +
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    {/* end of amount */}
                                </View>
                            )
                        }}
                    />


                    {/* end of main cart where all item in cart  */}
                </View>

                :
                <View style={{ flex: 1 }}>
                    <Text>
                        không tìm thấy sản phẩm hoặc bạn chưa chọn sản phẩm
                    </Text>
                </View>
            }
            <View style={{ height: 100, width: '100%', position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                    <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
                        <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                            Thanh toán
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({})