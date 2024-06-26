import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import CalendarScreen from './Calendar';
import MessagingScreen from './Message';
import Login from './Login';
import SignUp from './SignUp';
import ChatDetailScreen from './ChatDetailScreen';
import LikedEvents from './LikedEvents';
import post from "./Post";
import {AuthProvider} from "./useAuth";


const Stack = createNativeStackNavigator();



function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Calendar" component={CalendarScreen} />
                    <Stack.Screen name="Messaging" component={MessagingScreen} />
                    <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
                    <Stack.Screen name="LikedEvents" component={LikedEvents} />

                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
