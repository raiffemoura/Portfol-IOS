import React, { useState } from "react";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import iconConfig from "../components/iconConfig";
import "../styles/camera.css";
const Camera = () => {
  const [cameraUp, setCameraUp] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [liveOn, setLiveOn] = useState(false);
  return (
    <div className="container-calculator">
      <div className="screen ">
        <Header />

        <div className="cameraApp-screen">
          <div className="cameraApp-header">
            <div className="cameraApp-flash">
              <img
                onClick={() => setFlashOn(!flashOn)}
                src={
                  flashOn ? iconConfig.cameraFlash : iconConfig.cameraFlashOff
                }
                alt="flash"
              />
              <img
                onClick={() => setNightMode(!nightMode)}
                src={
                  nightMode ? iconConfig.cameraNight : iconConfig.cameraNightOff
                }
                alt="night mode"
              />
              <img
                // style={{ height: "25px" }}
                src={iconConfig.cameraExp}
                alt="exposure"
              />
            </div>
            <div className="cameraApp-up-down">
              <img
                onClick={() => setCameraUp(!cameraUp)}
                src={cameraUp ? iconConfig.cameraUp : iconConfig.cameraDown}
                alt="Up/down"
              />
            </div>
            {liveOn ? (
              <div className="cameraApp-live">
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraRaw}
                  alt="live mode"
                />
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraFilter}
                  alt="live mode"
                />
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraLive}
                  alt="live mode"
                />
              </div>
            ) : (
              <div className="cameraApp-live">
                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraRawOff}
                  alt="live mode"
                />

                <img
                  onClick={() => setLiveOn(!liveOn)}
                  src={iconConfig.cameraLiveOff}
                  alt="live mode"
                />
              </div>
            )}
          </div>
          <div className="cameraApp-camera"></div>
          <div className="cameraApp-menu">
            <div className="cameraApp-menu-camera">camera/video/protrait</div>
            <div className="cameraApp-buttons">
              <div className="cameraApp-albuns">albuns</div>
              <div className="cameraApp-shot">shot</div>
              <div className="cameraApp-switch">
                <img src={iconConfig.switch} alt="switch" />
              </div>
            </div>
          </div>
        </div>

        <HomeButton />
      </div>
    </div>
  );
};

export default Camera;
