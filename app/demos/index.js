import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
  VictoryAxis,
	VictoryBar,
  VictoryLine,
  VictoryChart
} from 'victory-chart-native';
import Svg, { G, Circle } from 'react-native-svg';

import data from '../data';
import * as util from '../util';
import { navigatePush } from '../redux/modules/routing';

const defaultHeight = 300;
const defaultWidth = Dimensions.get('window').width;

const volumes = data.ticks.map( d => d.volume);
const highestVolume = Math.max(...volumes);
const lowestVolume = Math.min(...volumes);


class Demos extends Component {
  render() {
		const { handlePress } = this.props;
    const { ticks, tradingHours, highestPrice, lowestPrice, previousClose } = data;

    return (
      <ScrollView style={styles.container}>
				<TouchableOpacity onPress={() => handlePress('BasicStockChart')}>
					<Text>Basic Line Chart</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handlePress('ChartWithAxis')}>
					<Text>Line Chart with Axis</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handlePress('MultipleAxes')}>
					<Text>Line Chart with multiple Axis</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handlePress('VolumeChart')}>
					<Text>Volume Chart</Text>
				</TouchableOpacity>

      </ScrollView>
    );
  }
}
/*


*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    handlePress: (key) => {
      dispatch(navigatePush({ key }));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Demos);
