
    
export default function Voicing() {

    //VOICING
    const voicing = [
    
        {
            //CMAJOR
            name: "Cmajor",
            voicing: [
                //1
                [
                    {name: "C5", freq: 130.8 * 3},
                    {name: "E3", freq: 164.8},
                    {name: "G3", freq: 196},
                    {name: "B3", freq: 246.9}
                ],
                //2
                [
                    {name: "C3", freq: 130.8},
                    {name: "E4", freq: 329.6},
                    {name: "G3", freq: 196},
                    {name: "B3", freq: 246.9}
                ],
                //3
                [
                    {name: "E4", freq: 329.6},
                    {name: "E3", freq: 164.8},
                    {name: "G3", freq: 196},
                    {name: "B3", freq: 246.9}
                ],
            ]
        },

        {
            //CMINOR
            name: "Cminor",
            voicing: [
                //1
                [
                    {name: "C5", freq: 130.8 * 3},
                    {name: "D#3", freq: 155.6},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1}
                ],
                //2
                [
                    {name: "C4", freq: 261.6},
                    {name: "D#3", freq: 155.6},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1}
                ],
                //3
                [
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1}
                ],
            ]
        },

        {
            //CDIM
            name: "Cdim",
            voicing: [
                //1
                [
                    {name: "C5", freq: 130.8 * 3},
                    {name: "E3", freq: 164.8},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1}
                ],
                //2
                [
                    {name: "C3", freq: 130.8},
                    {name: "E4", freq: 329.6},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1}
                ],
                //3
                [
                    {name: "C4", freq: 261.6},
                    {name: "E3", freq: 164.8},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1}
                ],
            ]
        },

        {
            //C#MAJOR
            name: "C#major",
            voicing: [
                //1
                [
                    {name: "C#3", freq: 138.6},
                    {name: "F3", freq: 174.6},
                    {name: "G#3", freq: 207.7},
                    {name: "C4", freq: 261.6}
                ],
                //2
                [
                    {name: "C#3", freq: 138.6},
                    {name: "F4", freq: 174.6 * 2},
                    {name: "G#3", freq: 207.7},
                    {name: "C4", freq: 261.6}
                ],
                //3
                [
                    {name: "C#5", freq: 138.6 * 3},
                    {name: "F3", freq: 174.6},
                    {name: "G#3", freq: 207.7},
                    {name: "C4", freq: 261.6}
                ],
            ]
        },

        {
            //C#MINOR
            name: "C#minor",
            voicing: [
                //1
                [
                    {name: "C#3", freq: 138.6},
                    {name: "E3", freq: 164.8},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9}
                ],
                //2
                [
                    {name: "C#3", freq: 138.6},
                    {name: "E4", freq: 164.8 * 2},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9}
                ],
                //3
                [
                    {name: "C#4", freq: 138.6 * 2},
                    {name: "E3", freq: 164.8},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9}
                ],
            ]
        },
        {
            //C#DIM
            name: "C#dim",
            voicing: [
                //1
                [
                    {name: "C#3", freq: 138.6},
                    {name: "F3", freq: 174.6},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9}
                ],
                //2
                [
                    {name: "C#3", freq: 138.6},
                    {name: "F4", freq: 174.6 * 2},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9}
                ],
                //3
                [
                    {name: "C#5", freq: 138.6 * 3},
                    {name: "F3", freq: 174.6},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9}
                ],
            ]
        },
        {
            //DMAJ
            name: "Dmajor",
            voicing: [
                //1
                [
                    {name: "D3", freq: 146.8},
                    {name: "F#3", freq: 185},
                    {name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2}
                ],
                //2
                [
                    {name: "D3", freq: 146.8},
                    {name: "F#4", freq: 370 },
                    {name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2}
                ],
                //3
                [
                    {name: "D5", freq: 146.8 * 3},
                    {name: "F#3", freq: 185},
                    {name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2}
                ],
            ]
        },

        {
            //DMIN
            name: "Dminor",
            voicing: [
                //1
                [
                    {name: "D3", freq: 146.8},
                    {name: "F3", freq: 174.6},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6}
                ],
                //2
                [
                    {name: "D3", freq: 146.8},
                    {name: "F4", freq: 174.6 * 2},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6}
                ],
                //3
                [
                    {name: "D4", freq: 146.8 * 2},
                    {name: "F3", freq: 174.6},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6}

                ],
            ]
        },

        {
            //DDIM
            name: "Ddim",
            voicing: [
                //1
                [
                    {name: "D3", freq: 146.8},
                    {name: "F#3", freq: 185},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6}
                ],
                //2
                [
                    {name: "D3", freq: 146.8},
                    {name: "F#4", freq: 185 * 2},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6}
                ],
                //3
                [
                    {name: "D4", freq: 146.8 * 2},
                    {name: "F#3", freq: 185},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6}
                ],
            ]
        },

        {
            //D#MAJ
            name: "D#major",
            voicing: [
                //1
                [
                    {name: "D#3", freq: 155.6},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1},
                    {name: "D4", freq: 293.7}
                ],
                //2
                [
                    {name: "D#3", freq: 155.6},
                    {name: "G4", freq: 196 * 2},
                    {name: "A#3", freq: 233.1},
                    {name: "D4", freq: 293.7}
                ],
                //3
                [
                    {name: "D#4", freq: 155.6 * 2},
                    {name: "G4", freq: 196 * 2},
                    {name: "A#3", freq: 233.1},
                    {name: "D4", freq: 293.7}
                ],
            ]
        },

        {
            //D#MIN
            name: "D#minor",
            voicing: [
                //1
                [
                    {name: "D#3", freq: 155.6},
                    {name: "F#3", freq: 185},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2}
                ],
                //2
                [
                    {name: "D#3", freq: 155.6},
                    {name: "F#4", freq: 185 * 2},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2}
                ],
                //3
                [
                    {name: "D#4", freq: 155.6 * 2},
                    {name: "F#3", freq: 185},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2}
                ],
            ]
        },

        {
            //D#DIM
            name: "D#dim",
            voicing: [
                //1
                [
                    {name: "D#3", freq: 155.6},
                    {name: "G3", freq: 196},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2,}
                ],
                //2
                [
                    {name: "D#3", freq: 155.6},
                    {name: "G4", freq: 196 * 2},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2,}
                ],
                //3
                [
                    {name: "D#3", freq: 155.6},
                    {name: "G4", freq: 196 * 2},
                    {name: "A#4", freq: 233.1 * 2},
                    {name: "C#4", freq: 277.2,}
                ],
            ]
        },

        {
            //EMAJ
            name: "Emajor",
            voicing: [
                //1
                [
                    {name: "E3", freq: 164.8},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1}
                ],
                //2
                [
                    {name: "E3", freq: 164.8},
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1}
                ],
                //3
                [
                    {name: "E3", freq: 164.8},
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "B4", freq: 246.9 * 2},
                    {name: "D#4", freq: 311.1}
                ],
            ]
        },

        {
            //EMIN
            name: "Eminor",
            voicing: [
                //1
                [
                    {name: "E3", freq: 164.8},
                    {name: "G3", freq: 196},
                    {name: "B3", freq: 246.9},
                    {name: "D4", freq: 293.7}
                ],
                //2
                [
                    {name: "E3", freq: 164.8},
                    {name: "G4", freq: 196 * 2},
                    {name: "B3", freq: 246.9},
                    {name: "D4", freq: 293.7}
                ],
                //3
                [
                    {name: "E3", freq: 164.8},
                    {name: "G4", freq: 196 * 2},
                    {name: "B4", freq: 246.9 * 2},
                    {name: "D4", freq: 293.7}
                ],
            ]
        },

        {
            //EDIM
            name: "Edim",
            voicing: [
                //1
                [
                    {name: "E3", freq: 164.8},
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9},
                    {name: "D4", freq: 293.7}
                ],
                //2
                [
                    {name: "E3", freq: 164.8},
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "B3", freq: 246.9},
                    {name: "D4", freq: 293.7}
                ],
                //3
                [
                    {name: "E3", freq: 164.8},
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "B4", freq: 246.9 * 2},
                    {name: "D4", freq: 293.7}
                ],
            ]
        },        

        {
            //FMAJ
            name: "Fmajor",
            voicing: [
                //1
                [
                    {name: "F3", freq: 174.6},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6},
                    {name: "E4", freq: 329.6}
                ],
                //2
                [
                    {name: "F3", freq: 174.6},
                    {name: "A4", freq: 220 * 2},
                    {name: "C4", freq: 261.6},
                    {name: "E4", freq: 329.6}
                ],
                //3
                [
                    {name: "F3", freq: 174.6},
                    {name: "A4", freq: 220 * 2},
                    {name: "C5", freq: 261.6 * 2},
                    {name: "E4", freq: 329.6}
                ],
            ]
        },

        {
            //FMIN
            name: "Fminor",
            voicing: [
                //1
                [
                    {name: "F3", freq: 174.6},
                    {name: "G#3", freq: 207.7},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1}
                ],
                //2
                [
                    {name: "F3", freq: 174.6},
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1}
                ],
                //3
                [
                    {name: "F3", freq: 174.6},
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "C5", freq: 261.6 * 2},
                    {name: "D#4", freq: 311.1}
                ],
            ]
        },

        {
            //FDIM
            name: "Fdim",
            voicing: [
                //1
                [
                    {name: "F3", freq: 174.6},
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1}
                ],
                //2
                [
                    {name: "F3", freq: 174.6},
                    {name: "A4", freq: 220 * 2},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1}
                ],
                //3
                [
                    {name: "F3", freq: 174.6},
                    {name: "A4", freq: 220 * 2},
                    {name: "C5", freq: 261.6 * 2},
                    {name: "D#4", freq: 311.1}
                ],
            ]
        },

        {
            //F#MAJ
            name: "F#major",
            voicing: [
                //1
                [
                    {name: "F#3", freq: 185},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2},
                    {name: "F4", freq: 349.2}

                ],
                //2
                [
                    {name: "F#4", freq: 185 * 2},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2},
                    {name: "F3", freq: 349.2 / 2}
                ],
                //3
                [
                    {name: "F#3", freq: 185},
                    {name: "A#4", freq: 233.1 * 2},
                    {name: "C#4", freq: 277.2},
                    {name: "F4", freq: 349.2}
                ],
            ]
        },

        {
            //F#MIN
            name: "F#minor",
            voicing: [
                //1
                [
                    {name: "F#3", freq: 185},
                    {name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6}
                ],
                //2
                [
                    {name: "F#4", freq: 185 * 2},
                    {name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2},
                    {name: "E3", freq: 329.6 / 2}
                ],
                //3
                [
                    {name: "F#3", freq: 185},
                    {name: "A4", freq: 220 * 2},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6}
                ],
            ]
        },

        {
            //F#DIM
            name: "F#dim",
            voicing: [
                //1
                [
                    {name: "F#3", freq: 185},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6}
                ],
                //2
                [
                    {name: "F#4", freq: 185 * 2},
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2},
                    {name: "E3", freq: 329.6 / 2}
                ],
                //3
                [
                    {name: "F#3", freq: 185},
                    {name: "A#4", freq: 233.1 * 2},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6}
                ],
            ]
        },     
        
        {
            //GMajor
            name: "Gmajor",
            voicing: [
                //1
                [
                    {name: "G3", freq: 196.00},
                    {name: "B3", freq: 246.94},
                    {name: "D4", freq: 293.66},
                    {name: "F#4", freq: 370.0}

                ],
                //2
                [
                    {name: "G4", freq: 196.00 * 2},
                    {name: "B3", freq: 246.94},
                    {name: "D4", freq: 293.66},
                    {name: "F#3", freq: 370.0 / 2}
                ],
                //3
                [
                    {name: "G3", freq: 196.00},
                    {name: "B4", freq: 246.94 * 2},
                    {name: "D4", freq: 293.66},
                    {name: "F#4", freq: 370.0}
                ],
            ]
        },
        
        {
            //GMIN
            name: "Gminor",
            voicing: [
                //1
                [
                    {name: "G3", freq: 196.00},
                    {name: "A#3", freq: 233.08},
                    {name: "D4", freq: 293.66},
                    {name: "F4", freq: 349.2}
                ],
                //2
                [
                    {name: "G4", freq: 196.00 * 2},
                    {name: "A#3", freq: 233.08},
                    {name: "D4", freq: 293.66},
                    {name: "F3", freq: 349.2 / 2}
                ],
                //3
                [
                    {name: "G3", freq: 196.00},
                    {name: "A#4", freq: 233.08 * 2},
                    {name: "D4", freq: 293.66},
                    {name: "F4", freq: 349.2}
                ],
            ]
        },
        
        {
            //GDIM
            name: "Gdim",
            voicing: [
                //1
                [
                    {name: "G3", freq: 196.00},
                    {name: "B3", freq: 246.94},
                    {name: "D4", freq: 293.66},
                    {name: "F4", freq: 349.2}
                ],
                //2
                [
                    {name: "G4", freq: 196.00 * 2},
                    {name: "B3", freq: 246.94},
                    {name: "D4", freq: 293.66},
                    {name: "F3", freq: 349.2 / 2}
                ],
                //3
                [
                    {name: "G3", freq: 196.00},
                    {name: "B4", freq: 246.94 * 2},
                    {name: "D4", freq: 293.66},
                    {name: "F4", freq: 349.2}
                ],
            ]
        },

        {
            //G#MAJ
            name: "G#major",
            voicing: [
                //1
                [
                    {name: "G#3", freq: 207.7},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1},
                    {name: "G4", freq: 392.0}
                ],
                //2
                [
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1},
                    {name: "G3", freq: 392.0 / 2}
                ],
                //3
                [
                    {name: "G#3", freq: 207.7},
                    {name: "C5", freq: 261.6 * 2},
                    {name: "D#4", freq: 311.1},
                    {name: "G4", freq: 392.0}
                ],
            ]
        },

        {
            //G#MIN
            name: "G#minor",
            voicing: [
                //1
                [
                    {name: "G#3", freq: 207.7},
                    {name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0}
                ],
                //2
                [
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1},
                    {name: "F#3", freq: 370.0 / 2}
                ],
                //3
                [
                    {name: "G#3", freq: 207.7},
                    {name: "B4", freq: 246.9 * 2},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0}
                ],
            ]
        },

        {
            //G#DIM
            name: "G#dim",
            voicing: [
                //1
                [
                    {name: "G#3", freq: 207.7},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0}
                ],
                //2
                [
                    {name: "G#4", freq: 207.7 * 2},
                    {name: "C4", freq: 261.6},
                    {name: "D#4", freq: 311.1},
                    {name: "F#3", freq: 370.0 / 2}
                ],
                //3
                [
                    {name: "G#3", freq: 207.7},
                    {name: "C5", freq: 261.6 * 2},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0}
                ],
            ]
        },

        {
            //AMAJ
            name: "Amajor",
            voicing: [
                //1
                [
                    {name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6},
                    {name: "G#4", freq: 415.3}
                ],
                //2
                [
                    {name: "A4", freq: 220 * 2},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6},
                    {name: "G#3", freq: 415.3 / 2 }
                ],
                //3
                [
                    //{name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2},
                    {name: "E3", freq: 329.6 / 2},
                    {name: "E4", freq: 329.6},
                    {name: "G#3", freq: 415.3 / 2}
                ],
            ]
        },

        {
            //AMIN
            name: "Aminor",
            voicing: [
                //1
                [
                    {name: "A3", freq: 220},
                    {name: "C4", freq: 261.6},
                    {name: "E4", freq: 329.6},
                    {name: "G4", freq: 392.0}
                ],
                //2
                [
                    {name: "A4", freq: 220 * 2},
                    {name: "C4", freq: 261.6},
                    {name: "E4", freq: 329.6},
                    {name: "G3", freq: 392.0 / 2}
                ],
                //3
                [
                    //{name: "A3", freq: 220},
                    {name: "C4", freq: 261.6},
                    {name: "E3", freq: 329.6 / 2},
                    {name: "E4", freq: 329.6},
                    {name: "G3", freq: 392.0 / 2}
                ],
            ]
        },

        {
            //ADIM
            name: "Adim",
            voicing: [
                //1
                [
                    {name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6},
                    {name: "G4", freq: 392.0}
                ],
                //2
                [
                    {name: "A4", freq: 220 * 2},
                    {name: "C#4", freq: 277.2},
                    {name: "E4", freq: 329.6},
                    {name: "G3", freq: 392.0 / 2}
                ],
                //3
                [
                    //{name: "A3", freq: 220},
                    {name: "C#4", freq: 277.2},
                    {name: "E3", freq: 329.6 / 2},
                    {name: "E4", freq: 329.6},
                    {name: "G3", freq: 392.0 / 2}
                ],
            ]
        },

        {
            //A#MAJ
            name: "A#major",
            voicing: [
                //1
                [
                    {name: "A#3", freq: 233.1},
                    {name: "D4", freq: 293.7},
                    {name: "F4", freq: 349.2},
                    {name: "A4", freq: 440.0}
                ],
                //2
                [
                    {name: "A#4", freq: 233.1 * 2},
                    {name: "D4", freq: 293.7},
                    {name: "F4", freq: 349.2},
                    {name: "A3", freq: 440.0 / 2}
                ],
                //3
                [
                    //{name: "A#3", freq: 233.1},
                    {name: "D4", freq: 293.7},
                    {name: "F3", freq: 349.2 / 2},
                    {name: "F4", freq: 349.2},
                    {name: "A3", freq: 440.0 / 2}
                ],
            ]
        },

        {
            //A#MIN
            name: "A#minor",
            voicing: [
                //1
                [
                    {name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2},
                    {name: "F4", freq: 349.2},
                    {name: "G#4", freq: 415.3}
                ],
                //2
                [
                    {name: "A#4", freq: 233.1 * 2},
                    {name: "C#4", freq: 277.2},
                    {name: "F4", freq: 349.2},
                    {name: "G#3", freq: 415.3 / 2}
                ],
                //3
                [
                    //{name: "A#3", freq: 233.1},
                    {name: "C#4", freq: 277.2},
                    {name: "F3", freq: 349.2 / 2},
                    {name: "F4", freq: 349.2},
                    {name: "G#3", freq: 415.3 / 2}
                ],
            ]
        },

        {
            //A#DIM
            name: "A#dim",
            voicing: [
                //1
                [
                    {name: "A#3", freq: 233.1},
                    {name: "D4", freq: 293.7},
                    {name: "F4", freq: 349.2},
                    {name: "G#4", freq: 415.3}
                ],
                //2
                [
                    {name: "A#4", freq: 233.1 * 2},
                    {name: "D4", freq: 293.7},
                    {name: "F4", freq: 349.2},
                    {name: "G#3", freq: 415.3 / 2}
                ],
                //3
                [
                    //{name: "A#3", freq: 233.1},
                    {name: "D4", freq: 293.7},
                    {name: "F3", freq: 349.2 / 2},
                    {name: "F4", freq: 349.2},
                    {name: "G#3", freq: 415.3 / 2}
                ],
            ]
        },

        {
            //BMAJ
            name: "Bmajor",
            voicing: [
                //1
                [
                    {name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0},
                    {name: "A#4", freq: 466.2}

                ],
                //2
                [
                    {name: "B4", freq: 246.9 * 2},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0},
                    {name: "A#3", freq: 466.2 / 2}

                ],
                //3
                [
                    //{name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1},
                    {name: "F#3", freq: 370.0 / 2},
                    {name: "F#4", freq: 370.0},
                    {name: "A#3", freq: 466.2 / 2}
                ],
            ]
        },

        {
            //BMIN
            name: "Bminor",
            voicing: [
                //1
                [
                    {name: "B3", freq: 246.9},
                    {name: "D4", freq: 293.7},
                    {name: "F#4", freq: 370.0},
                    {name: "A4", freq: 440.0}
                ],
                //2
                [
                    {name: "B4", freq: 246.9 * 2},
                    {name: "D4", freq: 293.7},
                    {name: "F#4", freq: 370.0},
                    {name: "A3", freq: 440.0 / 2}
                ],
                //3
                [
                    //{name: "B3", freq: 246.9},
                    {name: "D4", freq: 293.7},
                    {name: "F#3", freq: 370.0 / 2},
                    {name: "F#4", freq: 370.0},
                    {name: "A3", freq: 440.0 / 2}
                ],
            ]
        },

        {
            //BDIM
            name: "Bdim",
            voicing: [
                //1
                [
                    {name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0},
                    {name: "A4", freq: 440.0}
                ],
                //2
                [
                    {name: "B4", freq: 246.9 * 2},
                    {name: "D#4", freq: 311.1},
                    {name: "F#4", freq: 370.0},
                    {name: "A3", freq: 440.0 / 2}
                ],
                //3
                [
                    //{name: "B3", freq: 246.9},
                    {name: "D#4", freq: 311.1},
                    {name: "F#3", freq: 370.0 / 2},
                    {name: "F#4", freq: 370.0},
                    {name: "A3", freq: 440.0 / 2}
                ],
            ]
        },

    ]
    return { voicing }
}