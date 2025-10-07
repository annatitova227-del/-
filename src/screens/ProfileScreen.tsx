import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.ProfileContainer}>
      <Image source={require('../../assets/jane.jpg')} style={styles.PA} />
      <Text style={styles.name}>Jane</Text>
      <Text style={styles.location}>San Francisco</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.FB}>
          <Text style={styles.FBText}>ADD TO CONTACT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.MBText}>MESSAGE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ProfileContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 160,
  },
  PA: {
    borderRadius: 70,
    height: 128,
    width: 128,
    paddingBottom: 90,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 60,
    paddingTop: 30,
  },
  FB: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  FBText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  MBText: {
    color: 'black',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '500',
  },
});