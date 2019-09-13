import { FastImage, Header } from '@components/index';
import { useReduxAction, useReduxState } from '@hooks/use-redux';
import { useNavigation, useRoute } from '@react-navigation/core';
import { fetchBook } from '@redux/actions';
import { fetchedBook, isFetchingBook } from '@redux/selectors';
import { downloadBook } from '@utils/downloadBook';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
} from 'react';
import {
	ActivityIndicator,
	Alert,
	Platform,
	ScrollView,
	StyleSheet,
} from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

const BookDetails: React.FC = React.memo(() => {
	const transitionRef = useRef(null);
	const fetchBookAction = useReduxAction(fetchBook.request);
	const cancelFetchBook = useReduxAction(fetchBook.cancel);
	const book = useReduxState(fetchedBook);
	const isFetching = useReduxState(isFetchingBook);
	const { goBack } = useNavigation();
	const {
		params: {
			item: { title, bookInfoLink, image },
		},
	} = useRoute<any>();

	useEffect(() => {
		fetchBookAction(bookInfoLink);
		return () => cancelFetchBook();
	}, []);

	useLayoutEffect(() => {
		if (Object.keys(book).length > 2) {
			(transitionRef.current as any).animateNextTransition();
		}
	}, [book]);

	const transition = useMemo(
		() => (
			<Transition.Sequence>
				<Transition.Out
					type={'fade'}
					durationMs={400}
					interpolation={'easeIn'}
				/>
				<Transition.Change />
				<Transition.Together>
					<Transition.In
						type={'scale'}
						durationMs={400}
						interpolation={'easeInOut'}
						propagation={'top'}
					/>
					<Transition.In type={'slide-bottom'} durationMs={200} delayMs={200} />
				</Transition.Together>
			</Transition.Sequence>
		),
		[],
	);

	const downloadAction = useCallback(() => {
		Alert.alert(
			'Download types',
			'Available formats',
			[
				...((book.downloadLinks &&
					book.downloadLinks.map(link => ({
						text: link.includes('pdf') ? 'PDF' : 'ePub',
						onPress: () => downloadBook(link, title),
						style: 'destructive',
					}))) as any),
				{
					...(Platform.OS === 'ios' && {
						text: 'Cancel',
						onPress: () => null,
						style: 'cancel',
					}),
				},
			],
			{ cancelable: true },
		);
	}, [book.downloadLinks]);

	return (
		<View flex style={{ backgroundColor: '#FFF' }}>
			<Header action={goBack} headerText={'BOOK DETAILS'} />
			{isFetching ? (
				<ActivityIndicator
					style={styles.spinner}
					size={'large'}
					color={Colors.red20}
				/>
			) : (
				<Transitioning.View
					ref={transitionRef as any}
					style={{ flexGrow: 1, justifyContent: 'center' }}
					transition={transition}
				>
					<View column marginT-10>
						<View row>
							<FastImage uri={image} style={{ width: 150, height: 180 }} />
							<View flex>
								<Text text80 marginB-15>
									{title}
								</Text>
								<Text text80>Author: {book.author}</Text>
								<Text text80>ISBN: {book.isbn}</Text>
								<Text text80>Size: {book.size}</Text>
								<Text text80>Idiom: {book.lang}</Text>
								<Text text80>Formats: {book.formats}</Text>
								<Text text80>Category: {book.category}</Text>
							</View>
						</View>
						<Button
							onPress={downloadAction}
							style={styles.downloadButton}
							label={'DOWNLOAD BOOK'}
							backgroundColor={Colors.red30}
						/>
					</View>
					<ScrollView
						bounces={false}
						horizontal={false}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						style={{ flex: 1, backgroundColor: '#FFF' }}
					>
						<View style={styles.descriptionContainer}>
							<Text text80>{book.description}</Text>
						</View>
					</ScrollView>
				</Transitioning.View>
			)}
		</View>
	);
});

export { BookDetails as default };

const styles = StyleSheet.create({
	bookHeader: {
		paddingHorizontal: 16,
	},
	descriptionContainer: {
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	inputContainer: {
		paddingHorizontal: 24,
		marginBottom: 24,
	},
	commentsLabel: {
		marginBottom: 8,
	},
	downloadButton: {
		marginVertical: 24,
		marginHorizontal: 16,
	},
	spinner: {
		flex: 0.4,
		justifyContent: 'center',
		alignSelf: 'center',
		alignContent: 'center',
	},
});
