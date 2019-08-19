import React, { useEffect, useState } from 'react';
import {
	FlatList,
	NativeModules,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Colors, Constants, Text, View } from 'react-native-ui-lib';
import { FastImage } from './components/FastImage';
import { AnimatedRow } from './components/animated/AnimatedRow';

const GUTTER_SIZE = 24;
const NUMBER_OF_COLUMNS = 2;
const itemSize =
	(Constants.screenWidth - GUTTER_SIZE * (NUMBER_OF_COLUMNS + 1)) /
	NUMBER_OF_COLUMNS;

const App = () => {
	const [books, setBooks] = useState<any>([]);

	useEffect(() => {
		NativeModules.Scrapper.fetchQueueBooks()
			.then((data: any) => setBooks(JSON.parse(data)))
			.catch(console.log);
	}, []);

	return (
		<View flex>
			<ScrollView>
				<View paddingL-24>
					<View row spread bottom paddingR-24 style={styles.separator}>
						<Text text20 style={{ lineHeight: 70 }}>
							Library
						</Text>
					</View>
				</View>
				<View paddingL-24>
					<FlatList
						data={['Recents', 'Filters', 'Downloaded Books']}
						keyExtractor={item => item}
						renderItem={ListItem}
					/>
				</View>
				<View paddingH-24 marginT-30>
					<Text text40>Recently Added</Text>
					<View marginT-20>
						<FlatList
							removeClippedSubviews={true}
							initialNumToRender={6}
							maxToRenderPerBatch={6}
							getItemLayout={(data, index) => ({
								length: itemSize,
								offset: itemSize * index,
								index,
							})}
							horizontal={false}
							numColumns={NUMBER_OF_COLUMNS}
							keyExtractor={(item: any) => item.title}
							data={books}
							ListEmptyComponent={() => <Text>Empty</Text>}
							renderItem={GridListItem}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	separator: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.dark60,
	},
});

export default App;

const ListItem = ({ item }: any) => {
	return (
		<TouchableOpacity onPress={() => {}}>
			<View height={60} centerV style={[styles.separator]}>
				<Text text60 red20>
					{item}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const GridListItem = ({ item, index }: any) => {
	return (
		// <AnimatedRow>
		<View flex marginL-24={index % NUMBER_OF_COLUMNS !== 0} marginB-24>
			<View height={itemSize} bg-dark80>
				<FastImage style={{ flex: 1 }} uri={item.image} />
			</View>
			<View paddingT-2>
				<Text text70 dark20 numberOfLines={1}>
					{item.title}
				</Text>
			</View>
		</View>
		// </AnimatedRow>
	);
};
