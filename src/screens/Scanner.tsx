import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default function Scanner({navigation}) {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({data}) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('QR Code Scanned', `Data: ${data}`, [
        {
          text: 'OK',
          onPress: () => {
            setScanned(false);
            if (navigation) {
              navigation.navigate('QRCodeScreen', {qrData: data});
            }
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
        <View style={styles.overlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.scanText}>Наведите камеру на QR код</Text>
        </View>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: 'white',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
  },
});
