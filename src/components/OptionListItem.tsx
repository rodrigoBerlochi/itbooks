import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export const OptionListItem = ({ item }: any) => {
	const marginLeft = item === 'Filters' && { marginLeft: 50 };
	const marginn = item === 'Downloaded Books' && { marginLeft: 10 };
	return (
		<TouchableOpacity
			style={{
				alignSelf: 'center',
				justifyContent: 'center',
				...marginLeft,
				...marginn,
			}}
			onPress={() => Alert.alert(item)}
		>
			<View
				flex
				marginL-24
				marginB-24
				height={60}
				centerV
				style={{ alignSelf: 'center' }}
				// style={[styles.separator]}
			>
				<Text text60 red20>
					{item}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
