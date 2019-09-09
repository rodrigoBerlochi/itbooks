import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const store = configureStore();

const Stack = createStackNavigator();

function NavRouter() {
	return (
		<NavigationNativeContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={{ header: null }}
					name={'Home'}
					component={require('./screens/Home').default}
				/>
			</Stack.Navigator>
		</NavigationNativeContainer>
	);
}

export default () => (
	<Provider store={store}>
		<NavRouter />
	</Provider>
);
