import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './styles'; // Assure-toi que ce fichier contient le StyleSheet ci-dessus

const ConfirmDeleteModal = ({ visible, onCancel, onDelete }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Confirmer la suppression</Text>
          <Text style={styles.text}>Voulez-vous vraiment supprimer</Text>
          <Text style={styles.boldText}>Dupont Alice ?</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;
