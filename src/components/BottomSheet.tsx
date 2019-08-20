import React, { useMemo, useRef } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Colors } from 'react-native-ui-lib';
import BSheet from 'reanimated-bottom-sheet';

export function BottomSheet() {
	const refBS = useRef(null);

	const renderInner = useMemo(
		() => (
			<View style={styles.panel}>
				<Text style={styles.panelTitle}>IT Books Typescript Golang</Text>
				<Text style={styles.panelSubtitle}>
					60fps - native modules and animations
				</Text>
				<Button
					backgroundColor={Colors.red30}
					label={'READ PDF'}
					style={{ marginBottom: 20 }}
					onPress={() => console.warn('Read PDF')}
				/>
				<Button
					backgroundColor={Colors.red30}
					label={'DOWNLOAD PDF'}
					style={{ marginBottom: 20 }}
					onPress={() => console.warn('Download PDF')}
				/>
				<Image
					style={styles.photo}
					source={{
						uri:
							'https://www.sitepen.com/blog/wp-content/uploads/2018/12/go_blog3.png',
					}}
				/>
			</View>
		),
		[],
	);

	const renderHeader = useMemo(
		() => (
			<View style={styles.header}>
				<View style={styles.panelHeader}>
					<View style={styles.panelHandle} />
				</View>
			</View>
		),
		[],
	);

	return (
		<BSheet
			ref={refBS}
			snapPoints={[Dimensions.get('screen').height-75, 500, 250, 0]}
			renderContent={() => renderInner}
			renderHeader={() => renderHeader}
			initialSnap={2}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	panel: {
		height: Dimensions.get('screen').height,
		padding: 20,
		backgroundColor: '#f7f5eee8',
	},
	header: {
		backgroundColor: '#f7f5eee8',
		shadowColor: '#000000',
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		alignItems: 'center',
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10,
	},
	panelButton: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: '#318bfb',
		alignItems: 'center',
		marginVertical: 10,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
	photo: {
		height: 225,
		marginTop: 30,
	},
	map: {
		height: '100%',
		width: '100%',
	},
});
