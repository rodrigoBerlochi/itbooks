import React from 'react';
import { Alert, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// TODO fix Animated value infer
interface IIonicon {
	readonly name: string;
	readonly size?: number;
	readonly color?: string;
	readonly style?: ViewStyle | any;
	readonly disabled?: boolean;
	readonly onPress?: () => void;
}

export const AnimatedIcon: React.FC<IIonicon> = React.memo(
	({
		name,
		color = '#000',
		size = 32,
		style = {},
		disabled = false,
		onPress = {},
	}) => (
		<AnimatedTouchable disabled={disabled} onPress={onPress} style={style}>
			<Ionicons color={color} name={name} size={size} />
		</AnimatedTouchable>
	),
);
