import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { SetStateAction, Dispatch } from "react";

export function SelectDemo({
	value,
	setValue,
}: {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}) {
	return (
		<Select onValueChange={setValue} defaultValue={value}>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="3">1080</SelectItem>
				<SelectItem value="2">480</SelectItem>
				<SelectItem value="1">144</SelectItem>
			</SelectContent>
		</Select>
	);
}
