import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native';
import DropdownComponent from '../utils/Dropdown';
import MultiSelectComponent from '../utils/Dropdown';
import RecurrenceInput from './RecurrenceInput';
import CategorySelector from './CategorySelector';

const { height } = Dimensions.get('window');

const BottomSheetForm = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
      const [value, setValue] = useState('');

  const handleChange = (text) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, '');
    setValue(numericText);
  };
   const [selectedCategory, setSelectedCategory] = useState('');
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      slideAnim.setValue(height);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  if (!showModal) return null;


  return (
    <Modal visible={showModal} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay} pointerEvents="box-none">
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.sheetContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
         <Text style={styles.sheetText}>Add Chore</Text>
         <TextInput placeholder="Chore title" style={styles.inputTitle}></TextInput>
         <Text style={{color: 'white', fontSize: 16}}>Set interval</Text>
         <View>
            <RecurrenceInput onChange={({ interval, unit }) => {
  console.log('Recurrence set to:', interval, unit);
}} />

          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}><Text style={styles.buttonText}>Create</Text></TouchableOpacity>
         </View>

        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheetForm;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContainer: {
    width: '100%',
    padding: 24,
    backgroundColor: '#1e1e1e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  closeButton: {
    padding: 12,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  inputTitle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 14,
    fontWeight: 'bold',
  },
  inputNumber: {
    marginTop: 10,
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    width: '20%',
    borderRadius: 10
  },
});
