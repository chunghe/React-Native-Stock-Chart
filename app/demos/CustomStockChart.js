import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, G,  Path, Text } from 'react-native-svg';
import data from '../data';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import * as d3TimeFormat from 'd3-time-format';
console.log('d3TimeFormat', d3TimeFormat);

// import { VictoryLine } from 'victory-chart-native';

const defaultWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;
const defaultVolumeChartHeight = 100;
const bottomAxisHeight = 20;
const tickCount = 3;

class CustomStockChart extends Component {
  constructor(props) {
    super(props);
    const { ticks, lowestPrice, highestPrice, tradingHours } = data;
    this.timeScale =
      d3Scale
        .scaleTime()
        .domain(tradingHours.map( t => t * 1000))
        .range([0, defaultWidth]);
    this.priceScale =
      d3Scale
        .scaleLinear()
        .domain([lowestPrice, highestPrice])
        // reverse bacause the origin point of d3 svg is top left
        .range([0, defaultStockChartHeight].reverse());
    this.volumes = ticks.map(t => t.volume);
    this.volumeScale =
      d3Scale.scaleLinear().domain([Math.min(...this.volumes), Math.max(...this.volumes)]).range([0, defaultVolumeChartHeight]);
    const chartPercent = (ticks[ticks.length - 1].time - tradingHours[0]) / (tradingHours[1] - tradingHours[0]);
    this.barWidth =  chartPercent * defaultWidth / this.volumes.length;
  }

  getStockPath() {
    const { ticks, } = data;
    const lineFunction =
            d3Shape
              .line()
              .x(d => this.timeScale(d.time * 1000))
              .y(d => this.priceScale(d.price));

    return lineFunction(ticks);
  }

  getStockArea() {
    const { ticks, lowestPrice } = data;
    const areaFunction =
            d3Shape
              .area()
              .x(d => this.timeScale(d.time * 1000))
              .y(d => this.priceScale(d.price))
              .y1(() => this.priceScale(lowestPrice));
    return areaFunction(ticks);
  }


  getPriceTickValues() {
    const { tradingHours, previousClose } = data;
    const yTicks = this.priceScale.ticks(tickCount);
    const timeScaled = tradingHours.map( t => this.timeScale(t * 1000));
    const roundDecimal = this.roundDecimal;
    return yTicks.map(tick => {
      const priceScaled = this.priceScale(tick);
      return {
        x1: timeScaled[0],
        y1: priceScaled,
        x2: timeScaled[1],
        y2: priceScaled,
        tick: String(tick),
        percent: roundDecimal((tick - previousClose) * 100 / previousClose)
      };
    });
  }

  getTimeTickValues() {
    const timeTicks = this.timeScale.ticks(3);
    const timePositions = timeTicks.map(t => this.timeScale(t.valueOf()));
    const formatTime = d3TimeFormat.timeFormat('%H:%M');
    return timeTicks.map( (t, index) => {
      return {
        x: timePositions[index],
        y: defaultStockChartHeight + defaultVolumeChartHeight,
        time: formatTime(timeTicks[index])
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
    const values = this.getPriceTickValues();

    return (
      <ScrollView style={styles.container}>
        <Svg height={defaultStockChartHeight + defaultVolumeChartHeight + bottomAxisHeight} width={defaultWidth}>
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
          <G style={{ backgroundColor: '#efefef' }}>
					{
            this.volumes.map( (volume, index) => {
              const width = this.barWidth;
              const height = this.volumeScale(volume);
              return (
                <Rect
                  key={index}
                  x={index * width}
                  y={defaultStockChartHeight + defaultVolumeChartHeight - height}
                  height={height}
                  width={width * 0.7}
                  fill={Math.random() < 0.5 ? 'rgb(222, 88, 73)' : 'rgb(80, 199, 101)'}
                />
              );
            })
					}
          </G>
          <Path d={`M0 ${defaultStockChartHeight + defaultVolumeChartHeight} ${defaultWidth} ${defaultVolumeChartHeight + defaultStockChartHeight}`} stroke="rgb(155, 155, 155)" />
          {
            this.getTimeTickValues().map((p, index) => <Text key={index} x={p.x} y={p.y + 5} textAnchor={index === 0 ? 'start' : 'middle'}>{p.time}</Text>)
          }
          {
            this.getTimeTickValues().map((p, index) =>
              <Rect key={index} x={p.x} y={p.y} fill="rgb(155, 155, 155)" width="1" height="5" />
            )
          }
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
