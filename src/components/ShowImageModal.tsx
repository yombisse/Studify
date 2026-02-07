import React from "react";
import { Modal, View, Image, TouchableOpacity, StyleSheet } from "react-native";

const ImagePreviewModal = ({ visible, onClose, imageUrl }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.container}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ImagePreviewModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "70%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
