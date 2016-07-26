import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, {G,  Path, Text } from 'react-native-svg';
import data from '../data';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import { VictoryLine } from 'victory-chart-native';


const defaultPadding = 50;
const defaultWidth = Dimensions.get('window').width;
const defaultHeight = 200;
const padding = 10;
const tickCount = 3;

class CustomStockChart extends Component {
  constructor(props) {
    super(props);
    const { ticks, lowestPrice, highestPrice, tradingHours } = data;
    this.xScale =
      d3Scale
        .scaleTime()
        .domain(tradingHours.map( t => t * 1000))
        .range([0, defaultWidth]);
    this.yScale =
      d3Scale
        .scaleLinear()
        .domain([lowestPrice, highestPrice])
        // reverse bacause the origin point of d3 svg is top left
        .range([0, defaultHeight].reverse());
  }

  roundDecimal(n, decimal = 2) {
    return Math.round(n * 100) / 100;
  }

  getStockPath() {
    const { ticks, lowestPrice, highestPrice, tradingHours } = data;
    const { xScale, yScale } = this;
    const lineFunction =
            d3Shape
              .line()
              .x(d => xScale(d.time * 1000))
              .y(d => yScale(d.price));

    return lineFunction(ticks);
  }

  getStockArea() {
    const { ticks, lowestPrice, highestPrice, tradingHours } = data;
    const { xScale, yScale } = this;
    const areaFunction =
            d3Shape
              .area()
              .x(d => xScale(d.time * 1000))
              .y(d => yScale(d.price))
              .y1(() => yScale(lowestPrice));
    return areaFunction(ticks);
  }


  getTickValues() {
    const { ticks, lowestPrice, highestPrice, tradingHours, previousClose } = data;
    const yTicks = this.yScale.ticks(tickCount);
    const xScaled = tradingHours.map( t => this.xScale(t * 1000));
    const roundDecimal = this.roundDecimal;
    return yTicks.map(tick => {
      const yScaled = this.yScale(tick);
      return {
        x1: xScaled[0],
        y1: yScaled,
        x2: xScaled[1],
        y2: yScaled,
        tick: '' + tick,
        percent: roundDecimal((tick - previousClose) * 100/ previousClose)
      };
    })
  }

  getTickLabel() {

    const values = this.getTickValues();

  }

  getTickPath(values) {
    return values.reduce((prev, current) => {
      return `${prev} M${current.x1} ${current.y1} ${current.x2} ${current.y2}`;
    }, '');

  }

  render() {
    const { ticks } = data;
    const path = this.getStockPath();
    const values = this.getTickValues();
    console.log('path', path);
    console.log('getStockArea', this.getStockArea(values));

    return (
      <ScrollView style={styles.container}>
        <Svg height={defaultHeight} width={defaultWidth}>
          <Path d={this.getStockArea(values)} fill="rgb(237, 247, 255, 0.75)" />
          <Path d={path} stroke="rgba(0, 102, 221, 0.75)" fill="none" />
          <Path d={this.getTickPath(values)} stroke="rgb(153, 153, 153)" />
          <G>
          {
            values.map((value, index) => {console.log('value', value); return <Text key={index} x={value.x1} y={value.y1}>{value.tick}</Text>})
          }
          </G>
          <G>
          {
            values.map((value, index) => {console.log('value', value); return <Text key={index} x={value.x2} y={value.y1} textAnchor="end">{`${value.percent}%`}</Text>})
          }
          </G>
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

export default CustomStockChart;
