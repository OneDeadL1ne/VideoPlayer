import { Card, CardContent } from '../ui/card';

export interface CardProps<T> {
	index: number;
	current?: number;
	type?: 'films' | 'genres' | 'default';
	item: T;
}

export function CustomCard<T>({ index, current, item, type = 'default' }: CardProps<T>) {
	const center = index === current - 1 ? true : false;
	//const url = 'https://766qc35g-3000.euw.devtunnels.ms/Preview.svg';
	const url = 'http://localhost:3000/Preview.svg';

	if (type == 'genres') {
		return (
			<Card
				className={`flex justify-center items-center shadow-none border-0  
			h-[120px] w-[250px] 
			@[500px]:h-[140px] @[500px]:w-[210px] 
			@[610px]:h-[150px] @[610px]:w-[250px]  
			@[700px]:h-[170px] @[700px]:w-[260px]  
			@[800px]:h-[190px] @[800px]:w-[300px] 
			@[910px]:h-[250px] @[910px]:w-[350px] 
			@[1000px]:h-[250px] @[1000px]:w-[370px] 
			@[1200px]:h-[250px] @[1200px]:w-[400px] 
			@[1400px]:h-[250px] @[1400px]:w-[500px]
			`}
			>
				<CardContent className="font-semibold text-3xl">{item.name}</CardContent>
			</Card>
		);
	}

	return (
		<Card
			className={`flex justify-center items-center shadow-none border-0 focus:outline-none bg-transparent outline-transparent
						h-[120px] w-[250px] 
						@[500px]:h-[140px] @[500px]:w-[210px] 
						@[610px]:h-[150px] @[610px]:w-[250px]  
						@[700px]:h-[170px] @[700px]:w-[260px]  
						@[800px]:h-[190px] @[800px]:w-[300px] 
						@[910px]:h-[250px] @[910px]:w-[350px] 
						@[1000px]:h-[250px] @[1000px]:w-[370px] 
						@[1200px]:h-[250px] @[1200px]:w-[400px] 
						@[1400px]:h-[250px] @[1400px]:w-[500px]
						`}
		>
			<CardContent className={`flex items-center justify-center`}>
				<img
					src={url}
					className={`select-none  pointer-events-none   rounded-xl   object-cover`}
				/>
			</CardContent>
		</Card>
	);
}
