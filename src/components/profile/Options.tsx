import { FC, useState } from "react";
import { OptionsType, useOptions } from "../../contexts/OptionsContext";
import { TouchableHighlight, View } from "react-native";
import { ListItem, makeStyles } from "@rneui/themed";
import OptionDialog from "./OptionPopup";

const OptionsConfigurator: FC = () => {
  const { options, updateOptions } = useOptions();
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {Object.keys(options).map((option, index) => (
        <ListItem
          key={index}
          bottomDivider  
          Component={TouchableHighlight} 
          onPress={() => {setVisible(true)}}
        >
          <ListItem.Content>
            <ListItem.Title>{`${option.charAt(0).toUpperCase()}${option.slice(1)}`}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Subtitle style={styles.optionValueStyle}>{options[option as keyof OptionsType]}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron/>
        </ListItem>
      ))}
      <OptionDialog visible={visible} onClose={() => setVisible(false)}/>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
  optionTitleStyle: { 
  },
  optionValueStyle: {
    color: theme.colors.primary,
  },
}));

export default OptionsConfigurator;
