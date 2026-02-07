import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";
import FormInput from "./AppInput";
import { useAuthError } from "../hooks/useAuthError";
import { checkEmailExists } from "../api/authService";

const PasswordModal = ({ 
  visible, 
  onClose, 
  mode = "forgot", // "forgot" ou "update"
  email: initialEmail = "",
  onSubmit 
}) => {
  const [step, setStep] = useState(1); // 1 = email check (forgot), 2 = password change
  const [email, setEmail] = useState(initialEmail);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepError, setStepError] = useState(""); // Erreur au niveau du step
  const { error, setFieldError, clearError, handleApiError } = useAuthError();

  useEffect(() => {
    if (!visible) {
      setStep(1);
      setEmail(initialEmail);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
      setStepError("");
      clearError();
    }
  }, [visible, initialEmail, clearError]);

  const handleNextStep = async () => {
    clearError();
    setStepError("");

    if (!email.trim()) {
      setFieldError('email', "Veuillez entrer votre email");
      return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFieldError('email', "Adresse email invalide");
      return;
    }

    setLoading(true);
    try {
      // Vérifier l'email via l'API seulement si mode === "forgot"
      if (mode === "forgot") {
        const res = await checkEmailExists(email);
        if (res.success && res.exists) {
          setStep(2);
        } else {
          setFieldError('email', "Cet email n'est pas enregistré");
        }
      } else {
        setStep(2);
      }
    } catch (err) {
      console.log("Erreur check email:", err);
      handleApiError(err);
      setStepError("Erreur lors de la vérification de l'email");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    clearError();
    setStepError("");

    // Validation des champs
    let isValid = true;
    
    if (mode === "update" && !oldPassword.trim()) {
      setFieldError('oldPassword', "L'ancien mot de passe est requis");
      isValid = false;
    }

    if (!newPassword.trim()) {
      setFieldError('newPassword', "Le nouveau mot de passe est requis");
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setFieldError('confirmPassword', "La confirmation est requise");
      isValid = false;
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setFieldError('confirmPassword', "Les mots de passe ne correspondent pas");
      isValid = false;
    }

    // Validation mot de passe (8-12 chars, 1 majuscule, 1 chiffre, 1 spécial)
    if (newPassword) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,12}$/;
      if (!passwordRegex.test(newPassword)) {
        setFieldError('newPassword', "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule, un chiffre et un caractère spécial.");
        isValid = false;
      }
    }

    if (!isValid) return;

    setLoading(true);
    try {
      await onSubmit({ email, oldPassword, newPassword });
      onClose();
    } catch (err) {
      console.log("Erreur submit:", err);
      handleApiError(err);
      setStepError(err.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  // Effacer les erreurs quand l'utilisateur tape
  const handleEmailChange = (text) => {
    setEmail(text);
    clearError('email');
    setStepError("");
  };

  const handleOldPasswordChange = (text) => {
    setOldPassword(text);
    clearError('oldPassword');
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    clearError('newPassword');
    clearError('confirmPassword');
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    clearError('confirmPassword');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {step === 1 && mode === "forgot" ? (
            <>
              <AppText text="Entrez votre email" style={styles.title} />
              <FormInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={handleEmailChange}
                error={error.email}
                iconContainerStyle={styles.input}
              />
              {/* Erreur step */}
              {stepError && (
                <AppText text={stepError} style={styles.stepError} />
              )}
              {loading ? (
                <ActivityIndicator size="large" color="#1E88E5" />
              ) : (
                <AppButton
                  text="Vérifier"
                  style={styles.btnPrimary}
                  textStyle={styles.btnPrimaryText}
                  onPress={handleNextStep}
                />
              )}
            </>
          ) : (
            <>
              <AppText text={mode === "forgot" ? "Réinitialiser le mot de passe" : "Modifier le mot de passe"} style={styles.title} />
              
              {mode === "update" && (
                <FormInput
                  placeholder="Ancien mot de passe"
                  secureTextEntry
                  value={oldPassword}
                  onChangeText={handleOldPasswordChange}
                  error={error.oldPassword}
                />
              )}
              
              <FormInput
                placeholder="Nouveau mot de passe"
                secureTextEntry
                value={newPassword}
                onChangeText={handleNewPasswordChange}
                error={error.newPassword}
              />
              
              <FormInput
                placeholder="Confirmer le mot de passe"
                secureTextEntry
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                error={error.confirmPassword}
              />

              {/* Erreur step */}
              {stepError && (
                <AppText text={stepError} style={styles.stepError} />
              )}

              {loading ? (
                <ActivityIndicator size="large" color="#1E88E5" />
              ) : (
                <AppButton
                  text="Mettre à jour"
                  style={styles.btnPrimary}
                  textStyle={styles.btnPrimaryText}
                  onPress={handleSubmit}
                />
              )}
            </>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <AppText text="Annuler" style={styles.closeText} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modal: { width: "85%", backgroundColor: "#fff", borderRadius: 12, padding: 20 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 12 },
  btnPrimary: { backgroundColor: "#1E88E5", width: "100%", marginBottom: 10 },
  btnPrimaryText: { color: "#fff" },
  closeBtn: { marginTop: 5 },
  closeText: { color: "#D32F2F", textAlign: "center", fontWeight: "600" },
  stepError: { color: '#D32F2F', textAlign: 'center', marginBottom: 10, fontSize: 14 },
});
