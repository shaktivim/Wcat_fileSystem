
const fs = require('fs');

let inputArr = process.argv.slice(2);
// console.log(inputArr);

startWcat(inputArr);

function startWcat(inputArr){
    let filesArr = [];
    let commandsArr = [];

    //segregating files and commands like s, n, b etc
    for(let i = 0; i < inputArr.length; i++){
        if(inputArr[i].includes("txt")){
            filesArr.push(inputArr[i]);
        }else{
            commandsArr.push(inputArr[i]);
        }
    }
    // console.log(filesArr, commandsArr);

    //Checking for invalid user inputs
    if(commandsArr.includes("-n") && commandsArr.includes("-b")){
        console.log("error: both -n and -b commands cannot co-exist");
        return;
    }
    for(let i = 0; i < filesArr.length; i++){
        if(fs.existsSync(filesArr[i])){
            continue;
        }else{
            console.log(`${filesArr[i]} does not exit, please input valid file`)
            return
        }
    }


    let resultStr = "";
    for(let i = 0; i < filesArr.length; i++){
        resultStr += fs.readFileSync(filesArr[i]) + "\r\n";
    }
    // console.log(resultStr);

    let resultArr = resultStr.split("\r\n");
    // console.log(resultArr)

    //Adding only lines which are non line break more than 1 line
    if(commandsArr.includes("-s")){
        let tempArr = [resultArr[0]];
        for(let i = 1; i<resultArr.length; i++){
            if(resultArr[i] == "" && resultArr[i-1] == ""){
                continue;
            }else{
                tempArr.push(resultArr[i]);
            }
        }
        // console.log(tempArr)
        resultArr = tempArr;
    }

    if(commandsArr.includes("-n")){
        for(let i = 0; i<resultArr.length; i++){
            resultArr[i] = (i + 1)+ ". " + resultArr[i];
        }
    }

    if(commandsArr.includes("-b")){
        let count = 1;
        for(let i = 0; i<resultArr.length; i++){
            if(resultArr[i] != ""){
                resultArr[i] = count + ". " + resultArr[i];
                count++;
            }
        }
    }

    console.log(resultArr.join("\n"));
    return;
}




