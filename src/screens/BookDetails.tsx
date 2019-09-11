import { Header } from '@components/Header';
import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { View } from 'react-native-ui-lib';

const BookDetails: React.FC = React.memo(() => {
	const { goBack } = useNavigation();
	const {
		item: { title },
	} = useRoute().params;

	return (
		<View style={{ flex: 1, backgroundColor: '#FFF' }}>
			<Header action={goBack} headerText={title} />
		</View>
	);
});

export { BookDetails as default };
