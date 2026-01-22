import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: 900,
    height: 420,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6eefb',
    padding: 40,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0B59A7',
    marginBottom: 20,
  },

  text: {
    fontSize: 24,
    color: '#334155',
  },

  boldText: {
    fontWeight: '700',
    color: '#334155',
    fontSize: 24,
    marginTop: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  cancelButton: {
    width: 360,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#E6EEF8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E88E5',
  },

  deleteButton: {
    width: 360,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
});
