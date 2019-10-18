import { Header } from '@components/Header';
import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useMemo } from 'react';
import { Layout } from 'react-native-ui-kitten';

const Options: React.FC = React.memo(({}) => {
	const navigation = useNavigation();
	const route = useRoute();
	const title = useMemo(() => {
		return (route.params as any).title;
	}, []);
	const goBack = useCallback(() => {
		navigation.goBack();
	}, []);

	return (
		<Layout style={{ flex: 1, backgroundColor: '#FFF' }}>
			<Header action={goBack} headerText={title} />
		</Layout>
	);
});

export { Options as default };
