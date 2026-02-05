import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

  // Header
  header: {
    height: 160,
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
  },
  headerIcon: {
    color: '#ffffff',
    fontSize: 30,
  },

  // Profile card
  profileCard: {
    marginHorizontal: 40,
    marginTop: 40,
    width: '90%',
    height: 360,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#cfeaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 44,
    fontWeight: '700',
    color: '#1E88E5',
  },
  profileInfo: {
    marginLeft: 40,
  },
  profileName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0B59A7',
  },
  profileLabel: {
    fontSize: 20,
    color: '#6b7280',
    marginTop: 10,
  },
  profileValue: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111827',
  },

  // Info fields
  infoCard: {
    marginHorizontal: 40,
    marginTop: 20,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  infoLabel: {
    fontSize: 20,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111827',
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    marginTop: 60,
  },
  actionBtn: {
    width: 450,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnModifier: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6eefb',
  },
  btnModifierText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E88E5',
  },
  btnSupprimer: {
    backgroundColor: '#D32F2F',
  },
  btnSupprimerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
});
