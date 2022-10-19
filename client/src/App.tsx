import React from 'react';
import 'antd/dist/antd.css';
import {Route, Routes} from 'react-router-dom';
import ChannelList from './components/pages/ChannelList';
import Channel from './components/pages/Channel';
import {Layout} from 'antd';

const {Content} = Layout;

const App = () => {
	return (
		<Layout>
			<Content style={{
				minHeight: '100vh',
				padding: '0 50px',
				margin: '25px 0',
			}}>
				<div style={{
					padding: '24px',
					background: '#fff'
				}}>
					<Routes>
						<Route path="/" element={<ChannelList/>}/>
						<Route path="/:channelId" element={<Channel/>}/>
					</Routes>
				</div>
			</Content>
		</Layout>
	);
};

export default App;
