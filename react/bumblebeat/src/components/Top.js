import React from "react";

const Top = () => {
  return (
    <main className="top-charts">
      <h1>Top Charts</h1>
      <div className="hex-row">
        <div className="top-hex-column">
          <div className="hexagon1"></div>
          <div className="topartist1">Top Artist 1</div>
          <div className="topartist1-song">Top Artist song</div>
        </div>
        <div className="top-hex-column">
          <div className="hexagon2"></div>
          <div className="topartist2">Top Artist 1</div>
          <div className="topartist2-song">Top Artist song</div>
        </div>
        <div className="top-hex-column">
          <div className="hexagon3"></div>
          <div className="topartist3">Top Artist 1</div>
          <div className="topartist3-song">Top Artist song</div>
        </div>
        <div className="top-hex-column">
          <div className="hexagon4"></div>
          <div className="topartist4">Top Artist 1</div>
          <div className="topartist4-song">Top Artist song</div>
        </div>
      </div>

      <div className="hex-row">
        <div className="column">
          <h2>Top Artists</h2>
          <ol>
            <li>Wendy Wu</li>
            <li>Taylor Swift</li>
            <li>Palworld</li>
            <li>Lightning</li>
            <li>Among Us</li>
            <li>Fort Nite</li>
          </ol>
        </div>
        <div className="column">
          <h2>Top Songs</h2>
          <ol>
            <li>Elevator - Wendy Wu</li>
            <li>Malibu - Miley Cyrus</li>
            <li>Fly With Me - Jonas Brothers</li>
            <li>
              <a href="music/artists/taylor-swift/albums/speak-now.html#long-live">
                Long Live
              </a>{" "}
              - <a href="music/artists/taylor-swift/">Taylor Swift</a>
            </li>
            <li>Coming Clean - Hilary Duff</li>
            <li>Bbibbi - IU</li>
          </ol>
        </div>
        <div className="column">
          <h2>Top Albums</h2>
          <ol>
            <li>
              1989(Taylor's Version) -{" "}
              <a href="music/artists/taylor-swift/"></a>Taylor Swift
            </li>
            <li>Jonas Brothers - Jonas Brothers</li>
            <li>Speak Now - Taylor Swift</li>
            <li>Ocean Eyes - Owl City</li>
            <li>For You - Selena Gomez</li>
            <li>LILAC - IU</li>
          </ol>
        </div>
      </div>

      <div className="hex-row">
        <div className="row">
          <div className="column">
            <h3>Currently Playing</h3>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="artist">Wendy Wu"</div>
            <div className="title">Next to You</div>
          </div>
          <div className="column">
            <div className="song-title">
              Elevator
              <i className="fa-regular fa-heart"></i>
              <i className="fa-solid fa-download"></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="now-playing-song"></div>
          <div className="soundwave">
            <img src="..//images/yellow-soundwave.gif" />
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
      </div>
    </main>
  );
};

export default Top;
