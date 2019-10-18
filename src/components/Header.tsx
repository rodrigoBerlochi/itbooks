import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';

interface IHeader {
	action: () => void;
	headerText: string;
}

export const Header: React.FC<IHeader> = React.memo(
	({ action, headerText }) => (
		<View style={styles.headerView}>
			<TouchableOpacity onPress={action}>
				<Icon size={40} name={'md-close'} />
			</TouchableOpacity>
			<Text testID={'headerTextID'} numberOfLines={1} style={styles.headerText}>
				{headerText}
			</Text>
		</View>
	),
);

const styles = StyleSheet.create({
	headerView: {
		paddingLeft: 20,
		flexDirection: 'row',
	},
	headerText: {
		marginLeft: 40,
		marginRight: 60,
		paddingTop: 17,
		fontSize: 30,
	},
});
