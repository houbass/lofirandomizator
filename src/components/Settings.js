import React, { useEffect, useState } from "react";

//COMPONENTS
import Osc from "./Osc"
import Notes from "./Notes";

export default function Settings() {

    //ALL NOTES
    const {notes} = Notes();

    //TONALITY SETTINGS
    const majorScale = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
    const minorScale = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24];
    const [tonality, setTonality] = useState(0);
    const [scale, setScale] = useState(majorScale);
    const [scaleNotes, setScaleNotes] = useState([]);

    //OSC SETTINGS
    const [oscType, setOscType] = useState("sine");
    const [notesDelay, setNotesDelay] = useState(200);


    //SET ALL SCALE NOTES
    function setScaleNotesFun() {
        const settingScaleNotes = []
        for(let i = 0; i < scale.length; i++) {
            settingScaleNotes.push(notes[tonality + scale[i]])
        }
        setScaleNotes(settingScaleNotes);        
    }

    //SET TONALITY
    function setTonalityFun(e) {
        setTonality(Number(e.target.value));
        console.log(notes[e.target.value].name)
    }

    //SET SCALE
    function setScaleFun(e) {
        switch(e.target.value) {
            case "minor":
                setScale(minorScale);
                break;
            case "major":
                setScale(majorScale);
                break;
        }
    }

    useEffect(() => {
        setScaleNotesFun()
    }, [scale, tonality])

    return(
        <>
        <div>
            <p>tonality settings</p>
            <select onChange={setTonalityFun}>
                <option value="0">D#</option>
                <option value="1">E</option>
                <option value="2">F</option>
                <option value="3">F#</option>
                <option value="4">G</option>
                <option value="5">G#</option>
                <option value="6">A</option>
                <option value="7">A#</option>
                <option value="8">B</option>
                <option value="9">C</option>
                <option value="10">C#</option>
                <option value="11">D</option>
            </select>
            <select onChange={setScaleFun}>
                <option value="major">major</option>
                <option value="minor">minor</option>
            </select>

            <p>osc settings</p>
            <select onChange={(e)=>{setOscType(e.target.value)}}>
                <option value="sine">sine</option>
                <option value="square">square</option>
                <option value="triangle">triangle</option>
                <option value="sawtooth">sawtooth</option>
            </select>
            <input value={notesDelay} onChange={(e) => {setNotesDelay(e.target.value)}} type="range" min="50" max="500" step="50"></input>

            <Osc scaleNotes={scaleNotes} oscType={oscType} notesDelay={notesDelay}/>

        </div>
        </>
    )
}