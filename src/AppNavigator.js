import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage, SearchPage, DetailPage, SplashPage } from './pages';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}>

        <Stack.Screen options={{ headerTitle: '' }} name='SPLASH' component={SplashPage} />
        <Stack.Screen options={{ headerTitle: '' }} name='HOME' component={HomePage} />
        <Stack.Screen options={{ headerTitle: '' }} name='SEARCH' component={SearchPage} />
        <Stack.Screen options={{ headerTitle: '' }} name='DETAIL' component={DetailPage} />

    </Stack.Navigator>
)

const AppNavigator = () => (
    <NavigationContainer>
        <AppStackNavigator />
    </NavigationContainer>
)

export default AppNavigator;