import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import TechnicianHistoryScreen from '../screens/TechnicianHistoryScreen'
import ViewTechnicianEventScreen from '../screens/ViewTechnicianEventScreen'

const TechnicianEventNavigator = createStackNavigator({
  eventsScreen: {screen: TechnicianHistoryScreen},
  eventScreen: {screen: ViewTechnicianEventScreen},
},{
  initialRouteName: 'eventsScreen'
});

export default createAppContainer(TechnicianEventNavigator);
