import Service from '@redux/services/index';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { from } from 'rxjs';

// TODO improve this function
export async function downloadBook(
	url: string,
	fileName: string,
): Promise<void> {
	if (Platform.OS === 'android') await requestWritePermission();
	from(Service.scrapper.downloadBook(url, fileName))
		.toPromise()
		.then(_ => Alert.alert('Download book', 'Book downloaded successfully :)'))
		.catch(_ =>
			Alert.alert('Download book error', 'Error downloading book :('),
		);
}

async function requestWritePermission(): Promise<void> {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			{
				title: 'IT Books Write Permission',
				message:
					'IT Books needs access to your storage ' +
					'so you can download books.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			},
		);
		if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
			Alert.alert(
				'Write permission denied',
				'We cant download any books then sorry :(',
			);
		}
	} catch (err) {
		console.log(err);
	}
}
