import { isEmpty, isArray } from "lodash";
import Link from "next/link";
import { postcss } from "postcss-flexbugs-fixes";
import React, { useState, useEffect, useRef } from "react";

const Hero = () => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className="container__hero">
        <div className="logo">
          <img src="/img/logo.png" alt="" />
        </div>
        <div className="hero__image"></div>
        <div className="description">
          <p>
            THE FIRST BOOK TO FOCUS SOLELY ON THE UNIVERSAL GENÈVE POLEROUTER. A
            <br />
            CELEBRATION OF ITS HISTORY, ITS DESIGN AND ITS DIVERSITY.
          </p>
          <div className="scroll__down">scroll down</div>
        </div>
      </div>
      <div className="container__prints">
        <h2 className="title">PRINTS</h2>
        <div
          className="print"
          style={{ backgroundImage: `url(img/img_home.png)` }}
        ></div>
        <div
          className="print2"
          style={{ backgroundImage: `url(img/img_home.png)` }}
        ></div>
      </div>
      <div className="container__journal">
        <div className="hero__post"></div>
        <div className="colum1">Column 1</div>
        <div className="colum2"> Column 2</div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
