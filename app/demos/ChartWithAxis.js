import React, { Component } from 'react';
import { InteractionManager, ScrollView, StyleSheet } from 'react-native';
import {
  VictoryAxis,
  VictoryLine,
  VictoryChart
} from 'victory-chart-native';

import Text from '../components/Text';
import Loading from '../components/Loading';
import data from '../data';

class ChartWithAxis extends Component {
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
    const { ticks, tradingHours, highestPrice, lowestPrice, previousClose } = data;
    if (!this.state.isReady) {
      return <Loading />;
    }
    return (
      <ScrollView style={styles.container}>
        <Text heading>Line Chart with Axis</Text>
        <Text>VictoryChart will calcualte proper scale with axis for you</Text>
        <VictoryChart>
          <VictoryLine
            data={ticks}
            x={(d) => d.time}
            y={'price'}
          />
        </VictoryChart>

        <Text>add scale: "time" to x-axis, VictoryChart will display proper time format</Text>
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

        <Text>it turns out this is only partial data, add domain to the x-axis to make the chart only occupy part of the chart</Text>
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

        <Text>add some padding at the bottom of the chart</Text>
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

        <Text>add grid lines</Text>
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

        <Text>add grid line to show previous close price</Text>
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

        <Text>somehow the domain of y-aix is wrongly calculated, let's calculate it manually</Text>
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
