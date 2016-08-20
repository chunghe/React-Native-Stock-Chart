import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  VictoryLine,
} from 'victory-chart-native';

import T from '../components/T';
import data from '../data';

class BasicLineChart extends Component {
  render() {
    const { ticks } = data;
    return (
      <ScrollView style={styles.container}>
        <T heading>Draw basic line chart using VictoryLine</T>
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

export default BasicLineChart;
