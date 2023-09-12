import React, { useEffect, useState } from "react";

//components
import Osc from "./Osc";
import Notes from "./Notes";

export default function Settings() {
  const { notes, tonalities } = Notes();
  const [bpm, setBpm] = useState(70);
  const [tonality, setTonality] = useState(0);
  const [scale, setScale] = useState("major"); // Store the scale type as a string
  const [scaleNotes, setScaleNotes] = useState([]);
  const [oscType, setOscType] = useState("sine");
  const [notesDelay, setNotesDelay] = useState(200);

  // Define major and minor scales as an object
  const scales = {
    major: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24],
    minor: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24],
  };

  // Set scale notes based on scale type and tonality
  
  useEffect(() => {
    const settingScaleNotes = [];
    const selectedScale = scales[scale]; // Get the selected scale from the scales object
    
    for (let i = 0; i < selectedScale.length; i++) {
      settingScaleNotes.push(notes[tonality + selectedScale[i]]);
    }
    setScaleNotes(settingScaleNotes);
  }, [scale, tonality]);


  

  return (
    <div>
      <p>tempo setting</p>
      <input
        id="bpm"
        value={bpm}
        type="range"
        min="50"
        max="140"
        step="1"
        onChange={(e) => setBpm(Number(e.target.value))}
      ></input>
      <label htmlFor="bpm">{bpm}BPM</label>

      <p>tonality setting</p>
      <select onChange={(e) => setTonality(Number(e.target.value))}>
        {tonalities.map((tone, index) => (
          <option key={index} value={index}>
            {tone}
          </option>
        ))}
      </select>

      <select onChange={(e) => setScale(e.target.value)}>
        <option value="major">major</option>
        <option value="minor">minor</option>
      </select>

      <p>osc setting</p>
      <select onChange={(e) => setOscType(e.target.value)}>
        <option value="sine">sine</option>
        <option value="square">square</option>
        <option value="triangle">triangle</option>
        <option value="sawtooth">sawtooth</option>
      </select>
      <input
        value={notesDelay}
        onChange={(e) => setNotesDelay(e.target.value)}
        type="range"
        min="0"
        max="500"
        step="10"
      ></input>

      <Osc scaleNotes={scaleNotes} oscType={oscType} notesDelay={notesDelay} bpm={bpm} />
    </div>
  );
}