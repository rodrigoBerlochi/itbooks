import { FastImage, Header } from '@components/index';
import { useReduxAction, useReduxState } from '@hooks/use-redux';
import { useNavigation, useRoute } from '@react-navigation/core';
import { fetchBook } from '@redux/actions';
import { fetchedBook, isFetchingBook } from '@redux/selectors';
import { downloadBook } from '@utils/downloadBook';
import React, { useCallback, useEffect } from 'react';
import {
	ActivityIndicator,
	Alert,
	Platform,
	ScrollView,
	StyleSheet,
} from 'react-native';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

const BookDetails: React.FC = React.memo(() => {
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
				<>
					<View column marginT-10>
						<View row>
							<FastImage uri={image} style={{ width: 150, height: 180 }} />
							<View flex>
								<Text text80 marginB-15>{title}</Text>
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
				</>
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
