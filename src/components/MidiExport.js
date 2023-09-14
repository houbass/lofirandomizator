import { useState } from 'react';

//MIDI WRITER
import MidiWriter from 'midi-writer-js';

export default function MidiExport({ exportNotes, chordRate }) {

    const [midiData, setMidiData] = useState("");

    //generate midi
    async function generateMidi(){
        const track = new MidiWriter.Track();
        const something = exportNotes.map((item, index) => {

            const thisDuration = item[0].duration;
            const thisWait = item[0].wait

            let thisNotes = [];

            item.forEach((item2, index2) => {
                thisNotes.push(item2.name)
            })

            return new MidiWriter.NoteEvent({pitch: thisNotes, wait: (thisWait * chordRate), duration: (thisDuration * chordRate), })
        })

        track.addEvent(something, function(event, index) {
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