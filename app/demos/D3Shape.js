import React, { Component } from 'react';
import { Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import data from '../data';
import T from '../components/T';
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
        <T>- To draw more complicated chart, you will need d3Shape</T>
        <T>- Arcs/Pie/Lines/Areas/Curves/Stacks, etc</T>
        <T>Example:</T>
        <Code>
				{`
	import * as d3Shape from 'd3-shape';

	var arc = d3Shape.arc()
			.innerRadius(0)
			.outerRadius(100)
			.startAngle(0)
			.endAngle(Math.PI / 2);

	arc();
	// "M0,-100A100,100,0,0,1,100,0L0,0Z"
				`}
        </Code>
        <T>- For stock chart, only needed D3Shape.line()/D3Shape.area() function</T>
        <T>- preparing two scale functions: timeScale/priceScale</T>
        <T>timeScale:</T>
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
        <T>define a line generator for a time series by scaling fields of your data to fit the chart</T>
        <Code>
          {`
  const lineFunction =
    d3Shape
      .line()
      .x(d => timeScale(d.time * 1000))
      .y(d => priceScale(d.price));

  // ticks: array of {time: ..., price: ...}
  lineFunction(ticks);
  // M0,44.98527968596417L1.2685281997662834,117.52698724239188L2.652377144965865,153.13052011775952L4.036226090165447,166.7124631992159L5.420075035365028,173.54268891069705L6.80392398056461,182.72816486751822L8.187772925764191,...
        `}
        </Code>
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
        <T>define a area generator for a time series by scaling fields of your data to fit the chart</T>
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
