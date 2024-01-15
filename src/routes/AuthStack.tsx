import Login from "@app/pages/auth/Login";
import Register from "@app/pages/auth/Register";
import { AuthStackParamList } from "@app/types/navigation/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";


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
