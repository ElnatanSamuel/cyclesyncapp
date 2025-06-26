import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChore, selectChores } from '../store/slices/choreSlice';
import Icon from '@react-native-vector-icons/ionicons';

type Chore = {
  title: string;
  category: string;
  recurrence: {
    interval: number;
    unit: string;
  };
};

const ChoreList = () => {
  const chores = useSelector(selectChores);

   const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    dispatch(deleteChore(index));
  };

const renderItem = ({ item, index }: { item: typeof chores[0], index: number }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.titleCategory}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
        <Icon name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>

    <Text style={styles.recurrence}>Every {item.recurrence.interval} {item.recurrence.unit}</Text>
  </View>
);

  return (
    <FlatList
      data={chores}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};



// You can customize this however you like
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'kitchen': return '#FFB347';
    case 'study': return '#87CEFA';
    case 'workout': return '#90EE90';
    case 'cleaning': return '#FF69B4';
    case 'custom': return '#D3D3D3';
    default: return '#999';
  }
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginRight: 12,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  recurrence: {
    color: '#ccc',
    fontSize: 14,
  },
});


export default ChoreList;
