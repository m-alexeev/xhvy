import { Text } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { FC } from "react";
import { View } from "react-native";

const HomeScreen:FC = ({}) => {
  const {theme} = useTheme();
  return(
    <View style={{backgroundColor: theme.colors.background, flex:1}}>
      <Text>Home</Text>
    </View>
  )
}

export default HomeScreen;
