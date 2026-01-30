import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import AppText from './AppText';
import { PhoneInput } from 'react-native-phone-entry';
import { launchImageLibrary } from 'react-native-image-picker';

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  type, // "email", "phone", "search", "password", "file"
  error,
  containerStyle,
  labelStyle,
  iconStyle,
  iconContainerStyle,
  inputStyle,
  onFileSelect, // callback pour fichier/image
  phoneCountry = 'BF',
  onChangeCountry,
}) => {
  // Choix automatique de l’icône
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
      {label && <AppText text={label} style={[styles.label, labelStyle]} />}

      {/* Cas téléphone */}
      {type === 'phone' ? (
        <PhoneInput
          phoneNumber={value}              // ✅ contrôlé par ton state
          callingCode="+226"
          countryCode={phoneCountry}
          onChangeText={onChangeText}
          onChangeCountry={onChangeCountry}
          maskInputProps={{ placeholder: placeholder || '+226 65 19 38 44' }}
        />

      ) : type === 'file' ? (
        // Cas fichier/image
        <TouchableOpacity
          style={[styles.inputBox, iconContainerStyle]}
          onPress={async () => {
            const result = await launchImageLibrary({ mediaType: 'photo' });
            if (result?.assets?.length > 0) {
              onFileSelect?.(result.assets[0].uri);
            }
          }}
        >
          {iconName && (
            <Ionicons name={iconName} size={22} color="#6b7280" style={[styles.icon, iconStyle]} />
          )}
          {value ? (
            <Image source={{ uri: value }} style={styles.preview} />
          ) : (
            <AppText text={placeholder || 'Choisir une image'} style={styles.placeholder} />
          )}
        </TouchableOpacity>
      ) : (
        // Cas générique (TextInput)
        <View style={[styles.inputBox, iconContainerStyle]}>
          {iconName && (
            <Ionicons name={iconName} size={22} color="#6b7280" style={[styles.icon, iconStyle]} />
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
      )}

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
  preview: { width: 40, height: 40, borderRadius: 6 },
  placeholder: { fontSize: 14, color: '#9AA9C9' },
});
