// components/EmailCheckModal.js
import React, { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import useAuthError from "../../hooks/useAuthError";
import { checkEmailExists } from "../../api/authService";
import FormInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

const EmailCheckModal = ({ visible, onClose, navigation }) => {
  const [email, setEmail] = useState("");
  const { error, clearError, setFieldError, handleApiError } = useAuthError();

  const handleVerify = async () => {
    // Validation côté client simple
    if (!email) {
      setFieldError("email", "L'email est requis");
      return;
    }

    try {
      console.log("Vérification de l'email:", email);
      const res = await checkEmailExists(email);
      console.log("Résultat API checkEmailExists:", res);

      // ✅ Gestion business error selon la nouvelle logique
      if (res.success && res.exists) {
        onClose();
        navigation.navigate("UpdatePassword", { email });
      } else if (res.errors) {
        Object.keys(res.errors).forEach((key) => {
          setFieldError(key, res.errors[key]);
          console.log(`🔑 Erreur API mappée sur ${key}:`, res.errors[key]);
        });
      } else if (res.message) {
        setFieldError("email", res.message);
        console.log("🔑 Message général API:", res.message);
      } else {
        setFieldError("email", "Cet email n'est pas enregistré");
        console.log("🔑 Erreur par défaut: email non trouvé");
      }
    } catch (err) {
      console.log("🔍 Erreur catch handleVerify:", err);
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
            error={error.email} // ⚡ Affiche l'erreur directement sous le champ
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
    backgroundColor: "#1E88E5", 
    width: "100%", 
    marginBottom: 10 
  },
  btnPrimaryText: { 
    color: "#fff" 
  },
  closeBtn: { 
    marginTop: 5 
  },
  closeText: {
    color: "#D32F2F", 
    textAlign: "center", 
    fontWeight: "600" 
  },
});
