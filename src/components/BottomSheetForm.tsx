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
import RecurrenceInput from './RecurrenceInput';
import CategorySelector from './CategorySelector';
import { useDispatch } from 'react-redux';
import { addChore } from '../store/slices/choreSlice';

const { height } = Dimensions.get('window');

const BottomSheetForm = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recurrence, setRecurrence] = useState({ interval: 1, unit: 'days' });

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

  const dispatch = useDispatch();

  const handleCreate = () => {
    if (!title.trim() || !selectedCategory || !recurrence.interval) return;

    const newChore = {
      title,
      category: selectedCategory,
      recurrence,
    };

    dispatch(addChore(newChore)); 
    onClose();
    setTitle('');
    setSelectedCategory('');
    setRecurrence({ interval: 1, unit: 'days' });
  };

  if (!showModal) return null;

  return (
    <Modal visible={showModal} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay} pointerEvents="box-none">
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
        <Animated.View style={[styles.sheetContainer, { transform: [{ translateY: slideAnim }], opacity: opacityAnim }]}>
          <Text style={styles.sheetText}>Add Chore</Text>
          <TextInput
            placeholder="Chore title"
            value={title}
            onChangeText={setTitle}
            style={styles.inputTitle}
            placeholderTextColor="gray"
          />

          <Text style={{ color: 'white', fontSize: 16 }}>Set interval</Text>
          <RecurrenceInput onChange={setRecurrence} />

          <CategorySelector selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

          <TouchableOpacity style={styles.closeButton} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
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
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputTitle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
