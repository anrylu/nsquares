import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NByNPage from './nbyn.js'
import PinBoardPage from './pinboard.js'
import SevenSquaresPage from './seven-squares.js'

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
                    <Tab>7 Squares</Tab>
                </TabList>
                <TabPanel>
                    <NByNPage />
                </TabPanel>
                <TabPanel>
                    <PinBoardPage />
                </TabPanel>
                <TabPanel>
                    <SevenSquaresPage />
                </TabPanel>
            </Tabs>
        )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));