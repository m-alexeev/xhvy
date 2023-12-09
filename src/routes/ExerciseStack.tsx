import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../types/navigation";
import ExercisesScreen from "../pages/home/Exercises";

const ExercisedStack = createNativeStackNavigator<ExerciseStackParamList>();

const ExerciseStackRouter = () => {
  return (
    <ExercisedStack.Navigator>
      <ExercisedStack.Screen name="View" component={ExercisesScreen}/>
      <ExercisedStack.Screen name="Details" component={ExerciseDetailsTabNavi}/>
      {/*<ExercisedStack.Screen name="Create" component={ExerciseCreate}/>*/}
    </ExercisedStack.Navigator>
  )
}


export default ExerciseStackRouter;
