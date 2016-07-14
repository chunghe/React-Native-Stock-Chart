import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryAxis,
  VictoryLine,
} from 'victory-chart-native';
import Svg  from 'react-native-svg';

import data from '../data';
import * as util from '../util';

const defaultHeight = 300;
const defaultWidth = Dimensions.get('window').width;

class MultipleAxes extends Component {
  render() {
    const { ticks, tradingHours, lowestPrice, highestPrice, previousClose } = data;
    return (
      <ScrollView style={styles.container}>
        <Text>let's add another Y-axis to display percentage, if you try to put more than one VictoryAxis dependentAxis, it will cause an error, let's begin with the very basic chart with 2 Y-axis</Text>
        <Text>you have to wrap the VictoryAxis with Svg from 'react-native-svg' and calculate the domain for yourself</Text>
        <Text>make sure you set standalone: false or it will crash</Text>
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

        <Text>Let's draw the price line here</Text>
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

        <Text>make the domain/scale of each VictoryAxis/VictoryLine correct</Text>
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

        <Text>tweak the tickFormat of the right Y-axis to display percentage</Text>
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

        <Text>add back previousClose line</Text>
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
