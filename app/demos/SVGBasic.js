import React, { Component } from 'react';
import { Image, Dimensions,  ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import T from '../components/Text';
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
        <Svg height={100} width={100} style={{ backgroundColor: 'lime' }} />
        <Code>
        {`
  <Svg height={100} width={100} style={{ backgroundColor: 'lime'}} />
        `}
        </Code>
        <T>SVG element with width equals to device width</T>
        <Svg height={100} width={Dimensions.get('window').width} style={{ backgroundColor: 'lime' }} />
        <Code>
        {`
  <Svg height={100} width={Dimensions.get('window').width} style={{ backgroundColor: 'lime' }} />
        `}
        </Code>
        <T>Draw complicated logo with react-native-svg (Circle, Path, Polygon)</T>
        <CopyRight />

        <T heading>Path element</T>
        <T>- Path 的 mini language (TODO)</T>
        <Svg height={100} width={deviceWidth} style={{ backgroundColor: 'lime' }}>
          <Path d={`M0 50 ${deviceWidth} 50`} stroke="blue" />
          <Path d={`M${deviceWidth / 2} 0 ${deviceWidth / 2} 100 `} stroke="green" />
        </Svg>
        <Code>
        {`
  <Path d={\`M0 50 \${deviceWidth} 50\`} stroke="blue" />
  <Path d={\`M\${deviceWidth / 2} 0 \${deviceWidth / 2} 100 \`} stroke="green" />
        `}
        </Code>
        <T>- strokeWidth/dashArray</T>
        <Svg height={100} width={deviceWidth} style={{ backgroundColor: 'lime' }}>
          <Path d={`M${deviceWidth / 2} 0 ${deviceWidth / 2} 100`} strokeWidth="2" />
          <Path d={`M0 50 ${deviceWidth} 50`} stroke="blue" strokeWidth="2" strokeDasharray="2,2" />
        </Svg>
        <Code>
        {`
  <Path d={\`M\${deviceWidth / 2} 0 \${deviceWidth / 2} 100\`} strokeWidth="2" />
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
});

export default SVGBasic;
