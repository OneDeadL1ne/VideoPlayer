import { useEffect } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { ToastAction } from "@/components/ui/toast.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { ErrorInterface } from "@/types/fetch";

const ERROR_DURATION = 3000;

export const useErrorToast = (
	repeatFn?: () => void,
	error?: FetchBaseQueryError | SerializedError | undefined
) => {
	const { toast } = useToast();

	useEffect(() => {
		if (error) {
			const errorData = error as {
				status: number;
				data: ErrorInterface | undefined;
			};

			toast({
				variant: "destructive",
				title: "Ошибка",
				description: errorData.data?.message ? errorData.data.message : "",
				duration: ERROR_DURATION,
				action:
					typeof repeatFn === "undefined" ? (
						void 0
					) : (
						<ToastAction altText="Попробуйте еще раз" onClick={repeatFn}>
							Попробуйте еще раз
						</ToastAction>
					),
			});
		}
	}, [error, toast]);
};
