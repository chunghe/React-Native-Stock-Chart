import React, { Component } from 'react';
import { Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import data from '../data';
import T from '../components/Text';
import Code from '../components/Code';

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
        <T heading>D3 Shape</T>
        <T>手動繪製只能處理簡單的圖, 如果需要畫複雜一點的圖會需要 D3Shape</T>
        <T>Arcs/Pie/Lines/Areas/Curves/Stacks, etc</T>
        <T>現在只需要 Lines/Areas</T>
        <T>先準備好兩個 scale function: timeScale/priceScale</T>
        <T>timeScale</T>
        <Code>
          {`
  const timeScale =
    d3Scale
      .scaleTime()
      .domain(tradingHours.map( t => t * 1000))
      .range([0, deviceWidth]);
        `}
        </Code>
        <T>priceScale:</T>
        <Code>
        {`
  const priceScale =
    d3Scale
      .scaleLinear()
      .domain([lowestPrice, highestPrice])
      .range([0, defaultStockChartHeight].reverse());
        `}
        </Code>
        <T>利用 d3Shape.line() 產生 path 的點</T>
        <Code>
          {`
  const lineFunction =
    d3Shape
      .line()
      .x(d => timeScale(d.time * 1000))
      .y(d => priceScale(d.price));
        `}
        </Code>
        <T>lineFunction(ticks), 其中 ticks: [{'{'}time: .., price: ...{'}'}]</T>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
        </Svg>
        <Code>
        {`
  <Svg height={defaultStockChartHeight} width={deviceWidth}>
    <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
  </Svg>
        `}
        </Code>
        <T>利用 d3Shape.area() 產生 area 的點</T>
        <Code>
        {`
  const areaFunction =
    d3Shape
      .area()
      .x(d => timeScale(d.time * 1000))
      .y(d => priceScale(d.price))
      .y1(() => priceScale(lowestPrice));
        `}
        </Code>
        <T>其中 y1 用來決定如何圍成一個 area</T>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
        </Svg>
        <Code>
        {`
  <Svg height={defaultStockChartHeight} width={deviceWidth}>
    <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
  </Svg>
        `}
        </Code>
        <T>放在同一張圖上</T>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
          <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
        </Svg>
        <Code>
        {`
  <Svg height={defaultStockChartHeight} width={deviceWidth}>
    <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
    <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
  </Svg>
        `}
        </Code>
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
