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
      scrollEnabled: true
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
    console.log('move');
    this.elPanStyle.style.transform[0].translateX = this._previousOffset + gestureState.dx;
    this._updateNativeStyles();
  }

  _handlePanResponderEnd = (e, gestureState) => {
    console.log('end');
    this._previousOffset += gestureState.dx;
  }

  _updateNativeStyles = () => {
    this.elPan && this.elPan.setNativeProps(this.elPanStyle);
  }


  handleTouchStart = (e) => {
    console.log('handleTouchStart', e.nativeEvent);
    const { locationX, locationY, timestamp } = e.nativeEvent;
    this._touchStartTime = timestamp;
    this._touchStartPosition = {
      locationX, locationY
    };
  }

  // move less than 1 px
  closeEnough(p1, p2) {
    if (Math.abs(p1 - p2) < 2) {
      return true;
    }
    return false;
  }

  handleTouchMove = (e) => {
    console.log('handleTouchMove');
    const { timestamp, locationX, locationY } = e.nativeEvent;
    if (this.state.scrollEnabled !== false) {
      if (timestamp - this._touchStartTime > 300) {
        console.log('check position', e.nativeEvent);
        if (this.closeEnough(locationX, this._touchStartPosition.locationX) &&
            this.closeEnough(locationY, this._touchStartPosition.locationY)) {
          console.log('-- lock --');
          this.setState({ scrollEnabled: false });
        }
      }
    } else {
      console.log('this.cross', this.cross, locationX);
      this.cross && this.cross.setNativeProps({ style: { left: locationX } });
    }
  }

  handleTouchEnd = () => {
    console.log('handleTouchEnd');
    if (this.state.scrollEnabled === false) {
      this.setState({ scrollEnabled: true });
    }
  }

  handleScrollBeginDrag = () => {
    console.log('handleScrollBeginDrag');
  }

  handleScrollEndDrag = () => {
    console.log('handleScrollEndDrag');
  }

  render() {
    console.log('render');
    const svgWidth = this.getSvgWidth();
    const points = d3Array.range(0, svgWidth, 50);

    // scroll view 的 onTouchMove event fire 很正常
    // TouchWithoutFeedback/svg 的 panhandelr 常常會斷掉 (move -> end)
    return (
      <View style={styles.container}>
        <T heading>PanResponder overlay</T>
        <View>
          <ScrollView
            horizontal
            directionalLockEnabled
            scrollEnabled={this.state.scrollEnabled}
            bounces={false}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onScrollBeginDrag={this.handleScrollBeginDrag}
            onScrollEndDrag={this.handleScrollEndDrag}
            style={{
              height: defaultStockChartHeight,
              width: deviceWidth
            }}
          >
            <Svg
              height={defaultStockChartHeight}
              width={svgWidth}
            >
              {points.map(point =>
                <G key={point}>
                  <Rect fill="red" width="2" height="10" x={point} y={defaultStockChartHeight / 2} />
                  <SvgText x={point} y={defaultStockChartHeight / 2 + 10} textAnchor="middle">{`${point}`}</SvgText>
                </G>
              )}

            </Svg>
            <View
              ref={(cross) => { this.cross = cross; }}
              style={styles.cross}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cross: {
    position: 'absolute',
    top: 0 ,
    left: 0,
    backgroundColor: '#999',
    width: 2,
    height: defaultStockChartHeight
  }
});

export default PanResponderOverlay;
