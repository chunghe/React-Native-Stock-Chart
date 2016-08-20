import React, { Component } from 'react';
import {
  InteractionManager,
  View,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryArea
} from 'victory-chart-native';
import Svg from 'react-native-svg';

import T from '../components/T';
import Loading from '../components/Loading';
import data from '../data';
import * as util from '../util';

const defaultHeight = 200;
const defaultWidth = Dimensions.get('window').width;
const volumes = data.ticks.map( d => d.volume);
const highestVolume = Math.max(...volumes);
const lowestVolume = Math.min(...volumes);

class StockChartWithVolume extends Component {
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
        <View style={{ paddingBottom: 50 }}>
          <T heading>Combine Stock Chart with Volume Chart</T>

          <T>put two charts together</T>
          <Svg height={defaultHeight} width={defaultWidth}>
            <VictoryAxis
              dependentAxis
              height={defaultHeight}
              padding={{ left: 50, top: 0, bottom: 0, right: 50 }}
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
              height={defaultHeight}
              padding={{ left: 50, top: 0, bottom: 0, right: 50 }}
              orientation="right"
              standalone={false}
              domain={[lowestPrice, highestPrice]}
              tickFormat={(t) => util.tickFormatPercent(t, previousClose)}
              style={{
                axis: { stroke: 'transparent' },
                ticks: { stroke: 'transparent' }
              }}
            />

            <VictoryArea
              standalone={false}
              padding={{ left: 50, top: 0, bottom: 0, right: 50 }}
              data={ticks}
              domain={{
                x: tradingHours.map(t => t * 1000),
                y: [lowestPrice, highestPrice]
              }}
              x={(d) => new Date(d.time * 1000)}
              y={'price'}
              height={defaultHeight}
              style={{
                data: {
                  stroke: 'rgba(0, 102, 221, 0.75)',
                  fill: 'rgba(237, 247, 255, 0.75)',
                }
              }}
            />
            <VictoryLine
              standalone={false}
              height={defaultHeight}
              padding={{ left: 50, top: 0, bottom: 0, right: 50 }}
              domain={{
                y: [lowestPrice, highestPrice]
              }}
              data={[
                { x: tradingHours[0] * 1000, y: previousClose },
                { x: tradingHours[1] * 1000, y: previousClose }
              ]}
              style={{
                data: {
                  stroke: '#61c3bb',
                  strokeWidth: 1
                }
              }}
            />
          </Svg>

          <Svg height={100} width={defaultWidth}>
            <VictoryAxis
              height={100}
              padding={{ left: 50, top: 0, bottom: 20, right: 50 }}
              standalone={false}
              domain={tradingHours.map(t => t * 1000)}
              scale="time"
              style={{
                axis: { strokeWidth: 1, stroke: '#ddd' },
                ticks: { strokeWidth: 1, stroke: '#ddd' }
              }}
            />
            <VictoryAxis
              dependentAxis
              padding={{ left: 50, top: 0, bottom: 20, right: 50 }}
              height={100}
              standalone={false}
              domain={[lowestVolume, highestVolume]}
              tickFormat={v => v / 100000000}
              tickCount={2}
              style={{
                axis: { stroke: 'transparent' },
                ticks: { stroke: 'transparent' }
              }}
            />
            <VictoryBar
              padding={{ left: 50, top: 0, bottom: 20, right: 50 }}
              height={100}
              domain={{
                x: tradingHours.map(t => t * 1000)
              }}
              standalone={false}
              data={ticks}
              x={(d) => d.time * 1000}
              y={'volume'}
              style={{
                data: {
                  width: 1,
                  fill: (d) => { return d.mark ? 'red' : 'green'; }
                }
              }}
            />
          </Svg>
        </View>
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

export default StockChartWithVolume;
