import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../types/navigation";
import { FC } from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";


const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackRoutes:FC = () => {

  return(
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={Login}/>
      <AuthStack.Screen name="Register" component={Register}/>
    </AuthStack.Navigator>
  )
} 

export default AuthStackRoutes;
