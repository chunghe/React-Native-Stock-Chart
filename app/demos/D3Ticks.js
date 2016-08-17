import React, { Component } from 'react';
import { Text, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, {Circle, Path } from 'react-native-svg';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;

class D3Ticks extends Component {
  render() {
    const scalePrice = d3Scale.scaleLinear().domain([8200, 8300]).range([0, 200]);
    const scalePriceCorrect = d3Scale.scaleLinear().domain([8200, 8300]).range([0, 200].reverse());
    return (
      <ScrollView style={styles.container}>
        <Text>D3 Ticks</Text>
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

export default D3Ticks;
