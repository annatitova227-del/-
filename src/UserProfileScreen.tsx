
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserProfileScreen({ route, navigation }) {
 
  const { userData } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
     
        <Text style={styles.title}>Профиль пользователя</Text>
        
    
        <View style={styles.headerSection}>
          <Image source={userData.avatar} style={styles.avatar} />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userStatus}>
            Статус: {userData.status || 'неизвестно'}
          </Text>
        </View>

    
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Контактная информация</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Телефон:</Text>
            <Text style={styles.infoValue}>{userData.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData.email}</Text>
          </View>
        </View>

     
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Последнее сообщение</Text>
          <Text style={styles.lastMessage}>"{userData.message}"</Text>
          <Text style={styles.messageTime}>Время: {userData.time}</Text>
        </View>

     
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дополнительно</Text>
          <Text style={styles.additionalInfo}>
            ID пользователя: {userData.id}
          </Text>
        </View>

  
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад к списку чатов</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  headerSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userStatus: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 80,
    color: '#666',
  },
  infoValue: {
    flex: 1,
    color: '#333',
  },
  lastMessage: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 14,
    color: '#888',
  },
  additionalInfo: {
    fontSize: 14,
    color: '#666',
  },
  backButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

