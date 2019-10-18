import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-ui-kitten';

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
			style={[
				styles.listItemTouchable,
				{
					...marginFilters,
					...marginDownBooks,
				},
			]}
			testID={'optionListItemTouchableID'}
			onPress={navigate}
		>
			<View style={styles.listItemView}>
				<Text testID={'textOptionListItemID'} style={styles.listText}>
					{item}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	listItemTouchable: {
		alignSelf: 'center',
		justifyContent: 'center',
	},
	listItemView: {
		flex: 1,
		marginLeft: 24,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listText: {
		fontSize: 22,
		color: '#EE2C38',
	},
});
