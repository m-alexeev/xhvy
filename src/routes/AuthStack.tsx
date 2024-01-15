import Login from "@app/pages/auth/Login";
import Register from "@app/pages/auth/Register";
import { FC } from "react";
import { AuthStack } from "./stacks";

const AuthStackRoutes: FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthStackRoutes;
