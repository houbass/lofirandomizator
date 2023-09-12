import { useState, useEffect } from "react";
import MidiExport from "./MidiExport";
import Voicing from "./Voicing";

export default function Osc({ oscType, notesDelay, scaleNotes, bpm }) {
  const { voicing } = Voicing();
  const [exportNotes, setExportNotes] = useState([]);
  const [allExportNotes, setAllExportNotes] = useState([]);

  const [firstProgression, setFirstProgression] = useState(0);
  const [secondProgression, setSecondProgression] = useState(0);
  const [thirdProgression, setThirdProgression] = useState(0);
  const [fourthProgression, setFourthProgression] = useState(0);
  
  const [chordDuration, setChordDuration] = useState(2);


  //GET PROGRESSION NOTES
  function getProgressionNotes(fp, sp, tp, frp) {
    const progression = [fp, sp, tp, frp];
    
    const first = []
    let all = [];
    for(let l=0; l < 4; l++){
      let some = [];
      const step = Number(progression[l])
    
      for(let i=0; i < 4; i++){
        const noteIndex = (i * 2) + step;
        some.push(scaleNotes[noteIndex])
      }
      all.push(some)
  }

    return all
  }

  //GET CHORD NOTES
  function getChordNotes(step) {

    let chordNotes = [];
    for(let i=0; i < 4; i++){
      const noteIndex = (i * 2) + step;
      chordNotes.push(scaleNotes[noteIndex])
    }
    return chordNotes
  }


  //PLAY OSCILATOR
  function startOsc(tempo, currentChordNotes) {
    const velocity = [0.1, 0.3, 0.3, 0.3];
    const oneBeat = 60 / tempo * chordDuration;
  
      for (let i = 0; i < 4; i++) {
        const timeout = setTimeout(() => {
          
          const audioContext = new AudioContext();
          const o = audioContext.createOscillator();
          const g = audioContext.createGain();
          o.type = oscType;
          o.frequency.value = Number(currentChordNotes[i].freq);
          o.connect(g);
          g.connect(audioContext.destination);

          g.gain.value = 0.05;
          g.gain.linearRampToValueAtTime(0.05, oneBeat / 2);
          g.gain.linearRampToValueAtTime(0, oneBeat);
        
          o.start(0);
          o.stop(oneBeat);   

      }, i * notesDelay)
      }
  }


  //PLAY CHORD PROGRESSION AND GENERATE NOTES
  function playProgression(fp, sp, tp, frp) {
    const notes = getProgressionNotes(fp, sp, tp, frp);
    setAllExportNotes(notes);

    console.log(getChordNotes(0));

    for(let i=0; i < 4; i++){
      const currentChordNotes = notes[i];

      setTimeout(() => {
          startOsc(bpm, currentChordNotes);
      }, (chordDuration * 1000 * i * (60/bpm)));
    } 
  }

  //RANDOM PROGRESSION
  function randomProgressionFun() {
    const thisProgression = [];

    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.round(Math.random() * 6) + 1;
      thisProgression.push(randomNumber);
    }

    setFirstProgression(thisProgression[0]);
    setSecondProgression(thisProgression[1]);
    setThirdProgression(thisProgression[2]);
    setFourthProgression(thisProgression[3]);
  }

  function playOneChord(step) {
    const thisCHord = getChordNotes(step)

    console.log(thisCHord);

    startOsc(bpm, thisCHord)
  }

  return (
    <div>
      <p>chords</p>
      <button onClick={() => playOneChord(0)}>I</button>
      <button onClick={() => playOneChord(1)}>II</button>
      <button onClick={() => playOneChord(2)}>III</button>
      <button onClick={() => playOneChord(3)}>IV</button>
      <button onClick={() => playOneChord(4)}>V</button>
      <button onClick={() => playOneChord(5)}>VI</button>
      <button onClick={() => playOneChord(6)}>VII</button>

      <br/> 
      <button onClick={randomProgressionFun}>RANDOM PROGRESSION</button>

      <div style={{ background: "orange", display: "flex", flexDirection: "column" }}>
        <p>progression</p>
        <div style={{ background: "orange", display: "flex", flexDirection: "row" }}>
        <p>progression</p>

<div 
style={{
    background: "orange",
    display: "flex",
    flexDirection: "row"
}}>
    <select value={firstProgression} onChange={(e) => {setFirstProgression(Number(e.target.value))}}>
        <option value={0}>I</option>
        <option value={1}>II</option>
        <option value={2}>III</option>
        <option value={3}>IV</option>
        <option value={4}>V</option>
        <option value={5}>VI</option>
        <option value={6}>VII</option>
    </select>
    <select value={secondProgression} onChange={(e) => {setSecondProgression(Number(e.target.value))}}>
        <option value={0}>I</option>
        <option value={1}>II</option>
        <option value={2}>III</option>
        <option value={3}>IV</option>
        <option value={4}>V</option>
        <option value={5}>VI</option>
        <option value={6}>VII</option>
    </select>
    <select value={thirdProgression} onChange={(e) => {setThirdProgression(Number(e.target.value))}}>
        <option value={0}>I</option>
        <option value={1}>II</option>
        <option value={2}>III</option>
        <option value={3}>IV</option>
        <option value={4}>V</option>
        <option value={5}>VI</option>
        <option value={6}>VII</option>
    </select>
    <select value={fourthProgression} onChange={(e) => {setFourthProgression(Number(e.target.value))}}>
        <option value={0}>I</option>
        <option value={1}>II</option>
        <option value={2}>III</option>
        <option value={3}>IV</option>
        <option value={4}>V</option>
        <option value={5}>VI</option>
        <option value={6}>VII</option>
    </select>
</div>
        </div>


        <div style={{ background: "orange", display: "flex", flexDirection: "row" }}>
          <select value={chordDuration} onChange={(e) => setChordDuration(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
          <label>chord duration</label>
        </div>
        <button onClick={() => playProgression(firstProgression, secondProgression, thirdProgression, fourthProgression)}>play</button>
      </div>
      <MidiExport exportNotes={allExportNotes} chordDuration={chordDuration} />
    </div>
  );
}
