import React from 'react';

import Resources from './Resources.jsx';
import DinoScript from './DinoScript.jsx';
import DinoStyle from './DinoStyle.jsx';

import './Dino.css';
import BottomNav from '../components/boost/BottomNav';

class Dino extends React.Component {
  appendDinoScript() {
    let dinoScriptContainer = document.createElement("script");
    dinoScriptContainer.appendChild(document.createTextNode(DinoScript)); 
    this.startDiv.appendChild(dinoScriptContainer);
  }

  appendRunnerScript() {
    let runnerScriptContainer = document.createElement("script");
    runnerScriptContainer.appendChild(document.createTextNode(`new Runner('.interstitial-wrapper');`)); 

    this.endDiv.appendChild(runnerScriptContainer);
  }

  componentDidMount() {
    this.appendDinoScript();

    this.appendRunnerScript();
  }

    render() {
        return (
          <div ref={el => (this.startDiv = el)}>
            <style>{DinoStyle}</style>
            <div id="main-frame-error" className="interstitial-wrapper">
              <Resources />
              <BottomNav/>
              <div ref={el => (this.endDiv = el)}>
              </div>
            </div>
          </div>
        );
    }
}

export default Dino;
