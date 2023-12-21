import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ExerciseDetailsTabParamList } from "../types/navigation";
import ExerciseAboutScreen from "../pages/exercises/About";
import ExerciseHistoryScreen from "../pages/exercises/History";
import ExerciseRecordsScreen from "../pages/exercises/Records";
import ExerciseChartsScreen from "../pages/exercises/Charts";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const ExerciseTabs = createMaterialTopTabNavigator<ExerciseDetailsTabParamList>();



const ExerciseDetailsTabRoutes = ({}) => {
  const navigation = useNavigation();
  // Hide the bottom tab bar for this navigator
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarVisible: false, tabBarStyle: {display: 'none'}});
    return () => navigation.getParent()?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [navigation]);


  return(
    <ExerciseTabs.Navigator>
      <ExerciseTabs.Screen name="About" component={ExerciseAboutScreen}/>     
      <ExerciseTabs.Screen name="History" component={ExerciseHistoryScreen}/>     
      <ExerciseTabs.Screen name="Charts" component={ExerciseChartsScreen}/>     
      <ExerciseTabs.Screen name="Records" component={ExerciseRecordsScreen}/>     
    </ExerciseTabs.Navigator>
  )
}

export default ExerciseDetailsTabRoutes;
