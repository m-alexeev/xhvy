import { FC } from "react";
import { OptionsType, useOptions } from "../../contexts/OptionsContext";
import { View } from "react-native";
import { ListItem, makeStyles } from "@rneui/themed";

const OptionsConfigurator: FC = () => {
  const { options, updateOptions } = useOptions();
  console.log(options);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {Object.keys(options).map((option, index) => (
        <ListItem
          key={index}
          bottomDivider  
        >
          <ListItem.Content>
            <ListItem.Title>{option}</ListItem.Title>
            <ListItem.Title>{options[option as keyof OptionsType]}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron/>
        </ListItem>
      ))}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
}));

export default OptionsConfigurator;
