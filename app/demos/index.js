import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { navigatePush } from '../redux/modules/routing';

class Demos extends Component {
  render() {
		const { handlePress } = this.props;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={handlePress}>
          <Text>Hello World</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    handlePress: () => {
      dispatch(navigatePush({ key: 'BasicStockChart' }));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Demos);
