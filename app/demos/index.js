import React, { PropTypes, Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { navigatePush } from '../redux/modules/routing';

class Demos extends Component {
  render() {
    const { handlePress } = this.props;

    return (
      <ScrollView style={styles.container}>

        <View style={[styles.row, styles.header]}>
          <Text style={styles.headerText}>use D3Path/D3Shape</Text>
        </View>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('SVGBasic', 'SVG Basics')}>
          <Text>SVG Basics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('D3Scale', 'D3Scale')}>
          <Text>D3 Scale</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('D3Shape', 'D3 Shape')}>
          <Text>D3 Shape</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('D3Ticks', 'Draw the grid line')}>
          <Text>Draw the grid line</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('CustomStockChart', 'Custom Stock Chart')}>
          <Text>Custom Stock Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('CandleStick', 'CandleStick')}>
          <Text>CandleStick</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('PanResponderDemo', 'PanResponder')}>
          <Text>PanResponder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('CandleStickWithPan', 'CandleStick with PanResponder')}>
          <Text>CandleStick with PanResponder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('PanResponderOverlay', 'PanResponder overlay')}>
          <Text>PanResponder Overlay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('CandleStickPanOverlay', 'CandleStick with PanResponder Overlay')}>
          <Text>CandleStick with PanResponder Overlay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('CandleStickScrollView', 'CandleStick with ScrollView')}>
          <Text>CandleStick with ScrollView</Text>
        </TouchableOpacity>

        <View style={[styles.row, styles.header]}>
          <Text style={styles.headerText}>use formidable chart</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('BasicLineChart')}>
          <Text>Basic Line Chart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('ChartWithAxis')}>
          <Text>Line Chart with Axis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('MultipleAxes')}>
          <Text>Line Chart with multiple Axes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('VolumeChart')}>
          <Text>Volume Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('StockChartWithVolume')}>
          <Text>Stock Chart with Volume</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

Demos.propTypes = {
  handlePress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgb(234, 234, 234)',
  },
  headerText: {
    fontSize: 18
  },
  row: {
    height: 40,
    paddingLeft: 20,
    justifyContent: 'center'
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    handlePress: (key, title) => {
      dispatch(navigatePush({ key, title }));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Demos);
