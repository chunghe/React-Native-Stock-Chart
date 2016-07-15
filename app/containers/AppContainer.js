import React, { PropTypes } from 'react';
import { View, NavigationExperimental, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { navigatePush, navigatePop } from '../redux/modules/routing';

import Demos from '../demos';
import BasicStockChart from '../demos/BasicStockChart';
import ChartWithAxis from '../demos/ChartWithAxis';
import MultipleAxes from '../demos/MultipleAxes';
import VolumeChart from '../demos/VolumeChart';
import StockChartWithVolume from '../demos/StockChartWithVolume';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;


class AppContainer extends React.Component {

  _renderScene({ scene }) {
    const { route } = scene;
    const componentsMapping = {
      Demos,
      BasicStockChart,
      ChartWithAxis,
      MultipleAxes,
      VolumeChart,
      StockChartWithVolume
    };

    const toRender = componentsMapping[route.key] || null;
    // make all the Views' marginTop equals header height
    return (
      <View style={{ flex: 1, marginTop: NavigationExperimental.Header.HEIGHT }}>
      {React.createElement(toRender, { route })}
      </View>
    );
  }

  _renderHeader(sceneProps) {
    return (
      <NavigationHeader
        {...sceneProps}

        renderTitleComponent={props => {
          // const route = props.scene.route;
          return <NavigationHeader.Title>Stock Chart</NavigationHeader.Title>;
        }}
      />
    );
  }

  render() {
    const { navigationState, onNavigate } = this.props;

    return (
      // Redux is handling the reduction of our state for us. We grab the navigationState
      // we have in our Redux store and pass it directly to the <NavigationTransitioner />.
      <NavigationCardStack
        navigationState={navigationState}
        style={styles.outerContainer}
        onNavigate={onNavigate}
        renderScene={this._renderScene}
        renderOverlay={this._renderHeader}
      />
    );
  }

}

AppContainer.propTypes = {
  navigationState: PropTypes.object,
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
