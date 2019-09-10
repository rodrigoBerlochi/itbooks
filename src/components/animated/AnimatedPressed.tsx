import React, { useCallback, useRef } from 'react';
import { Alert, Animated, TouchableWithoutFeedback } from 'react-native';

interface IAnimatedPress {
	itemAction: () => void;
}

export const AnimatedPress: React.FC<IAnimatedPress> = ({
	children,
	itemAction,
}) => {
	const refValue = useRef(new Animated.Value(1));

	const onTap = useCallback(() => {
		Animated.spring(refValue.current, {
			toValue: 0.7,
			useNativeDriver: true,
		}).start();
	}, []);

	const onTapOut = useCallback(() => {
		Animated.spring(refValue.current, {
			toValue: 1,
			friction: 3,
			tension: 20,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<TouchableWithoutFeedback
			onLongPress={() => Alert.alert('Added to fav!')}
			onPress={itemAction}
			onPressIn={onTap}
			onPressOut={onTapOut}
		>
			<Animated.View
				style={{ flex: 1, transform: [{ scale: refValue.current }] }}
			>
				{children}
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};
