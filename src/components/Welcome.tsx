import React from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import NavBanner from "./NavBanner";
import Button from "react-bootstrap/Button";
import TutorialMiniCard from "./TutorialMiniCard";
import { withinApp, withinSite } from "../utils";

const Welcome: React.FC<RouteComponentProps> = () => {
  // TODO: Replace the hard-coded list of tutorial mini-cards with something
  // driven by the pytch-tutorials repo.

  return (
    // The style on the Python logo <img> is to make it the same width
    // as the Scratch logo, otherwise the text block is off-centre.
    <>
      <NavBanner />
      <div className="welcome-text">
        <div >
          <div >
            <div>
              <p>
                this is Flask from Scratch :)
              </p>
              <p>questions or comments? email us:
                <a href="mailto:deyk@tcd.ie">
                  <code> deyk@tcd.ie</code>
                </a></p>
            </div>
          </div>
        </div>
        
        {/* <div>
          <h3>Contact</h3>

          <p>
            Please email us at{" "}
            <a href="mailto:deyk@tcd.ie">
              <code>deyk@tcd.ie</code>
            </a>{" "}
            with any feedback or questions.
          </p>
        </div> */}
      </div>
    </>
  );
};

export default Welcome;
