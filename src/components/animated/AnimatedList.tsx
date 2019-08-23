import React from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { Constants, Text, View } from 'react-native-ui-lib';
import { FastImage } from '../FastImage';
import { createAnimatedComponent } from './helpers';

const NUMBER_OF_COLUMNS = 2;
const GUTTER_SIZE = 24;

const itemSize =
	(Constants.screenWidth - GUTTER_SIZE * (NUMBER_OF_COLUMNS + 1)) /
	NUMBER_OF_COLUMNS;

const keyExtractor = (item: any) => item.title;

const List = createAnimatedComponent(FlatList);

const Empty = () => <Text>Empty list :(</Text>;

export const AnimatedList: React.FC<{
	data: any;
	fetchMore: any;
	refScroll: any;
}> = React.memo(({ data, fetchMore, refScroll }: any) => (
	<List
		scrollEventThrottle={16}
		onScroll={Animated.event([
			{
				nativeEvent: {
					contentOffset: {
						y: refScroll.current,
					},
				},
			},
		])}
		bounces={false}
		removeClippedSubviews={true}
		initialNumToRender={10}
		renderToHardwareTextureAndroid={true}
		shouldRasterizeIOS={true}
		maxToRenderPerBatch={10}
		horizontal={false}
		showsVerticalScrollIndicator={false}
		getItemLayout={(_: any, index: number) => ({
			length: itemSize,
			offset: itemSize * index,
			index,
		})}
		numColumns={NUMBER_OF_COLUMNS}
		keyExtractor={keyExtractor}
		data={data}
		windowSize={15}
		ListEmptyComponent={Empty}
		renderItem={GridListItem}
		onEndReached={fetchMore}
		onEndReachedThreshold={0.75}
	/>
));

const GridListItem = ({ item, index }: any) => {
	return (
		<View flex marginL-24={index % NUMBER_OF_COLUMNS !== 0} marginB-24>
			<View height={itemSize}>
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
