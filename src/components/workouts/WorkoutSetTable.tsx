import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { IWorkoutSet} from '../../types/workouts'
import { Text } from 'react-native-paper'

interface WorkoutSetTableProps{
  sets: IWorkoutSet[];
}

const WorkoutSetTable:FC<WorkoutSetTableProps> = ({sets}) => {
  return (
    <View>
      <Text>WorkoutSetTable</Text>
    </View>
  )
}

export default WorkoutSetTable

const styles = StyleSheet.create({})
