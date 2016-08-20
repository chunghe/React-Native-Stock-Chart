import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Code extends Component {
  render() {
    const { style } = this.props;
    return (
      <View style={[styles.code, style]}>
        <Text style={styles.codeText}>{this.props.children}</Text>
      </View>
    );
  }
}

Code.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  code: {
    backgroundColor: '#efefef'
  },
  codeText: {
    fontFamily: 'Menlo-Regular',
  },
});

export default Code;
