import React, { PropTypes, Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Text from '../components/Text';
import { navigatePush } from '../redux/modules/routing';

class Demos extends Component {
  render() {
    const { handlePress } = this.props;

    return (
      <ScrollView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>use D3Path/D3Shape</Text>
        </View>

        <TouchableOpacity onPress={() => handlePress('SVGBasic')}>
          <Text>SVG Basics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('D3Scale')}>
          <Text>D3 Scale</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('D3Shape')}>
          <Text>D3 Shape</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('D3Ticks')}>
          <Text>D3 Ticks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('CustomStockChart')}>
          <Text>Custom Stock Chart</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerText}>use formidable chart</Text>
        </View>
        <TouchableOpacity onPress={() => handlePress('BasicLineChart')}>
          <Text>Basic Line Chart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('ChartWithAxis')}>
          <Text>Line Chart with Axis</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('MultipleAxes')}>
          <Text>Line Chart with multiple Axes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('VolumeChart')}>
          <Text>Volume Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('StockChartWithVolume')}>
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
    height: 50,
  },
  headerText: {
    justifyContent: 'center'
  }
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
