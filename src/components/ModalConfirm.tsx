import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import AppText from './AppText';
import AppButton from './AppButton';

const ConfirmDeleteModal = ({ nom, prenom, visible, onCancel, onDelete }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <AppText text="Confirmer la suppression" style={styles.title} />
          <AppText text="Voulez-vous vraiment supprimer" style={styles.text} />
          <AppText text={`${nom} ${prenom} ?`} style={styles.boldText} />

          <View style={styles.buttonRow}>
            <AppButton text="Annuler" onPress={onCancel} style={styles.cancelButton} />
            <AppButton text="Supprimer" onPress={onDelete} style={styles.deleteButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e6eefb',
    padding: 24,
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B59A7',
    marginBottom: 12,
    textAlign: 'center',
  },

  text: {
    fontSize: 18,
    color: '#334155',
    textAlign: 'center',
  },

  boldText: {
    fontWeight: '700',
    color: '#334155',
    fontSize: 20,
    marginTop: 8,
    textAlign: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '100%',
  },

  cancelButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#E6EEF8',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },

  deleteButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
});
