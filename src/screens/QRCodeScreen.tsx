import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Alert, 
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [savedQRs, setSavedQRs] = useState([]);
  const [showSavedModal, setShowSavedModal] = useState(false);

  const loadSavedQRs = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedQRs');
      if (saved !== null) {
        setSavedQRs(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading QR codes:', error);
    }
  };

  const saveQRCode = async () => {
    if (!inputValue.trim()) {
      Alert.alert('Ошибка', 'Введите текст для QR-кода');
      return;
    }

    try {
      const newQR = {
        id: Date.now().toString(),
        text: inputValue,
        date: new Date().toLocaleString('ru-RU'),
      };

      const updatedQRs = [...savedQRs, newQR];
      setSavedQRs(updatedQRs);
      await AsyncStorage.setItem('savedQRs', JSON.stringify(updatedQRs));
      
      setInputValue('');
      Alert.alert('Успех', 'QR-код сохранен!');
    } catch (error) {
      console.error('Error saving QR code:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить QR-код');
    }
  };

  const deleteQRCode = async (id: string) => {
    Alert.alert(
      "Удалить QR-код",
      "Вы уверены, что хотите удалить этот QR-код?",
      [
        { text: "Отмена", style: "cancel" },
        { 
          text: "Удалить", 
          style: "destructive",
          onPress: async () => {
            try {
              const updatedQRs = savedQRs.filter(qr => qr.id !== id);
              setSavedQRs(updatedQRs);
              await AsyncStorage.setItem('savedQRs', JSON.stringify(updatedQRs));
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось удалить QR-код');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    loadSavedQRs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Генератор QR-кода</Text>
      
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Введите любой текст или ссылку..."
        placeholderTextColor="#999"
        multiline
      />
      
      <View style={styles.qrContainer}>
        <QRCode
          value={inputValue || " "}
          size={200}
          backgroundColor="white"
          color="black"
        />
      </View>
      
      <Text style={styles.hint}>
        {inputValue ? `Текст: ${inputValue}` : 'Введите текст для генерации QR-кода'}
      </Text>
      
      <TouchableOpacity
        style={[styles.button, !inputValue && styles.buttonDisabled]}
        onPress={saveQRCode}
        disabled={!inputValue}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>💾 Сохранить QR-код</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => setShowSavedModal(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonSecondaryText}>
          📁 Сохраненные ({savedQRs.length})
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showSavedModal}
        animationType="slide"
        onRequestClose={() => setShowSavedModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Сохраненные QR-коды</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowSavedModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {savedQRs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Нет сохраненных QR-кодов</Text>
              <Text style={styles.emptyStateSubtext}>
                Сохраните ваш первый QR-код используя кнопку выше
              </Text>
            </View>
          ) : (
            <ScrollView style={styles.savedList}>
              {savedQRs.map((qr) => (
                <View key={qr.id} style={styles.qrItem}>
                  <View style={styles.qrCodeSmall}>
                    <QRCode
                      value={qr.text}
                      size={60}
                      backgroundColor="white"
                      color="black"
                    />
                  </View>
                  
                  <View style={styles.qrItemInfo}>
                    <Text style={styles.qrItemText} numberOfLines={2}>
                      {qr.text}
                    </Text>
                    <Text style={styles.qrItemDate}>{qr.date}</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => deleteQRCode(qr.id)}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 60,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hint: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSecondary: {
    backgroundColor: '#34C759',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonSecondaryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  savedList: {
    flex: 1,
  },
  qrItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  qrCodeSmall: {
    marginRight: 15,
  },
  qrItemInfo: {
    flex: 1,
  },
  qrItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  qrItemDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
});