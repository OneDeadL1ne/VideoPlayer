import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Toaster } from './components/ui/toaster.tsx';
import { VideoProvider } from './utils/contexts/VideoProvirer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<VideoProvider>
					<App />
					<Toaster />
				</VideoProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
