import React, { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../store";
import {Helmet} from "react-helmet";
// import { renderPage, setVariables } from "./flask-ide"

declare var Sk: any;
// declare var compiledMod: any;
declare var flaskIDE: any;
let sd: any;

// let srcDoc = `<h1> Home Page </h1><i> this is the home page</i><br /> 
//   <a 
// href='/login'">Login</a> 
//   <a href='/signup'>Signup</a>`

const Stage = () => {
  console.log("rendering Stage");

  let [srcDoc, setSrcDoc] = useState('');
  sd = setSrcDoc;

  let compiledMod = useStoreState((state) => state.activeProject.compiledMod);

  flaskIDE.configure(compiledMod, setSrcDoc)

  const displaySize = useStoreState(
    (state) => state.ideLayout.stageDisplaySize
  );

  const sizeStyle = {
    width: `${displaySize.width}px`,
    height: `${displaySize.height}px`,
  };

  // When resizing, the stage rendering flickers with what seems to be a
  // first render before the transformation has been set.  Hide the
  // stage while a drag-resize is in progress.
  //
  // TODO: Work out why flickering happens in the first place, and see
  // if there's a tidier way to do this.
  const resizeClass = false ? "resize-active" : undefined;

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
 
 function renderPage(url_requested: string, requestData: any) {
   const app = Sk.builtin.getattr(compiledMod, new Sk.builtin.str("app"));
   const handleRouteFn = Sk.builtin.getattr(app, new Sk.builtin.str("handleRoute"));
   //document.getElementById("url_bar").value = url_requested;
 
   if (!requestData) requestData = {}
   if (!("method" in requestData)) requestData["method"] = "GET";
 
   console.log(url_requested)
   console.log(requestData)
 
   const pyDict = handleRouteFn.tp$call([new Sk.builtin.str(url_requested), Sk.ffi.remapToPy(requestData)], {});
 
   var jsDict = Sk.ffi.remapToJs(pyDict)
   console.log(jsDict);
   var jsHtmlString = fixURL(jsDict["html"])
  // jsHtmlString = fixForms(jsHtmlString)
  //  if ("template_params" in jsDict) {
  //    jsHtmlString = jinja.compile(jsHtmlString, {}).render(jsDict["template_params"]).toString()
  //  }
   console.log("Rendered HTML: " + jsHtmlString);
 
   const tag_id = document.getElementById("embedded_browser");
   setSrcDoc(Sk.ffi.remapToJs(jsHtmlString))
   return jsHtmlString;
 }

  function fixURL(jsHtmlString: string){
    var el = document.createElement("html");
    el.innerHTML = jsHtmlString;
    
    const allLinkTags = el.getElementsByTagName("a");
    for (let i = 0; i < allLinkTags.length; i++) {
      let hrefValue = allLinkTags[i].getAttribute("href");
      allLinkTags[i].setAttribute("href", "javascript:void(0)");

      const newAction = "renderPage2('" + hrefValue + "')"; 
      allLinkTags[i].setAttribute("onclick", newAction);

    //   allLinkTags[i].addEventListener('click', function(){
    //     if (hrefValue == null) return;
    //     renderPageHelper(hrefValue);
    //     console.log(renderPageHelper(hrefValue))
    //  });
    }
    return el.innerHTML;
  }

//   var formIdToMethod: { [id: string] : string; } = {};

//   function fixForms(jsHtmlString: any){
//     var el = document.createElement("html");
//     el.innerHTML = jsHtmlString;
  
//     var all_forms = el.getElementsByTagName("form");
//     function handleForm(event: any) { 
//       event.preventDefault();
//     }
  
//     var idCounter = 8634;   // A very random counter for forms with no IDs.
//     for (var i = 0; i < all_forms.length; i++) {
//       if (all_forms[i].id == "codeForm") continue
//       if (all_forms[i].id == "") {
//         all_forms[i].id = String(idCounter);
//         all_forms[i].setAttribute("id", all_forms[i].id);
//         idCounter++;
//       }
  
//       var formMethod = all_forms[i].getAttribute("method")
//       if (formMethod == null || formMethod == "") formMethod = "GET"
//       formIdToMethod[all_forms[i].id] = formMethod;
//       all_forms[i].removeAttribute("method")
  
//       all_forms[i].addEventListener('submit', handleForm);
  
//       let route = all_forms[i].getAttribute("action")
//       const newAction = "onFormSubmit('" + all_forms[i].id + "', '" + route + "')"; 
//       all_forms[i].setAttribute("onclick", newAction);
//       all_forms[i].setAttribute("action", "#");
//     }
  
//     return el.innerHTML;
//   }
  
  // function onFormSubmit(formID: string, url_requested: string) {
  //   var formData = {}

  //   let inputs = document.getElementById(formID);
  //   if (inputs == null) {
  //     return
  //   }
  //   for (var i = inputs.length - 1; i >= 0; i--) {
  //     if (inputs[i].type == "submit")
  //       continue;
  //     formData[inputs[i].name] = inputs[i].value;
  //   }
  //   let formMethod = formIdToMethod[formID];
  //   if (!formMethod){
  //     formMethod = "GET";
  //   }
  
  //   let requestData = {
  //     "method": formMethod,
  //     "data": formData,
  //   }
  
  //   renderPage(url_requested, requestData)
  // }

  function renderPageHelper(url: string) {
    var jsHtmlString = renderPage(url, null);
    jsHtmlString = "<script type='text/javascript' src='flask-ide.js'></script> " + jsHtmlString
    console.log("asdasdas:" + jsHtmlString)
    sd(Sk.ffi.remapToJs(jsHtmlString));
  }

  // function injectJS() {
  //   let id: any;
  //   id = "sandbox-preview";
  //   var iFrameHead = window.frames[id].document.getElementsByTagName("head")[0];         
  //   var myscript = document.createElement('script');
  //   myscript.type = 'text/javascript';
  //   myscript.src = 'myscript.js'; // replace this with your SCRIPT
  //   iFrameHead.appendChild(myscript);
  // }

  return (
    <div id="pytch-stage-container">
      {/* <TextInput
        style={buttonStyles.input}
        onChangeText={onChangeText}
        value={text}
      /> */}
      <div id="stage-url-bar" >
        <input 
          type="text" 
          id="url-bar" 
          style={urlStyle}
        />
        <button 
          //type="button" 
          id="url-bar-button" 
          onClick={() => renderPageHelper("/")}
        > 
            &gt; 
        </button> 
      </div>

      <div style={embeddedBrowserStyle} className={resizeClass}>
          <div 
            dangerouslySetInnerHTML={{__html: srcDoc}} 
          />
        </div>

      {/* <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-forms allow-same-origin allow-scripts"
          width={displaySize.width}
          height={displaySize.height}
          id="sandbox-preview" 
          style={embeddedBrowserStyle}
          onLoad={injectJS}
        /> */}
      <div id="pytch-stage-layers">
        <div
          id="stage-resize-indicator"
          style={sizeStyle}
        />
      </div>
      {/* <Helmet>
        <script src = "flask-ide.js" type = "text/javascript" />
        //{renderPage}
      </Helmet> */}
    </div>
  );
};

export default Stage;
