import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryAxis,
	VictoryBar,
} from 'victory-chart-native';
import Svg from 'react-native-svg';

import data from '../data';

const defaultHeight = 300;
const defaultWidth = Dimensions.get('window').width;
const volumes = data.ticks.map( d => d.volume);
const highestVolume = Math.max(...volumes);
const lowestVolume = Math.min(...volumes);

class VolumeChart extends Component {
  render() {
    const { ticks, tradingHours } = data;
    return (
      <ScrollView style={styles.container}>
        <Text>Basic volume chart using VictoryBar</Text>
        <VictoryBar
          height={200}
          data={ticks}
          x={(d) => d.time}
          y={'volume'}
        />

        <Text>add some color</Text>
        <VictoryBar
          height={200}
          data={ticks}
          x={(d) => d.time}
          y={'volume'}
          style={{
            data: {
              fill: (d) => { return d.mark ? 'red' : 'green'; }
            }
          }}
        />

        <Text>Add axis, set proper domain</Text>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            domain={tradingHours.map(t => t * 1000)}
            scale="time"
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestVolume, highestVolume]}
            tickFormat={v => v / 100000000}
          />
          <VictoryBar
            domain={{
              x: tradingHours.map(t => t * 1000)
            }}
            standalone={false}
            data={ticks}
            x={(d) => d.time * 1000}
            y={'volume'}
            style={{
              data: {
                fill: (d) => { return d.mark ? 'red' : 'green'; }
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

export default VolumeChart;
