import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const Divider = React.memo(() => (
	<View
		style={{
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: Colors.dark60,
		}}
	/>
));
