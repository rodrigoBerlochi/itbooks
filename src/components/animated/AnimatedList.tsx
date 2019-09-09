import { Book } from '@interfaces/';
import React, { useEffect, useRef, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import Animated from 'react-native-reanimated';
import { Constants, Text, View } from 'react-native-ui-lib';
import {
	DataProvider,
	LayoutProvider,
	RecyclerListView,
} from 'recyclerlistview';
import { FastImage } from '../FastImage';
import { AnimatedPress } from './AnimatedPressed';
import { createAnimatedComponent } from './helpers';

const ReanimatedList = createAnimatedComponent(RecyclerListView);

const NOOP = () => undefined;

const layoutItemAnimator = {
	animateDidMount: () =>
		LayoutAnimation.configureNext(
			LayoutAnimation.create(400, 'easeInEaseOut', 'scaleXY'),
		),
	animateShift: NOOP,
	animateWillMount: NOOP,
	animateWillUnmount: NOOP,
	animateWillUpdate: NOOP,
};

type PartialBook = Pick<Book, 'title' | 'image'>;

const NUMBER_OF_COLUMNS = 2;
const GUTTER_SIZE = 24;

const itemWidth =
	(Constants.screenWidth - GUTTER_SIZE * (NUMBER_OF_COLUMNS + 1)) /
	NUMBER_OF_COLUMNS;

const itemHeight = itemWidth + 30;

const GridListitem = (_: any, item: PartialBook, index: number) => (
	<AnimatedPress>
		<View flex marginL-24={index % NUMBER_OF_COLUMNS !== 0} marginB-24>
			<View height={itemWidth}>
				<FastImage style={{ flex: 1 }} uri={item.image} />
			</View>
			<View paddingT-2>
				<Text text70 dark20 numberOfLines={1}>
					{item.title}
				</Text>
			</View>
		</View>
	</AnimatedPress>
);

export const AnimatedList: React.FC<{
	data: PartialBook[];
	fetchMore: any;
	refScroll: any;
}> = React.memo(({ data, fetchMore, refScroll }) => {
	const dataProvider = useRef<DataProvider>(
		new DataProvider((r1, r2) => r1 !== r2),
	);
	const layoutProvider = useRef<LayoutProvider>(
		new LayoutProvider(
			_ => 0,
			(type, dim) => {
				switch (type) {
					case 0:
						dim.width = itemWidth;
						dim.height = itemHeight + 30;
						break;
					default:
						dim.width = 0;
						dim.height = 0;
				}
			},
		),
	);
	const [books, setBooks] = useState<PartialBook[]>([]);

	useEffect(() => {
		const newBooks = data.slice(data.length - 20, data.length);
		const newData = [...books, ...newBooks];
		dataProvider.current = dataProvider.current.cloneWithRows(newData);
		setBooks(newData);
	}, [data]);

	return (
		<ReanimatedList
			bounces={false}
			renderToHardwareTextureAndroid={true}
			shouldRasterizeIOS={true}
			showsVerticalScrollIndicator={false}
			scrollThrottle={16}
			onScroll={Animated.event([
				{
					nativeEvent: {
						contentOffset: {
							y: refScroll.current,
						},
					},
				},
			])}
			onEndReached={fetchMore}
			itemAnimator={layoutItemAnimator}
			onEndReachedThreshold={0.75}
			layoutProvider={layoutProvider.current}
			dataProvider={dataProvider.current}
			rowRenderer={GridListitem}
		/>
	);
});
