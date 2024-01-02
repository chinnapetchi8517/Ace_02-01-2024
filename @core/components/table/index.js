// Table Component
import React, { useState } from 'react';
import {FlatList, Text, View, ScrollView, Pressable} from 'react-native';

// Constant
import _const from '../../constant/const';
import color from '../../constant/color';

// Images
import Images from '../../assets';

// Style
import styles from './styles';

export const Table = ({
  bounces = false,
  children,
  horizontal = true,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
}) => {
  return (
    <ScrollView
      bounces={bounces}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={styles.tableContainer}>
      {children}
    </ScrollView>
  );
};

export const TableHeader = ({
  bounces = false,
  headers = ['Br.Name', 'MTD', 'YTD'],
  horizontal = true,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  onSort,
}) => {
  const [sortBy, setSortBy] = useState(null)
  const [sortIndex, setSortIndex] = useState(null)

  const renderHeader = (headerData, headerIndex) => {
    let headerCustomContainer =
      headerIndex % 2 ? styles.headerContainerI : styles.headerContainerII;

    headerCustomContainer = {
      ...headerCustomContainer,
      borderLeftWidth: headerIndex % 2,
      borderTopLeftRadius: headerIndex == 0 ? 8 : 0,
      borderTopRightRadius: headers.length == headerIndex + 1 ? 8 : 0,
      borderRightWidth: headerIndex % 2,
    };

    return (
      <View key={headerIndex} style={headerCustomContainer}>
        <Pressable
          onPress={() => {
            let temp = 
              sortBy == null
                ? 'asc'
                : sortBy == 'asc'
                  ? 'dsc'
                  : null

            temp = !temp && sortIndex == headerIndex ? null : sortIndex != headerIndex ? 'asc' : temp

            setSortBy(temp)

            setSortIndex(!temp && sortIndex == headerIndex ? null : headerIndex)

            onSort(headerIndex, temp)
          }}>
          <View style={styles.headerLabelContainer}>
            <Text style={styles.headerLabelText}>{headerData}</Text>
            <View style={styles.headerLabelVectorIconContainer}>
              {headerIndex == 0 ? (
                <Images.VectorPrimary
                  width={7.25}
                  height={7.25}
                  fill={color.primary800}
                />
              ) : sortBy == 'asc' && sortIndex == headerIndex ? (
                <Images.VectorNeutralUp
                  width={7.25}
                  height={7.25}
                  fill={color.neutral400}
                />
              ) : sortBy == 'dsc' && sortIndex == headerIndex ? (
                <Images.VectorNeutralDown
                  width={7.25}
                  height={7.25}
                  fill={color.neutral400}
                />
              ) : (
                <>
                  <Images.VectorNeutralUp
                    width={7.25}
                    height={7.25}
                    fill={color.neutral400}
                  />
                  <Images.VectorNeutralDown
                    width={7.25}
                    height={7.25}
                    fill={color.neutral400}
                  />
                </>
              )}
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      bounces={bounces}
      data={headers}
      horizontal={horizontal}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => renderHeader(item, index)}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
};
