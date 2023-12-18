import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../types/navigation";
import ExercisesScreen from "../pages/home/Exercises";
import ExerciseDetailsTabRoutes from "./ExerciseDetailsTab";
import { Appbar, Surface } from "react-native-paper";

const ExercisedStack = createNativeStackNavigator<ExerciseStackParamList>();

const ExerciseStackRouter = () => {
  return (
    <ExercisedStack.Navigator>
      <ExercisedStack.Screen
        name="View"
        component={ExercisesScreen}
        options={{
          headerShown: true, header: (props) => {
            return (
              <Surface elevation={2}>
                <Appbar.Header mode="small">
                  <Appbar.Content title="Exercises" />
                  <Appbar.Action icon="plus" onPress={() => console.log('Create')} />
                </Appbar.Header>
              </Surface>
            )
          }
        }} 
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
