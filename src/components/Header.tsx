import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

interface IHeader {
	action: () => void;
	headerText: string;
}

export const Header: React.FC<IHeader> = React.memo(
	({ action, headerText }) => (
		<View paddingL-20 row>
			<TouchableOpacity onPress={action}>
				<Icon size={40} name={'md-close'} />
			</TouchableOpacity>
			<Text testID={'headerTextID'} numberOfLines={1} marginL-40 marginR-60 text30>
				{headerText}
			</Text>
		</View>
	),
);
