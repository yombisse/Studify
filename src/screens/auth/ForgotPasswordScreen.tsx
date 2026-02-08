import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import FormInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { forgotPassword } from "../../api/authService";
import { useAuthError } from "../../hooks/useAuthError";
import AppText from "../../components/AppText";
import Card from "../../components/Card";

const ForgotPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ⚡ Utilisation de useAuthError
  const { error, setFieldError, clearError, handleApiError } = useAuthError();

  const handleReset = async () => {
    // ✅ Validation côté client
    if (!newPassword || !confirmPassword) {
      if (!newPassword) setFieldError("newPassword", "Le nouveau mot de passe est requis");
      if (!confirmPassword) setFieldError("confirmPassword", "La confirmation est requise");
      return;
    }

    // ✅ Regex mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,12}$/;
    if (!passwordRegex.test(newPassword)) {
      setFieldError(
        "newPassword",
        "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    // ✅ Vérification correspondance
    if (newPassword !== confirmPassword) {
      setFieldError("confirmPassword", "Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const payload = { email, newPassword };
      console.log("Payload pour la réinitialisation:", payload);

      const res = await forgotPassword(payload);
      console.log("Résultat API réinitialisation:", res);

      // ✅ Gestion business error
      if (res.success) {
        Alert.alert("Succès", "Mot de passe réinitialisé !", [
          { text: "OK", onPress: () => navigation.replace("Login") },
        ]);
      } else {
        // Si le backend renvoie {success: false, errors: {...}} ou message
        if (res.errors) {
          Object.keys(res.errors).forEach((key) => {
            setFieldError(key, res.errors[key]);
            console.log(`🔑 Erreur API mappée sur ${key}:`, res.errors[key]);
          });
        } else if (res.message) {
          setFieldError("general", res.message);
          console.log("🔑 Message général API:", res.message);
        } else {
          setFieldError("general", "Erreur lors de la réinitialisation du mot de passe");
        }
      }
    } catch (err) {
      // ✅ Gestion automatique via useAuthError
      handleApiError(err);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <AppText text="Réinitialiser le mot de passe" style={styles.formTitle} />

        <FormInput
          label="Nouveau mot de passe"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            clearError("newPassword");
          }}
          secureTextEntry
          error={error.newPassword}
        />

        <FormInput
          label="Confirmer mot de passe"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            clearError("confirmPassword");
          }}
          secureTextEntry
          error={error.confirmPassword}
        />

        {error.general && <AppText text={error.general} style={{ color: "red" }} />}

        <AppButton text="Réinitialiser" onPress={handleReset} style={styles.loginButton} />
      </Card>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "85%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    alignItems: "center",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    marginTop: 10,
  },
});
