import React, { Component } from 'react';
import { InteractionManager, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryArea,
  VictoryAxis,
  VictoryLine,
} from 'victory-chart-native';
import Svg  from 'react-native-svg';

import Loading from '../components/Loading';
import T from '../components/T';
import data from '../data';
import * as util from '../util';

const defaultHeight = 300;
const defaultWidth = Dimensions.get('window').width;

class MultipleAxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ isReady: true });
    });
  }
  render() {
    const { ticks, tradingHours, lowestPrice, highestPrice, previousClose } = data;
    if (!this.state.isReady) {
      return <Loading />;
    }
    return (
      <ScrollView style={styles.container}>
        <T heading>Line chart with multiple Axes</T>
        <T>let's add another y-axis to display percentage change, if you try to put more than one y-axis in a VictoryChart , it will cause an error, you have to wrap two y-axis in a Svg element from 'react-native-svg' and calculate the domain manually</T>
        <T>make sure you set standalone: false or it will crash</T>
        <T>let's begin with the very basic chart with 2 y-axes</T>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
          />
        </Svg>

        <T>Let's draw the price line here</T>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
        </Svg>

        <T>again, we have to set correct domain/scale for VictoryAxis/VictoryLine</T>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000)
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
        </Svg>

        <T>tweak the tickFormat of the right y-axis to display percentage</T>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            tickFormat={(t) => util.tickFormatPercent(t, previousClose)}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000)
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
        </Svg>

        <T>add previous close line/grid line back</T>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            style={{
              grid: {
                stroke: '#ddd',
                strokeWidth: 1
              },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' }
            }}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            tickFormat={(t) => util.tickFormatPercent(t, previousClose)}
            style={{
              grid: {
                stroke: '#ddd',
                strokeWidth: 1
              },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' }
            }}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000)
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
          <VictoryLine
            standalone={false}
            domain={{
              y: [lowestPrice, highestPrice]
            }}
            data={[
              { x: tradingHours[0] * 1000, y: previousClose },
              { x: tradingHours[1] * 1000, y: previousClose }
            ]}
            style={{
              data: {
                stroke: 'blue',
                strokeWidth: 0.5
              }
            }}
          />
        </Svg>

        <T>use AxisArea</T>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
            style={{
              axis: { strokeWidth: 1, stroke: '#ddd' },
              ticks: { strokeWidth: 1, stroke: '#ddd' }
            }}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            style={{
              grid: {
                stroke: '#ddd',
                strokeWidth: 1
              },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' }
            }}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            tickFormat={(t) => util.tickFormatPercent(t, previousClose)}
            style={{
              grid: {
                stroke: '#ddd',
                strokeWidth: 1
              },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' }
            }}
          />
          <VictoryArea
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000),
              y: [lowestPrice, highestPrice]
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
            style={{
              data: {
                stroke: 'rgba(0, 102, 221, 0.75)',
                fill: 'rgba(237, 247, 255, 0.75)',
              }
            }}
          />
          <VictoryLine
            standalone={false}
            domain={{
              y: [lowestPrice, highestPrice]
            }}
            data={[
              { x: tradingHours[0] * 1000, y: previousClose },
              { x: tradingHours[1] * 1000, y: previousClose }
            ]}
            style={{
              data: {
                stroke: 'blue',
                strokeWidth: 0.5
              }
            }}
          />
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

export default MultipleAxes;
