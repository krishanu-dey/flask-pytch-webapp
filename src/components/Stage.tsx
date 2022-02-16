import React, { useState, useRef } from "react";
import { errorReportList } from "../model/ui";
import { useStoreState, useStoreActions } from "../store";

declare var flaskIDE: any;

const Stage = () => {
  console.log("rendering Stage");

  let [srcDoc, setSrcDoc] = useState('');
  let compiledMod = useStoreState((state) => {
    return state.activeProject.compiledMod;
  });
  console.log("flask configure")
  flaskIDE.configure(compiledMod, setSrcDoc)
  if (compiledMod != null && setSrcDoc != null)
    console.log("3: " + (new Date()).toISOString() + ' ::')
  // if (compiledMod != null) flaskIDE.renderPageHelper("/")

  const displaySize = useStoreState(
    (state) => state.ideLayout.stageDisplaySize
  );

  const appendError = useStoreActions(
    (actions) => actions.errorReportList.append
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

  let textInput = useRef<HTMLInputElement>(null);;

  const renderPage = () => {
    var url_requested: string
    if (textInput.current == null || textInput.current.value == null) url_requested = "/";
    else url_requested = textInput.current.value;
    
    if (url_requested == null || url_requested === "") url_requested = "/";
    // wrap this around a try catch
    // try {
      flaskIDE.renderPageHelper(url_requested) 
    // } catch(err) {
    //   appendError(err)
    // }

  }
  
  const keyDownInputBox = (e: any) => {
    if (e.key === 'Enter') {
      renderPage();
    }
  }

  return (
    <div id="pytch-stage-container">
      <div id="stage-url-bar" >
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">https://localhost:3000</span>
          </div>
          <input 
            type="text" 
            className="form-control" 
            id="url-bar" 
            aria-describedby="basic-addon3"
            onKeyDown={keyDownInputBox}
            ref={textInput}
          />
          <button 
            type="button" 
            id="url-bar-button"
            onClick={renderPage}
            className="btn btn-light"
          >  
            &gt; 
          </button> 
        </div>
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
