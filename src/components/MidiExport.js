import { useState } from 'react';

//MIDI WRITER
import MidiWriter from 'midi-writer-js';

export default function MidiExport({ exportNotes }) {

    const [midiData, setMidiData] = useState("");



    //generate midi
    async function generateMidi(){

        const track = new MidiWriter.Track();

        track.addEvent([
            new MidiWriter.NoteEvent({pitch: [exportNotes[0], exportNotes[1], exportNotes[2], exportNotes[3]], duration: '2'}),
            new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
            new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
            new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
        ], function(event, index) {
        return {sequential: false};
      }
    );
    
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
        <div>
            <p>export midi</p>
            <button onClick={generateMidi} download>generate midi</button>
            <a href={midiData} download>download</a>
        </div>
        </>
    )
}