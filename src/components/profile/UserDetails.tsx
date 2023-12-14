import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { User } from '../../pages/home/Profile'
import { Text, Avatar,useTheme } from 'react-native-paper'

interface UserDetailsProps {
  user: User
}

const UserDetails: FC<UserDetailsProps> = ({user}) => {
  const theme = useTheme();

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
        <Avatar.Text
          size={64}
          label={getInitials()}
        />
      </View>
      <View style={styles.text}>
        <Text >{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
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
