process.stdin.on("data", (data) => {
    const input = data.toString().trim()
    const inputSplitted = input.split(" ")
 
    const command = inputSplitted[0]
    const filters = inputSplitted.slice(1)

    switch(command) {
        case "trending-repos":
            console.log("Trending")
            break;
        case "exit":
            process.exit()
        default: 
            console.log("Incorrect option.")
    }
}) 