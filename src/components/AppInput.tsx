import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import AppText from './AppText';

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  type, // nouveau prop: "email", "phone", "search", "password"
  error,
  containerStyle,
  labelStyle,
  iconStyle,
  iconContainerStyle,
  inputStyle,
}) => {
  // Choix automatique de l’icône
  const getIconName = () => {
    switch (type) {
      case 'email': return 'mail-outline';
      case 'phone': return 'call-outline';
      case 'search': return 'search-outline';
      case 'password': return 'lock-closed-outline';
      default: return null;
    }
  };

  const iconName = getIconName();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText text={label} style={[styles.label, labelStyle]} />}
      <View style={[styles.inputBox,iconContainerStyle]}>
        {iconName && (
          <Ionicons name={iconName} size={22} color="#6b7280" style={[styles.icon,iconStyle]} />
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#9AA9C9"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      {error && <AppText text={error} style={styles.error} />}
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
});
