import { VoiceInterface } from '@/types/voice.ts';
import AddVoiceForm from './add-voice-form.tsx';

export const voiceFormTab = (voice?: VoiceInterface) => [
	{
		value: 'genre-creation',
		head: `${voice ? 'Изменение озвучки' : 'Добавление'}`,
		isDialog: true,
		content: <AddVoiceForm voice={voice} />,
	},
];
