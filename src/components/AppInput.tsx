import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import AppText from './AppText';

import {
  isValidEmail,
  isValidPhone,
} from '../utils/util'

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  type,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  containerStyle,
  inputStyle,
  autoValidate = false
}) => {

  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Validation automatique
  useEffect(() => {
    if (!autoValidate || !value) return;

    if (type === 'email' && !isValidEmail(value)) {
      setLocalError('Adresse email invalide');
    } else if (type === 'phone' && !isValidPhone(value)) {
      setLocalError('Numéro invalide');
    } else {
      setLocalError('');
    }
  }, [value]);

  const getIconName = () => {
    switch (type) {
      case 'email': return 'mail-outline';
      case 'phone': return 'call-outline';
      case 'search': return 'search-outline';
      case 'password': return 'lock-closed-outline';
      case 'file': return 'image-outline';
      default: return null;
    }
  };

  const iconName = getIconName();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText text={label} style={styles.label} />}

      
        <View style={styles.inputBox}>
          {iconName && <Ionicons name={iconName} size={22} color="#6b7280" style={styles.icon} />}

          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor="#9AA9C9"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={type === 'password' ? !showPassword : secureTextEntry}
            keyboardType={keyboardType}
          />
        </View>
      

      {(error || localError) && (
        <AppText text={error || localError} style={styles.error} />
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, color: '#475569', marginBottom: 6 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6eefb',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: '#111827' },
  error: { marginTop: 4, fontSize: 14, color: '#D32F2F' },
  preview: { width: 40, height: 40, borderRadius: 6 },
  placeholder: { fontSize: 14, color: '#9AA9C9' },
});
