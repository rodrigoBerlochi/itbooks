import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAnimatedComponent } from './helpers';

const AnimatedTouchable = createAnimatedComponent(TouchableOpacity);

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
		<AnimatedTouchable
			hitSlop={{ right: 20, left: 20, top: 20, bottom: 20 }}
			disabled={disabled}
			onPress={onPress}
			style={style}
		>
			<Ionicons color={color} name={name} size={size} />
		</AnimatedTouchable>
	),
);
