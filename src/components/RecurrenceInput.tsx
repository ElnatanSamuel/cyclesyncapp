import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RecurrenceInput = ({ onChange  }) => {
  const [number, setNumber] = useState('1');
  const [unit, setUnit] = useState('days');

  const handleChange = (num, selectedUnit) => {
    const interval = parseInt(num);
    if (!isNaN(interval) && interval > 0) {
      onChange({ interval, unit: selectedUnit });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.numberInput}
        keyboardType="numeric"
        value={number}
        onChangeText={(text) => {
          const cleanText = text.replace(/[^0-9]/g, '');
          setNumber(cleanText);
          handleChange(cleanText, unit);
        }}
        maxLength={2}
        placeholder="1"
        placeholderTextColor="#888"
      />
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={unit}
          style={styles.picker}
          dropdownIconColor="#aaa"
          onValueChange={(itemValue) => {
            setUnit(itemValue);
            handleChange(number, itemValue);
          }}
          mode="dropdown"
        >
          <Picker.Item label={number == '1' ? "day" : "days"} value="days" />
          <Picker.Item label={number == '1' ? "week" : "weeks"} value="weeks" />
          <Picker.Item label={number == '1' ? "month" : "months"} value="months" />
        </Picker>
      </View>
      <Text style={styles.subText}>after last done</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#666', 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    width: '100%',
    maxWidth: 340,
     marginTop: 10
  },
  numberInput: {
    width: 50,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#333',
    color: '#eee',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 12,
    paddingVertical: 6,
   
  },
  pickerWrapper: {
    flex: 1,
    height: 48,
    backgroundColor: '#333',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    color: '#eee',
    height: 60,
    width: '100%',
    padding: 20,
    borderRadius: 12
  },
  subText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 6,
    fontStyle: 'italic',
    fontWeight: '600'
  },
});

export default RecurrenceInput;
