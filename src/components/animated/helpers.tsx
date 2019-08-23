import React from 'react';
import Animated from 'react-native-reanimated';

export function createAnimatedComponent<
	T extends React.ComponentClass<any, any>
>(component: T) {
	return Animated.createAnimatedComponent(component);
}
