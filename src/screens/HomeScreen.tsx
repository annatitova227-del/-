import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen({navigation}) {
  const chatData = [
    {
      id: 1,
      name: 'Lady Gaga',
      time: '9:20 pm',
      message: 'Thank you! That was very helpful!',
      avatar: require('../../assets/ladygaga.jpg'),
      status: 'online',
      phone: '+1 234 567 890',
      email: 'ladygaga@example.com',
    },
    {
      id: 2,
      name: 'Hailey',
      time: '9:15 pm',
      message: "I know... I'm trying to get the funds.",
      avatar: require('../../assets/heiley.jpg'),
      status: 'offline',
      phone: '+1 234 567 891',
      email: 'hailey@example.com',
    },
    {
      id: 3,
      name: 'John',
      time: '8:45 pm',
      message: "Let's meet tomorrow",
      avatar: require('../../assets/man2.jpg'),
      status: 'online',
      phone: '+1 234 567 892',
      email: 'john@example.com',
    },
    {
      id: 4,
      name: 'Jenna',
      time: '8:30 pm',
      message: 'Did you see the new project?',
      avatar: require('../../assets/jenna.jpg'),
      status: 'online',
      phone: '+1 234 567 893',
      email: 'jenna@example.com',
    },
    {
      id: 5,
      name: 'Lora',
      time: '7:20 pm',
      message: "Call me when you're free",
      avatar: require('../../assets/lora.jpg'),
      status: 'offline',
      phone: '+1 234 567 894',
      email: 'lora@example.com',
    },
    {
      id: 6,
      name: 'Mike',
      time: '6:15 pm',
      message: 'The files are ready',
      avatar: require('../../assets/man1.jpg'),
      status: 'online',
      phone: '+1 234 567 895',
      email: 'mike@example.com',
    },
    {
      id: 7,
      name: 'Zara',
      time: '5:45 pm',
      message: 'Meeting at 3 PM',
      avatar: require('../../assets/zara.jpg'),
      status: 'offline',
      phone: '+1 234 567 896',
      email: 'zara@example.com',
    },
    {
      id: 8,
      name: 'Ashley',
      time: '4:30 pm',
      message: 'Check the documents',
      avatar: require('../../assets/eshley.jpg'),
      status: 'online',
      phone: '+1 234 567 897',
      email: 'ashley@example.com',
    },
    {
      id: 9,
      name: 'Gigi',
      time: '3:20 pm',
      message: 'Lunch tomorrow?',
      avatar: require('../../assets/gigi.jpg'),
      status: 'offline',
      phone: '+1 234 567 898',
      email: 'gigi@example.com',
    },
  ];

  return (
    <SafeAreaView style={styles.tabContent}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.pageTitle}>Chats</Text>

        {chatData.map(user => (
          <TouchableOpacity
            key={user.id}
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate('UserProfile', {
                userData: user,
              })
            }>
            <Image source={user.avatar} style={styles.avatar} />

            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.messageTime}>{user.time}</Text>
              </View>

              <Text style={styles.messageText} numberOfLines={1}>
                {user.message}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  pageTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    backgroundColor: 'white',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },
  messageTime: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 8,
  },
  messageText: {
    fontSize: 15,
    color: '#8E8E93',
  },
  arrow: {
    fontSize: 20,
    color: '#999',
    marginLeft: 10,
  },
});
