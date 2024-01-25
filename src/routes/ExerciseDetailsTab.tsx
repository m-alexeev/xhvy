import { FC, useEffect } from "react";
import ExerciseAboutScreen from "@app/pages/exercises/About";
import ExerciseHistoryScreen from "@app/pages/exercises/History";
import ExerciseChartsScreen from "@app/pages/exercises/Charts";
import ExerciseRecordsScreen from "@app/pages/exercises/Records";
import { ExerciseTabs } from "./stacks";
import { ExerciseStackScreenProps } from "@app/types/navigation/exercise";
import { getExerciseById } from "@app/zustand/hooks";

type DetailsNavProp = ExerciseStackScreenProps<"Details">;

const ExerciseDetailsTabRoutes: FC<DetailsNavProp> = (
  { navigation, route },
) => {
  const exercise = getExerciseById(route.params.exerciseId);

  // Hide the bottom tab bar for this navigator
  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarVisible: false, tabBarStyle: { display: "none" } });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  if (exercise === undefined) {
    // if somehow we dont find the exercise, just exit
    navigation.goBack();
  } else {
    return (
      <ExerciseTabs.Navigator>
        <ExerciseTabs.Screen
          name="About"
          component={ExerciseAboutScreen}
          initialParams={{ exercise: exercise }}
        />
        <ExerciseTabs.Screen
          name="History"
          component={ExerciseHistoryScreen}
          initialParams={{ exercise: exercise }}
        />
        <ExerciseTabs.Screen
          name="Charts"
          component={ExerciseChartsScreen}
          initialParams={{ exercise: exercise }}
        />
        <ExerciseTabs.Screen
          name="Records"
          component={ExerciseRecordsScreen}
          initialParams={{ exercise: exercise }}
        />
      </ExerciseTabs.Navigator>
    );
  }
};

export default ExerciseDetailsTabRoutes;
