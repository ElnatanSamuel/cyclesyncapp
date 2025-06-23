import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarWeek from '../../components/CalenderDate';
import Header from '../../components/Header';
import BottomSheetForm from '../../components/BottomSheetForm';
import ChoreList from '../../components/ChoreList';

const HomeScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CalendarWeek />
      <Text style={styles.header}>Today's tasks</Text>
      <ChoreList
  chores={[
    { title: 'Wash dishes', category: 'Kitchen', recurrence: { interval: 1, unit: 'days' } },
    { title: 'Study math', category: 'Study', recurrence: { interval: 2, unit: 'days' } },
  ]}
/>


      <TouchableOpacity style={styles.addButton} onPress={handleOpenBottomSheet}>
        <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
      </TouchableOpacity>

      <BottomSheetForm visible={isBottomSheetVisible} onClose={handleCloseBottomSheet} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'orange',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
