import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NByNPage from './nbyn.js'
import PinBoard from './pinboard.js'

class App extends React.Component
{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Tabs selectedIndex={0}>
                <TabList>
                    <Tab>NxN</Tab>
                    <Tab>PinBoard</Tab>
                </TabList>
                <TabPanel>
                    <NByNPage />
                </TabPanel>
                <TabPanel>
                    <PinBoard />
                </TabPanel>
            </Tabs>
        )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));