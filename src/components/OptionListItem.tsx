import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export const OptionListItem = ({ item }: { item: string }) => {
	const marginFilters = useMemo(
		() => item === 'Filters' && { marginLeft: 50 },
		[],
	);
	const marginDownBooks = useMemo(
		() => item === 'Downloaded' && { marginLeft: 70 },
		[],
	);
	const navigation = useNavigation();
	const navigate = useCallback(() => {
		navigation.navigate(item, { title: item });
	}, []);

	return (
		<TouchableOpacity
			style={{
				alignSelf: 'center',
				justifyContent: 'center',
				...marginFilters,
				...marginDownBooks,
			}}
			onPress={navigate}
		>
			<View
				flex
				marginL-24
				marginB-24
				height={60}
				centerV
				style={{ alignSelf: 'center' }}
			>
				<Text text60 red20>
					{item}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
