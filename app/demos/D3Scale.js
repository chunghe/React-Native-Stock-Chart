import React, { Component } from 'react';
import { Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { Circle, Path } from 'react-native-svg';

import * as d3Scale from 'd3-scale';

import T from '../components/T';
import Code from '../components/Code';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;

class D3Scale extends Component {
  render() {
    const scalePrice = d3Scale.scaleLinear().domain([8200, 8300]).range([0, 200]);
    const scalePriceCorrect = d3Scale.scaleLinear().domain([8200, 8300]).range([0, 200].reverse());
    return (
      <ScrollView style={styles.container}>
        <T heading>Domain(定義域)/Range(值域)</T>
        <T>{`Given:
  - x axis: time
  - y axis: stock price
  - lowest Price: 8200
  - highest Price: 8300`}
        </T>
        <T> put 8210, 8254, 8276 on the chart (height: 200)</T>
        <T>domain: [8200, 8300], range: [0, 200]</T>
        <T>{`  scalePrice(8210): ${scalePrice(8210)}
  scalePrice(8254): ${scalePrice(8254)}
  scalePrice(8276): ${scalePrice(8276)}
        `}
        </T>

        <T heading>d3Scale</T>
        <Code>
          {`
  import * as D3Scale from 'd3-scale';

  const scalePrice =
    d3Scale
    .scaleLinear()
    .domain([8200, 8300])
    .range([0, 200]);
          `}
        </Code>
        <T heading>use scale function</T>
        <Svg width={deviceWidth} height={defaultStockChartHeight} style={styles.background}>
          <Circle cx="10" cy={scalePrice(8210)} r="5" fill="red" />
          <Circle cx="30" cy={scalePrice(8254)} r="5" fill="red" />
          <Circle cx="50" cy={scalePrice(8276)} r="5" fill="red" />
        </Svg>
        <Code>
        {`
  <Circle cx="10" cy=scalePrice(8210)} r="5" fill="red" />
  <Circle cx="30" cy=scalePrice(8254)} r="5" fill="red" />
  <Circle cx="50" cy=scalePrice(8276)} r="5" fill="red" />
        `}
        </Code>

        <T>The original point of the SVG is at the top left corner</T>
        <Svg width={deviceWidth} height={defaultStockChartHeight} style={styles.background}>
          <Circle cx="10" cy={scalePriceCorrect(8210)} r="5" fill="red" />
          <Circle cx="30" cy={scalePriceCorrect(8254)} r="5" fill="red" />
          <Circle cx="50" cy={scalePriceCorrect(8276)} r="5" fill="red" />
        </Svg>
        <Code>
          {`
  import * as D3Scale from 'd3-scale';

  const scalePriceCorrect =
    d3Scale
    .scaleLinear()
    .domain([8200, 8300])
    .range([0, 200].reverse());
          `}
        </Code>

        <T>draw by Path</T>
        <Svg width={deviceWidth} height={defaultStockChartHeight} style={styles.background}>
          <Path d={`M10 ${scalePriceCorrect(8210)} 30 ${scalePriceCorrect(8254)} 50 ${scalePriceCorrect(8276)}`} stroke="#666" fill="none" />
        </Svg>
        <Code>
          {`
  <Path d={\`M10 \${scalePriceCorrect(8210)} 30 \${scalePriceCorrect(8254)} 50 \${scalePriceCorrect(8276)}\`} stroke="#666" fill="none" />
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
  background: {
    backgroundColor: 'azure',
  }
});

export default D3Scale;
