import { AppRegistry, YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { name as appName } from './app.json';
import App from './src';

enableScreens();

YellowBox.ignoreWarnings(['-[RCTRootView cancelTouches]'])

AppRegistry.registerComponent(appName, () => App);
