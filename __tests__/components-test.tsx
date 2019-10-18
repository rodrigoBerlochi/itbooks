import React from 'react';
import 'react-native';
import { render } from 'react-native-testing-library';
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

describe('COMMON COMPONENTS', () => {
	it('should render FAST-IMAGE correctly', () => {
		render(<FastImage uri={''} style={{ flex: 1 }} />);
	});

	xit('should render OptionListItem correctly', () => {
		const { getByTestId } = render(<OptionListItem key={''} item={'test'} />);

		expect(getByTestId('textOptionListItemID').props.children).toEqual('test');
	});

	xit('header', () => {
		const { getByTestId } = render(
			<Header headerText={'test'} action={NOOP} />,
		);

		expect(getByTestId('headerTextID').props.children).toEqual('test');
	});
});
