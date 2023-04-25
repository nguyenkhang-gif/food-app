import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { productsData } from '../db';
import { ScrollView } from 'react-native';

const FoodDetailsScreen = ({navigation, route }) => {
    // sử lý khi nhấn nút tim thích or not
    const [isFav, setIsfav] = useState(true)
    const [itemInfo, setItemInfo] = useState()
    const fetchData = () => {
        setItemInfo(productsData[ID])
    }
    
    
    // lấy "link" 
    const ID = route.params.ID // xem như đây là prop sẽ truyen2 vào 


    useEffect(() => {
        fetchData()
    }, [])
    return (
        // <SafeAreaView>
            <View style={{ marginTop: 25, height: '100%' }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', height: 24, marginTop: 20, marginBottom: 20, position: 'relative', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} >
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { isFav ? setIsfav(false) : setIsfav(true) }}>
                        {isFav ? <AntDesign name="hearto" size={24} color="black" /> : <AntDesign name="heart" size={24} color="black" />}
                    </TouchableOpacity>
                </View>
                {/* end of Header */}

                {/* item image  */}
                <ScrollView>

                    <View>
                        {itemInfo ?
                            <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                                <View style={[{ backgroundColor: 'white', borderRadius: 125, width: 250, height: 250 ,overflow:'hidden'}, styles.shadowEff]}>
                                    <Image
                                        source={itemInfo.imgurl}
                                        style={{ width: 250, height: 250, resizeMode: 'cover' }}
                                    />
                                </View>
                                <Text style={{ marginTop: 20, fontSize: 30, fontWeight: '600' }}>
                                    {itemInfo.Name}
                                </Text>
                                <Text style={{ marginTop: 20, fontSize: 25, fontWeight: '700', color: '#FA4A0C' }}>
                                    {itemInfo.Price}đ
                                </Text>
                                {/* container policy */}
                                <View>
                                    <View style={{ width: 300 }}>
                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>
                                            Thông tin của món ăn
                                        </Text>
                                        <Text style={{ minHeight: 60, fontSize: 18 }} >
                                            {itemInfo.FoodDes}
                                        </Text>
                                    </View>

                                    <View style={{ width: 300 }}>
                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>
                                            Thông tin của món ăn
                                        </Text>
                                        <Text style={{ minHeight: 60, fontSize: 18 }} >
                                            Thức ăn luôn nóng khi đến tay khách hàng, nếu không sẽ hoàn trả 200% giá tiền món ăn
                                        </Text>
                                    </View>
                                </View>
                                {/* end of container policy */}
                            </View> : null}

                        {/* button thêm vào  */}
                        <View style={{ alignItems: 'center',marginVertical:20,marginBottom:100 }}>
                            <TouchableOpacity>
                                <View style={[{ width: 300, height: 50, backgroundColor: '#FA4A0C', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, styles.buttonShadowEff]}>
                                    <Text style={{ color: '#F6F6F9', fontSize: 18, fontWeight: 600 }}>
                                        Thêm vào giỏ hàng
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* end of button thêm vào  */}

                    </View>
                </ScrollView>
                {/* end of item image  */}



                {/* <Text>FoodDetailsScreen</Text> */}
            </View>
        // {/* </SafeAreaView> */}
    )
}

export default FoodDetailsScreen

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
    }
})
