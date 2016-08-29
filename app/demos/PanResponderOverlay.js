import React, { Component } from 'react';
import { PanResponder, View, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { G, Text as SvgText, Rect } from 'react-native-svg';

import * as d3Array from 'd3-array';

import T from '../components/T';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;

class PanResponderOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showGridline: false,
    };
    this._previousOffset = 0;
    this.elPanStyle = {
      style: {
        transform: [{ translateX: this._previousOffset }]
      }
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._alwaysTrue,
      onMoveShouldSetPanResponder: this._alwaysTrue,
      onPanResponderGrant: this._alwaysTrue,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  getSvgWidth() {
    return deviceWidth * 3;
  }

  _alwaysTrue = () => true

  _handlePanResponderMove = (e, gestureState) => {
    this.elPanStyle.style.transform[0].translateX = this._previousOffset + gestureState.dx;
    this._updateNativeStyles();
  }

  _handlePanResponderEnd = (e, gestureState) => {
    this._previousOffset += gestureState.dx;
  }


  _updateNativeStyles = () => {
    this.elPan && this.elPan.setNativeProps(this.elPanStyle);
  }


  render() {
    const svgWidth = this.getSvgWidth();
    const points = d3Array.range(0, svgWidth, 50);

    return (
      <ScrollView style={styles.container}>
        <T heading>PanResponder overlay</T>
        <View
          width={svgWidth}
          height={defaultStockChartHeight + 10}
          {...this._panResponder.panHandlers}
          ref={elPan => { this.elPan = elPan; }}
        >
          <Svg
            height={defaultStockChartHeight}
            width={svgWidth}
            style={{ backgroundColor: '#efefef' }}
          >
          {points.map(point =>
            <G key={point}>
              <Rect fill="red" width="2" height="10" x={point} y={defaultStockChartHeight / 2} />
              <SvgText x={point} y={defaultStockChartHeight / 2 + 10} textAnchor="middle">{`${point}`}</SvgText>
            </G>
            )}

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
  }
});

export default PanResponderOverlay;
