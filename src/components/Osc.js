import { useState, useEffect } from "react";


//COMPONENTS
import MidiExport from "./MidiExport";
import Voicing from "./Voicing";
import Rhythm from "./Rhythm";

export default function Osc({ oscType, scaleNotes, bpm, scale }) {
  const { voicing } = Voicing();
  const { rhythm } = Rhythm ();

  const [firstProgression, setFirstProgression] = useState(0);
  const [secondProgression, setSecondProgression] = useState(0);
  const [thirdProgression, setThirdProgression] = useState(0);
  const [fourthProgression, setFourthProgression] = useState(0);

  const [choosedVoicing1, setChoosedVoicing1] = useState(0);
  const [choosedVoicing2, setChoosedVoicing2] = useState(1);
  const [choosedVoicing3, setChoosedVoicing3] = useState(2);
  const [choosedVoicing4, setChoosedVoicing4] = useState(0);

  const [chordname1, setChordname1] = useState("Cmajor");
  const [chordname2, setChordname2] = useState("Cmajor");
  const [chordname3, setChordname3] = useState("Cmajor");
  const [chordname4, setChordname4] = useState("Cmajor");
  
  const filtered1 = voicing.filter((item) => item.name === chordname1);
  const filtered2 = voicing.filter((item) => item.name === chordname2);
  const filtered3 = voicing.filter((item) => item.name === chordname3);
  const filtered4 = voicing.filter((item) => item.name === chordname4);

  
  const [chordRate, setchordRate] = useState(2);

  const [rhythmStyle, setRhythmStyle] = useState(0);
  const [newRyhtmProgression, setNewRyhtmProgression] = useState();


  //RANDOM PROGRESSION AND VOICING
  function randomProgressionFun() {
    const thisProgression = [];
    const thisVoicing = []

    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.round(Math.random() * 6);
      thisProgression.push(randomNumber);

      const randomNumber2 = Math.round(Math.random() * 2);
      thisVoicing.push(randomNumber2);
    }
  
    //set random progression
    setFirstProgression(thisProgression[0]);
    setSecondProgression(thisProgression[1]);
    setThirdProgression(thisProgression[2]);
    setFourthProgression(thisProgression[3]);

    //set random voicing
    setChoosedVoicing1(thisVoicing[0]);
    setChoosedVoicing2(thisVoicing[1]);
    setChoosedVoicing3(thisVoicing[2]);
    setChoosedVoicing4(thisVoicing[3]);
  }

  //COMBINE RHYTHM AND NOTES
  function createRhythmFun() {
    
    const firstChord = getChordNames(firstProgression);
    const secondChord = getChordNames(secondProgression);
    const thirdChord = getChordNames(thirdProgression);
    const fourthChord = getChordNames(fourthProgression);

    let firstArray = [];

    //awoid undefined
    if(firstChord && secondChord && thirdChord && fourthChord){
      setChordname1(firstChord.name);
      setChordname2(secondChord.name);
      setChordname3(thirdChord.name);
      setChordname4(fourthChord.name);
      
    
      const notes = [
      
        firstChord.voicing[choosedVoicing1],
        secondChord.voicing[choosedVoicing2],
        thirdChord.voicing[choosedVoicing3],
        fourthChord.voicing[choosedVoicing4],
      ]

      const style = rhythm[rhythmStyle];

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
    }
  }


  //RUN RYTHM PROGRESSION
