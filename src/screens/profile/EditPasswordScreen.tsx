import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import FormInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import { changePassword } from "../../api/authService";
import AppHeader from "../../components/AppHeader";
import Card from "../../components/Card";
import useAuthError from "../../hooks/useAuthError";

const UpdatePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, setFieldError, clearError, handleApiError, handleBusinessError } = useAuthError();

  const handleUpdate = async () => {
    clearError();

    // Validation locale
    if (!oldPassword || !newPassword || !confirmPassword) {
      if (!oldPassword) setFieldError("oldPassword", "Ancien mot de passe requis");
      if (!newPassword) setFieldError("newPassword", "Nouveau mot de passe requis");
      if (!confirmPassword) setFieldError("confirmPassword", "Confirmation requise");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFieldError("confirmPassword", "Les mots de passe ne correspondent pas");
      return;
    }

    // Regex pour sécuriser le mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,12}$/;
    if (!passwordRegex.test(newPassword)) {
      setFieldError(
        "newPassword",
        "Le mot de passe doit contenir 8-12 caractères, avec une majuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    try {
      const payload = { oldPassword, newPassword };
      console.log("Payload changePassword:", payload);

      const res = await changePassword(payload);
      console.log("Résultat changePassword:", res);

      if (res.success) {
        Alert.alert("Succès", "Mot de passe mis à jour avec succès !", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        // Ici, handleBusinessError va mapper automatiquement
        // "Ancien mot de passe incorrect" sur oldPassword
        handleApiError(res);
      console.log("erreur loger par handlebusiness",res)
      }
    } catch (err) {
      // Handle erreur réseau / API
      handleApiError(err);
      console.log("erreur loger par handleapi",err)
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Changer le mot de passe" onLeftPress={() => navigation.goBack()} />

      <Card style={{ marginTop: 20, padding: 15 }}>
        <AppText text="Mettre à jour le mot de passe" style={styles.title} />

        <FormInput
          label="Ancien mot de passe"
          value={oldPassword}
          onChangeText={(text) => {
            setOldPassword(text);
            clearError("oldPassword");
          }}
          secureTextEntry
          error={error.oldPassword}
        />

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
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            clearError("confirmPassword");
          }}
          secureTextEntry
          error={error.confirmPassword}
        />

        {error.general && <AppText text={error.general} style={styles.error} />}

        <AppButton text="Mettre à jour" onPress={handleUpdate} style={styles.btn} />
      </Card>
    </View>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0B59A7",
    marginBottom: 20,
    textAlign: "center",
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#1E88E5",
    borderRadius: 8,
    paddingVertical: 12,
  },
  error: {
    color: "#D32F2F",
    textAlign: "center",
    marginVertical: 10,
  },
});
