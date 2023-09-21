import React, { useEffect, useState } from "react";

//components
import Osc from "./Osc";
import Notes from "./Notes";

export default function Settings({ tonality, scale, bpm, loopStatus, metronomeStatus, drumStatus, tempoClicked }) {
  const { notes } = Notes();

  const [scaleNotes, setScaleNotes] = useState([
    {name: 'D#3', freq: 155.6},
    {name: 'F3', freq: 174.6},
    {name: 'G3', freq: 196},
    {name: 'G#3', freq: 207.7},
    {name: 'A#3', freq: 233.1},
    {name: 'C4', freq: 261.6},
    {name: 'D4', freq: 293.7},
    {name: 'D#4', freq: 311.1},
    {name: 'F4', freq: 349.2},
    {name: 'G4', freq: 392},
    {name: 'G#4', freq: 415.3},
    {name: 'A#4', freq: 466.2},
    {name: 'C5', freq: 523.3},
    {name: 'D5', freq: 587.3},
    {name: 'D#5', freq: 622.3}]);

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
    <div className="settings">
      
      <Osc scaleNotes={scaleNotes} bpm={bpm} scale={scale} loopStatus={loopStatus} metronomeStatus={metronomeStatus} drumStatus={drumStatus} tempoClicked={tempoClicked}/>

    </div>
  );
}