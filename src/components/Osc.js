import { useState, useEffect } from "react";


//COMPONENTS
import MidiExport from "./MidiExport";
import Voicing from "./Voicing";
import Rhythm from "./Rhythm";



export default function Osc({ oscType, notesDelay, scaleNotes, bpm }) {
  const { voicing } = Voicing();
  const { rhythm } = Rhythm ();
  const [exportNotes, setExportNotes] = useState([]);
  const [allExportNotes, setAllExportNotes] = useState([]);

  const [firstProgression, setFirstProgression] = useState(1);
  const [secondProgression, setSecondProgression] = useState(2);
  const [thirdProgression, setThirdProgression] = useState(3);
  const [fourthProgression, setFourthProgression] = useState(2);
  
  const [chordRate, setchordRate] = useState(1);

  const [rhythmStyle, setRhythmStyle] = useState(1);
  const [newRyhtmProgression, setNewRyhtmProgression] = useState();

  const audioContext = new AudioContext() || window.webkitAudioContext();

  //RANDOM PROGRESSION
  function randomProgressionFun() {
    const thisProgression = [];

    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.round(Math.random() * 6);
      thisProgression.push(randomNumber);
    }

    setFirstProgression(thisProgression[0]);
    setSecondProgression(thisProgression[1]);
    setThirdProgression(thisProgression[2]);
    setFourthProgression(thisProgression[3]);
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


  //PLAY ONE CHORD
  function playOneChord(step) {
    const thisCHord = getChordNotes(step)

    startOsc(bpm, thisCHord, 2)
  }

  //COMBINE RHYTHM AND NOTES
  function createRhythmFun() {

    const notes = getProgressionNotes(firstProgression, secondProgression, thirdProgression, fourthProgression);
    const style = rhythm[rhythmStyle];
    let firstArray = [];

    notes.forEach((item, index1) => {
      style.duration.forEach((item2, index2) => {
        let secondArray = []
        item.forEach((item3, inex3) => {
          secondArray.push({name: item3.name, freq: item3.freq, duration: item2, wait: style.wait[index2] })
        })
        firstArray.push(secondArray);
      })  
    })
    setNewRyhtmProgression(firstArray);

    return firstArray;
  }



  //RUN RYTHM PROGRESSION
  function playRythm() {

    startMetronome();

    const beat = 60 /bpm;
    let counter = 0;
    const thisRhythm = createRhythmFun()

    thisRhythm.forEach((item, index) => {  
      const duration = item[0].duration;
      const durationMs = 4 * 1000 * beat / duration;
      const wait = item[0].wait;
      let waitMs;

      if(wait > 0){
        waitMs = 4 * 1000 * beat / wait;
      }else{
        waitMs = 0;
      }
      
      counter = counter + waitMs;
      setTimeout(() => {
          startOsc(bpm, item, duration);
      },  counter / chordRate );
      counter = counter + durationMs;
    })
  }


  //METRONOME
  function startMetronome() {

    const oneBeat = (1000 * 60 / bpm / 1) ;
    const click = 0.075

    for(let i=0; i < (16 / chordRate); i++){

      setTimeout(() => {
          //const audioContext = new AudioContext() || window.webkitAudioContext();
          const o = audioContext.createOscillator();
          const g = audioContext.createGain();
          o.type = oscType;
          o.frequency.value = 630;
          o.connect(g);
          g.connect(audioContext.destination);

          g.gain.value = 0.05;
          //g.gain.linearRampToValueAtTime(0.05, click / 4);
          g.gain.linearRampToValueAtTime(0,audioContext.currentTime + click);
        
          o.start(audioContext.currentTime);
          o.stop(audioContext.currentTime + click);  

        }, oneBeat * i)
    }
  }

  //PLAY OSCILATOR
  function startOsc(tempo, currentChordNotes, duration) {

    
    
    const velocity = [0.1, 0.3, 0.3, 0.3];
    const oneBeat = (4 * 60 / tempo / duration) / chordRate ;
  
    currentChordNotes.forEach((item, index) => {

      const o = audioContext.createOscillator();
      const g = audioContext.createGain();
      o.type = oscType;
      o.frequency.value = Number(item.freq);
      o.connect(g);
      g.connect(audioContext.destination);

      g.gain.value = 0.05;
      g.gain.linearRampToValueAtTime(0.05,audioContext.currentTime + oneBeat / 2);
      g.gain.linearRampToValueAtTime(0, audioContext.currentTime + oneBeat);
    
      o.start(audioContext.currentTime);
      o.stop( audioContext.currentTime + oneBeat);  
    })
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
              <option value="0">I</option>
                <option value="1">II</option>
                <option value="2">III</option>
                <option value="3">IV</option>
                <option value="4">V</option>
                <option value="5">VI</option>
                <option value="6">VII</option>
            </select>
            <select value={secondProgression} onChange={(e) => {setSecondProgression(Number(e.target.value))}}>
                <option value="0">I</option>
                <option value="1">II</option>
                <option value="2">III</option>
                <option value="3">IV</option>
                <option value="4">V</option>
                <option value="5">VI</option>
                <option value="6">VII</option>
            </select>
            <select value={thirdProgression} onChange={(e) => {setThirdProgression(Number(e.target.value))}}>
                <option value="0">I</option>
                <option value="1">II</option>
                <option value="2">III</option>
                <option value="3">IV</option>
                <option value="4">V</option>
                <option value="5">VI</option>
                <option value="6">VII</option>
            </select>
            <select value={fourthProgression} onChange={(e) => {setFourthProgression(Number(e.target.value))}}>
                <option value="0">I</option>
                <option value="1">II</option>
                <option value="2">III</option>
                <option value="3">IV</option>
                <option value="4">V</option>
                <option value="5">VI</option>
                <option value="6">VII</option>
            </select>
        </div>
        </div>

        <div style={{ background: "orange", display: "flex", flexDirection: "row" }}>
          <select value={chordRate} onChange={(e) => setchordRate(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
          <label>rate</label>

          <select value={rhythmStyle} onChange={(e) => {setRhythmStyle(Number(e.target.value))}}>
            <option value={0}>basic</option>
            <option value={1}>jazzy</option>
            <option value={2}>fancy</option>
          </select>
          <label>chord rhythm</label>

        </div>
        <button onClick={playRythm}>play</button>
      </div>
      <MidiExport exportNotes={newRyhtmProgression} chordRate={chordRate} />
    </div>
  );
}
