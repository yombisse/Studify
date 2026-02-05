import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

  // Header
  header: {
    height: 300,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    paddingHorizontal: 60,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 20,
    color: '#E8F4FF',
  },

  // Card
  card: {
    marginHorizontal: 60,
    marginTop: -40,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e6eefb',
    padding: 40,
  },

  // Form fields
  label: {
    fontSize: 20,
    color: '#475569',
    marginBottom: 8,
  },
  inputBox: {
    height: 88,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    color: '#111827',
  },
  placeholder: {
    fontSize: 18,
    color: '#9AA9C9',
  },

  // Terms note
  termsNote: {
    fontSize: 16,
    color: '#9AA9C9',
    marginTop: 20,
  },

  // Button
  createButton: {
    height: 96,
    borderRadius: 12,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  createButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },

  // Sign in link
  signInRow: {
    marginTop: 40,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 18,
    color: '#475569',
  },
  signInLink: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E88E5',
  },
});
