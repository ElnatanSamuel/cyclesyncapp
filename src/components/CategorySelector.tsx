import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const initialCategories = [
  'Personal',
  'Work',
  'Study',
  'Fitness',
  'Hobbies',
  'Household',
  'Other',
];

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [addingNew, setAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      onSelectCategory(trimmed);
      setNewCategory('');
      setAddingNew(false);
    }
  };

  return (
    <View style={styles.container}>
      {!addingNew ? (
        <>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => onSelectCategory(itemValue)}
          >
            <Picker.Item label="Select category..." value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
            <Picker.Item label="➕ Add new category" value="__add_new" />
          </Picker>

          {selectedCategory === '__add_new' && setAddingNew(true)}
        </>
      ) : (
        <View style={styles.addNewContainer}>
          <TextInput
            style={styles.input}
            placeholder="New category name"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <TouchableOpacity style={styles.addButton} onPress={addCategory}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setAddingNew(false);
              onSelectCategory(''); // Reset selection
              setNewCategory('');
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
    color: '#666',
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
