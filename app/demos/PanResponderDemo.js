import React, { Component } from 'react';
import { PanResponder, View, StyleSheet } from 'react-native';

class PanResponderDemo extends Component {

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: 'green',
      }
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  _previousLeft: 0
  _previousTop: 0

  _handleStartShouldSetPanResponder() {
    // Should we become active when the user presses down on the circle?
    return true;
  }

  _handleMoveShouldSetPanResponder() {
    // Should we become active when the user moves a touch over the circle?
    return true;
  }

  _handlePanResponderGrant = () => {
    this._highlight();
  }
  _handlePanResponderMove = (e, gestureState) => {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  }
  _handlePanResponderEnd = (e, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }

  _highlight = () => {
    this._circleStyles.style.backgroundColor = 'blue';
    this._updateNativeStyles();
  }

  _unHighlight = () => {
    this._circleStyles.style.backgroundColor = 'green';
    this._updateNativeStyles();
  }

  _updateNativeStyles = () => {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.circle}
          ref={(circle) => { this.circle = circle; }}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    borderWidth: 1,
    borderColor: '#666',
    borderStyle: 'solid',
    padding: 10,
    marginRight: 10
  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: 'absolute',
    left: 0,
    top: 0
  }
});

export default PanResponderDemo;
