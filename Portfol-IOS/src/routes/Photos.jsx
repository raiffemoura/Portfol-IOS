import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import "../styles/photos.css";
import iconConfig from "../components/iconConfig";
import { useTranslation } from "react-i18next";

export default function Photos() {
  const [selected, setSelected] = useState("albums");
  const [expanded, setExpanded] = useState(null);

  const { t } = useTranslation();
  const changeSelected = (value) => {
    setSelected(value);
  };

  const photos = [
    iconConfig.photoMongo,
    iconConfig.photoJS,
    iconConfig.photoNode,
    iconConfig.photoPS,
    iconConfig.photoHTML,
    iconConfig.photoJS2,
    iconConfig.photoHTML2,
    iconConfig.photoCSS,
    iconConfig.photoReact,
  ];

  const expand = (value) => {
    if (expanded === value) {
      // Fecha a imagem se já estiver expandida
      setExpanded(null);
    } else {
      setExpanded(value); // Abre a imagem clicada
    }
  };
  return (
    <div className="container-calculator">
      <div className="screen">
        <Header />
        <div className="photos-container">
          <div className="photos-header">
            <div className="photos-header-flex">
              <Link>
                <img src={iconConfig.arrowBack} alt="" />
              </Link>
              <h3>{t("photos")}</h3>
            </div>
            <div className="photos-header-flex">
              <div className="photos-header-select">{t("select")}</div>
              <div className="photos-more">...</div>
            </div>
          </div>
          <div className="photos-box">
            {photos.map((photo) => (
              <div className="photos" onClick={() => expand(photo)} key={photo}>
                {expanded === photo && (
                  <div
                    className={`photos-expanded-container ${
                      expanded ? "show" : ""
                    }`}
                  >
                    <img src={photo} alt="photo" className="photos-expanded" />
                  </div>
                )}
                <img
                  src={photo}
                  alt="photo"
                  className={
                    expanded === photo
                      ? "photos-expanded"
                      : "photos-not-expanded"
                  }
                />
              </div>
            ))}
            <div className="photos-footer">
              <div
                className="photos-footer-icons"
                onClick={() => changeSelected("library")}
              >
                {selected === "library" ? (
                  <img src={iconConfig.photosLibraryBlue} alt="library" />
                ) : (
                  <img src={iconConfig.photosLibrary} alt="library" />
                )}
                <p
                  className={
                    selected === "library" ? "photos-text-selected" : null
                  }
                >
                  {t("library")}
                </p>
              </div>
              <div
                className="photos-footer-icons"
                onClick={() => changeSelected("foryou")}
              >
                {selected === "foryou" ? (
                  <img src={iconConfig.photosForyouBlue} alt="foryou" />
                ) : (
                  <img src={iconConfig.photosForyou} alt="foryou" />
                )}
                <p
                  className={
                    selected === "foryou" ? "photos-text-selected" : null
                  }
                >
                  {t("foryou")}
                </p>
              </div>
              <div
                className="photos-footer-icons"
                onClick={() => changeSelected("albums")}
              >
                {selected === "albums" ? (
                  <img src={iconConfig.photosAlbumsBlue} alt="albums" />
                ) : (
                  <img src={iconConfig.photosAlbums} alt="albums" />
                )}
                <p
                  className={
                    selected === "albums" ? "photos-text-selected" : null
                  }
                >
                  {t("albums")}
                </p>
              </div>
              <div
                className="photos-footer-icons"
                onClick={() => changeSelected("search")}
              >
                {selected === "search" ? (
                  <img src={iconConfig.magnifierBlue} alt="search" />
                ) : (
                  <img src={iconConfig.magnifier} alt="search" />
                )}
                <p
                  className={
                    selected === "search" ? "photos-text-selected" : null
                  }
                >
                  {t("search")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="photos-home-button-adjust">
          <HomeButton />
        </div>
      </div>
    </div>
  );
}
