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
    <>
    <NavBanner />
    <div className="welcome-text">
      <div className="bridge-text-wrapper">
        <div className="bridge-text">
          <img
              src={withinApp("assets/flask-logo.png")}
              alt="Flask logo"
            />
          <div>
            <p>
              this is Flask from Scratch :)
            </p>
            <p>questions or comments? <br /> email us:
              <a href="mailto:deyk@tcd.ie">
                <code> deyk@tcd.ie</code>
              </a>
            </p>
          </div>
        </div>
      </div>

      <h2>Using Flask from Scratch </h2>

      <div className="way-of-using-pytch">
        <p className="button-wrapper">
          <Button
            variant="outline-primary"
            onClick={() => {
              navigate(withinApp("/tutorials/"));
            }}
          >
            Tutorials
          </Button>
        </p>
        <p>
          If you'd like to learn how to make the Flask web apps, check out the tutorials we have designed for you!
        </p>
      </div>

      <div className="way-of-using-pytch">
        <p className="button-wrapper">
          <Button
            variant="outline-primary"
            onClick={() => {
              navigate(withinApp("/my-projects/"));
            }}
          >
            My projects
          </Button>
        </p>
        <p>
          If you're already using Flask from Scratch on this device, you can continue
          working on one of your projects. Or, if you have a Flask from Scratch zipfile,
          you can upload it to continue working on your project.
        </p>
      </div>

      <h2>About Flask from Scratch</h2>

      <p>
        <b>Flask from Scratch</b> is intended to be used as part of an educational framework for beginners who are moving on from simple introductory programming environments and want to start building more practical web applications but want a low barrier to entry. 
      </p>

      <p>
        Flask from Scratch would enable students to quickly jump into the framework without requiring them to do any complex system setups. The service will also provide tutorials to teach the crucial concepts of Flask and web application development in general.
      </p>

      <div className="end-matter">
        <h3>Acknowledgements</h3>

        <p>
          
        </p>

        <h3>Contact</h3>

        <p>
          Please email us at{" "}
          <a href="mailto:deyk@tcd.ie">
            <code>deyk@tcd.ie</code>
          </a>{" "}
          with any feedback or questions.
        </p>
      </div>
    </div>
  </>
  );
};

export default Welcome;
