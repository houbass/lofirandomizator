import { useEffect } from 'react';

//MIDI WRITER
import MidiWriter from 'midi-writer-js';

export default function MidiExport({ exportNotes, chordRate, setDownloadMidiData }) {

    //generate midi
    useEffect(() => {
        if(exportNotes){
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
                setDownloadMidiData(data)
                }
                catch(err) {
                }
            };
            generateMidi();
        }
    }, [exportNotes])
}