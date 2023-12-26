import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme , Text} from 'react-native-paper'

const WorkoutExerciseItem = () => {
  const {colors} = useTheme();
  return (
    <View>
      <Text>WorkoutExerciseItem</Text>
    </View>
  )
}

export default WorkoutExerciseItem

const styles = StyleSheet.create({})
