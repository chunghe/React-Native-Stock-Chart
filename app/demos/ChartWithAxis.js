import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import {
  VictoryAxis,
  VictoryLine,
  VictoryChart
} from 'victory-chart-native';

import data from '../data';

class ChartWithAxis extends Component {
  render() {
    const { ticks, tradingHours, highestPrice, lowestPrice, previousClose } = data;
    return (
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 24 }}>With Axis</Text>
        <Text>VictoryChart will calcualte proper scale with axis for you</Text>
        <VictoryChart>
          <VictoryLine
            data={ticks}
            x={(d) => d.time}
            y={'price'}
          />
        </VictoryChart>

        <Text>add scale: "time" to x-axis, Victory chart will display proper time format</Text>
        <VictoryChart
          scale={{
            x: 'time'
          }}
        >
          <VictoryLine
            data={ticks}
            x={(d) => d.time * 1000}
            y={'price'}
          />
        </VictoryChart>

        <Text>it turns out this is only part of the daily data, add domain to the x-axis to make the chart only part of daily chart</Text>
        <VictoryChart
          scale={{
            x: 'time'
          }}
          domain={{
            x: tradingHours.map(t => t * 1000)
          }}
        >
          <VictoryLine
            data={ticks}
            x={(d) => d.time * 1000}
            y={'price'}
          />
        </VictoryChart>

        <Text>add some room at the bottom</Text>
        <VictoryChart
          domainPadding={{
            y: 20
          }}
          scale={{
            x: 'time'
          }}
          domain={{
            x: tradingHours.map(t => t * 1000)
          }}
        >
          <VictoryLine
            data={ticks}
            x={(d) => d.time * 1000}
            y={'price'}
          />
        </VictoryChart>

        <Text>add some grid line</Text>
        <VictoryChart
          domainPadding={{
            y: 20
          }}
          scale={{
            x: 'time'
          }}
          domain={{
            x: tradingHours.map(t => t * 1000)
          }}
        >
          <VictoryAxis />
          <VictoryAxis
            dependentAxis
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
            data={ticks}
            x={(d) => d.time * 1000}
            y={'price'}
          />
        </VictoryChart>

        <Text>add previous close</Text>
        <VictoryChart
          domainPadding={{
            y: 20
          }}
          scale={{
            x: 'time'
          }}
          domain={{
            x: tradingHours.map(t => t * 1000)
          }}
        >
          <VictoryAxis />
          <VictoryAxis
            dependentAxis
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
            data={ticks}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
          <VictoryLine
            data={[
              { x: tradingHours[0] * 1000, y: previousClose },
              { x: tradingHours[1] * 1000, y: previousClose }
            ]}
          />
        </VictoryChart>

        <Text>But somehow the domain of Y-Axis is wrongly calculated, let's calculate it manually</Text>
        <VictoryChart
          domainPadding={{
            y: 20
          }}
          scale={{
            x: 'time'
          }}
          domain={{
            x: tradingHours.map(t => t * 1000),
            y: [lowestPrice, highestPrice]
          }}
        >
          <VictoryAxis />
          <VictoryAxis
            dependentAxis
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
            data={ticks}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
          <VictoryLine
            data={[
              { x: tradingHours[0] * 1000, y: previousClose },
              { x: tradingHours[1] * 1000, y: previousClose }
            ]}
          />
        </VictoryChart>
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

export default ChartWithAxis;
