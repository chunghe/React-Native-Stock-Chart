import React, { PropTypes } from 'react';
import { View, NavigationExperimental, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { navigatePush, navigatePop } from '../redux/modules/routing';

import Demos from '../demos';
import BasicLineChart from '../demos/BasicLineChart';
import ChartWithAxis from '../demos/ChartWithAxis';
import MultipleAxes from '../demos/MultipleAxes';
import VolumeChart from '../demos/VolumeChart';
import StockChartWithVolume from '../demos/StockChartWithVolume';
import SVGBasic from '../demos/SVGBasic';
import D3Scale from '../demos/D3Scale';
import D3Ticks from '../demos/D3Ticks';
import D3Shape from '../demos/D3Shape';
import CustomStockChart from '../demos/CustomStockChart';
import CandleStick from '../demos/CandleStick';
import CandleStickWithPan from '../demos/CandleStickWithPan';
import PanResponderDemo from '../demos/PanResponderDemo';
import PanResponderOverlay from '../demos/PanResponderOverlay';
import CandleStickPanOverlay from '../demos/CandleStickPanOverlay';
import CandleStickScrollView from '../demos/CandleStickScrollView';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  _renderScene({ scene }) {
    const { route } = scene;
    const componentsMapping = {
      Demos,
      BasicLineChart,
      ChartWithAxis,
      MultipleAxes,
      VolumeChart,
      StockChartWithVolume,
      SVGBasic,
      D3Scale,
      D3Ticks,
      D3Shape,
      CustomStockChart,
      PanResponderDemo,
      CandleStick,
      CandleStickWithPan,
      PanResponderOverlay,
      CandleStickPanOverlay,
      CandleStickScrollView
    };

    const toRender = componentsMapping[route.key] || null;
    // make all the Views' marginTop equals header height
    return (
      <View style={{ flex: 1 }}>
      {React.createElement(toRender, { route })}
      </View>
    );
  }

  _renderHeader(sceneProps) {
    const { handleNavigateBack } = this.props;
    const title = sceneProps.scene.route.title || 'Stock Chart';
    return (
      <NavigationHeader
        {...sceneProps}

        onNavigateBack={handleNavigateBack}
        renderTitleComponent={props => {
          // const route = props.scene.route;
          return <NavigationHeader.Title>{title}</NavigationHeader.Title>;
        }}
      />
    );
  }

  render() {
    const { navigationState, handleNavigateBack } = this.props;

    return (
      // Redux is handling the reduction of our state for us. We grab the navigationState
      // we have in our Redux store and pass it directly to the <NavigationTransitioner />.
      <NavigationCardStack
        navigationState={navigationState}
        style={styles.outerContainer}
        onNavigateBack={handleNavigateBack}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
      />
    );
  }

}

AppContainer.propTypes = {
  navigationState: PropTypes.object,
  handleNavigateBack: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default connect(
  state => ({
    navigationState: state.routing
  }),
  dispatch => ({
    handleNavigateBack: (action) => {
      dispatch(navigatePop());
    },
    onNavigate: (action) => {
      // Two types of actions are likely to be passed, both representing "back"
      // style actions. Check if a type has been indicated, and try to match it.
      if (action.type && ( action.type === 'BackAction')) {
        dispatch(navigatePop());
      } else {
        // Currently unused by NavigationExperimental (only passes back actions),
        // but could potentially be used by custom components.
        dispatch(navigatePush(action));
      }
    }
  })
)(AppContainer);
