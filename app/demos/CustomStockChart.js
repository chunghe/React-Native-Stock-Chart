import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { G,  Path, Text } from 'react-native-svg';
import data from '../data';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

// import { VictoryLine } from 'victory-chart-native';

const defaultWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;
const defaultVolumeChartHeight = 120;
const tickCount = 3;

class CustomStockChart extends Component {
  constructor(props) {
    super(props);
    const { lowestPrice, highestPrice, tradingHours } = data;
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
        .range([0, defaultStockChartHeight].reverse());
  }

  getStockPath() {
    const { ticks, } = data;
    const { xScale, yScale } = this;
    const lineFunction =
            d3Shape
              .line()
              .x(d => xScale(d.time * 1000))
              .y(d => yScale(d.price));

    return lineFunction(ticks);
  }

  getStockArea() {
    const { ticks, lowestPrice } = data;
    const { xScale, yScale } = this;
    const areaFunction =
            d3Shape
              .area()
              .x(d => xScale(d.time * 1000))
              .y(d => yScale(d.price))
              .y1(() => yScale(lowestPrice));
    return areaFunction(ticks);
  }


  getStockTickValues() {
    const { tradingHours, previousClose } = data;
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
        tick: String(tick),
        percent: roundDecimal((tick - previousClose) * 100 / previousClose)
      };
    });
  }

  getTickPath(values) {
    return values.reduce((prev, current) => {
      return `${prev} M${current.x1} ${current.y1} ${current.x2} ${current.y2}`;
    }, '');
  }

  roundDecimal(n, decimal = 2) {
    return Math.round(n * 100) / 100;
  }


  render() {
    const path = this.getStockPath();
    const values = this.getStockTickValues();

    return (
      <ScrollView style={styles.container}>
        <Svg height={defaultStockChartHeight + defaultVolumeChartHeight} width={defaultWidth} style={{ backgroundColor: '#efefef' }}>
          <Path d={this.getStockArea(values)} fill="rgb(237, 247, 255, 0.75)" />
          <Path d={path} stroke="rgba(0, 102, 221, 0.75)" fill="none" />
          <Path d={this.getTickPath(values)} stroke="rgb(153, 153, 153)" strokeDasharray="2,2" />
          <G>
          {
            values.map((value, index) => (
              <G key={index}>
                <Text x={value.x1} y={value.y1}>{value.tick}</Text>
                <Text x={value.x2} y={value.y1} textAnchor="end">{`${value.percent}%`}</Text>
              </G>
            ))
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
