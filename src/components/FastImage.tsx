import React from 'react';
import Image, { FastImageSource, ImageStyle } from 'react-native-fast-image';

interface FastStyle {
	style: ImageStyle;
}

type FastImageType = FastImageSource & FastStyle;

export const FastImage = React.memo<FastImageType>(
	({ uri, headers, style, ...props }) => (
		<Image
			style={[style]}
			source={{
				uri,
				headers,
				priority: Image.priority.normal,
			}}
			resizeMode={Image.resizeMode.contain}
		/>
	),
);
