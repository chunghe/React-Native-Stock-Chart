import React, { Component } from 'react';
import { Text, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { Circle, Path } from 'react-native-svg';

import * as d3Scale from 'd3-scale';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;

class D3Scale extends Component {
  render() {
    const scalePrice = d3Scale.scaleLinear().domain([8200, 8300]).range([0, 200]);
    const scalePriceCorrect = d3Scale.scaleLinear().domain([8200, 8300]).range([0, 200].reverse());
    return (
      <ScrollView style={styles.container}>
        <Text>Domain(定義域)/Range(值域)</Text>
        <Text>假設 x 軸為時間, y 軸為股價, 當日股價最低8200, 最高 8300, 要把股價 8210, 8254, 8276 畫在高 200 的圖上</Text>
        <Text>domain: [8200, 8300], range: [0, 200]</Text>
        <Text>scalePrice(8210): {scalePrice(8210)}</Text>
        <Text>scalePrice(8254): {scalePrice(8254)}</Text>
        <Text>scalePrice(8276): {scalePrice(8276)}</Text>
        <Svg width={deviceWidth} height={defaultStockChartHeight} style={{ backgroundColor: '#efefef' }}>
          <Circle cx="10" cy={scalePrice(8210)} r="5" fill="red" />
          <Circle cx="30" cy={scalePrice(8254)} r="5" fill="red" />
          <Circle cx="50" cy={scalePrice(8276)} r="5" fill="red" />
          <Path d={`M0 ${scalePrice(8200)} ${deviceWidth} ${scalePrice(8200)}`} stroke="#666" strokeWidth="2" />
        </Svg>

        <Text>正確的座標是從左上角開始</Text>
        <Svg width={deviceWidth} height={defaultStockChartHeight} style={{ backgroundColor: '#efefef' }}>
          <Circle cx="10" cy={scalePriceCorrect(8210)} r="5" fill="red" />
          <Circle cx="30" cy={scalePriceCorrect(8254)} r="5" fill="red" />
          <Circle cx="50" cy={scalePriceCorrect(8276)} r="5" fill="red" />
          <Path d={`M0 ${scalePriceCorrect(8200)} ${deviceWidth} ${scalePriceCorrect(8200)}`} stroke="#666" strokeWidth="2" />
        </Svg>
        <Text>用 Path 畫看看</Text>
        <Svg width={deviceWidth} height={defaultStockChartHeight} style={{ backgroundColor: '#efefef' }}>
          <Path d={`M10 ${scalePriceCorrect(8210)} 30 ${scalePriceCorrect(8254)} 50 ${scalePriceCorrect(8276)}`} stroke="#666" fill="none" />
          <Path d={`M0 ${scalePriceCorrect(8200)} ${deviceWidth} ${scalePriceCorrect(8200)}`} stroke="#666" strokeWidth="2" />
        </Svg>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default D3Scale;
