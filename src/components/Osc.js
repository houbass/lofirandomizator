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

  console.log(allExportNotes)

  function startOsc(step, tempo) {
    const playedNotes = [];
    const velocity = [0.3, 0.5, 0.5, 0.5];
    
    const oneBeat = 60 / tempo * chordDuration;

      for (let i = 0; i < 4; i++) {
        setTimeout(() => {

        const noteIndex = (i * 2) + step;
        if (scaleNotes[noteIndex]) {
          
          const audioContext = new AudioContext();
          const o = audioContext.createOscillator();
          const g = audioContext.createGain();
          o.type = oscType;
          o.frequency.value = Number(scaleNotes[noteIndex].freq);
          o.connect(g);
          g.connect(audioContext.destination);

          g.gain.value = velocity[i];
          g.gain.exponentialRampToValueAtTime(0.5, oneBeat / 2);
          g.gain.linearRampToValueAtTime(0, oneBeat);
        
          o.start(0);
          o.stop(oneBeat);
  
          playedNotes.push(scaleNotes[noteIndex].name);
     
        }
      }, i * notesDelay)
      }

      setExportNotes(playedNotes);

  }

  function playProgression(fp, sp, tp, frp) {
    const progression = [fp, sp, tp, frp];
    setAllExportNotes([]);

    for(let i=0; i < 4; i++){
      setTimeout(() => {
          startOsc(progression[i], bpm);
      }, (chordDuration * 1000 * i * (60/bpm)));
    };

  }

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

  //COLLECT WHOLE PROGRESSION TO EXPORT TO MIDI
  useEffect(() => {
    setAllExportNotes([
      ...allExportNotes, exportNotes
    ])
    
  }, [exportNotes])
  

  return (
    <div>
      <p>chords</p>
      <button onClick={() => startOsc(0, bpm)}>I</button>
      <button onClick={() => startOsc(1, bpm)}>II</button>
      <button onClick={() => startOsc(2, bpm)}>III</button>
      <button onClick={() => startOsc(3, bpm)}>IV</button>
      <button onClick={() => startOsc(4, bpm)}>V</button>
      <button onClick={() => startOsc(5, bpm)}>VI</button>
      <button onClick={() => startOsc(6, bpm)}>VII</button>

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
