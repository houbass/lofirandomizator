import { useState, useEffect } from "react";

//pic
import playImg from "./pic/play.svg";
import stopImg from "./pic/stop.svg";
import randomImg from "./pic/random.svg";

//COMPONENTS
import MidiExport from "./MidiExport";
import Voicing from "./Voicing";
import Rhythm from "./Rhythm";

//audio
import kickAudio from "./audio/kick.mp3";
import snareAudio from "./audio/snare.mp3";
import hihatAudio from "./audio/hihat.mp3";


export default function Osc({ scaleNotes, bpm, scale, loopStatus, metronomeStatus, drumStatus, tempoClicked }) {
  const { voicing } = Voicing();
  const { rhythm } = Rhythm ();

  //PROGRESSION STATES
  const [firstProgression, setFirstProgression] = useState(0);
  const [secondProgression, setSecondProgression] = useState(0);
  const [thirdProgression, setThirdProgression] = useState(1);
  const [fourthProgression, setFourthProgression] = useState(2);

  //VOICING STATES
  const [choosedVoicing1, setChoosedVoicing1] = useState(0);
  const [choosedVoicing2, setChoosedVoicing2] = useState(1);
  const [choosedVoicing3, setChoosedVoicing3] = useState(1);
  const [choosedVoicing4, setChoosedVoicing4] = useState(1);

  //OSCILLATOR TYPE STATE
  const [oscType, setOscType] = useState("sine");

  //CHORD NAME STATES
  const [chordname1, setChordname1] = useState("Cmajor");
  const [chordname2, setChordname2] = useState("Cmajor");
  const [chordname3, setChordname3] = useState("Cmajor");
  const [chordname4, setChordname4] = useState("Cmajor");
  
  //FILTERING CHORDNAMES
  const filtered1 = voicing.filter((item) => item.name === chordname1);
  const filtered2 = voicing.filter((item) => item.name === chordname2);
  const filtered3 = voicing.filter((item) => item.name === chordname3);
  const filtered4 = voicing.filter((item) => item.name === chordname4);

  //CHORD STATES
  const [chordRate, setchordRate] = useState(2);
  const [rhythmStyle, setRhythmStyle] = useState(1);
  const [newRyhtmProgression, setNewRyhtmProgression] = useState();

  //DRUM STATES
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState([]);

  //TIMEOUTS AND INTERVALS STATES
  const [chordTimeouts, setChordTimeouts] = useState([]);
  const [metronomeTimeouts, setMetronomeTimeouts] = useState([]);
  const [drumTimeouts, setDrumTimeouts] = useState([]);
  const [allIntervals, setAllIntervals] = useState([]);

  //IS PLAYING STATES
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingTimeout, setIsPlayingTimeout] = useState([]);
  
  //PLAY/STOP BUTTON STATES
  const [playStopText, setPlayStopText] = useState(playImg);

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

    //avoid undefined
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

      return firstArray;
    }
  }


  //PLAYSTOP
  function playStop(tempo, rythm) {

    if(isPlaying === false){
      play(tempo, rythm)
    }else{
      stopAll();
    }
  }


  //MAIN PLAY
  function play(tempo, rythm) {

    const oneBeat = (1000 * 60 / tempo / 1) ;

    //IF LOOP ON/OFF
    if(loopStatus === true){
    playRythm(tempo, rythm);

    const thisInterval = setInterval(() => {
      playRythm(tempo, rythm);
    }, oneBeat * 16 / chordRate)

    setAllIntervals([thisInterval]);
    }else{
      playRythm(tempo, rythm);
    }
  }

  //RUN RYTHM PROGRESSION
  function playRythm(tempo, rythm) {
    setIsPlaying(true);

    startMetronome(tempo, audioContext);
    startDrums(tempo, audioContext);

    const beat = 60 / tempo;
    let counter = 0;
    const thisRhythm = rythm;
    const thisFunctionTimeouts = []

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

      const thisTimeout = setTimeout(() => {
          startOsc(tempo, item, duration, audioContext);
      },  counter / chordRate );


      thisFunctionTimeouts.push(thisTimeout);

      counter = counter + durationMs;
    })

    setChordTimeouts(thisFunctionTimeouts)


    if(loopStatus === false){

      const thisIsPlayingTimeout = setTimeout(() => {
        setIsPlaying(false);
      }, counter / chordRate)

      setIsPlayingTimeout([thisIsPlayingTimeout]);
    }
  }
  

  //METRONOME
  function startMetronome(tempo, audioContext) {
    if(metronomeStatus === true){
      const oneBeat = (1000 * 60 / tempo / 1) ;
      const click = 0.075

      const thisFunctionTimeouts = [];

      for(let i=0; i < (16 / chordRate); i++){
        const thisTimeout = setTimeout(() => {
            const o = audioContext.createOscillator();
            const g = audioContext.createGain();
            o.type = "sine";
            o.frequency.value = 630;

            g.gain.setValueAtTime(0, audioContext.currentTime); // Initial amplitude is 0.
            g.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.01); // Increase amplitude to 1 over 0.5 seconds.
            g.gain.linearRampToValueAtTime(0,audioContext.currentTime + click);

            o.connect(g);
            g.connect(audioContext.destination);
          
            o.start(audioContext.currentTime);
            o.stop(audioContext.currentTime + click);  
        }, oneBeat * i)

        thisFunctionTimeouts.push(thisTimeout);
      }

      setMetronomeTimeouts(thisFunctionTimeouts);
    }else{

    }
  }

  //START DRUMS
  function startDrums(tempo, audioContext) {
    if(drumStatus === true){
      const oneBeat = (1000 * 60 / tempo / 1) ;
      const thisFunctionTimeouts = []

      //KICK
      for(let i=0; i < (8 / chordRate); i++){
        //DIFFERENT DELAY FOR EVERY SECOND HIT
        const velocityState = i % 2;
        let delay;
            
        if(velocityState > 0){
          delay = oneBeat / 2;
        }else{
          delay = 0;
        }

        const thisTimeout = setTimeout(() => {        
          const kick = audioContext.createBufferSource();
          kick.buffer = audioBuffer[0];

          const g = audioContext.createGain();

          g.gain.setValueAtTime(0, audioContext.currentTime); // Initial amplitude is 0.
          g.gain.linearRampToValueAtTime(1.2, audioContext.currentTime + 0.06); // Increase amplitude to 1 over 0.5 seconds.

          kick.connect(g);
          g.connect(audioContext.destination);

          kick.start(audioContext.currentTime);
        },  (2 * oneBeat * i) + delay)

        thisFunctionTimeouts.push(thisTimeout);
        
      }

      //SNARE
      for(let i=0; i < (8 / chordRate); i++){
        const thisTimeout = setTimeout(() => {        
          const snare = audioContext.createBufferSource();
          snare.buffer = audioBuffer[1];

          const g = audioContext.createGain();

          g.gain.setValueAtTime(0, audioContext.currentTime); // Initial amplitude is 0.
          g.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.06); // Increase amplitude to 1 over 0.5 seconds.

          snare.connect(g);
          g.connect(audioContext.destination);

          snare.start(audioContext.currentTime);        
        },  (2 * oneBeat * i) + oneBeat)

        thisFunctionTimeouts.push(thisTimeout);
      }

      //HIHAT
      for(let i=0; i < (32 / chordRate); i++){
        const thisTimeout = setTimeout(() => {

          //DIFFERENT VELOCITY FOR EVERY SECOND HIT
          const velocityState = i % 2;
          let velocity;
          
          if(velocityState > 0){
            velocity = 0.5;
          }else{
            velocity = 1;
          }
          
          const hihat = audioContext.createBufferSource();
          hihat.buffer = audioBuffer[2];

          const g = audioContext.createGain();

          g.gain.setValueAtTime(0, audioContext.currentTime); // Initial amplitude is 0.
          g.gain.linearRampToValueAtTime(velocity, audioContext.currentTime + 0.06); // Increase amplitude to 1 over 0.5 seconds.

          hihat.connect(g);
          g.connect(audioContext.destination);

          hihat.start(audioContext.currentTime);


        }, oneBeat * i / 2)

        thisFunctionTimeouts.push(thisTimeout);
      }

      setDrumTimeouts(thisFunctionTimeouts);
    }else{

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

      g.gain.setValueAtTime(0, audioContext.currentTime); // Initial amplitude is 0.
      g.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.001); // Increase amplitude to 1 over 0.5 seconds.
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


  //STOP ALL
  function stopAll() {
    //clear chord timeouts
    chordTimeouts.forEach((item, index) => {
      clearTimeout(item);
    })

    //clear metronome timeouts
    metronomeTimeouts.forEach((item, index) => {
      clearTimeout(item);
    })

    //clear drum timeouts
    drumTimeouts.forEach((item, index) => {
      clearTimeout(item);
    })

    //clear IsPlaying timeouts
    isPlayingTimeout.forEach((item, index) => {
      clearTimeout(item);
    })

    //clear interval
    allIntervals.forEach((item, index) => {
      clearInterval(item);
    })

    //reset timeouts & intervals
    setChordTimeouts([]);
    setMetronomeTimeouts([]);
    setDrumTimeouts([]);
    setAllIntervals([]);
    setIsPlayingTimeout([]);
    setIsPlaying(false);
    

  }
  
  //UPDATE PATTERN 
  useEffect(() => {
      createRhythmFun();

      if(isPlaying === true){
        const thisRhythm = createRhythmFun();
          stopAll();
          play(bpm, thisRhythm);
      }else{
        stopAll();
      }

  }, [oscType, loopStatus, tempoClicked,metronomeStatus, drumStatus ,scaleNotes, firstProgression, secondProgression, thirdProgression, fourthProgression, choosedVoicing1, choosedVoicing2, choosedVoicing3, choosedVoicing4, chordRate, rhythmStyle])


  // Load the audio file when the component mounts
  useEffect(() => {
    async function fetchAudioData() {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();

        //KICK
        const kickResponse = await fetch(kickAudio);
        const kickAudioData = await kickResponse.arrayBuffer();
        const kickBuffer = await context.decodeAudioData(kickAudioData);
        //SNARE
        const snareResponse = await fetch(snareAudio);   
        const snareAudioData = await snareResponse.arrayBuffer();     
        const snareBuffer = await context.decodeAudioData(snareAudioData);

        //HI HAT
        const hihatResponse = await fetch(hihatAudio);
        const hihatData = await hihatResponse.arrayBuffer();
        const hiHatBuffer = await context.decodeAudioData(hihatData);

        setAudioContext(context);
        setAudioBuffer([kickBuffer, snareBuffer ,hiHatBuffer]);

      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    fetchAudioData();
  }, []);


  //PLAY/STOP BUTTON
  useEffect(() => {
    if(isPlaying === false){
      setPlayStopText(playImg)
    }else{
      setPlayStopText(stopImg)
    }

  }, [isPlaying])


  return (
    <div 
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color:"white"
  }}>

      <div
      style={{
        //background: "lightblue",
        paddingTop:"30px",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div
        style={{
          //background: "green",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "25px 25px 150px 25px",
          border: "3px solid rgba(255,255,255,0.8)",
          borderRadius: "5px",
          position: "relative"
        }}>

          <div
          style={{
            //background: "orange",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}>
              <div className="pad">
                <select 
                style={{
                  position: "absolute"
                }} className="selector2" value={firstProgression} onChange={(e) => {setFirstProgression(Number(e.target.value))}}>
                    <option value="0">I</option>
                    <option value="1">II</option>
                    <option value="2">III</option>
                    <option value="3">IV</option>
                    <option value="4">V</option>
                    <option value="5">VI</option>
                    <option value="6">VII</option>
                  </select>
              </div>
              <div className="pad">
                <select 
                style={{
                  position: "absolute"
                }} className="selector2" value={secondProgression} onChange={(e) => {setSecondProgression(Number(e.target.value))}}>
                  <option value="0">I</option>
                  <option value="1">II</option>
                  <option value="2">III</option>
                  <option value="3">IV</option>
                  <option value="4">V</option>
                  <option value="5">VI</option>
                  <option value="6">VII</option>
                </select>
              </div>

              <div className="pad">
                <select 
                style={{
                  position: "absolute"
                }} className="selector2" value={thirdProgression} onChange={(e) => {setThirdProgression(Number(e.target.value))}}>
                  <option value="0">I</option>
                  <option value="1">II</option>
                  <option value="2">III</option>
                  <option value="3">IV</option>
                  <option value="4">V</option>
                  <option value="5">VI</option>
                  <option value="6">VII</option>
                </select>
              </div>
              <div className="pad">
                <select 
                style={{
                  position: "absolute"
                }} className="selector2" value={fourthProgression} onChange={(e) => {setFourthProgression(Number(e.target.value))}}>
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
          <div
          style={{
            //background: "orange",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: "10px",
          }}>
            
            <fieldset className="voicingField">

              <select className="selector3" value={choosedVoicing1} onChange={(e) => {setChoosedVoicing1(Number(e.target.value))}}>
                {filtered1[0].voicing.map((item, index) => {
                  return(
                    <option key={index} value={index}>{index + 1}</option>
                  )
                })}
              </select>

              <select className="selector3" value={choosedVoicing2} onChange={(e) => {setChoosedVoicing2(Number(e.target.value))}}>
                {filtered2[0].voicing.map((item, index) => {
                  return(
                    <option key={index} value={index}>{index + 1}</option>
                  )
                })}
              </select>

              <select className="selector3" value={choosedVoicing3} onChange={(e) => {setChoosedVoicing3(Number(e.target.value))}}>
                {filtered3[0].voicing.map((item, index) => {
                  return(
                    <option key={index} value={index}>{index + 1}</option>
                  )
                })}
              </select>

              <select className="selector3" value={choosedVoicing4} onChange={(e) => {setChoosedVoicing4(Number(e.target.value))}}>
                {filtered4[0].voicing.map((item, index) => {
                  return(
                    <option key={index} value={index}>{index + 1}</option>
                  )
                })}
              </select>
              <legend className="legend"><strong>voicing</strong></legend>
            </fieldset>
          </div>

          <div
          style={{
            position: "absolute",
            //background: "orange",
            //width: "100%",
            display: "flex",
            flexDirection: "row",
            //gap: "10px",
            bottom: "20px",
          }}>
            <div className="row g10">
              <p>rate:</p>
              <select className="selector" value={chordRate} onChange={(e) => setchordRate(Number(e.target.value))}>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
              </select>
            </div>

            <div             
            style={{
              paddingLeft: "20px",
              marginLeft: "10px",
              borderLeft: "3px solid rgba(255,255,255,0.8)"
            }} className="row g10">
              <p>rhythm:</p>
              <select className="selector" value={rhythmStyle} onChange={(e) => {setRhythmStyle(Number(e.target.value))}}>
                <option value={0}>basic</option>
                <option value={1}>jazzy</option>
                <option value={2}>fancy</option>
              </select>
            </div>

            <div             
            style={{
              paddingLeft: "20px",
              marginLeft: "10px",
              borderLeft: "3px solid rgba(255,255,255,0.8)"
            }} className="row g10">
              <p>osc:</p>
              <select className="selector" onChange={(e) => setOscType(e.target.value)}>
                <option value="sine">sine</option>
                <option value="square">square</option>
                <option value="triangle">triangle</option>
                <option value="sawtooth">saw</option>
              </select>
            </div>
          </div>

          <div 
          style={{
            justifyContent: "center",
            marginTop: "70px",
            //background: "orange",
          }} 
          className="row center">
            <div 
            style={{
              justifyContent: "center",
              //background: "blue",
              gap: "50px",
              width: "350px",
              padding: "30px 0px",
              border: "3px solid rgba(255,255,255,0.8)",
              position: "relative",
            }} 
            className="row center">

              <img onClick={() => {playStop(bpm, newRyhtmProgression)}} className="play" style={{cursor: "pointer"}} width={100} src={playStopText}></img>
              <img onClick={randomProgressionFun} className="random" style={{cursor: "pointer"}} width={125} src={randomImg}></img>


              <div
              style={{
                width: "60%",
                height: "10px",
                background: "rgb(22, 35, 51)",
                position: "absolute",
                top: "-5px"
              }}></div>
              <div
              style={{
                width: "60%",
                height: "10px",
                background: "rgb(22, 35, 51)",
                position: "absolute",
                bottom: "-5px"
              }}></div>

              <div
              style={{
                width: "10px",
                height: "40%",
                background: "rgb(22, 35, 51)",
                position: "absolute",
                left: "-5px"
              }}></div>

              <div
              style={{
                width: "10px",
                height: "40%",
                background: "rgb(22, 35, 51)",
                position: "absolute",
                right: "-7px"
              }}></div>

            </div>
          </div>
        </div>
      </div>

      <MidiExport exportNotes={newRyhtmProgression} chordRate={chordRate} />
    </div>
  );
}
