import { AppRegistry, YellowBox } from 'react-native';
import { useScreens } from 'react-native-screens';
import { name as appName } from './app.json';
import App from './src';

useScreens();

YellowBox.ignoreWarnings(['-[RCTRootView cancelTouches]'])

AppRegistry.registerComponent(appName, () => App);
