import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Code extends Component {
  render() {
    return (
      <View style={styles.code}>
        <Text style={styles.codeText}>{this.props.children}</Text>
      </View>
    );
  }
}

Code.propTypes = {
  children: PropTypes.string.isRequired
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
