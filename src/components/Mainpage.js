import { useEffect, useState } from "react";

//local storage
import useLocalStorageState from 'use-local-storage-state'

//pic
import backgroundPic from "./pic/background.webp";
import metronomeImg from "./pic/metronome.svg";
import drumsImg from "./pic/drums.svg";
import loopImg from "./pic/loop.svg";

//components
import Settings from "./Settings";
import Notes from "./Notes";


export default function Mainpage() {
    const { tonalities } = Notes();

    //LOOP STATES
    const [loopStatus, setLoopStatus] = useLocalStorageState('loopstatus', {defaultValue: true });
    const [loopOpacity, setLoopOpacity] = useLocalStorageState('loopOpacity', {defaultValue: "1" });

    //METRONOME STATES
    const [metronomeStatus, setMetronomeStatus] = useLocalStorageState('metronomeStatus', {defaultValue: false });
    const [metronomeOpacity, setMetronomeOpacity] = useLocalStorageState('metronomeOpacity', {defaultValue: "0.5" });

    //DRUM STATES
    const [drumStatus, setDrumStatus] = useLocalStorageState('drumStatus', {defaultValue: true });
    const [drumOpacity, setDrumOpacity] = useLocalStorageState('drumOpacity', {defaultValue: "1" });

    //TONALITY & SCALE & BPM STATES
    const [tonality, setTonality] = useLocalStorageState('tonality', {defaultValue: 3 });
    const [scale, setScale] = useLocalStorageState('scale', {defaultValue: "major" });
    const [bpm, setBpm] = useLocalStorageState('bpm', {defaultValue: 70 });
    const [tempoClicked, setTempoClicked] = useState(false);

    //MAIN OPACITY (when img loaded)
    const [mainOpacity, setMainOpacity] = useState(0);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const imageUrls = [backgroundPic];

    //HANDLERS
    //loop handler
    function loopHandler() {
        if(loopStatus === true){
            setLoopStatus(false);
            setLoopOpacity("0.5");
        }else{
            setLoopStatus(true);
            setLoopOpacity("1");
        }
    }

    //metronome handler
    function metronomeHandler() {
        if(metronomeStatus === true) {
            setMetronomeStatus(false);
            setMetronomeOpacity("0.5");
        }else{
            setMetronomeStatus(true);
            setMetronomeOpacity("1");
        }
    }

    //drum handler
    function drumHandler() {
        if(drumStatus === true){
            setDrumStatus(false);
            setDrumOpacity("0.5");
        }else{
            setDrumStatus(true);
            setDrumOpacity("1");
        }
    }


    //WAIT TO LOAD ALL IMAGES
    useEffect(() => {
  
      const loadImage = (url) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
  
      const loadAllImages = async () => {
        try {
          const imagePromises = imageUrls.map(loadImage);
          await Promise.all(imagePromises);
          setAllImagesLoaded(true);
        } catch (error) {
          console.error('Error loading images:', error);
        }
      };
  
      loadAllImages();
      // eslint-disable-next-line
    }, []);
  
    //CHECK IF ALL IMAGES ARE LOADED
    useEffect(() => {
      if(allImagesLoaded === true){
        setMainOpacity(1);
      }
      // eslint-disable-next-line
    }, [allImagesLoaded]);

    return(
        <>
        <div 
        className="mainpage"
        style={{
            opacity: mainOpacity,
            transition: "1s"
        }}
        >
            <div>
                <img 
                className="backgroundPic" 
                src={backgroundPic} 
                alt="background"
                style={{
                    width: "100%",
                    aspectRatio: "auto 1000 / 450"
                }}
                loading="lazy"                
                ></img>
            
                <div 
                style={{
                    position: "absolute",
                    top: "0px",
                    backgroundImage: "linear-gradient(to top,rgba(22, 35, 51,0.0), rgba(22, 35, 51,1) )",
                    width: "100%",
                    height: "120px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "40px 40px 0px 0px",
                }}>
                    <div 
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: "30px",
                        height:"fit-content",
                        paddingTop: "30px"
                    }}>
                        <img onClick={loopHandler} style={{opacity: loopOpacity, cursor: "pointer"}} src={loopImg} width={35} alt="loop on/off"></img>
                    </div>

                    <div 
                    style={{
                        width: "95px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: "30px",
                        height:"fit-content",
                        paddingTop: "30px"
                    }}>
                        <img onClick={metronomeHandler} style={{opacity: metronomeOpacity, cursor: "pointer"}} src={metronomeImg} width={35} alt="metronome on/off"></img>
                        <img onClick={drumHandler} style={{opacity: drumOpacity, cursor: "pointer"}} src={drumsImg} width={35} alt="drums on/off"></img>
                    </div>
                </div>


                <div style={{
                    color: "white",
                    position: "absolute",
                    marginTop: "-80px",
                    //background: "rgba(0,0,0,0.5)",
                    backgroundImage: "linear-gradient(to bottom,rgba(22, 35, 51,0.1), rgba(22, 35, 51,1) )",
                    height: "80px",
                    width: "100%",
                    maxWidth: "1000px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none"
                }}>
                    <div 
                    style={{
                        width: "100%",
                        //background: "orange",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "0px 10px",
                        height: "75px",
                        border: "none",

                    }}>
                        <div className="firstSettingContainer2">

                            

                            <div className="firstSettingContainerRow">
                                
                                <div className="firstSettingContainer2">                        
                                    <label htmlFor="tonality">tonality:</label>
                                
                                    <select id="tonality" className="selector" value={tonality} onChange={(e) => setTonality(Number(e.target.value))}>
                                        {tonalities.map((tone, index) => (
                                        <option key={index} value={index}>
                                            {tone}
                                        </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="firstSettingContainer2"> 
                                    <label htmlFor="scale">scale:</label>                        
                                    <select id="scale" className="selector" value={scale} onChange={(e) => setScale(e.target.value)}>                                
                                        <option value="major" >major</option>
                                        <option value="minor">minor</option>
                                    </select>
                                </div>
                            </div>




                        </div>

                        <div className="firstSettingContainer">
                            <label htmlFor="bpm">tempo: <strong>{bpm + "BPM"}</strong></label>
                            <input 
                                className="slider"
                                id="bpm"
                                value={bpm}
                                type="range"
                                min="50"
                                max="180"
                                step="1"
                                onChange={(e) => {
                                    setBpm(Number(e.target.value))}}
                                onClick={() => {setTempoClicked(!tempoClicked)}} 
                            ></input>                            
                        </div>
                    </div>
                </div>
            </div>

            <Settings tonality={tonality} scale={scale} bpm={bpm} loopStatus={loopStatus} metronomeStatus={metronomeStatus} drumStatus={drumStatus} tempoClicked={tempoClicked}/>
        </div>
        </>
    )
}