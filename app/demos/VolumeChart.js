import React, { Component } from 'react';
import { View, InteractionManager, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryAxis,
	VictoryBar,
} from 'victory-chart-native';
import Svg from 'react-native-svg';

import Text from '../components/Text';
import Loading from '../components/Loading';
import data from '../data';

const defaultHeight = 300;
const defaultWidth = Dimensions.get('window').width;
const volumes = data.ticks.map( d => d.volume);
const highestVolume = Math.max(...volumes);
const lowestVolume = Math.min(...volumes);

class VolumeChart extends Component {
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
    const { ticks, tradingHours } = data;
    if (!this.state.isReady) {
      return <Loading />;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 50 }}>
          <Text heading>Volume chart</Text>
          <Text>basic volume chart using VictoryBar</Text>
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

          <Text>remove the default padding to make the volume chart more compact and display fewer tickCount</Text>
          <Svg height={100} width={defaultWidth}>
            <VictoryAxis
              height={100}
              padding={{ left: 50, top: 0, bottom: 20, right: 50 }}
              standalone={false}
              domain={tradingHours.map(t => t * 1000)}
              scale="time"
            />
            <VictoryAxis
              dependentAxis
              padding={{ left: 50, top: 0, bottom: 20, right: 50 }}
              height={100}
              standalone={false}
              domain={[lowestVolume, highestVolume]}
              tickFormat={v => v / 100000000}
              tickCount={2}
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

export default VolumeChart;
