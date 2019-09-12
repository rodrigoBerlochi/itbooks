import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@redux/store';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

const store = configureStore();

const Stack = createStackNavigator();

function NavRouter() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
			<NavigationNativeContainer>
				<Stack.Navigator headerMode={'none'} mode={'modal'}>
					<Stack.Screen
						name={'Home'}
						component={require('./screens/Home').default}
					/>
					<Stack.Screen
						options={{
							gestureEnabled: true,
							gestureDirection: 'horizontal',
						}}
						name={'Book'}
						component={require('./screens/BookDetails').default}
					/>
					<Stack.Screen
						options={{
							gestureDirection: 'horizontal',
						}}
						name={'Downloaded'}
						component={require('./screens/Downloaded').default}
					/>
					<Stack.Screen
						options={{
							gestureDirection: 'horizontal',
						}}
						name={'Filters'}
						component={require('./screens/Filters').default}
					/>
					<Stack.Screen
						options={{
							gestureDirection: 'horizontal',
						}}
						name={'Options'}
						component={require('./screens/Options').default}
					/>
				</Stack.Navigator>
			</NavigationNativeContainer>
		</SafeAreaView>
	);
}

export default () => (
	<Provider store={store}>
		<NavRouter />
	</Provider>
);
