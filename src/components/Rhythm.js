


export default function Rhythm() {

    const rhythm = [
        {
            name: "basic",
            duration: [1],
            wait: [0]
        }, 
        {
            name: "jazzy",
            duration: [2, 4],
            wait: [0, 4]
        },
        {
            name: "fancy",
            duration: [2, 16, 16, 16, 8],
            wait: [0, 16, 16, 16, 0]
        }
    ]

    return { rhythm }

}