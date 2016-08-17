import React, { Component } from 'react';
import { Text, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

const deviceWidth = Dimensions.get('window').width;

class SVGLine extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>SVG element with 100 width 100 height</Text>
        <Svg height={100} width={100} style={{backgroundColor: '#efefef'}} />
        <Text>SVG element with width equals to device width</Text>
        <Svg height={100} width={deviceWidth} style={{backgroundColor: '#efefef', flex: 1}} />
        <Text>Path</Text>
        <Text>- SVG 的座標系統 (TODO) </Text>
        <Text>- Path 的 mini language (TODO)</Text>
        <Svg height={100} width={deviceWidth} style={{backgroundColor: '#efefef', flex: 1}}>
          <Path d={`M0 50 ${deviceWidth} 50`} stroke="blue" />
          <Path d={`M${deviceWidth / 2} 0 ${deviceWidth / 2} 100 `} stroke="green" />
        </Svg>
        <Text>Path </Text>
        <Text>- strokeWidth/dashArray</Text>
        <Svg height={100} width={deviceWidth} style={{backgroundColor: '#efefef', flex: 1}}>
          <Path d={`M${deviceWidth / 2} 0 ${deviceWidth / 2} 100 `} strokeWidth="2"/>
          <Path d={`M0 50 ${deviceWidth} 50`} stroke="blue" strokeWidth="2" strokeDasharray="2,2" />
        </Svg>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default SVGLine;
