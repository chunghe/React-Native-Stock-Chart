import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  VictoryLine,
} from 'victory-chart-native';

import Svg, { Path } from 'react-native-svg';
import Text from '../components/Text';
import data from '../data';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

console.log('d3scale', d3Scale);

class BasicStockChart extends Component {
  render() {
    const { ticks, lowestPrice, highestPrice } = data;
    const defaultPadding = 50;
    const defaultWidth = 450 - defaultPadding * 2;
    const defaultHeight = 300 - defaultPadding * 2;
    const times = ticks.map(t => t.time * 1000);
    const xScale = d3Scale.scaleLinear().domain([Math.min(...times), Math.max(...times)]).range([0, defaultWidth]);
    const yScale = d3Scale.scaleLinear().domain([lowestPrice, highestPrice]).range([0, defaultHeight].reverse()); //   reverse bacause the origin point of d3 svg is top left
    const lineFunction = d3Shape
                          .line()
                          .x(d => xScale(d.time * 1000))
                          .y(d => yScale(d.price));

    const path = lineFunction(ticks);
    console.log('pah', path);
    return (
      <ScrollView style={styles.container}>
        <Text heading>Basic Line Chart</Text>

        <Text>Draw basic line chart using only d3Scale/d3Shape, occupy full svg height/width</Text>
        <Svg height={defaultHeight} width={defaultWidth} style={{ backgroundColor: '#efefef' }}>
          <Path d={path} stroke="blue" strokeWidth={2} fill="none" />
        </Svg>

        <Text>Draw basic line chart using VictoryLine</Text>
        <VictoryLine
          data={ticks}
          x={(d) => d.time}
          y={'price'}
        />
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

export default BasicStockChart;
