import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

  banner: {
    height: 420,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    paddingHorizontal: 60,
  },
  bannerTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
  },
  bannerSubtitle: {
    fontSize: 22,
    color: '#E8F4FF',
    marginTop: 10,
  },

  card: {
    marginHorizontal: 60,
    marginTop: -60,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e6eefb',
    padding: 60,
    elevation: 4,
  },

  formTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0B59A7',
    marginBottom: 40,
  },

  label: {
    fontSize: 20,
    color: '#475569',
    marginBottom: 8,
  },

  inputBox: {
    height: 96,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },

  placeholder: {
    fontSize: 20,
    color: '#9AA9C9',
  },

  showPassword: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    fontSize: 18,
    color: '#9AA9C9',
  },

  forgotLink: {
    fontSize: 18,
    color: '#1E88E5',
    fontWeight: '600',
    marginTop: 20,
  },

  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
    justifyContent: 'center',
  },
  separatorLine: {
    height: 1,
    width: 300,
    backgroundColor: '#E6EEF8',
  },
  separatorText: {
    fontSize: 18,
    color: '#9AA9C9',
    marginHorizontal: 20,
  },

  loginButton: {
    height: 96,
    borderRadius: 12,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },

  signupRow: {
    marginTop: 40,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 18,
    color: '#475569',
  },
  signupLink: {
    fontSize: 18,
    color: '#1E88E5',
    fontWeight: '600',
  },

  note: {
    fontSize: 16,
    color: '#9AA9C9',
    marginTop: 20,
    textAlign: 'center',
  },

  footerLogo: {
    marginTop: 100,
    alignItems: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#cfeaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E88E5',
  },
});
