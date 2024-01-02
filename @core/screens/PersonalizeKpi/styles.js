import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';
const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    paddingHorizontal:16,
    backgroundColor:color.secondary100
  },
  skipButton:{
    width:73,
    height:32,
    backgroundColor:color.secondary200,
    borderRadius:50,
    marginTop:17,
    alignSelf:'flex-end',
    paddingLeft:12,
    paddingRight:6,
    flexDirection:'row',
    alignItems:'center',
  },
  title_skip:{
    fontSize:28,
    fontFamily:_const.blissRegular,
    fontWeight:'700',
    lineHeight:36.8,
    color:color.neutral900,
    marginTop:4
  },
  welcomeUser:{
    fontFamily:_const.blissRegular,
    fontWeight:'400',
    color:color.neutral800,
    marginTop:24,
    fontSize:18
  },
  skipButtonText:{
    fontWeight:'400',
    fontFamily:_const.blissRegular,
    fontSize:16,
    color:color.neutral800,
  },
  bottomButtonContainer:{
    position:'absolute',bottom:0,width:'100%',alignSelf:'center',paddingVertical:16,backgroundColor:color.secondary100
  },
  title:{
    fontSize:28,
    fontFamily:_const.blissRegular,
    fontWeight:'700',
    lineHeight:36.8,
    color:color.neutral900
  },
  flatlistInner:{
   width:'100%',
   paddingTop:31,
   paddingBottom:60
  },
  flatlistOuter:{
  },
  accordionHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:27,
  },
  kpiContainer:{
    width:"100%",
    marginBottom:24,
    borderBottomWidth:1,
    borderColor:color.neutral200,
    minHeight:35,
  },
  titleCheckbox:{
    flexDirection:'row',
    alignItems:'center',
  },
  checkBox:{
    width:20,
    height:20,
    borderRadius:4,
    borderWidth:1,
    borderColor:color.neutral300,
    backgroundColor:'white',
    marginRight:8,
    justifyContent:'center',
    alignItems:'center'
  },
  isSelectedCheckbox:{
    backgroundColor:color.primary500,
    borderColor:color.primary500
  },
  metricsContainer:{
    paddingVertical:20,
    flexDirection:'row',
    gap:16,
    flexWrap:"wrap"
    // display:'none'
  },
  metrics:{
    paddingHorizontal:16,
    borderRadius:50,
    height:32,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    borderColor:color.neutral700
  },
  selectedmetrics:{
    backgroundColor:color.primary500,
    borderColor:color.primary500,
  },
  l1:{
    fontSize:18,
    fontFamily:_const.blissRegular,
    fontWeight:'500',
    color:color.neutral800
  },
  l2:{
    fontSize:16,
    fontFamily:_const.blissRegular,
    fontWeight:'400',
    color:color.neutral700
  },
  selectedl2:{
    color:color.white00
  },
  countContainer:{
    backgroundColor:color.primary200,
    color:color.white00,
    paddingHorizontal:10,
    height:20,
    borderRadius:100,
    alignItems:"center",
    justifyContent:'center',
    marginLeft:8
  },
  countText:{
    fontSize:13,
    color:color.primary700,
    fontFamily:_const.blissMedium,
    fontWeight:"600"
  },
  modalstyle: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
  noRecordContainer: {
    alignItems: 'center',
    gap: 24,
  },
  title_noRecord:{
    fontSize:18,
    fontFamily:_const.blissMedium,
    fontWeight:'500',
    lineHeight:27,
    color:color.neutral600,
  },
});

export default styles;
