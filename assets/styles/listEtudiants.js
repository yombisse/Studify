import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

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

  headerAddBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerAddText: {
    color: '#ffffff',
    fontSize: 40,
  },

  searchBar: {
    marginHorizontal: 40,
    marginTop: 30,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6eefb',
    backgroundColor: '#ffffff',
    paddingHorizontal: 40,
    justifyContent: 'center',
  },

  searchText: {
    fontSize: 22,
    color: '#6b7280',
  },

  studentCard: {
    marginHorizontal: 40,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6eefb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0e4ea1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
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

  studentInfo: {
    flex: 1,
    marginLeft: 20,
  },

  studentName: {
    fontSize: 26,
    color: '#334155',
  },

  studentMeta: {
    fontSize: 22,
    color: '#6b7280',
    marginTop: 4,
  },

  arrow: {
    fontSize: 36,
    color: '#9AA9C9',
  },

  fab: {
    position: 'absolute',
    bottom: 80,
    right: 40,
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: '#1E88E5',
    borderWidth: 2,
    borderColor: '#1566b2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fabText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
  },
});
