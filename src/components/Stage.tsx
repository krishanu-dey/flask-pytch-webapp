import React, { useState } from "react";
import { useStoreState } from "../store";

declare var flaskIDE: any;

const Stage = () => {
  console.log("rendering Stage");

  let [srcDoc, setSrcDoc] = useState('');
  let compiledMod = useStoreState((state) => state.activeProject.compiledMod);
  flaskIDE.configure(compiledMod, setSrcDoc)

  const displaySize = useStoreState(
    (state) => state.ideLayout.stageDisplaySize
  );

  const resizeClass = false ? "resize-active" : undefined;

  const sizeStyle = {
    width: `${displaySize.width}px`,
    height: `${displaySize.height}px`,
  };
  const embeddedBrowserStyle = {
    width: `${displaySize.width}px`,
    height: `${displaySize.height}px`,
    border: "1px black",
    background: "white",
    overflowY: "scroll" as "scroll",
  }
  const urlStyle = {
    border: "thin: { compile?: any; }: { compile?: any; } solid black",
    backgroundColor: "white",
    maxWidth: "100%",
  }

  return (
    <div id="pytch-stage-container">
      <div id="stage-url-bar" >
        <input 
          type="text" 
          id="url-bar" 
          style={urlStyle}
        />
        <button 
          type="button" 
          id="url-bar-button"
          onClick={() => flaskIDE.renderPageHelper("/")}
        > 
          &gt; 
        </button> 
      </div>

      <div style={embeddedBrowserStyle} className={resizeClass}>
        <div 
          dangerouslySetInnerHTML={{__html: srcDoc}} 
        />
      </div>
      <div id="pytch-stage-layers">
        <div
          id="stage-resize-indicator"
          style={sizeStyle}
        />
      </div>
    </div>
  );
};

export default Stage;
