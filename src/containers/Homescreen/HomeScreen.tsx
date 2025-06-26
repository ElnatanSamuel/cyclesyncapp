import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import CalendarWeek from '../../components/CalenderDate';
import Header from '../../components/Header';
import BottomSheetForm from '../../components/BottomSheetForm';
import ChoreList from '../../components/ChoreList';
import { RootState } from '../../store/store';

const HomeScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const chores = useSelector((state: RootState) => state.chores.items);

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
      <ChoreList chores={chores} />

      <TouchableOpacity style={styles.addButton} onPress={handleOpenBottomSheet}>
        <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
      </TouchableOpacity>

      <BottomSheetForm
        visible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
      />
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
