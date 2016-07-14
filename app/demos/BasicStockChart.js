import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import {
  VictoryLine,
} from 'victory-chart-native';

import data from '../data';

class BasicStockChart extends Component {
  render() {
    const { ticks } = data;

    return (
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 24, paddingHorizontal: 20, paddingTop: 20 }}>Basic Line Chart</Text>
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

export default BasicStockChart;
