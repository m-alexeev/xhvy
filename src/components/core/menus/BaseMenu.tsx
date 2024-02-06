import { MenuOption } from "@app/types/general";
import React, { FC } from "react";
import { Menu, MenuProps } from "react-native-paper";
import { View } from "react-native";

interface BaseMenuProps extends Omit<MenuProps, "children" | "theme"> {
  options: Array<MenuOption>;
}

const BaseMenu: FC<BaseMenuProps> = ({ options, ...props }) => {
  const handlePress = (option: MenuOption) => {
    option.onPress();
    if (props.onDismiss) {
      props.onDismiss();
    }
  };

  return (
    <Menu
      visible={props.visible}
      onDismiss={props.onDismiss}
      anchor={props.anchor}
      anchorPosition={props.anchorPosition}
    >
      <View>
        {options.map((option, index) => (
          <Menu.Item
            titleStyle={{ fontSize: 14 }}
            titleMaxFontSizeMultiplier={1}
            dense
            key={index}
            {...option}
            onPress={() => handlePress(option)}
          >
          </Menu.Item>
        ))}
      </View>
    </Menu>
  );
};

export default BaseMenu;
