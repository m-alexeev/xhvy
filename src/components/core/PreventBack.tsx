import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'

interface PreventBackProps {
  callback: () => void;
}

const PreventBack:FC<PreventBackProps> = ({callback}) => {


  const handleBackButtonPress = (): boolean | undefined | null => {
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress);
  },[])


  return (
    <View>
      <Text>PreventBack</Text>
    </View>
  )
}

export default PreventBack

const styles = StyleSheet.create({})
