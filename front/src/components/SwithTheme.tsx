import { getCurrentColorScheme } from '@/utils/helpers';
import { Switch } from './ui/switch';

import { useTheme } from '@/hooks/useTheme';

export default function SwithTheme() {
	const [theme, handleChange] = useTheme(getCurrentColorScheme());

	return (
		<Switch
			checked={theme == 'dark' ? true : false}
			value={theme}
			onCheckedChange={handleChange}
		/>
	);
}
