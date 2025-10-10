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

// Интерфейс для TypeScript (если используете .tsx)
// interface QRCodeItem {
//     id: string;
//     text: string;
//     date: string;
// }

export default function QRCodeScreen() {
    const [inputValue, setInputValue] = useState('');
    const [savedQRCodes, setSavedQRCodes] = useState([]);
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
            const newItem = {
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

    useEffect(() => {
        loadSavedQRCodes();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Введите текст для QR-кода"
            />
            <TouchableOpacity style={styles.button} onPress={saveQRCode}>
                <Text style={styles.buttonText}>Сохранить QR-код</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowSavedCodes(true)}>
                <Text style={styles.buttonText}>Показать сохраненные коды</Text>
            </TouchableOpacity>

            <Modal visible={showSavedCodes} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Сохраненные QR-коды</Text>
                    <ScrollView>
                        {savedQRCodes.map((item) => (
                            <View key={item.id} style={styles.codeItem}>
                                <Text style={styles.codeText}>{item.text}</Text>
                                <Text style={styles.codeDate}>{item.date}</Text>
                            </View>
                        ))}
                    </ScrollView>
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
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    codeItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    codeText: {
        fontSize: 16,
        marginBottom: 5,
    },
    codeDate: {
        fontSize: 12,
        color: '#666',
    },
    closeButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});