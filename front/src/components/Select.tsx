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
			<SelectTrigger className="w-[80px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent align="end" position="popper" className="w-[80px] p-0">
				<SelectItem value="http://localhost:3002/trailer/stream/3">1080</SelectItem>
				<SelectItem value="http://localhost:3002/trailer/stream/2">480</SelectItem>
				<SelectItem value="http://localhost:3002/trailer/stream/1">144</SelectItem>
			</SelectContent>
		</Select>
	);
}
