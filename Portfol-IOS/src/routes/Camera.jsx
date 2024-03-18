import React, { useState, useRef } from "react";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import iconConfig from "../components/iconConfig";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../styles/camera.css";
const Camera = () => {
  const [cameraUp, setCameraUp] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [liveOn, setLiveOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);

  const itemsRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [centerX, setCenterX] = useState("photo");
  const [moved, setMoved] = useState(false);
  const [shot, setShot] = useState(false);

  const { t } = useTranslation();

  // Funções de eventos de mouse
  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - itemsRef.current.offsetLeft);
    setScrollLeft(itemsRef.current.scrollLeft);
  };

  const handleMouseUp = (e) => {
    setIsMouseDown(false);

    if (!moved) {
      const targetDiv = e.target.getAttribute("data-div");
      if (targetDiv) {
        setCenterX(targetDiv);
      }
    }
    setMoved(false);
  };
  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    setCenterX(null);

    const x = e.pageX - itemsRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Ajuste da velocidade

    itemsRef.current.scrollLeft = scrollLeft - walk;

    // Se houve movimento, definimos moved como true
    setMoved(true);
  };
  return (
    <div className="container-calculator">
      <div className="screen ">
        <Header />
        <div className="cameraApp-icon"></div> {/* icon camera on  */}
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
            <div
              className="cameraApp-menu-camera"
              ref={itemsRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div
                data-div="time-lapse"
                className={
                  centerX === "time-lapse"
                    ? "cameraApp-centerX cameraApp-adjust-menu-start"
                    : "cameraApp-adjust-menu-start"
                }
              >
                TIME-LAPSE
              </div>
              <div
                data-div="slow-motion"
                className={centerX === "slow-motion" ? "cameraApp-centerX" : ""}
              >
                SLOW MOTION
              </div>
              <div
                data-div="cinematic"
                className={centerX === "cinematic" ? "cameraApp-centerX" : ""}
              >
                CINEMATIC
              </div>
              <div
                data-div="video"
                className={centerX === "video" ? "cameraApp-centerX" : ""}
              >
                VIDEO
              </div>
              <div
                data-div="photo"
                className={centerX === "photo" ? "cameraApp-centerX" : ""}
              >
                PHOTO
              </div>
              <div
                data-div="portrait"
                className={centerX === "portrait" ? "cameraApp-centerX" : ""}
              >
                PORTRAIT
              </div>
              <div
                data-div="pano"
                className={
                  centerX === "pano"
                    ? "cameraApp-centerX cameraApp-adjust-menu-end"
                    : "cameraApp-adjust-menu-end"
                }
              >
                PANO
              </div>
            </div>
            <div className="cameraApp-buttons">
              <Link to={"/Photos"}>
                <div className="cameraApp-albuns">
                  <img src={iconConfig.photoReact} alt="albuns" />
                </div>
              </Link>
              <div className="cameraApp-shot">
                <div className="cameraApp-shot-outside">
                  <div
                    onMouseDown={() => setShot(true)}
                    onMouseUp={() => setShot(false)}
                    className={
                      shot
                        ? "cameraApp-shot-inside cameraApp-shot-down"
                        : "cameraApp-shot-inside"
                    }
                  ></div>
                </div>
              </div>
              <div
                className="cameraApp-switch"
                onClick={() => setFrontCamera(!frontCamera)}
              >
                <img
                  src={
                    frontCamera ? iconConfig.cameraBack : iconConfig.cameraFront
                  }
                  alt="switch"
                />
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
