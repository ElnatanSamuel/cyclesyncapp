import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, selectCategories } from '../store/slices/categorySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  useEffect(() => {
  AsyncStorage.getItem('categories').then(data => {
    console.log('Categories in storage:', data);
  });
}, [categories]);

  const [addingNew, setAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (selectedCategory === '__add_new') {
      setAddingNew(true);
    }
  }, [selectedCategory]);

  const handleAdd = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      dispatch(addCategory(trimmed));
      onSelectCategory(trimmed);
    }
    setAddingNew(false);
    setNewCategory('');
  };

  return (
    <View style={styles.container}>
      {!addingNew ? (
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(value) => onSelectCategory(value)}
        >
          <Picker.Item label="Select category..." value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
          <Picker.Item label="➕ Add new category" value="__add_new" />
        </Picker>
      ) : (
        <View style={styles.addNewContainer}>
          <TextInput
            style={styles.input}
            placeholder="New category name"
            placeholderTextColor="#aaa"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setAddingNew(false);
              setNewCategory('');
              onSelectCategory('');
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 10,
  },
  picker: {
    color: '#eee',
    height: 60,
    width: '100%',
  },
  addNewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#eee',
    backgroundColor: '#333',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginLeft: 8,
    backgroundColor: '#f44336',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CategorySelector;
