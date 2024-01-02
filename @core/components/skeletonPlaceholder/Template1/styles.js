import { StyleSheet} from 'react-native';
import color from '../../../constant/color';
import _const from '../../../constant/const';
const styles = StyleSheet.create({
  TemplateContainer: {
    backgroundColor: color.white,
    borderColor: color.neutral300,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingTop: 18,
    justifyContent:'center',
    alignItems:'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    alignItems:'center'
  },
  title: {
    fontSize: 18,
    fontFamily: _const.blissRegular,
    fontWeight: '700',
    lineHeight: 27,
    color: color.primary600,
  },
  
  line: {
    borderStyle: 'solid',
    borderColor: color.neutral200,
    borderTopWidth: 1,
    width: '100%',
    marginTop:10,
    marginBottom:20  
  },

  dashedLine: {
    borderStyle: 'solid',
    borderColor: color.neutral900,
    borderTopWidth: 1,
    width: '100%',
    marginVertical:11,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricValueBody : {
    justifyContent:'center',
    alignItems: 'flex-start',
    width:'100%'
  }

});

export default styles;
