import { StyleSheet } from "react-native";
import React, { FC, ReactNode } from "react";
import { Appbar, Surface } from "react-native-paper";

interface HeaderProps {
  title?: string;
  children?: ReactNode;
  backButton?: ReactNode;
}
const Header: FC<HeaderProps> = ({ title, backButton, children }) => {
  //TODO: Implement a hook to capture the scroll position

  return (
    <Surface elevation={2}>
      <Appbar.Header mode="small" elevated>
        {backButton} 
        {title && <Appbar.Content title={title} />}
        {children}
      </Appbar.Header>
    </Surface>
  );
};

export default Header;

