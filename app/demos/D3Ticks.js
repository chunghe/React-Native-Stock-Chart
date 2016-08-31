import React, { Component } from 'react';
import { Image, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import T from '../components/T';
import Code from '../components/Code';
import Svg, { Rect, G, Path, Text } from 'react-native-svg';

import data from '../data';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;
const bottomAxisHeight = 20;

class D3Ticks extends Component {

  getExclusiveTicks(start, end, count) {
    const ticks = d3Array.ticks(start, end, count);
    if (ticks.length <= 1) {
      return ticks;
    }
    const interval = ticks[1] - ticks[0];
    if (ticks[0] - interval <= 0) {
      return [...ticks, ticks[ticks.length - 1] + interval];
    }
    return [ticks[0] - interval, ...ticks, ticks[ticks.length - 1] + interval];
  }

  formatTime(t) {
    const paddingZero = (n) => {
      if (n < 10) {
        return `0${n}`;
      }
      return n;
    };

    return `${paddingZero(t.getHours())}:${paddingZero(t.getMinutes())}`;
  }

  render() {
    const { ticks, lowestPrice, highestPrice, tradingHours } = data;
    const tickCounts = 3;
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
    const priceTicks = d3Array.ticks(lowestPrice, highestPrice, tickCounts);


    const adjustPriceTicks = this.getExclusiveTicks(lowestPrice, highestPrice, tickCounts);
    const adjustPriceScale =
      d3Scale
      .scaleLinear()
      .domain([adjustPriceTicks[0], adjustPriceTicks[adjustPriceTicks.length - 1]])
      .range([0, defaultStockChartHeight].reverse());
    const timeTicks = timeScale.ticks(tickCounts);

    return (
      <ScrollView style={styles.container}>
        <T heading>Challenge</T>
        <T>1. ticks should be beatuiful number (multiply by 2, 5, 10)</T>
        <T>2. the interval of grid line should be equally distributed</T>

        <Image source={{ uri: 'https://raw.githubusercontent.com/chunghe/React-Native-Stock-Chart/1478e64a8494d56ff2baf4518261c7c84e67916f/app/assets/chart.png' }} style={{ width: null, height: 300 }} resizeMode="contain" />
        <Image source={{ uri: 'https://raw.githubusercontent.com/chunghe/React-Native-Stock-Chart/1478e64a8494d56ff2baf4518261c7c84e67916f/app/assets/better.png' }} style={{ width: null, height: 300 }} resizeMode="contain" />

        <T heading>d3Array.ticks(start, end, count)</T>
        <T>Returns an array of approximately count + 1 uniformly-spaced, nicely-rounded values between start and stop (inclusive). Each value is a power of ten multiplied by 1, 2 or 5. See also tickStep and linear.ticks.</T>
        <T>Ticks are inclusive in the sense that they may include the specified start and stop values if (and only if) they are exact, nicely-rounded values consistent with the inferred step. More formally, each returned tick t satisfies start ≤ t and t ≤ stop.</T>

        <T>highest price: {lowestPrice}, lowest price: {highestPrice}, generating {tickCounts} points: {`[${priceTicks.join(', ')}]`}</T>

        <Code>
        {`
  import * as d3Array from 'd3-array';

  const priceTicks = d3Array.ticks(
    lowestPrice,
    highestPrice,
    tickCounts
  );
        `}
        </Code>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
          <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
          {
            priceTicks.map(t => {
              return (
                <G key={t}>
                  <Text
                    x={deviceWidth - 5}
                    y={priceScale(t)}
                    textAnchor="end"
                    fill="#999"
                    key={t}
                  >
                    {`${t}`}
                  </Text>
                  <Path d={`M0 ${priceScale(t)} ${deviceWidth} ${priceScale(t)}`} stroke="#999" strokeDasharray="2,2" />
                </G>
                );
            })
          }
        </Svg>
        <Code>
          {`
  {
    priceTicks.map(t => {
      return (
        <G key={t}>
          <Text
            x={deviceWidth - 5}
            y={priceScale(t)}
            textAnchor="end"
            fill="#999"
          >
            {\`\${t}\`}
          </Text>
          <Path
            d={\`M0 \${priceScale(t)} \${deviceWidth} \${priceScale(t)}\`}
            stroke="#999"
            strokeDasharray="2,2"
          />
        </G>
        );
    })
  }
          `}
        </Code>
        <T>exclusivePriceTicks</T>
        <Svg height={defaultStockChartHeight} width={deviceWidth}>
          <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
          <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
          {
            adjustPriceTicks.map(t => {
              return (
                <G key={t}>
                  <Text
                    x={deviceWidth - 5}
                    y={adjustPriceScale(t) - 15}
                    textAnchor="end"
                    fill="#999"
                    key={t}
                  >
                    {`${t}`}
                  </Text>
                  <Path d={`M0 ${adjustPriceScale(t)} ${deviceWidth} ${adjustPriceScale(t)}`} stroke="#999" strokeDasharray="2,2" />
                </G>
                );
            })
          }
        </Svg>
        <T>Calculate timeScale and timeTicks</T>
        <Svg height={defaultStockChartHeight + bottomAxisHeight} width={deviceWidth}>
          <Path d={areaFunction(ticks)} fill="rgb(209, 237, 255, 0.85)" />
          <Path d={lineFunction(ticks)} stroke="rgb(0, 102, 221, 0.75)" fill="none" />
          {
            adjustPriceTicks.map(t => {
              return (
                <G key={t}>
                  <Text
                    key={t}
                    x={deviceWidth - 5}
                    y={adjustPriceScale(t) - 15}
                    textAnchor="end"
                    fill="#999"
                  >
                    {`${t}`}
                  </Text>
                  <Path d={`M0 ${adjustPriceScale(t)} ${deviceWidth} ${adjustPriceScale(t)}`} stroke="#999" strokeDasharray="2,2" />
                </G>
                );
            })
          }
          <G y={defaultStockChartHeight} fill="red">
          {
            timeTicks.map(t => {
              return (
                <G key={t}>
                  <Text
                    key={t}
                    x={timeScale(t)}
                    y={0}
                    textAnchor="middle"
                    fill="#999"
                  >
                    {`${this.formatTime(t)}`}
                  </Text>
                  <Rect x={timeScale(t)} y={0} width="1" height="5" fill="#999" />
                </G>
                );
            })
          }
          </G>
        </Svg>
        <Code>
        {`

  const timeTicks = timeScale.ticks(tickCounts);

  {
    timeTicks.map(t => {
      return (
        <G key={t}>
          <Text
            key={t}
            x={timeScale(t)}
            y={0}
            textAnchor="middle"
            fill="#999"
          >
            {\`\${this.formatTime(t)}\`}
          </Text>
          <Rect x={timeScale(t)} y={0} width="1" height="5" fill="#999" />
        </G>
        );
    })
  }
        `}
        </Code>
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

export default D3Ticks;
