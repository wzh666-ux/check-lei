import React from "react";
import './common/App.less';

import Chessboard from './component/chessboard/chessboard'
import Soceboard from './component/soceboard/soceboard'

class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="App App-header">
                <Chessboard {...this.props}/>
                <Soceboard {...this.props}/>
            </div>
        )
    }
}

export default App
