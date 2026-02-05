import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

  // En-tête
  header: {
    height: 160,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '700',
  },

  // Groupe de champs
  formGroup: {
    marginHorizontal: 40,
    marginTop: 60,
  },

  label: {
    fontSize: 20,
    color: '#475569',
    marginBottom: 8,
  },

  inputBox: {
    height: 88,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 20,
  },

  placeholder: {
    fontSize: 20,
    color: '#9aa9c9',
  },

  sexeOptions: {
    fontSize: 20,
    color: '#334155',
  },

  // Bouton Enregistrer
  saveButton: {
    marginTop: 80,
    marginHorizontal: 60,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
});
