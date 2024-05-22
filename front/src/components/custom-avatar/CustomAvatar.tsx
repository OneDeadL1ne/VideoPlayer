import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/hooks/reduxHooks';
import { cn } from '@/lib/utils';

import { getCurrentColor } from '@/utils/helpers';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';

export function CustomAvatar({
	avatar_url,
	className,
}: {
	avatar_url?: string | null;
	className?: string;
}) {
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);
	const avatar = avatar_url ? true : false;
	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	return (
		<Avatar className={className}>
			{avatar_url?.length != 0 && avatar_url && avatar && (
				<AvatarImage
					className={cn('object-contain rounded-none')}
					src={avatar_url}
					alt={`avatar`}
				/>
			)}
			{!avatar && (
				<AvatarFallback className="bg-secondary">
					<User color={color} />
				</AvatarFallback>
			)}
		</Avatar>
	);
}
