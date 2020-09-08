import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "../store";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AssetPresentation } from "../model/asset";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { SyncState } from "../model/project";
import Tutorial from "./Tutorial";
import ErrorReportList from "./ErrorReportList";

interface AssetImageThumbnailProps {
  image: HTMLImageElement;
}

const AssetImageThumbnail: React.FC<AssetImageThumbnailProps> = ({ image }) => {
  const maybeConstrainWidth =
    image.width >= image.height && image.width > 120 ? "120px" : undefined;
  const maybeConstrainHeight =
    image.height > image.width && image.height > 120 ? "120px" : undefined;
  return (
    <div className="asset-preview">
      <img
        src={image.src}
        alt=""
        width={maybeConstrainWidth}
        height={maybeConstrainHeight}
      />
    </div>
  );
};

interface AssetCardProps {
  asset: AssetPresentation;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const thumbnail =
    asset.presentation.kind === "image" ? (
      <AssetImageThumbnail image={asset.presentation.image} />
    ) : null;
  return (
    <Card className="AssetCard">
      <Card.Header>
        <code>{asset.name}</code>
        <DropdownButton title="⋮">
          <Dropdown.Item className="danger">
            DELETE (not yet working)
          </Dropdown.Item>
        </DropdownButton>
      </Card.Header>
      <Card.Body>{thumbnail}</Card.Body>
    </Card>
  );
};

const Assets = () => {
  const syncState = useStoreState((state) => state.activeProject.syncState);
  const assets = useStoreState((state) => state.activeProject.project?.assets);
  const showModal = useStoreActions((actions) => actions.modals.show);

  const showAddModal = () => {
    showModal("add-asset");
  };

  switch (syncState) {
    case SyncState.SyncNotStarted:
      return <div>Assets will load shortly....</div>;
    case SyncState.SyncingFromBackEnd:
      return <div>Assets loading....</div>;
    case SyncState.Error:
      return <div>Assets failed to load, oh no</div>;
    case SyncState.SyncingToBackEnd:
    case SyncState.Syncd:
      break; // Handle normal cases below.
  }

  // TODO: Some representation that the assets are syncing to storage?

  if (assets == null) {
    throw Error("no project even though LoadingState succeeded");
  }

  const intro =
    assets.length === 0 ? (
      <p className="placeholder">
        Your project does not yet have any images or sounds. Use the button
        below to add some.
      </p>
    ) : (
      <h1>Your project’s images and sounds</h1>
    );

  return (
    <div className="AssetCardPane">
      {intro}
      <div className="AssetCardList">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
      <div className="buttons">
        <Button onClick={showAddModal}>Add an image or sound</Button>
      </div>
    </div>
  );
};

const StandardOutput = () => {
  const text = useStoreState((state) => state.standardOutputPane.text);

  const inner =
    text === "" ? (
      <p className="placeholder">
        Anything your program prints will appear here.
      </p>
    ) : (
      <pre className="SkulptStdout">{text}</pre>
    );

  return <div className="StandardOutputPane">{inner}</div>;
};

const Errors = () => {
  const errorList = useStoreState((state) => state.errorReportList.errors);
  const inner =
    errorList.length === 0 ? (
      <p className="placeholder">
        Any errors your project encounters will appear here.
      </p>
    ) : (
      <ErrorReportList />
    );
  return <div className="ErrorsPane">{inner}</div>;
};

const InfoPanel = () => {
  const isSyncingFromBackEnd = useStoreState(
    (state) => state.activeProject.syncState === SyncState.SyncingFromBackEnd
  );
  const isTrackingTutorial = useStoreState(
    (state) => state.activeProject.project?.trackedTutorial != null
  );
  const activeKey = useStoreState((state) => state.infoPanel.activeTabKey);
  const setActiveKey = useStoreActions(
    (state) => state.infoPanel.setActiveTabKey
  );

  if (isSyncingFromBackEnd) {
    return null;
  }

  return (
    <Tabs
      className="InfoPanel"
      transition={false}
      activeKey={activeKey}
      onSelect={(k) => setActiveKey(k as string)}
    >
      {isTrackingTutorial && (
        <Tab className="InfoPane" eventKey="tutorial" title="Tutorial">
          <Tutorial />
        </Tab>
      )}
      <Tab className="InfoPane" eventKey="assets" title="Images and sounds">
        <Assets />
      </Tab>
      <Tab className="InfoPane" eventKey="output" title="Output">
        <StandardOutput />
      </Tab>
      <Tab className="InfoPane" eventKey="errors" title="Errors">
        <Errors />
      </Tab>
    </Tabs>
  );
};

export default InfoPanel;
