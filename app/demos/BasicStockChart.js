import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  VictoryLine,
} from 'victory-chart-native';

import Text from '../components/Text';
import data from '../data';

class BasicStockChart extends Component {
  render() {
    const { ticks } = data;

    return (
      <ScrollView style={styles.container}>
        <Text heading>Basic Line Chart</Text>
        <Text>Draw basic line chart using VictoryLine</Text>
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
