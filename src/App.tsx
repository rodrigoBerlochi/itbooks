import React, { useEffect, useRef, useState } from 'react';
import {
	Dimensions,
	FlatList,
	NativeModules,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors, Constants, Text, View } from 'react-native-ui-lib';
import { BottomSheet } from './components/BottomSheet';
import { FastImage } from './components/FastImage';

const { width } = Dimensions.get('screen');

const { Value, Extrapolate, diffClamp, interpolate } = Animated;

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedList = Animated.createAnimatedComponent(FlatList);

const minScroll = 100;
const GUTTER_SIZE = 24;
const NUMBER_OF_COLUMNS = 2;
const HEADER_HEIGHT = 70;

const itemSize =
	(Constants.screenWidth - GUTTER_SIZE * (NUMBER_OF_COLUMNS + 1)) /
	NUMBER_OF_COLUMNS;

const App = () => {
	const refHeader = useRef(new Value(0));
	const [books, setBooks] = useState<any>([]);

	useEffect(() => {
		NativeModules.Scrapper.fetchQueueBooks()
			.then((data: any) => setBooks(JSON.parse(data)))
			.catch(console.warn);
	}, []);

	const diffClampHeader = diffClamp(refHeader.current, 0, HEADER_HEIGHT);
	const diffClampHeaderOpacity = diffClamp(refHeader.current, 1, HEADER_HEIGHT);

	const headerPosition = interpolate(diffClampHeader, {
		inputRange: [0, HEADER_HEIGHT],
		outputRange: [0, -HEADER_HEIGHT * 2.5],
		extrapolate: Extrapolate.CLAMP,
	});

	const headerOpacity = interpolate(diffClampHeaderOpacity, {
		inputRange: [0, 0.2, 0.5, 1],
		outputRange: [1, 0.2, 0.5, 1],
		extrapolate: Extrapolate.IDENTITY,
	});

	const headerX = refHeader.current.interpolate({
		inputRange: [0, width - width / 2],
		outputRange: [0, width - width / 2],
		extrapolate: Animated.Extrapolate.CLAMP,
	});

	const listY = refHeader.current.interpolate({
		inputRange: [0, 20, 90, 220],
		outputRange: [0, -20, -90, -220],
		extrapolate: Animated.Extrapolate.CLAMP,
	});

	return (
		<SafeAreaView style={{flex:1}}>
			<View flex>
				<View paddingL-24>
					<AnimatedView
						row
						spread
						bottom
						paddingR-24
						style={[styles.separator]}
					>
						<AnimatedText
							text20
							style={[
								{ lineHeight: 70 },
								{
									transform: [
										{
											translateX: headerX,
										},
									],
								},
							]}
						>
							ItBooks
						</AnimatedText>
					</AnimatedView>
				</View>
				<AnimatedView
					paddingL-24
					style={{
						opacity: headerOpacity,
						transform: [{ translateY: headerPosition }],
					}}
				>
					<FlatList
						horizontal={false}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						numColumns={NUMBER_OF_COLUMNS}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
						data={['Recents', 'Filters', 'Options', 'Downloaded Books']}
						keyExtractor={item => item}
						renderItem={ListItem}
					/>
				</AnimatedView>
				<AnimatedView
					flex
					style={{ marginTop: listY }}
					paddingB-40
					paddingH-24
					// marginT-30
				>
					<Text text40>Recently Added</Text>
					<View marginT-20>
						<AnimatedList
							scrollEventThrottle={16}
							onScroll={Animated.event([
								{
									nativeEvent: {
										contentOffset: {
											y: refHeader.current,
										},
									},
								},
							])}
							bounces={false}
							removeClippedSubviews={true}
							initialNumToRender={6}
							renderToHardwareTextureAndroid={true}
							shouldRasterizeIOS={true}
							maxToRenderPerBatch={6}
							horizontal={false}
							showsVerticalScrollIndicator={false}
							getItemLayout={(_: any, index: number) => ({
								length: itemSize,
								offset: itemSize * index,
								index,
							})}
							numColumns={NUMBER_OF_COLUMNS}
							keyExtractor={(item: any) => item.title}
							data={books}
							windowSize={10}
							ListEmptyComponent={() => <Text>Empty</Text>}
							renderItem={GridListItem}
						/>
					</View>
				</AnimatedView>
			</View>
			{/* <BottomSheet /> */}
		</SafeAreaView>
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
	const marginLeft = item === 'Filters' && {marginLeft:50};
	const marginn = item === 'Downloaded Books' && {marginLeft:10}
	return (
		<TouchableOpacity style={{alignSelf:'center', justifyContent:'center', ...marginLeft, ...marginn}} onPress={() => {}}>
			<View
				flex
				marginL-24
				marginB-24
				height={60}
				centerV
				// style={[styles.separator]}
			>
				<Text text60 red20>
					{item}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const GridListItem = ({ item, index }: any) => {
	return (
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
	);
};
