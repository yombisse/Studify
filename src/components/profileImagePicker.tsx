import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import AppText from "./AppText";

const ProfileImagePicker = ({ image, onChange }) => {
   
    
  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log("Utilisateur a annulé");
        } else if (response.errorCode) {
          console.log("Erreur image picker:", response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          onChange(uri); // retourne juste le string URI
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../assets/images/utilisateur.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>

      <AppText text="Changer la photo" style={styles.text} />
    </View>
  );
};

export default ProfileImagePicker;

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#1E88E5",
  },
  text: {
    marginTop: 10,
    color: "#1E88E5",
    fontWeight: "600",
  },
});
