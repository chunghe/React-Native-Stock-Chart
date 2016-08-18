import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, G,  Path, Text } from 'react-native-svg';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import * as d3TimeFormat from 'd3-time-format';

import data from '../data';

const defaultWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;
const defaultVolumeChartHeight = 80;
const bottomAxisHeight = 20;
const priceTickCounts = 3;

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
      d3Scale
      .scaleLinear()
      .domain([Math.min(...this.volumes), Math.max(...this.volumes)])
      .range([0, defaultVolumeChartHeight]);
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
    const yTicks = this.priceScale.ticks(priceTickCounts);
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
        y: defaultVolumeChartHeight,
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
    const values = this.getPriceTickValues();
    const { ticks } = data;

    return (
      <ScrollView style={styles.container}>
        <Svg height={defaultStockChartHeight + defaultVolumeChartHeight + bottomAxisHeight} width={defaultWidth}>
          <Path d={this.getStockArea(values)} fill="rgb(209, 237, 255, 0.85)" />
          <Path d={this.getStockPath()} stroke="rgba(0, 102, 221, 0.75)" fill="none" />
          <Path d={this.getTickPath(values)} stroke="rgba(153, 153, 153, 0.45)" strokeDasharray="2,2" />
          <G fontSize="13" fill="rgb(155, 155, 155)">
          {
            // draw tickLabels
            values.map((value, index) => (
              <G key={index}>
                <Text x={value.x2} y={value.y1} textAnchor="end">{value.tick}</Text>
                <Text x={value.x1} y={value.y1}>{`${value.percent}%`}</Text>
              </G>
            ))
          }
          </G>
          <G y={defaultStockChartHeight} fill="rgb(155, 155, 155)" fontSize="13">
            { // draw volume bars
              ticks.map( (tick, index) => {
                const volume = tick.volume;
                const width = this.barWidth;
                const height = this.volumeScale(volume);
                return (
                  <Rect
                    key={index}
                    x={index * width}
                    y={defaultVolumeChartHeight - height}
                    height={height}
                    width={width * 0.7}
                    fill={tick.mark ? 'rgb(222, 88, 73)' : 'rgb(80, 199, 101)'}
                  />
                );
              })
            }
            <Path
              d={`M0 -${defaultStockChartHeight - defaultVolumeChartHeight} ${defaultWidth} -${defaultStockChartHeight - defaultVolumeChartHeight}`}
              stroke="rgb(155, 155, 155)"
            />
            {
              this.getTimeTickValues()
                .map((p, index) =>
                  <G key={index}>
                    <Text x={p.x} y={p.y + 5} textAnchor={index === 0 ? 'start' : 'middle'}>{p.time}</Text>
                    <Rect x={p.x} y={p.y} fill="rgb(155, 155, 155)" width="1" height="5" />
                  </G>
                )
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
