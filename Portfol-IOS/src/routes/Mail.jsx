import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/mail.css";
import iconConfig from "../components/iconConfig";

function line() {
  return (
    <div className="mail-line-box">
      <div className="mail-line"></div>
    </div>
  );
}

export default function Mail() {
  return (
    <div className="container-calculator">
      <div className="screen ">
        <Header />
        <div className="mail-screen">
          {/* Mail Header */}

          <div className="mail-header">
            <Link to={"/"}>
              <div className="back"></div>
            </Link>
            <div className="mail-header-text">
              <Link>
                <p>Cancel</p>
              </Link>
            </div>
            <div className="mail-header-title">
              <h2>New Message</h2>
              <img src={iconConfig.send} alt="send" />
            </div>
          </div>
          <div>
            <div className="mail-to">
              <p>To:</p>
              <input type="text" value="raiffemoura93@icloud.com" />
              <img src={iconConfig.mailAdd} alt="add" />
            </div>
            {line()}
            <div className="mail-to">
              <p>From:</p>
              <input type="text" placeholder="Your email" />
            </div>
            {line()}
            <div className="mail-to">
              <p>Subject: </p>
              <input type="text" />
            </div>
            {line()}
            <textarea
              name="textarea"
              defaultValue="Sent from Portfol-IOS"
              required="required"
              style={{ resize: "none", width: "90%" }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
