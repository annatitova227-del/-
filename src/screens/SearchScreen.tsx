import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SearchScreen() {
  return (
    <View style={[styles.tabContent, styles.centerContent]}>
      <Text style={styles.tabTitle}>🔍 Search Screen</Text>
      <Text>Search content will be here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});