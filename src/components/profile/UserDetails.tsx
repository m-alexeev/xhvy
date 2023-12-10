import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { User } from '../../pages/home/Profile'
import { Text, useTheme } from '@rneui/themed'
import { Avatar } from '@rneui/themed'

interface UserDetailsProps {
  user: User
}

const UserDetails: FC<UserDetailsProps> = ({user}) => {
  const {theme} = useTheme();

  const getInitials = (): string =>{
    const split_name = user.name.trim().split(" ");
    if (split_name.length > 1){
      return split_name[0][0] + split_name[1][0];
    }else{
      return split_name[0][0] + split_name[0][1];
    } 
  } 

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.avatar}>
        <Avatar
          size={64}
          rounded
          title={getInitials()}
          containerStyle={{backgroundColor: theme.colors.primary}}
        />
      </View>
      <View style={styles.text}>
        <Text h4>{user.name}</Text>
        <Text style={[styles.email, {color: theme.colors.greyOutline}]}>{user.email}</Text>
      </View>
    </View>
  )
}

export default UserDetails

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  avatar: {},
  text: {
    flex: 1,
    justifyContent: "center",
    marginStart: 10,
  },
  name: {
     
  },
  email: {},
})
