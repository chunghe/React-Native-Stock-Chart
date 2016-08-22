import React, { Component } from 'react';
import { Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { G, Text, Rect, Path } from 'react-native-svg';

import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import data from '../data';
import T from '../components/T';
import Code from '../components/Code';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;
const bottomAxisHeight = 20;
const barWidth = 6;


class CandleStick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  getStockQuotes = () => {
    const url = 'http://hulk.dev.cnyes.cool/api/v1/history?symbol=2330&from=1467302400&to=1471536000&resolution=D';
    fetch(url)
      .then(rsp => rsp.json())
      .then(data => {
        this.setState({data: data});
      });
  }

  componentDidMount() {
    this.getStockQuotes();
  }

  getLinearScale(domain, range, isTime = false) {
    return (isTime ? d3Scale.scaleTime() : d3Scale.scaleLinear()).domain(domain).range(range);
  }

	getItemByIndex = (i) => {
    const {c, h, l, o, t, v, s} = this.state.data;
		return {c: c[i], h: h[i], l: l[i], o: o[i], t: new Date(t[i] * 1000), v: v[i]};
	}

  render() {
    const {c, h, l, o, t, v, s} = this.state.data;
    console.log('s', s);
    if (s === undefined) {
      return null;
    }
    console.log('state', this.state);
    const highestPrice = Math.max(...h);
    const lowestPrice = Math.min(...l);
    console.log('[lowestPrice, highestPrice]', [lowestPrice, highestPrice])
    const priceScale = this.getLinearScale([lowestPrice, highestPrice], [0, defaultStockChartHeight].reverse());

    return (
      <ScrollView style={styles.container}>
        <T heading>CandleStick chart</T>
        <Svg height={defaultStockChartHeight} width={deviceWidth} style={{backgroundColor: '#efefef'}}>
				{
					t.map((_, i) => {
						const open = o[i];
						const close = c[i];
						const highest = h[i];
						const lowest = l[i];
						const yTop = priceScale(highest);
						const yBottom = priceScale(lowest);
						const color = o[i] <= c[i] ? 'red' : 'green';
						const x = deviceWidth - i * barWidth - barWidth / 2 - 50;
						const barHeight = Math.abs(priceScale(open) - priceScale(close));
						// console.log('yTop - yBottom', yTop - yBottom);
						return (
							<G key={i} onPressIn={() => {console.log('press in')}}>
								<Rect
									x={x}
									y={yTop}
									fill={color}
									height={barHeight}
									width={barWidth}
									onPressIn={() => {console.log(this.getItemByIndex(i))}}
								/>
								<Path fill="#000" d={`M ${x + barWidth/2} ${yTop} ${x + barWidth/2} ${yBottom}` } strokeWidth="1" />
							</G>
						);
					})
				}
				{
					priceScale.ticks(10).map((p, i) => {
						return (
							<G key={i}>
								<Text
									fill="#999"
									textAnchor="end"
									x={deviceWidth - 5}
									y={priceScale(p) - 6}
									fontSize="10"
								>
									{`${p}`}
								</Text>
								<Path d={`M0 ${priceScale(p)} ${deviceWidth - 25} ${priceScale(p)}`} stroke="#ddd"  />
							</G>
						)
					})
				}

        </Svg>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default CandleStick;
