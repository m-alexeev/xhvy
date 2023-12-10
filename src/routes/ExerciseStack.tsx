import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../types/navigation";
import ExercisesScreen from "../pages/home/Exercises";
import ExerciseDetailsTabRoutes from "./ExerciseDetailsTab";

const ExercisedStack = createNativeStackNavigator<ExerciseStackParamList>();

const ExerciseStackRouter = () => {
  return (
    <ExercisedStack.Navigator>
      <ExercisedStack.Screen
        name="View"
        component={ExercisesScreen}
        options={{ headerShown: false }}
      />
      <ExercisedStack.Screen
        name="Details"
        component={ExerciseDetailsTabRoutes}
      />

      {/*<ExercisedStack.Screen name="Create" component={ExerciseCreate}/>*/}
    </ExercisedStack.Navigator>
  );
};

export default ExerciseStackRouter;
