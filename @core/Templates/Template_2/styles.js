// import { StyleSheet} from 'react-native';
// import _const from '../../constant/const';
// import color from '../../constant/color';

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     borderRadius: 8,
//     backgroundColor: color.white,
//     borderColor: color.neutral300,
//     borderWidth: 0.5,
//     width: '100%',
//     paddingHorizontal: 16,
//     paddingTop: 18,
    
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: _const.blissMedium,
//     fontWeight: '700',
//     lineHeight: 27,
//     color: color.primary600,
//     textAlign: 'left',
//   },
//   lineContainer:{
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   line: {
//     borderStyle: 'solid',
//     borderColor: color.neutral500,
//     borderTopWidth: 1,
//     flex: 1,
//     width: '100%',
//     height: 1,
//     paddingBottom: 24,
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   body : {
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   }

// });

// export default styles;
import { StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  TemplateContainer: {
    borderRadius: 8,
    backgroundColor: color.white,
    borderColor: color.neutral300,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingTop: 18,
    justifyContent:'center',
    alignItems:'center',
  },
  modalConatiner: {
    borderRadius: 8,
    backgroundColor: color.white,
    borderColor: color.neutral300,
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
  rowContainer: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-between',
  },
  metricValueBody : {
    justifyContent:'center',
    alignItems: 'flex-start',
    width:'100%'
  }

});

export default styles;
