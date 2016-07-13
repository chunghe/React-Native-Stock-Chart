import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

class BasicStockChart extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>Basic Stock chart</Text>
        </View>
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

export default BasicStockChart;
