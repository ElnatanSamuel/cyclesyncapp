import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Hello, Welcome Back</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="person-circle-outline" color="#fff" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    width: '50%',
  },
});
