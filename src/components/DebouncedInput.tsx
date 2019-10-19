import React, { useCallback, useEffect, useRef } from 'react';
import { Colors, TextField } from 'react-native-ui-lib';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

interface ISearch {
	action: (searchQuery: any) => void;
	debounce?: number;
	placeholder?: string;
	style?: any;
}

export const SearchComponent = React.memo<ISearch>(
	React.forwardRef<typeof TextField, ISearch>(
		({ action, placeholder, debounce = 500, ...props }, ref) => {
			const debounceSubject = useRef(new Subject());

			useEffect(() => {
				debounceSubject.current
					.pipe(
						map(({ searchQuery }: any) => ({ searchQuery })),
						debounceTime(debounce),
					)
					.subscribe(action);
				return () => debounceSubject.current.unsubscribe();
			}, []);

			const onChange = useCallback(
				(searchQuery: string) => debounceSubject.current.next({ searchQuery }),
				[],
			);

			return (
				<TextField
					{...props}
					ref={ref}
					onChangeText={onChange}
					text70
					autoCorrect={false}
					red20
					hideUnderline
					floatingPlaceholder
					floatingPlaceholderColor={{ focus: Colors.red20 }}
					underlineColor={{ focus: Colors.dark20 }}
					placeholder={placeholder}
					floatOnFocus
				/>
			);
		},
	),
);
