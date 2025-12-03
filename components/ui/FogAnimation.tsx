import React from "react";

export default function FogAnimation() {
    return (
        <div className="fogwrapper pointer-events-none z-50">
            <div id="foglayer_01" className="fog">
                <div className="image01"></div>
                <div className="image02"></div>
            </div>
            <div id="foglayer_02" className="fog">
                <div className="image01"></div>
                <div className="image02"></div>
            </div>
            <div id="foglayer_03" className="fog">
                <div className="image01"></div>
                <div className="image02"></div>
            </div>
        </div>
    );
}
