import { Platform, StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../Constants/enums';
import { COLORS } from '../../../Constants/enums/colorsEnum';

const styles = StyleSheet.create({
  scrollviewDe: {
    marginHorizontal: scaleWidth(10),
  },
  Header_Text: {
    color: COLORS.Black,
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    marginBottom: scaleHeight(32),
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',    
    borderEndWidth:1,
    borderRadius: 8,
    height:60,
    paddingHorizontal: scaleWidth(10),
    marginTop: 36,
    paddingVertical:scaleHeight(15),
    borderWidth: 1,
    borderColor: '#E5E6ED',
    marginBottom: scaleHeight(44),
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    flex: 1,
    fontWeight:'700',
    fontSize: normalizeFont(16),
    color:'#4A4A4A'
  },
   // === Modal-specific styles ===
   modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color:'#4A4A4A'
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeButtonText: {
    color: '#d00',
    fontWeight: '600',
    fontSize: 16,
  },
});
export default styles;
