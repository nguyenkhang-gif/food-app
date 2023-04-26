import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SeachProbuctScreen from './screens/SeachProbuctScreen';
import ProfileScreen from './screens/ProfileScreen';
import FoodDetailsScreen from './screens/FoodDetailsScreen';
import CartScreen from './screens/CartScreen';
import LoginRegisterScreen from './screens/LoginRegisterScreen';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckoutScreen from './screens/CheckoutScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const BottomTab = () => {
  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'homescreen') {
          iconName = focused
            ? <Entypo name="home" size={24} color="#FA4A0C" />
            : <Entypo name="home" size={24} color="black" />;
        } else if (route.name === 'Profile') {
          iconName = focused ? <Ionicons name="person" size={24} color="#FA4A0C" /> : <Ionicons name="person" size={24} color="black" />;
        } else if (route.name === 'favscreen') {
          iconName = focused ? <AntDesign name="heart" size={24} color="#FA4A0C" /> : <AntDesign name="heart" size={24} color="black" />;
        }
        
        // You can return any component that you like here!
        // <AntDesign name="heart" size={24} color="black" />
        // <Ionicons name="person" size={24} color="black" />
        // <Entypo name="home" size={24} color="black" />
        return iconName;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown:false
    })}>
      <Tab.Screen name='homescreen' component={HomeScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* chưa làm phần này  */}
      <Tab.Screen name='favscreen' component={CartScreen}/>
    </Tab.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* làm footer cho screen nào ? */}
        <Stack.Screen name='main' component={BottomTab}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Loginregisterscreen" component={LoginRegisterScreen} />
        <Stack.Screen name="SearchProduct" component={SeachProbuctScreen} />
        <Stack.Screen name="Cartscreen" component={CartScreen} />
        <Stack.Screen name="Fooditemdetails" component={FoodDetailsScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
