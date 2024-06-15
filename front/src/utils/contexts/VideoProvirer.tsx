import { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextType {
	activeVideo: string | null;
	setActiveVideo: (videoId: string | null) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

interface VideoProviderProps {
	children: ReactNode;
}

export const VideoProvider = ({ children }: VideoProviderProps) => {
	const [activeVideo, setActiveVideo] = useState<string | null>(null);

	return (
		<VideoContext.Provider value={{ activeVideo, setActiveVideo }}>
			{children}
		</VideoContext.Provider>
	);
};

export const useVideoContext = (): VideoContextType => {
	const context = useContext(VideoContext);
	if (!context) {
		throw new Error('useVideoContext must be used within a VideoProvider');
	}
	return context;
};
