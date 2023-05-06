import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { productsData } from '../db';
import { AntDesign } from '@expo/vector-icons';
import { getAllProduct } from '../apicalls';

const SeachProbuctScreen = ({ navigation, route }) => {
    //đếm số lượng sản phẩm tìm được
    const [resultsCount, setResultsCount] = useState(0)
    // all item
    const [allItem, setAllItem] = useState([])
    const [allItemTemp, setAllItemTemp] = useState([])


    // sử lý lấy "link" lấy giá trị search
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        getAllProduct([allItem, setAllItem])
        getAllProduct([allItemTemp, setAllItemTemp])
        // setAllItem(productsData)
        setSearchInput(route.params.searchValue ? route.params.searchValue : '')
    }, [])
    useEffect(()=>{
        if(allItem.length&&allItemTemp.length&&searchInput.length)handleSubmitInput();
        console.log(searchInput)
    },[allItemTemp,searchInput])
    // const [productsData2,setProductData2] = useState([])
    // sử lý lấy thông tin từ cart để render
    const getimgurlwithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.imgurl
            }
        })
        return temp
    }
    const getNameWithID = (ID) => {
        let temp
        allItem.forEach(item => {
            if (item.ID == ID) {
                // console.log('name',item)
                temp = item.Name
            }
        })
        return temp
    }
    const getPriceWithID = (ID) => {
        let temp
        allItem.forEach(item => {
            if (item.ID == ID) {
                temp = item.price
            }
        })
        return temp
    }

    
    const handleSubmitInput = ()=>{
        let tempData = []
        allItemTemp.forEach(item=>{
            let tempString=item.Name
            if(tempString.includes(searchInput)){
                // console.log('find shtng')
                tempData.push(item)
            }
        })
        setAllItem(tempData)
    
    }


    useEffect(() => {
        setResultsCount(10)
    }, [])
    return (
        <SafeAreaView>
            {/* main container Start */}
            <View style={{ marginTop: 20, height: '100%' }}>
                {/* HEader start */}
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20,flex:1}}>
                        <TextInput onSubmitEditing={()=>{console.log('submit search input');handleSubmitInput()}}  style={{ fontSize: 20, textDecorationLine: 'none' }} value={searchInput} onChangeText={(text) => { setSearchInput(text) }} placeholder='tìm' />
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
                    {allItem ?
                        <FlatList
                            data={allItem}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => { navigation.navigate('Fooditemdetails', { ID: item.ID }) }}>
                                        <View style={[{ marginTop: 40, height: 160, width: 140, borderRadius: 15, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center', margin: 10 }, styles.shadowEff, index % 2 == 1 ? styles.oddnumitem : null, index == allItem.length - 1 ? styles.lastITemStyle : null]}>
                                            <View style={{ width: 100, height: 100, resizeMode: 'cover', overflow: 'hidden', borderRadius: 50, top: -40 }}>
                                                <Image
                                                    source={getimgurlwithID(item.ID)}
                                                    style={{ width: 100, height: 100, resizeMode: 'cover' }}
                                                />
                                            </View>
                                            <View style={{ top: -25, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 18, fontWeight: '600', justifyContent: 'center', alignItems: 'center' }}>
                                                    {item.Name}
                                                </Text>
                                            </View>
                                            <View style={{ top: -15 }}>
                                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FA4A0C' }}>
                                                    {getPriceWithID(item.ID)}đ
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={2}
                            style={{ paddingLeft: 30, paddingTop: 30 }}
                            keyExtractor={(item) => item.ID}
                        />

                        : null}
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
    lastITemStyle: {
        marginBottom: 200
    }
})