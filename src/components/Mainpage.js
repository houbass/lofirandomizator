

//pic
import { useState } from "react";
import backgroundPic from "./pic/background.webp";
import metronome from "./pic/metronome.svg";
import drums from "./pic/drums.svg";

//components
import Settings from "./Settings";
import Notes from "./Notes";


export default function Mainpage() {
    const { tonalities } = Notes();

    const [tonality, setTonality] = useState(0);
    const [scale, setScale] = useState("major"); // Store the scale type as a string
    const [bpm, setBpm] = useState(70);

    return(
        <>
        <div className="mainpage">

            <div>
                <img className="backgroundPic" width="100%" height="auto" src={backgroundPic}></img>
                <div 
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "30px",
                    //background: "orange",
                    width: "70px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <img style={{opacity: 0.5, cursor: "pointer"}} src={metronome} width={30}></img>
                    <img style={{opacity: 1, cursor: "pointer"}} src={drums} width={30}></img>
                </div>

                <div style={{
                    color: "white",
                    position: "absolute",
                    marginTop: "-80px",
                    //background: "rgba(0,0,0,0.5)",
                    backgroundImage: "linear-gradient(to bottom,rgba(22, 35, 51,0.1), rgba(22, 35, 51,1) )",
                    height: "80px",
                    width: "100%",
                    maxWidth: "1000px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none"
                }}>
                    <div 
                    style={{
                        width: "100%",
                        //background: "orange",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "0px 10px",
                        height: "100%",
                        border: "none",

                    }}>
                        <div className="firstSettingContainer2">
                            <p>tonality:</p>

                            <div className="firstSettingContainerRow">
                            <select className="selector" value={tonality} onChange={(e) => setTonality(Number(e.target.value))}>
                                {tonalities.map((tone, index) => (
                                <option key={index} value={index}>
                                    {tone}
                                </option>
                                ))}
                            </select>

                            <select className="selector" onChange={(e) => setScale(e.target.value)}>
                                <option value="major">major</option>
                                <option value="minor">minor</option>
                            </select>
                            </div>
                        </div>

                        <div className="firstSettingContainer">
                            <p>tempo: <strong>{bpm + "BPM"}</strong></p>
                            <input 
                                className="slider"
                                id="bpm"
                                value={bpm}
                                type="range"
                                min="50"
                                max="140"
                                step="1"
                                onChange={(e) => setBpm(Number(e.target.value))}
                            ></input>

                        </div>
                    </div>

                </div>

            </div>


            <Settings tonality={tonality} scale={scale} bpm={bpm}/>

        </div>
        </>
    )
}