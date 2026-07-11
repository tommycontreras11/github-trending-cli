import { fetchingData } from "./helper.js"

process.stdin.on("data", (data) => {
    const input = data.toString().trim()
    const inputSplitted = input.split(" ")
 
    const command = inputSplitted[0]
    const arg = inputSplitted.slice(1)

    switch(command) {
        case "trending-repos":
            fetchingData(arg)
            break;
        case "exit":
            process.exit()
        default: 
            console.log("Incorrect option.")
    }
}) 