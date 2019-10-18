import {
	AnimatedIcon,
	AnimatedList,
	AnimatedView,
	Divider,
	OptionListItem,
	SearchComponent,
} from '@components/index';
import { useReduxAction, useReduxState } from '@hooks/use-redux';
import { useNavigation } from '@react-navigation/core';
import actions from '@redux/actions';
import { books as getBooks } from '@redux/selectors/';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';
import { Layout, Text } from 'react-native-ui-kitten';
import { Colors, Constants, Text as UText, View } from 'react-native-ui-lib';

const { width } = Dimensions.get('screen');

const { Value, Extrapolate } = Animated;

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedTextInput = Animated.createAnimatedComponent(SearchComponent);

const NUMBER_OF_COLUMNS = 2;

const getItemLayout = (_: any, index: number) => ({
	length: 60,
	offset: 60 * index,
	index,
});

const Home = () => {
	const refHeader = useRef(new Value(0));
	const refList = useRef(null);
	const transitionRef = useRef(null);
	const [search, setSearch] = useState<boolean>(false);
	const books = useReduxState(getBooks);
	const fetchBooks = useReduxAction(
		actions.bookActions.fetchQueueBooks.request,
	);
	const navigation = useNavigation();
	const navigate = useCallback(data => {
		navigation.navigate('Book', data);
	}, []);
	const scrollToTop = useCallback(() => {
		(refList.current as any).scrollToTop();
	}, [refList.current]);

	useEffect(() => {
		fetchBooks();
	}, []);

	const transition = useMemo(
		() => (
			<Transition.Sequence>
				<Transition.Out
					type={'slide-left'}
					durationMs={200}
					interpolation={'easeIn'}
				/>
				<Transition.Change interpolation={'easeInOut'} />
				<Transition.Together>
					<Transition.In
						type={'slide-right'}
						durationMs={200}
						interpolation={'easeOut'}
						propagation={'left'}
					/>
					<Transition.In type={'fade'} durationMs={50} delayMs={50} />
				</Transition.Together>
			</Transition.Sequence>
		),
		[],
	);

	const iconSearchAction = useCallback(() => {
		(transitionRef.current as any).animateNextTransition();
		setSearch(s => !s);
	}, [search]);

	const headerOpacity = refHeader.current.interpolate({
		inputRange: [-100, 0, 100, 101],
		outputRange: [0, 1, 0, 0],
		extrapolate: Extrapolate.CLAMP,
	});

	const headerX = refHeader.current.interpolate({
		inputRange: [0, width - width / 2],
		outputRange: [0, width - width / 2.25],
		extrapolate: Animated.Extrapolate.CLAMP,
	});

	const titleFontSize = refHeader.current.interpolate({
		inputRange: [-100, 0, 100, 101],
		outputRange: [60, 50, 40, 30],
		extrapolate: Extrapolate.CLAMP,
	});

	const listY = refHeader.current.interpolate({
		inputRange: [0, 175],
		outputRange: [0, -175],
		extrapolate: Animated.Extrapolate.CLAMP,
	});

	return (
		<Layout style={{ backgroundColor: '#FFF', flex: 1 }}>
			<View paddingL-24>
				<AnimatedView row spread bottom paddingR-24 style={[styles.separator]}>
					<Transitioning.View
						ref={transitionRef}
						transition={transition}
						style={styles.transitionView}
					>
						{!search ? (
							<AnimatedText
								key={search}
								style={[
									{
										lineHeight: 70,
										fontFamily: Constants.isAndroid
											? 'sans-serif-thin'
											: undefined,
										fontSize: titleFontSize,
										fontWeight: '100',
										transform: [
											{
												translateX: headerX,
											},
										],
									},
								]}
							>
								IT Books
							</AnimatedText>
						) : (
							<AnimatedTextInput
								key={search}
								placeholder={'Search your book'}
								action={console.warn}
								style={{
									justifyContent: 'center',
									alignSelf: 'center',
									transform: [
										{
											translateX: headerX,
										},
									],
								}}
							/>
						)}
					</Transitioning.View>
					<AnimatedIcon
						onPress={iconSearchAction}
						style={[styles.animatedIcon, { opacity: headerOpacity }]}
						name={!search ? 'md-search' : 'md-close'}
					/>
				</AnimatedView>
			</View>
			<AnimatedView
				paddingL-24
				style={{
					opacity: headerOpacity,
				}}
			>
				<FlatList
					bounces={false}
					horizontal={false}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					numColumns={NUMBER_OF_COLUMNS}
					ItemSeparatorComponent={Divider}
					data={['Options', 'Filters', 'Fav', 'Downloaded']}
					keyExtractor={item => item}
					renderItem={props => <OptionListItem {...props} />}
					getItemLayout={getItemLayout}
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
				/>
			</AnimatedView>
			<AnimatedView flex style={{ marginTop: listY }} paddingH-24>
				<UText onPress={scrollToTop} text40>
					Recently Added
				</UText>
				{books.length > 0 && (
					<AnimatedList
						ref={refList}
						data={books}
						fetchMore={fetchBooks}
						refScroll={refHeader}
						onItemPress={navigate}
					/>
				)}
			</AnimatedView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	separator: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.dark60,
	},
	animatedIcon: {
		justifyContent: 'center',
		alignSelf: 'center',
	},
	transitionView: {
		flexGrow: 1,
		justifyContent: 'center',
	},
});

export { Home as default };
