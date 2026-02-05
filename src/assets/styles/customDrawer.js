import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  drawer: {
    width: 780,
    height: '100%',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderColor: '#e6eefb',
    paddingHorizontal: 36,
    paddingTop: 36,
  },

  header: {
    height: 220,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    paddingHorizontal: 36,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#ffffff',
  },
  closeIcon: {
    position: 'absolute',
    top: 36,
    right: 36,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 28,
    color: '#ffffff',
  },

  profileCard: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6eefb',
    padding: 20,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#cfeaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E88E5',
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 18,
    color: '#6b7280',
  },

  divider: {
    height: 12,
    backgroundColor: '#EEF6FF',
    borderRadius: 6,
    marginVertical: 20,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 96,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#F3F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E88E5',
  },
  itemLabel: {
    fontSize: 22,
    color: '#334155',
    marginLeft: 20,
    flex: 1,
  },
  itemSub: {
    fontSize: 18,
    color: '#9AA9C9',
  },

  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 96,
    backgroundColor: '#fff6f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffecec',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  logoutIconBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#fff0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D32F2F',
  },
  logoutText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#D32F2F',
    marginLeft: 20,
  },

  bottomInfo: {
    marginTop: 40,
  },
  supportText: {
    fontSize: 18,
    color: '#9AA9C9',
  },
  versionText: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 4,
  },
});
