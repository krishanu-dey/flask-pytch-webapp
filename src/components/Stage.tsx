import React, { useEffect, useRef } from "react";
import { BrowserKeyboard } from "../skulpt-connection/browser-keyboard";
import { IWebAppAPI, ProjectEngine } from "../skulpt-connection/drive-project";
import { useStoreActions, useStoreState } from "../store";
import { failIfNull } from "../utils";
import { VariableWatchers } from "./VariableWatchers";

const Stage = () => {
  console.log("rendering Stage");

  // The build sequence number doesn't actually appear anywhere in
  // the rendered component, but depending on it causes a re-render
  // and a re-set-up of the mouse/keyboard/engine when there's a new
  // Sk.pytch.current_live_project.
  const compiledMod = useStoreState((state) => state.activeProject.compiledMod);
  const displaySize = useStoreState(
    (state) => state.ideLayout.stageDisplaySize
  );
  // const resizeIsActive = useStoreState(
  //   (state) => state.ideLayout.stageVerticalResizeState != null
  // );

  const {
    reset: resetQuestion,
    setQuestion,
    maybeAcquireSubmission,
  } = useStoreActions((actions) => actions.userTextInput);

  const setVariableWatchers = useStoreActions(
    (actions) => actions.variableWatchers.setWatchers
  );

  const webAppAPI: IWebAppAPI = {
    clearUserQuestion: () => resetQuestion(),
    askUserQuestion: (q) => setQuestion(q),
    maybeAcquireUserInputSubmission: () => maybeAcquireSubmission(),

    setVariableWatchers: (ws) => setVariableWatchers(ws),
  };

  const canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  const bubblesRef: React.RefObject<HTMLDivElement> = React.createRef();

  const browserKeyboardRef = useRef<BrowserKeyboard | null>(null);
  //const browserMouseRef = useRef<BrowserMouse | null>(null);
  const projectEngineRef = useRef<ProjectEngine | null>(null);

  useEffect(() => {
    console.log("Stage effect: setting up keyboard/mouse/engine", compiledMod);

    const canvas = failIfNull(
      canvasRef.current,
      "Stage effect: canvasRef is null"
    );
    const bubblesDiv = failIfNull(
      bubblesRef.current,
      "Stage effect: bubblesRef is null"
    );

    bubblesDiv.tabIndex = -1;
    bubblesDiv.focus();

    // All these ctors also "activate" the new object.
    browserKeyboardRef.current = new BrowserKeyboard(bubblesDiv);
    //browserMouseRef.current = new BrowserMouse(bubblesDiv);
    projectEngineRef.current = new ProjectEngine(canvas, bubblesDiv, webAppAPI);

    resetQuestion();

    return () => {
      console.log("Stage effect: tearing down keyboard/mouse/engine");
      browserKeyboardRef.current!.deactivate();
      //browserMouseRef.current!.deactivate();
      projectEngineRef.current!.requestHalt();
    };
  });

  const sizeStyle = {
    width: `${displaySize.width}px`,
    height: `${displaySize.height}px`,
  };

  // // When resizing, the stage rendering flickers with what seems to be a
  // // first render before the transformation has been set.  Hide the
  // // stage while a drag-resize is in progress.
  // //
  // // TODO: Work out why flickering happens in the first place, and see
  // // if there's a tidier way to do this.
  // const resizeClass = false ? "resize-active" : undefined;

  const embeddedBrowserStyle = {
    width: `${displaySize.width}px`,
    height: `${displaySize.height}px`,
    border: "1px grey",
    background: "white",
  }

  const srcDoc = `<h1> Home Page </h1><i> this is the home page</i><br /> 
  <a 
href='/login'">Login</a> 
  <a href='/signup'>Signup</a>`

  return (
    <div id="pytch-stage-container">
      <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-forms allow-same-origin allow-scripts"
          width={displaySize.width}
          height={displaySize.height}
          id="sandbox-preview" 
          style={embeddedBrowserStyle}
        />
      <div id="pytch-stage-layers">
        
        {/* <div style={embeddedBrowserStyle} >
          <div 
            dangerouslySetInnerHTML={{__html: srcDoc}} 
          />
        </div> */}
        
        <VariableWatchers />
        <div
          ref={bubblesRef}
          id="pytch-speech-bubbles"
          style={sizeStyle}
        />
        <div
          id="stage-resize-indicator"
          style={sizeStyle}
        />
      </div>
      <canvas
          ref={canvasRef}
          id="pytch-canvas"
          width={displaySize.width*0}
          height={displaySize.height*0}
        />
    </div>
  );
};

export default Stage;
