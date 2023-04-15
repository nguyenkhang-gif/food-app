import { View, Text,Button, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Buttons from '../component/Button'
import { StyleSheet } from 'react-native'
import Fooditems from '../component/Fooditems';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { SimpleLineIcons,MaterialIcons  } from '@expo/vector-icons'; 

const DATA=[
  {
    item:'item 1',
    price:'5000',
    imgUrl:'hambuger'
  },
  {
    item:'item 2',
    price:'5000'
    ,imgUrl:'hambuger'
  },
  {
    item:'item 3',
    price:'5000'
    ,imgUrl:'hambuger'
  },
  {
    item:'item 4',
    price:'5000'
    ,imgUrl:'hambuger'
  },
  {
    item:'item 5',
    price:'5000'
    ,imgUrl:'hambuger'
  },
]

export default function Home({navigation}) {
  const [menuOpen,setMenuOpen]=useState(false)





  return (
    <View style={{flexDirection:'column'}}>
      <View >
      </View>

        {/* menu đê xem login logout info */}
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity onPress={()=>{ menuOpen? setMenuOpen(false) :setMenuOpen(true)}} >
              <View style={[styles.menuBtnContainer,styles.shadowEff,!menuOpen?styles.menuShow:styles.menuHide,{margin:10 }]} >
                <SimpleLineIcons name="menu" size={24} color="black" />
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ menuOpen? setMenuOpen(false) :setMenuOpen(true)}}>
              <View style={[styles.menuBtnContainer,styles.shadowEff,!menuOpen?styles.menuShow:styles.menuHide,{margin:10,position:'relative' }]} >
                <View style={{position:'absolute',top:5,right:2,backgroundColor:'#FA4A0C',height:18,width:18,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                  <Text>1</Text>
                </View>
                <MaterialIcons name="shopping-cart" size={24} color="black" />
              </View>
          </TouchableOpacity>
        </View>
      
        <View style={menuOpen?[styles.menuShow,{height:400,bottom:50}]:styles.menuHide}>
          {/* 1 component? */}
          <TouchableOpacity style={{padding:10}}  onPress={()=>{ menuOpen? setMenuOpen(false) :setMenuOpen(true)}}>
            <View style={styles.menuBtnContainer} >
              <Text>🍕 menu </Text>
            </View>
          </TouchableOpacity>
          {/* 1 component ?? */}
          <TouchableOpacity>
            <View style={{margin:10,padding:5,borderBottomColor:'black',borderBottomWidth:2}}>
              <Text style={{fontSize:20}}>
                info
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('login')}}>
            <View style={{padding:5,margin:10,borderBottomColor:'black',borderBottomWidth:2}}>
              <Text style={{fontSize:20}}>
                login
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={{margin:10,padding:5,borderBottomColor:'black',borderBottomWidth:2}}>
              <Text style={{fontSize:20}}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
          
          </View>
        
          {/* Item list */}
        <View style={{height:'60%',bottom:100}}>
          <FlatList
            data={DATA}
            renderItem={({item,index})=>{
             return(
               <Fooditems onPress={()=>{navigation.navigate('foodinfo',{info:item})}} key={index} imgUrl={item.imgUrl} name={item.item} price={item.price} />
             )
            }}
            horizontal={true}
            keyExtractor={({item,index})=>{index}}
          />
        </ View>
        
        {/* </Button> */}
      {/* <Text>Home</Text> */}
    </View>
  )
}

const styles=StyleSheet.create({
  menuBtnContainer:{
    backgroundColor:"#FFFFFF",
    padding:10,
    width:45,
    height:45,
    borderRadius:5
  },
  menuShow:{
    left:0,
    // height:400     
  },
  menuHide:{
    left:-9000  ,
  },
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