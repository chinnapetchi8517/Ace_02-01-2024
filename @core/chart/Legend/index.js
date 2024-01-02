/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

// Style
import styles from './styles';

const CustomWrappedLegend = ({data, colors, width}) => {
  const itemsPerRow = 5;
  const rows = Math.ceil(data.length / itemsPerRow);

  return (
    <View style={[styles.legendWrapper, {width: width}]}>
      {[...Array(rows)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.legendContainer}>
          {data
            .slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
            .map((d, index) => (
              <View key={index} style={styles.rowContent}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: colors[index],
                    marginRight: 4,
                  }}
                />
                <Text style={styles.legend_label}>{d}</Text>
              </View>
            ))}
        </View>
      ))}
    </View>
  );
};

export default CustomWrappedLegend;
