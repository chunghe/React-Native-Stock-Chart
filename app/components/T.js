import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class T extends Component {
  render() {
    const { heading, children } = this.props;
    if (heading) {
      return (
        <View style={styles.heading}>
          <Text style={styles.headingText}>{this.props.children}</Text>
        </View>
      );
    }
    return (
      <Text style={styles.text}>{children}</Text>
    );
  }
}

T.propTypes = {
  heading: PropTypes.bool,
  children: PropTypes.string
};

const styles = StyleSheet.create({
  heading: {
    paddingBottom: 10,
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 10
  },
  headingText: {
    fontSize: 24,
  },
  text: {
    padding: 20,
    paddingBottom: 0
  },
});

export default T;
