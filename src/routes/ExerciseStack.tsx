import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../types/navigation";
import ExercisesScreen from "../pages/home/Exercises";
import ExerciseDetailsTabRoutes from "./ExerciseDetailsTab";
import { Appbar, Surface } from "react-native-paper";
import ExerciseCreate from "../pages/exercises/Create";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Header from "../components/core/Header";

const ExercisedStack = createNativeStackNavigator<ExerciseStackParamList>();

const ExerciseStackRouter = () => {
  const navigation = useNavigation<NavigationProp<ExerciseStackParamList>>();

  return (
    <ExercisedStack.Navigator>
      <ExercisedStack.Screen
        name="View"
        component={ExercisesScreen}
        options={{
          headerShown: true,
          header: (props) => {
            return (
              <Header title="Exercises">
                <Appbar.Action
                  icon="plus"
                  onPress={() => navigation.navigate("Create")}
                />
              </Header>
            );
          },
        }}
      />
      <ExercisedStack.Screen
        name="Details"
        component={ExerciseDetailsTabRoutes}
      />
      <ExercisedStack.Screen name="Create" component={ExerciseCreate} />
    </ExercisedStack.Navigator>
  );
};

export default ExerciseStackRouter;
