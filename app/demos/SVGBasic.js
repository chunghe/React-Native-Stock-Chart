import React, { Component } from 'react';
import { View, Text, Image, Dimensions,  ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import T from '../components/T';
import Code from '../components/Code';
import CopyRight from '../components/CopyRight';

const deviceWidth = Dimensions.get('window').width;

class SVGBasic extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <T heading>SVG</T>
        <T>- Scalable Vector Graphics</T>
        <T>- XML-based vector image format for two-dimensional graphics with support for interactivity and animation.</T>
        <Code>
				{`
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
		<rect x="25" y="25" width="200" height="200" fill="lime" stroke-width="4" stroke="pink" />
		<circle cx="125" cy="125" r="75" fill="orange" />
		<polyline points="50,150 50,200 200,200 200,100" stroke="red" stroke-width="4" fill="none" />
		<line x1="50" y1="50" x2="200" y2="200" stroke="blue" stroke-width="4" />
	</svg>
				`}
        </Code>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/SVG_example_markup_grid.svg/391px-SVG_example_markup_grid.svg.png' }}
          style={{ height: deviceWidth, width: deviceWidth }}
        />


        <T heading>Coordinate Systems</T>
        <T>- the top left corner of the document is considered to be the point (0,0).</T>
        <T>- Positions are then measured in pixels from the top left corner, with the positive x direction being to the right, and the positive y direction being to the bottom.</T>
        <Image  source={{ uri: 'https://www.w3.org/TR/SVG/images/coords/InitialCoords.png' }} style={{ width: 300, height: 100 }} />

        <T heading>Install</T>
        <Code>
        {`
  $ npm install react-native-svg
  $ rnpm link react-native-svg
        `}
        </Code>

        <T heading>Usage</T>
        <Code>
        {`
  import Svg, {Path} from 'react-native-svg';

  <Svg height="100" width="100">
    <Path d="M0 100 200 100" />
  </Svg>
        `}
        </Code>
        <T>- svg elements must be uppercase, path -> Path</T>
        <T>- Components: Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Text, Use, Defs, Stop</T>

        <T heading>Examples</T>
        <T>SVG element with 100 width 100 height</T>
        <Svg height="100" width="100" style={{ backgroundColor: 'lime' }} />
        <Code>
        {`
  <Svg
    height="100"
    width="100"
    style={{ backgroundColor: 'lime'}}
  />
        `}
        </Code>
        <T>SVG element with width equals to device width</T>
        <Svg height="100" width={Dimensions.get('window').width} style={{ backgroundColor: 'lime' }} />
        <Code>
        {`
  <Svg
    height="100"
    width={Dimensions.get('window').width}
    style={{ backgroundColor: 'lime' }}
  />
        `}
        </Code>
        <T>Draw complicated logo with react-native-svg (Circle, Path, Polygon)</T>
        <CopyRight />

        <T heading>Path element</T>
        <T>- The attribute d contains a seriers of commands and parameters in the SVG Path mini-language</T>
        <View>
          <View style={styles.tableRow}>
            <View style={styles.firstRow}><Text>M(m)</Text></View>
            <View style={styles.tableCell}><Text>moveto: Move the pen to a new location. No line is drawn. All path data must begin with a 'moveto' command.</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.firstRow}><Text>L(l)</Text></View>
            <View style={styles.tableCell}><Text>lineto: Draw a line from the current point to the point (x,y).</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.firstRow}><Text>H(h)</Text></View>
            <View style={styles.tableCell}><Text>horizontal lineto: Draw a horizontal line from the current point to x.</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.firstRow}><Text>V(h)</Text></View>
            <View style={styles.tableCell}><Text>vertical lineto: Draw a horizontal line from the current point to y.</Text></View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Svg width="100" height="100" style={{ backgroundColor: 'lime' }}>
            <Path
              d="M 10 25
                L 10 75
                L 60 75
                L 10 25"
              stroke="red"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
          <Code style={{ flex: 1 }}>
            {`
    <Path
      d="M 10 25
        L 10 75
        L 60 75
        L 10 25"
      stroke="red"
      strokeWidth="2"
      fill="none"
    />
            `}
          </Code>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Svg width="100" height="100" style={{ backgroundColor: 'lime' }}>
            <Path
              d="M 10 25
                l 0 50
                L 60 75
                L 10 25"
              stroke="red"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
          <Code style={{ flex: 1 }}>
            {`
    <Path
      d="M 10 25
        l 0 50
        L 60 75
        L 10 25"
      stroke="red"
      strokeWidth="2"
      fill="none"
    />
            `}
          </Code>
        </View>

        <T>Example: strokeWidth/dashArray</T>
        <Svg height={100} width={deviceWidth} style={{ backgroundColor: 'lime' }}>
          <Path d={`M${deviceWidth / 2} 0 ${deviceWidth / 2} 100`} strokeWidth="2" stroke="red" />
          <Path d={`M0 50 ${deviceWidth} 50`} stroke="blue" strokeWidth="2" strokeDasharray="2,2" />
        </Svg>
        <Code>
        {`
  <Path d={\`M\${deviceWidth / 2} 0 \${deviceWidth / 2} 100\`} strokeWidth="2" stroke="red" />
  <Path d={\`M0 50 \${deviceWidth} 50\`} stroke="blue" strokeWidth="2" strokeDasharray="2,2" />
        `}
        </Code>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  firstRow: {
    width: 50
  },
  tableCell: {
    flex: 1
  }
});

export default SVGBasic;
