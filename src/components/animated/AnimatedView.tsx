import { ViewProps } from 'react-native';
import { View } from 'react-native-ui-lib';
import { createAnimatedComponent } from './helpers';

export const AnimatedView = createAnimatedComponent(View);

export interface AnimatedViewProps extends ViewProps {}
