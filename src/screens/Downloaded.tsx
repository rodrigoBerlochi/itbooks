import { Header } from '@components/Header';
import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native-ui-lib';

const Downloaded: React.FC = React.memo(({}) => {
	const navigation = useNavigation();
	const route = useRoute();
	const title = useMemo(() => {
		return (route.params as any).title;
	}, []);
	const goBack = useCallback(() => {
		navigation.goBack();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#FFF' }}>
			<Header action={goBack} headerText={title} />
		</View>
	);
});

export { Downloaded as default };
