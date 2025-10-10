import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Alert,
    Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QRCodeItem {
    id: string;
    text: string;
    date: string;
}

export default function QRCodeScreen() {
    const [inputValue, setInputValue] = useState('');
    const [savedQRCodes, setSavedQRCodes] = useState<QRCodeItem[]>([]);
    const [showSavedCodes, setShowSavedCodes] = useState(false);

    const loadSavedQRCodes = async () => {
        try {
            const saved = await AsyncStorage.getItem('savedQRCodes');
            if (saved !== null) {
                setSavedQRCodes(JSON.parse(saved));
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
            const newItem: QRCodeItem = {
                id: Date.now().toString(),
                text: inputValue,
                date: new Date().toLocaleString(),
            };

            const updatedQRCodes = [...savedQRCodes, newItem];
            setSavedQRCodes(updatedQRCodes);
            await AsyncStorage.setItem('savedQRCodes', JSON.stringify(updatedQRCodes));
            setInputValue('');
            Alert.alert('Успех', 'QR-код сохранен');
        } catch (error) {
            console.error('Error saving QR code:', error);
            Alert.alert('Ошибка', 'Не удалось сохранить QR-код');
        }
    };

    const clearAllQRCodes = async () => {
        try {
            await AsyncStorage.removeItem('savedQRCodes');
            setSavedQRCodes([]);
            Alert.alert('Успех', 'Все QR-коды удалены');
        } catch (error) {
            console.error('Error clearing QR codes:', error);
            Alert.alert('Ошибка', 'Не удалось очистить QR-коды');
        }
    };

    useEffect(() => {
        loadSavedQRCodes();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>QR Code Manager</Text>
            
            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Введите текст для QR-кода"
                placeholderTextColor="#999"
            />
            
            <TouchableOpacity style={styles.button} onPress={saveQRCode}>
                <Text style={styles.buttonText}>Сохранить QR-код</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => setShowSavedCodes(true)}>
                <Text style={styles.buttonText}>
                    Показать сохраненные коды ({savedQRCodes.length})
                </Text>
            </TouchableOpacity>

            {savedQRCodes.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={clearAllQRCodes}>
                    <Text style={styles.clearButtonText}>Очистить все</Text>
                </TouchableOpacity>
            )}

            <Modal 
                visible={showSavedCodes} 
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        Сохраненные QR-коды ({savedQRCodes.length})
                    </Text>
                    
                    {savedQRCodes.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>Нет сохраненных QR-кодов</Text>
                        </View>
                    ) : (
                        <ScrollView style={styles.scrollView}>
                            {savedQRCodes.map((item) => (
                                <View key={item.id} style={styles.codeItem}>
                                    <Text style={styles.codeText}>{item.text}</Text>
                                    <Text style={styles.codeDate}>{item.date}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                    
                    <TouchableOpacity 
                        style={styles.closeButton} 
                        onPress={() => setShowSavedCodes(false)}
                    >
                        <Text style={styles.closeButtonText}>Закрыть</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    clearButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    scrollView: {
        flex: 1,
    },
    codeItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    codeText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        fontWeight: '500',
    },
    codeDate: {
        fontSize: 12,
        color: '#666',
    },
    closeButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});