import React from "react";
import { Link } from "./LinkWithinApp";
import Button from "react-bootstrap/Button";
import { useStoreActions, useStoreState } from "../store";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const focusStage = () => {
  document.getElementById("pytch-speech-bubbles")?.focus();
};

const StaticTooltip: React.FC<{ visible: boolean }> = ({
  children,
  visible,
}) => {
  const visibilityClass = visible ? "shown" : "hidden";

  return (
    <div className={`pytch-static-tooltip ${visibilityClass}`}>
      <div className="spacer" />
      <div className="content">
        <FontAwesomeIcon className="fa-2x" icon="info-circle" />
        <div className="inner-content">{children}</div>
      </div>
    </div>
  );
};

const GreenFlag = () => {
  const buttonTourProgressStage = useStoreState(
    (state) => state.ideLayout.buttonTourProgressStage
  );
  const build = useStoreActions((actions) => actions.activeProject.build);
  
  const clickURLbutton = () => {
    let urlButton = document.getElementById('url-bar-button')
    if (urlButton != null) urlButton.click();
  }

  const handleClick = () => {
    build("running-project").then(clickURLbutton);
    console.log("green button")

    // console.log("0: " + (new Date()).toISOString() + ' ::')
    // console.log("1: " + (new Date()).toISOString() + ' ::')
    // setTimeout(() => { 
    //   if (urlButton != null) urlButton.click(); },
    //    2000
    //   );
    //flaskIDE.renderPageHelper("/");
    // console.log("2: " + (new Date()).toISOString() + ' ::')
  }

  const tooltipIsVisible = buttonTourProgressStage === "green-flag";

  return (
    <div className="tooltipped-elt">
      <div
        className="StageControlPseudoButton GreenFlag"
        onClick={handleClick}
      />
      <StaticTooltip visible={tooltipIsVisible}>
        <p>Click the green flag to run the project</p>
      </StaticTooltip>
    </div>
  );
};

// const RedStop = () => {
//   const redStop = () => {
//     Sk.pytch.current_live_project.on_red_stop_clicked();
//     focusStage();
//   };
//   return <div className="StageControlPseudoButton RedStop" onClick={redStop} />;
// };

const StageControls = () => {
  const { codeStateVsStorage } = useStoreState((state) => state.activeProject);
  const { requestSyncToStorage } = useStoreActions(
    (actions) => actions.activeProject
  );
  const handleSave = () => requestSyncToStorage();

  const launchScreenshot = useStoreActions(
    (actions) => actions.userConfirmations.displayScreenshotInteraction.launch
  );
  const onScreenshot = () => launchScreenshot();

  const launchDownloadZipfile = useStoreActions(
    (actions) => actions.userConfirmations.downloadZipfileInteraction.launch
  );
  const onDownload = () => launchDownloadZipfile();

  const initiateButtonTour = useStoreActions(
    (actions) => actions.ideLayout.initiateButtonTour
  );
  const onShowTooltips = () => initiateButtonTour();

  return (
    <div className="StageControls">
      <GreenFlag />
      {/* <RedStop /> */}
      <Button
        className={`save-button ${codeStateVsStorage}`}
        onClick={handleSave}
      >
        <span>Save</span>
      </Button>
      <Link to="/my-projects/">
        <Button>MyStuff</Button>
      </Link>
      <DropdownButton alignRight title="⋮">
        <Dropdown.Item onClick={onScreenshot}>Screenshot</Dropdown.Item>
        <Dropdown.Item onClick={onDownload}>Download as zipfile</Dropdown.Item>
        <Dropdown.Item onClick={onShowTooltips}>Show tooltips</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default StageControls;
