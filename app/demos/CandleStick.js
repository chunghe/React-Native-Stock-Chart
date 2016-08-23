import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { G, Text as SvgText, Rect, Path } from 'react-native-svg';

import * as d3Scale from 'd3-scale';

import T from '../components/T';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;
const barWidth = 5;


class CandleStick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showGridline: false
    };
  }

  componentDidMount() {
    this.getStockQuotes();
  }

  getStockQuotes = () => {
    const url = 'http://hulk.dev.cnyes.cool/api/v1/history?symbol=2330&from=1467302400&to=1471536000&resolution=D';
    fetch(url)
      .then(rsp => rsp.json())
      .then(data => {
        this.setState({ data, current: 0 });
      });
  }

  getLinearScale(domain, range, isTime = false) {
    return (isTime ? d3Scale.scaleTime() : d3Scale.scaleLinear()).domain(domain).range(range);
  }

  getItemByIndex = (i) => {
    const { c, h, l, o, t, v, s } = this.state.data;
    return {
      c: c[i],
      h: h[i],
      l: l[i],
      o: o[i],
      t: new Date(t[i] * 1000),
      v: v[i],
      s,
      color: o[i] <= c[i] ? 'red' : 'green'
    };
  }

  handlePress = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    console.log({locationX, locationY});
    //console.log('->', (locationX - 2) / (barWidth + 2))
    // const priceScale = this.getLinearScale([lowestPrice, highestPrice], [0, defaultStockChartHeight].reverse());

    // const { c, h, l, o, t, s } = this.state.data;
    // const highestPrice = Math.max(...h);
    // const lowestPrice = Math.min(...l);
    // const reversePriceScale = this.getLinearScale([0, defaultStockChartHeight].reverse(), [lowestPrice, highestPrice]);
  }

  setCurrentItem = (i) => {
    console.log('setCurrentItem', i);
    this.setState({ current: i });
  }

  toggleGridline = () => {
    this.setState({ showGridline: !this.state.showGridline });
  }


  render() {
    const { current } = this.state;
    const { c, h, l, o, t, s } = this.state.data;
    console.log('s', s);
    if (s === undefined) {
      return null;
    }
    console.log('current', current);
    console.log('state', this.state);
    const highestPrice = Math.max(...h);
    const lowestPrice = Math.min(...l);
    const priceScale = this.getLinearScale([lowestPrice, highestPrice], [0, defaultStockChartHeight].reverse());


    return (
      <ScrollView style={styles.container}>
        <T heading>CandleStick chart</T>
        <Text>{`時間: ${new Date(t[current] * 1000)}`}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1 }}>{`最高: ${h[current]}`}</Text>
          <Text style={{ flex: 1 }}>{`最低: ${l[current]}`}</Text>
          <Text style={{ flex: 1 }}>{`開盤: ${o[current]}`}</Text>
          <Text style={{ flex: 1 }}>{`收盤: ${c[current]}`}</Text>
        </View>
        <Svg
          height={defaultStockChartHeight}
          width={deviceWidth}
        >
        <G onPress={this.handlePress}>
          <Rect x="0" y="0" height={defaultStockChartHeight} width={deviceWidth} fill="#efefef" />
          {
            t.map((_, i) => {
              const { o, c, h, l, color } = this.getItemByIndex(i);
              const [ scaleO, scaleC, yTop, yBottom ] = [o, c, h, l].map(priceScale);
              const x = deviceWidth - i * (barWidth + 2) - barWidth - 2;
              const barHeight = Math.max(Math.abs(scaleO - scaleC), 1); // if open === close, make sure chartHigh = 1
              return (
                <G
                  key={i}
                >
                  <Rect
                    x={x}
                    y={Math.min(scaleO, scaleC)}
                    fill={color}
                    height={barHeight}
                    width={barWidth}
                  />
                  <Path stroke={color} d={`M${x + barWidth / 2} ${yTop} L${x + barWidth / 2} ${yBottom}`} strokeWidth="1" />
                </G>
              );
            }, this)
          }
          {
            this.state.showGridline &&
            priceScale.ticks(10).map((p, i) => {
              return (
                <G key={i}>
                  <SvgText
                    fill="#999"
                    textAnchor="end"
                    x={deviceWidth - 5}
                    y={priceScale(p) - 6}
                    fontSize="10"
                  >
                    {`${p}`}
                  </SvgText>
                  <Path d={`M0 ${priceScale(p)} ${deviceWidth - 25} ${priceScale(p)}`} stroke="#ddd" strokeWidth="1" />
                </G>
              );
            })
          }
          </G>
        </Svg>
        <View style={{ padding: 15 }}>
          <TouchableOpacity style={styles.button} onPress={this.toggleGridline}>
            <Text>toggle grid line</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    position: 'absolute', // not occupying full width
    padding: 10,
  }
});

export default CandleStick;
