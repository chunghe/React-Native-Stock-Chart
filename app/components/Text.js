import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';

class T extends Component {
  render() {
    const { heading } = this.props;
    const style = heading ? styles.heading : styles.text;
    return (
      <Text style={style}>{this.props.children}</Text>
    );
  }
}

T.propTypes = {
  heading: PropTypes.bool
};

const styles = StyleSheet.create({
  heading: {
    padding: 20,
    fontSize: 24
  },
  text: {
    padding: 20,
    paddingBottom: 0
  },
});

export default T;
