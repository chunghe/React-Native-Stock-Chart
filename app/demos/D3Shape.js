import React, { Component } from 'react';
import { Text, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import data from '../data';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;

class D3Shape extends Component {
  render() {
    const { ticks, lowestPrice, highestPrice, tradingHours } = data;
    const timeScale =
      d3Scale
        .scaleTime()
        .domain(tradingHours.map( t => t * 1000))
        .range([0, deviceWidth]);
    const priceScale =
      d3Scale
        .scaleLinear()
        .domain([lowestPrice, highestPrice])
        .range([0, defaultStockChartHeight].reverse());
    const lineFunction =
      d3Shape
        .line()
        .x(d => timeScale(d.time * 1000))
        .y(d => priceScale(d.price));
    const areaFunction =
      d3Shape
        .area()
        .x(d => timeScale(d.time * 1000))
        .y(d => priceScale(d.price))
        .y1(() => priceScale(lowestPrice));

    return (
      <ScrollView style={styles.container}>
        <Text>D3 Shape</Text>
        <Text>手動繪製只能處理簡單的圖, 如果需要畫複雜一點的圖會需要 D3Shape</Text>
        <Text>Arcs/Pie/Lines/Areas/Curves/Stacks, etc</Text>
        <Text>現在只需要 Lines/Areas</Text>
        <Text>先準備好兩個 scale function: timeScale/priceScale</Text>
        <Text>timeScale: domain([開盤時間, 收盤時間]) range([0, chartWidth])</Text>
        <Text>priceScale: domain([最低價, 最高價]) range([0, chartHeight].reverse())</Text>
        <Text>利用 d3Shape.line() 產生 path 的點: lineFunction = D3Shape.line().x(d => timeScale(d.time)).y(d => priceScale(d.price))</Text>
        <Text>lineFunction(ticks), 其中 ticks: [{'{'}time: .., price: ...{'}'}]</Text>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
        </Svg>
        <Text>利用 d3Shape.area() 產生 area 得點: areaFunction = D3Shape.area().x(d => timeScale(d.time)).y(d => priceScale(d.price)).y1(() => this.priceScale(lowestPrice))</Text>
        <Text>y1 用來決定如何圍成一個 area</Text>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
        </Svg>
        <Text>放在同一張圖上</Text>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
          <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
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

export default D3Shape;
