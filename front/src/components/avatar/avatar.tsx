import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/hooks/reduxHooks';
import { cn } from '@/lib/utils';

import { getCurrentColor } from '@/utils/helpers';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AvatarActor({ avatar_url, className }: { avatar_url: string; className?: string }) {
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);
	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);
	return (
		<Avatar className={className}>
			{avatar_url?.length != 0 && avatar_url && (
				<AvatarImage
					className={cn('object-contain rounded-none')}
					src={avatar_url}
					alt={`avatar`}
				/>
			)}
			<AvatarFallback className="bg-secondary">
				<User color={color} />
			</AvatarFallback>
		</Avatar>
	);
}
