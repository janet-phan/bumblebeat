import React from "react";

const Home = () => {
  return (
    <main className="index-main">
      <div className="row">
        <div className="column1">
          <div className="currently-playing"></div>
          <div className="progress">
            <div className="barOverflow">
              <div className="bar"></div>
            </div>
          </div>
          <div className="time">
            <span className="elapsed-time">2:24</span> /
            <span className="track-time">3:10</span>
          </div>
        </div>
        <div className="column2">
          <div className="current-artist">
            <h1>
              Wendy Wu<i className="fa-solid fa-user-plus"></i>
            </h1>
          </div>
          <div className="current-title">
            <h2>Next to You</h2>
          </div>
          <div className="playing-song-title">
            Elevator
            <i className="fa-regular fa-heart"></i>
            <i className="fa-solid fa-download"></i>
          </div>
          <div className="soundwave"></div>
        </div>
      </div>
      <div className="playback-row">
        <div className="volume-settings">
          <div className="volume-down">
            <i className="fa-solid fa-volume-xmark"></i>&nbsp;&nbsp;&nbsp;
          </div>

          <div className="volume-bar">
            <div className="volume-level"></div>
          </div>

          <div className="volume-control">
            <input type="range" min="0" max="100" value="50" step="1" />
          </div>
          <div className="volume-up">
            &nbsp;&nbsp;&nbsp;<i className="fa-solid fa-volume-high"></i>
          </div>
        </div>
        <div className="playback-settings">
          <i className="fa-solid fa-backward-step"></i>
          <span id="gold">
            <i className="fa-solid fa-circle-play"></i>
          </span>
          &nbsp;
          <i className="fa-solid fa-forward-step"></i>
        </div>

        <div className="track-setting">
          <i className="fa-solid fa-share-nodes"></i>
          <i className="fa-solid fa-repeat"></i>
          <i className="fa-solid fa-shuffle"></i>
          <i className="fa-solid fa-circle-plus"></i>
        </div>
      </div>
    </main>
  );
};

export default Home;
