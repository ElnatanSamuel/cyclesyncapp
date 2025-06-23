import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from '@react-native-vector-icons/ionicons';

const Header = () => {
  return (
    <View>
        <View style={styles.container}>
            <Text style={{color: '#fff', fontSize: 25, fontWeight: "bold", width: "50%"}}>Hello, Welcome Back</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                <Icon name="person-circle-outline"  color="#fff" size={40}/>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
})
export default Header