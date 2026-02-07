// screens/UpdatePasswordScreen.js
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
  const { error, setFieldError, clearError, handleApiError } = useAuthError();

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      setFieldError("Veuillez remplir tous les champs");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFieldError("confirmPassword", "Les mots de passe ne correspondent pas");
      return;
    }

    try {
    const playload = { email, newPassword };
    console.log("Payload pour la réinitialisation du mot de passe:", playload);
      const res = await forgotPassword(playload);
      console.log("Résultat de la réinitialisation du mot de passe:", res);
      if (res.success) {
        Alert.alert("Succès", "Mot de passe réinitialisé !", [
          { text: "OK", onPress: () => navigation.replace("Login") },
        ]);
      } else {
        setFieldError("general", res.message || "Erreur lors de la réinitialisation");
      }
    } catch (err) {
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

        <AppButton text="Réinitialiser" onPress={handleReset} />
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
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "#1E88E5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  inputBox: {
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    marginTop: 10,
  },
});
