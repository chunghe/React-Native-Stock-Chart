import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Dimensions,  ScrollView, StyleSheet } from 'react-native';

import Svg, { G, Text as SvgText, Rect, Path } from 'react-native-svg';

import * as d3Scale from 'd3-scale';
import T from '../components/T';

const deviceWidth = Dimensions.get('window').width;
const defaultStockChartHeight = 200;
const barMargin = 1; // 1 on each side
const barWidth = 5;

class CandleStickScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showGridline: false,
      scrollEnabled: true
    };
  }

  componentDidMount() {
    this.getStockQuotes();
  }

  getSvgWidth() {
    return deviceWidth * 3;
  }

  getStockQuotes = () => {
    const d = new Date();
    const today = new Date(`${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`).getTime();
    const from = today + 86400 * 1000;
    const to = from - 86400 * 30 * 1000 * 3;
    const url = `http://m.cnyes.com/api/v1/charting/history?symbol=tse:2330&from=${Math.floor(from / 1000)}&to=${Math.floor(to / 1000)}&resolution=D`;
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
      color: o[i] <= c[i] ? 'rgb(210, 72, 62)' : 'rgb(28, 193, 135)'
    };
  }

  setCurrentItem = (i) => {
    if (i <= this.state.data.o.length - 1) {
      this.setState({ current: i });
    }
  }

  loadMore = () => {
    const { nextTime } = this.state.data;
    const to = (nextTime * 1000 - 86400 * 30 * 1000) / 1000;
    if (nextTime) {
      const url = `http://m.cnyes.com/api/v1/charting/history?symbol=tse:2330&from=${nextTime}&to=${Math.floor(to)}&resolution=D`;
      fetch(url)
        .then(rsp => rsp.json())
        .then(data => {
          const originData = this.state.data;
          const newData = {
            ...originData,
            ...data,
            c: [...originData.c, ...data.c],
            h: [...originData.h, ...data.h],
            l: [...originData.l, ...data.l],
            o: [...originData.o, ...data.o],
            t: [...originData.t, ...data.t],
            v: [...originData.v, ...data.v],
          };
          this.setState({ data: newData });
        });
    }
  }

  toggleGridline = () => {
    this.setState({ showGridline: !this.state.showGridline });
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
    const { h, l, t, s } = this.state.data;
    if (s === undefined) {
      return null;
    }
    const highestPrice = Math.max(...h);
    const lowestPrice = Math.min(...l);
    const priceScale = this.getLinearScale([lowestPrice, highestPrice], [0, defaultStockChartHeight].reverse());

    return (
      <View style={styles.container}>
        <T heading>CandleStick with ScrollView</T>
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
              style={{ backgroundColor: '#efefef' }}
            >
            {
              t.map((_, i) => {
                const item = this.getItemByIndex(i);
                const [scaleO, scaleC, yTop, yBottom] = [item.o, item.c, item.h, item.l].map(priceScale);
                // deviceWidth divided columns each has (barWidth + 2) width
                // leave 1 as the padding on each side
                // const x = deviceWidth - i * (barWidth + 2) - barWidth;
                const x = svgWidth - barWidth * (i + 1) - barMargin * (2 * i + 1);
                const barHeight = Math.max(Math.abs(scaleO - scaleC), 1); // if open === close, make sure chartHigh = 1
                return (
                  <G
                    key={i}
                  >
                    <Rect
                      x={x}
                      y={Math.min(scaleO, scaleC)}
                      fill={item.color}
                      height={barHeight}
                      width={barWidth}
                    />
                    <Path stroke={item.color} d={`M${x + barWidth / 2} ${yTop} ${x + barWidth / 2} ${yBottom}`} strokeWidth="1" />
                  </G>
                );
              })
            }
            {
              this.state.showGridline &&
              priceScale.ticks(10).map((p, i) => {
                return (
                  <G key={i}>
                    <SvgText
                      fill="#999"
                      textAnchor="end"
                      x={svgWidth - 5}
                      y={priceScale(p) - 6}
                      fontSize="10"
                    >
                      {`${p}`}
                    </SvgText>
                    <Path d={`M0 ${priceScale(p)} ${svgWidth - 25} ${priceScale(p)}`} stroke="#ddd" strokeWidth="1" />
                  </G>
                );
              })
            }
            </Svg>
            <View
              ref={(cross) => { this.cross = cross; }}
              style={styles.cross}
            />
          </ScrollView>
        </View>
        <View style={{ padding: 15, flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button} onPress={this.toggleGridline}>
            <Text>toggle grid line</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.loadMore}>
            <Text>load more</Text>
          </TouchableOpacity>
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
  },
  button: {
    borderWidth: 1,
    borderColor: '#666',
    borderStyle: 'solid',
    padding: 10,
    marginRight: 10
  },
});

export default CandleStickScrollView;
