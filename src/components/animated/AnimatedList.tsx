import { Book } from '@interfaces/';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import Animated from 'react-native-reanimated';
import { Constants, Text, View } from 'react-native-ui-lib';
import {
	DataProvider,
	LayoutProvider,
	RecyclerListView,
} from 'recyclerlistview';
import {
	RecyclerListViewProps,
	RecyclerListViewState,
} from 'recyclerlistview/dist/reactnative/core/RecyclerListView';
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

interface X {
	index: number;
	item: PartialBook;
}

interface IList {
	data: PartialBook[];
	fetchMore: any;
	refScroll: any;
	onItemPress: ({ index, item }: X) => void;
	ref?: any;
}

const NUMBER_OF_COLUMNS = 2;
const GUTTER_SIZE = 24;

const itemWidth =
	(Constants.screenWidth - GUTTER_SIZE * (NUMBER_OF_COLUMNS + 1)) /
	NUMBER_OF_COLUMNS;

const itemHeight = itemWidth + 30;

export const AnimatedList = React.memo<IList>(
	React.forwardRef<any, IList>(
		({ data, fetchMore, refScroll, onItemPress }, ref) => {
			const refList = useRef<
				RecyclerListView<RecyclerListViewProps, RecyclerListViewState>
			>(null);
			const dataProvider = useRef<DataProvider>(
				new DataProvider((r1, r2) => r1 !== r2),
			);
			const layoutProvider = useRef<LayoutProvider>(
				new LayoutProvider(
					_ => 0,
					(type, dim) => {
						dim.width = itemWidth;
						dim.height = itemHeight + 30;
					},
				),
			);
			const [books, setBooks] = useState<PartialBook[]>([]);

			useImperativeHandle(ref, () => ({
				scrollToTop: () => {
					if (refList.current) {
						(refList.current as any).getNode().scrollToOffset(0, 0, true);
					}
				},
			}));

			useEffect(() => {
				const newBooks = data.slice(data.length - 20, data.length);
				const newData = [...books, ...newBooks];
				dataProvider.current = dataProvider.current.cloneWithRows(newData);
				setBooks(newData);
			}, [data]);

			return (
				<ReanimatedList
					ref={refList}
					bounces={false}
					renderAheadOffset={250}
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
					rowRenderer={(_: any, item: PartialBook, index: number) => (
						<AnimatedPress itemAction={() => onItemPress({ index, item })}>
							<View
								flex
								marginL-24={index % NUMBER_OF_COLUMNS !== 0}
								marginB-24
							>
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
					)}
				/>
			);
		},
	),
);
