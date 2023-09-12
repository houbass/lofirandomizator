import { useState } from 'react';

//MIDI WRITER
import MidiWriter from 'midi-writer-js';

export default function MidiExport({ exportNotes, chordDuration }) {

    const [midiData, setMidiData] = useState("");

    //duration translator
    function midiDurationFun(duration) {
        console.log("count");

        let output;

        switch(duration){
            case 1:
                output = "4";
                break;
            case 2:
                output = "2";
                break;
            case 4:
                output = "1";
                break;
        }

        return output
    }

    //generate midi
    async function generateMidi(){
        const track = new MidiWriter.Track();
        const midiDuration = midiDurationFun(chordDuration);

        track.addEvent([
            new MidiWriter.NoteEvent({pitch: [exportNotes[0][0], exportNotes[0][1], exportNotes[0][2], exportNotes[0][3]], duration: midiDuration}),
            new MidiWriter.NoteEvent({pitch: [exportNotes[1][0], exportNotes[1][1], exportNotes[1][2], exportNotes[1][3]], duration: midiDuration}),
            new MidiWriter.NoteEvent({pitch: [exportNotes[2][0], exportNotes[2][1], exportNotes[2][2], exportNotes[2][3]], duration: midiDuration}),
            new MidiWriter.NoteEvent({pitch: [exportNotes[3][0], exportNotes[3][1], exportNotes[3][2], exportNotes[3][3]], duration: midiDuration}),
        ], function(event, index) {
        return {sequential: false};
        });
        

        const write = new MidiWriter.Writer(track);

        
        try{
        const data = await write.dataUri()
        setMidiData(data);
        }
        catch(err) {

        }
    };

    return(
        <>
        <div
        style={{
            marginTop: "50px"
        }}>
            <p>export midi</p>
            <button onClick={generateMidi} download>generate midi</button>
            <a href={midiData} download>download</a>
        </div>
        </>
    )
}