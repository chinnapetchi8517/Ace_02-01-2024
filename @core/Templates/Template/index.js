import React, { Fragment } from "react";
import { View, Text, Pressable, Dimensions} from "react-native";
import styles from "./styles";
import Images from "../../assets";
import Switch from "../../components/SwitchSelector";
const {width,height}=Dimensions.get("screen");
export default template = ({ enableCardHeader = true, isBookmarked = false, title = "Sabari" }) => {
  const optionsData = [
    {label: '6M', value: 'option1'},
    {label: '1Y', value: 'option2'},
  ];
  const data = [
    {x: 'branch', y: 60},
    {
      x: 'dev',
      y: 10,
    },
    {x: 'red', y: 12},
    {x: 'test', y: 18},
  ];

  const stack1data = [
    {x: 'branch', y: 60},
    {
      x: 'dev',
      y: 10,
    },
    {x: 'red', y: 12},
    {x: 'test', y: 18},
  ];
  const stack2data = [
    {x: 'branch', y: 50},
    {
      x: 'dev',
      y: 10,
    },
    {x: 'red', y: 12},
    {x: 'test', y: 18},
  ];

  const stack3data = [
    {x: 'branch', y: 20},
    {
      x: 'dev',
      y: 10,
    },
    {x: 'red', y: 12},
    {x: 'test', y: 18},
  ];

  const nameScale = ['Last Year', 'MTD', 'YTD', 'Total Month'];
  return (
    <View style={styles.TemplateContainer}>
      {
      enableCardHeader ?
      <Fragment>
        <View style={styles.titleContainer}>
          <Pressable onPress={() =>{}}>
            <Text style={styles.title}>{title}</Text>
          </Pressable>
          <Images.Bookmark
            width={24}
            height={24}
            fill={"#fff"}
            onPress={()=>{}}
          />
        </View>
        <View style={styles.line}/>
      </Fragment>
      : null
      }
      <View style={styles.metricValueBody}>
      <Text>sabari</Text>
      <View style={styles.dashedLine}/> 
      <Text>sabari</Text>
      </View>
      <Switch 
      options={optionsData}
      selectedOption={'option1'}
      setSelectedOption={()=>{}}
      containerStyles={{marginVertical:30}}
      />
      <FlowMetricChart
          areaData={data}
          bar1Data={stack1data}
          bar2Data={stack2data}
          bar3Data={stack3data}
          width={width}
          height={210}
          colorScale={['#8543E0', '#F9F5FF', '#13C2C2', '#1890FF', '#223273']}
          nameScale={nameScale}
      />
    </View>
  )
};