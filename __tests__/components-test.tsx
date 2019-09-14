import React from 'react';
import 'react-native';
import { render } from 'react-native-testing-library';
import { FastImage } from '../src/components/FastImage';

jest.mock('react-native-ui-lib', () => ({
	Colors: () => undefined,
}));

describe('COMMON COMPONENTS', () => {
	it('should render FAST-IMAGE correctly', () => {
		render(<FastImage uri={''} style={{ flex: 1 }} />);
	});
});
