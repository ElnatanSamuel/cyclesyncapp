// CalendarWeek.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarWeek = () => {
  const today = dayjs();
  const todayIndex = today.day(); // 0 (Sunday) - 6 (Saturday)

  // Get start of the week (Sunday)
  const startOfWeek = today.subtract(todayIndex, 'day');

  const weekDates = [...Array(7)].map((_, i) => {
    const date = startOfWeek.add(i, 'day');
    const isToday = date.isSame(today, 'day');

    return {
      label: daysOfWeek[i],
      date: date.date(),
      isToday,
    };
  });

  return (
    <View style={styles.container}>
      {weekDates.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayLabel}>{day.label}</Text>
          <View style={[styles.circle, day.isToday && styles.todayCircle]}>
            <Text style={[styles.dayText, day.isToday && styles.todayText]}>
              {day.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  todayCircle: {
    backgroundColor: 'orange',
  },
  dayText: {
    fontSize: 16,
    color: '#fff',
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CalendarWeek;
