import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from './src/containers/Homescreen/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import ProfileScreen from './src/containers/Profile/ProfileScreen';
import { loadChoresFromStorage, subscribeToChoreStorage } from './src/store/persistence';
import SignupScreen from './src/containers/auth/SignupScreen';
import LoginScreen from './src/containers/auth/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthController from './src/navigation/AuthController';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {

    useEffect(() => {
    loadChoresFromStorage(); 
    subscribeToChoreStorage();
  }, []);

  const handleLogin = async () => {
  // Simulate login success
  const user = { id: 1, name: 'John' };
  await AsyncStorage.setItem('user', JSON.stringify(user));
  // navigation.navigate('Home');
};

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
        <NavigationContainer>
 <Stack.Navigator initialRouteName="AuthController">
  <Stack.Screen name="AuthController" component={AuthController} options={{ headerShown: false }} />
  <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
</Stack.Navigator>
        </NavigationContainer>
        </Provider>
    </GestureHandlerRootView>
  );
}
