

import { useState } from "react";

//COMPONENTS
import MidiExport from "./MidiExport";
import Voicing from "./Voicing";

export default function Osc({ oscType, notesDelay, scaleNotes }) {

    //VOICING
    const {voicing} = Voicing();

    //PLAYED NOTES
    const [exportNotes, setExportNotes] = useState(["F3", "G#3"]);

    //osc
    const playTime = 4;

    //RANDOM PROGRESSION
    const [randomProgression, setRandomProgression] = useState([]);

    //PLAY FUNCTION
    function startOsc(step) {
        const playedNotes = [];
        const velocity = [0.3, 0.5, 0.5, 0.5];
        //const currentVoicing = voicing.filter((item) => item.tonality === scaleNotes[step].name)
        console.log(scaleNotes[step].name)

        for(let i=0; i < 4; i++) {
              
                //setTimeout(() => {
                    const context = new AudioContext();
                    //osc
                    const o = context.createOscillator();
                    //gain
                    const g = context.createGain();
                    //osc type
                    o.type = oscType;
                    //frequency
                    o.frequency.value = Number(scaleNotes[(i * 2) + step].freq);
                    //o.frequency.value = Number(scaleNotes[(i * 2) + step].freq * currentVoicing[1].voicing[i]);

                    o.connect(g);
                    g.connect(context.destination);
                    g.gain.value = velocity[i];
                    g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + playTime);
                    o.start();
                    o.stop(playTime);

                    playedNotes.push(scaleNotes[(i * 2) + step].name);
                //}, (i / 2) * notesDelay)
        }
        setExportNotes(playedNotes);
        //console.log(playedNotes);
    };

    function randomProgressionFun() {

        const thisProgression = [];

        for(let i=0; i < 4; i++){
            const randomNumber = Math.round(Math.random() * 6) + 1;
            thisProgression.push(randomNumber);
        }
        console.log(thisProgression);
        setRandomProgression(thisProgression);
    }

    return(
        <>
        <div>
            <p>chords</p>

            <button onClick={() => startOsc(0)}>I</button>
            <button onClick={() => startOsc(1)}>II</button>
            <button onClick={() => startOsc(2)}>III</button>
            <button onClick={() => startOsc(3)}>IV</button>
            <button onClick={() => startOsc(4)}>V</button>
            <button onClick={() => startOsc(5)}>VI</button>
            <button onClick={() => startOsc(6)}>VII</button>

            <br/>   
            <button onClick={randomProgressionFun}>RANDOM PROGRESSION</button>
            <p>{randomProgression}</p>

            <p>progression</p>
            <select>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
                <option>VI</option>
                <option>VII</option>
            </select>
            <select>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
                <option>VI</option>
                <option>VII</option>
            </select>
            <select>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
                <option>VI</option>
                <option>VII</option>
            </select>
            <select>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
                <option>VI</option>
                <option>VII</option>
            </select>
        </div>

        <MidiExport exportNotes={exportNotes}/>
        </>
    )
}