function playRythm(tempo) {
    console.log("START")

    const audioContext = new AudioContext() || window.webkitAudioContext();

    startMetronome(tempo, audioContext);

    const beat = 60 / tempo;
    let counter = 0;
    const thisRhythm = newRyhtmProgression;

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
          startOsc(tempo, item, duration, audioContext);
      },  counter / chordRate );

      counter = counter + durationMs;
    })


    setTimeout(() => {
      console.log("STOP")
    }, counter / chordRate)

  }
  

  //METRONOME
  function startMetronome(tempo, audioContext) {

    const oneBeat = (1000 * 60 / tempo / 1) ;
    const click = 0.075

    for(let i=0; i < (16 / chordRate); i++){

      setTimeout(() => {
          //const audioContext = new AudioContext() || window.webkitAudioContext();
          const o = audioContext.createOscillator();
          const g = audioContext.createGain();
          o.type = "sine";
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
  function startOsc(tempo, currentChordNotes, duration, audioContext) {

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


  //VOICING FUNCTION
  //GET LETTER OF EACH CHORD IN PROGRESSION
  function getChordName(chordNumber){
    const chordLetter = scaleNotes[chordNumber].name.replace(/[˅1-9]/g, "");

    return chordLetter

  }


  //MAKE DECISSION WHICH CHORD IT IS
  function getChordNames(progression) {

  
    //get rid of numbers from scaleNotes name
    const thisChordLetter1 = getChordName(progression);

    
    let chordScale;

    if(scale === "major"){
      switch(progression) {
        case 0:
          chordScale = "major";
          break;
        case 1:
          chordScale = "minor";
          break;
        case 2:
          chordScale = "minor";
          break;
        case 3:
          chordScale = "major";
          break;
        case 4:
          chordScale = "major";
          break;
        case 5:
          chordScale = "minor";
          break;
        case 6:
          chordScale = "dim";
          break;
      }
    }else{
      switch(progression) {
        case 0:
          chordScale = "minor";
          break;
        case 1:
          chordScale = "dim";
          break;
        case 2:
          chordScale = "major";
          break;
        case 3:
          chordScale = "minor";
          break;
        case 4:
          chordScale = "major";
          break;
        case 5:
          chordScale = "major";
          break;
        case 6:
          chordScale = "major";
          break;
      }
    }

    const chordname1 = thisChordLetter1 + chordScale;
    const filteredNew = voicing.filter((item) => item.name === chordname1);

    return filteredNew[0]
  }

  //UPDATE PATTERN 
  useEffect(() => {
    createRhythmFun()
  }, [scaleNotes, firstProgression, secondProgression, thirdProgression, fourthProgression, choosedVoicing1, choosedVoicing2, choosedVoicing3, choosedVoicing4, chordRate, rhythmStyle])


  return (
    <div>

      <div
      style={{
        background: "lightblue",
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "row",
      }}>
        <div className="pad">
        </div>
        <div className="pad">
        </div>
        <div className="pad">
        </div>
        <div className="pad">
        </div>
      </div>
      <div style={{ background: "orange", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "grey", display: "flex", flexDirection: "column" }}>

          <div 
          style={{
              display: "flex",
              flexDirection: "row"
          }}>
            <p>progression</p>
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
          <div 
          style={{
              display: "flex",
              flexDirection: "row"
          }}>
            <p>voicing.......</p>


            <select value={choosedVoicing1} onChange={(e) => {setChoosedVoicing1(Number(e.target.value))}}>
              {filtered1[0].voicing.map((item, index) => {
                return(
                  <option key={index} value={index}>{index + 1}</option>
                )
              })}
            </select>

            <select value={choosedVoicing2} onChange={(e) => {setChoosedVoicing2(Number(e.target.value))}}>
              {filtered2[0].voicing.map((item, index) => {
                return(
                  <option key={index} value={index}>{index + 1}</option>
                )
              })}
            </select>

            <select value={choosedVoicing3} onChange={(e) => {setChoosedVoicing3(Number(e.target.value))}}>
              {filtered3[0].voicing.map((item, index) => {
                return(
                  <option key={index} value={index}>{index + 1}</option>
                )
              })}
            </select>

            <select value={choosedVoicing4} onChange={(e) => {setChoosedVoicing4(Number(e.target.value))}}>
              {filtered4[0].voicing.map((item, index) => {
                return(
                  <option key={index} value={index}>{index + 1}</option>
                )
              })}
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
        <button onClick={randomProgressionFun}>RANDOM PROGRESSION</button>
        <button onClick={() => {playRythm(bpm)}}>play</button>
      </div>
      <MidiExport exportNotes={newRyhtmProgression} chordRate={chordRate} />
    </div>
  );
}
