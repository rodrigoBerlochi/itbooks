import { light as lightTheme, mapping } from '@eva-design/eva';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@redux/store';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { Provider } from 'react-redux';

const store = configureStore();

const Stack = createNativeStackNavigator();

function NavRouter() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationNativeContainer>
				<Stack.Navigator
					screenOptions={{ headerShown: false, gestureEnabled: true }}
				>
					<Stack.Screen
						name={'Home'}
						component={require('./screens/Home').default}
					/>
					<Stack.Screen
						name={'Book'}
						component={require('./screens/BookDetails').default}
					/>
					<Stack.Screen
						name={'Downloaded'}
						component={require('./screens/Downloaded').default}
					/>
					<Stack.Screen
						name={'Filters'}
						component={require('./screens/Filters').default}
					/>
					<Stack.Screen
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
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<NavRouter />
		</ApplicationProvider>
	</Provider>
);
