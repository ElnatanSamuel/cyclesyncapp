import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Chore = {
  title: string;
  category: string;
  recurrence: {
    interval: number;
    unit: string;
  };
};

type Props = {
  chores: Chore[];
};

const ChoreList = ({ chores }: Props) => {
  const renderItem = ({ item }: { item: Chore }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
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
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
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
  recurrence: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default ChoreList;
