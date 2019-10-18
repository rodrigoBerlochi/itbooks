import { light, mapping } from '@eva-design/eva';
import React from 'react';
import 'react-native';
import { render } from 'react-native-testing-library';
import {
	ApplicationProvider,
	ApplicationProviderProps,
} from 'react-native-ui-kitten';
import { FastImage } from '../src/components/FastImage';
import { Header } from '../src/components/Header';
import { OptionListItem } from '../src/components/OptionListItem';

jest.mock('react-native-ui-lib', () => ({
	Colors: () => undefined,
}));
jest.mock('@react-navigation/core', () => ({
	useNavigation: jest.fn().mockReturnValue(() => jest.fn()),
}));

const NOOP = () => jest.fn();

const Mock: React.FC = ({
	children,
}): React.ReactElement<ApplicationProviderProps> => {
	return (
		<ApplicationProvider mapping={mapping} theme={light}>
			{children}
		</ApplicationProvider>
	);
};

describe('COMMON COMPONENTS', () => {
	it('should render FAST-IMAGE correctly', () => {
		render(<FastImage uri={''} style={{ flex: 1 }} />);
	});

	it('should render OptionListItem correctly', () => {
		const { getByTestId } = render(
			<Mock>
				<OptionListItem key={''} item={'test'} />
			</Mock>,
		);

		expect(getByTestId('textOptionListItemID').props.children).toEqual('test');
	});

	it('header', () => {
		const { getByTestId } = render(
			<Mock>
				<Header headerText={'test'} action={NOOP} />,
			</Mock>,
		);

		expect(getByTestId('headerTextID').props.children).toEqual('test');
	});
});
