// components/EmailCheckModal.js
import React, { useState } from "react";
import { Modal, View, Alert, StyleSheet } from "react-native";
import useAuthError from "../../hooks/useAuthError";
import { checkEmailExists } from "../../api/authService";
import FormInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";


const EmailCheckModal = ({ visible, onClose, navigation }) => {
  const [email, setEmail] = useState("");
  const { error, clearError, setFieldError, handleApiError } = useAuthError();

  const handleVerify = async () => {
    try {
      const res = await checkEmailExists(email);
      console.log("Résultat de la vérification de l'email:", res);
      if (res.success && res.exists) {
        onClose();
        navigation.navigate("UpdatePassword", { email });
      } else {
        setFieldError("email", "Cet email n'est pas enregistré");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.overlay}>
            <View style={styles.modal}>
            <FormInput
                label="Email"
                value={email}
                onChangeText={(text) => {
                setEmail(text);
                clearError("email");
                }}
                errorMessage={error.email}
            />
            <AppButton 
                text="Vérifier" 
                onPress={handleVerify} 
                style={styles.btnPrimary} 
                textStyle={styles.btnPrimaryText} 
            />
            <AppButton 
                text="Annuler" 
                onPress={onClose} 
                style={styles.closeBtn} 
                textStyle={styles.closeText} 
            />
            </View>
        </View>
        </Modal>

  );
};

export default EmailCheckModal;

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: "rgba(0,0,0,0.5)", 
        justifyContent: "center", 
        alignItems: "center" 
    },
  modal: { 
    width: "85%", 
    backgroundColor: "#fff", 
    borderRadius: 12, 
    padding: 20,
    alignSelf: "center",
  },
  btnPrimary: {
},
  title: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 15, 
    textAlign: "center" 
},
  input: { 
    borderWidth: 1, 
    borderColor: "#E5E7EB", 
    borderRadius: 8, 
    padding: 10, 
    fontSize: 16,
     marginBottom: 12 
    },
  btnPrimary: {
     backgroundColor: "#1E88E5", 
     width: "100%", 
     marginBottom: 10 },
  btnPrimaryText: { 
    color: "#fff" 
},
  closeBtn: { 
    marginTop: 5 
},
  closeText: {
     color: "#D32F2F", 
     textAlign: "center", 
     fontWeight: "600" },
  stepError: { 
    color: '#D32F2F', 
    textAlign: 'center', 
    marginBottom: 10, 
    fontSize: 14 },
});
