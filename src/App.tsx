import React from 'react';
import './App.css';
import {LinearGradientShader as InternalApp, VBTWebGLLinerGradientComponent} from './components/index';

type MyProps = {
    // using `interface` is also ok
    // message: string;
};
type MyState = {
    app?: any;
};
function initAppWithDefaultResources() {
    return new InternalApp();
}

export default class App extends React.Component<MyProps, MyState> {
    state: MyState = {
        app: initAppWithDefaultResources(),
    };

    render() {
        return (
            <div className="App" id="controlsContainer">

                <div style={{
                    width: "600px",
                    height: "400px",
                    position: "absolute",
                    top: "60px",
                    left: "60px",
                }}>
                    <VBTWebGLLinerGradientComponent
                        app={this.state.app}
                        aspectRatio={0.66}
                        startPosition={'[0.0,0.0]'}
                        endPosition={'[0.8,0.8]'}
                        angle={1.1344}
                        opacity={1}
                        useAngle={true}
                        stops={'[0.13, 0.33, 0.66, 0.99]'}
                        colors={'["#EB3860", "#E82D5A", "#E43B3B", "#FFC224"]'}
                    />

                </div>

            </div>
        );
    }
}
