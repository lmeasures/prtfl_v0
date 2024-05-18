import React from 'react';
import './index.scss'

const menuEnum = {
  0: "main",
  1: "data",
  
}

export const Terminal = () => {
  const [commandInput, setCommandInput] = React.useState<string>("");
  const [history, setHistory] = React.useState<Array<string>>([""]);
  const [failedCommands, setFailedCommands] = React.useState<number>(0);
  const [currentMenu, setCurrentMenu] = React.useState<number>(0);

  const historyLength = 32;

  const allowedKeys="abcdefghijklmnopqrstuvwxyz0123456789/";

  const hackedNotice = [
  "  ░▒▓██████▓▒░░▒▓████████▓▒░▒▓████████▓▒░▒▓██████████████▓▒░░▒▓████████▓▒░░▒▓██████▓▒░ ░▒▓███████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░░▒▓███████▓▒░      ░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░ ",
  "  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ ",
  "  ░▒▓█▓▒░      ░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░       ░▒▓█▓▒▒▓█▓▒░  ",
  "  ░▒▓█▓▒▒▓███▓▒░▒▓██████▓▒░    ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓████████▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓██████▓▒░  ░▒▓██████▓▒░       ░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░  ░▒▓█▓▒▒▓█▓▒░  ",
  "  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        ░▒▓█▓▓█▓▒░   ",
  "  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        ░▒▓█▓▓█▓▒░   ",
  "   ░▒▓██████▓▒░░▒▓████████▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓███████▓▒░░▒▓██▓▒░▒▓███████▓▒░░▒▓████████▓▒░  ░▒▓██▓▒░    ",
  "                                                                                                                                                                                                        ",
  ]

  const bootSequence1 = [
  "             _                                                  _             ",
  "   __ _  ___| |_  /\/\   ___  __ _ ___ _   _ _ __ ___  ___   __| | _____   __ ",
  "  / _` |/ _ \ __|/    \ / _ \/ _` / __| | | | '__/ _ \/ __| / _` |/ _ \ \ / / ",
  " | (_| |  __/ |_/ /\/\ \  __/ (_| \__ \ |_| | | |  __/\__ \| (_| |  __/\ V /  ",
  "  \__, |\___|\__\/    \/\___|\__,_|___/\__,_|_|  \___||___(_)__,_|\___| \_/   ",
  "  |___/                                                                       ",
  ]

  const splashScreen = [
    "          ____ ___ ____ _ _  _ ____ ____ _   _ ____            ",
    "          [__   |  |__/ | |_/  |___ [__   \\_/  [__             ",
    "          ___]  |  |  \\ | | \\_ |___ ___]   |   ___]1.0         ",
    "                                                               ",
    "===============================================================",
    "                     Lee Measures © 2024                       ",
    " _     _  _______  ___      _______  _______  __   __  _______ ",
    "| | _ | ||       ||   |    |       ||       ||  |_|  ||       |",
    "| || || ||    ___||   |    |       ||   _   ||       ||    ___|",
    "|       ||   |___ |   |    |       ||  | |  ||       ||   |___ ",
    "|       ||    ___||   |___ |      _||  |_|  ||       ||    ___|",
    "|   _   ||   |___ |       ||     |_ |       || ||_|| ||   |___ ",
    "|__| |__||_______||_______||_______||_______||_|   |_||_______|",
    "===============================================================",
  ];

  React.useEffect(()=>{
    addToHistory(splashScreen);
  },[])

  // command functions
  const clearScreen = () => {
    setHistory([]);
  }
  const resetScreen = () => {
    setHistory(splashScreen);
  }
  const printHelp = (e: string) => {
    const helpLines = [
      `> ${e}`,
      " ",
      "Available Commands:",
      ...Object.values(commandList).map((item)=>{return `> ${item.command} - ${item.description}`}),
      "===============================================================",
    ]
    addToHistory(helpLines)
  }
  const printMenuList = () => {

  }

  // !command functions
  const commandList = {
    "help": {
      command: "help",
      description: "displays this help prompt",
      function: printHelp
    },
    "clear":{
      command: "clear",
      description: "clears the terminal history",
      function: clearScreen
    },
    "reset":{
      command: "reset",
      description: "resets the terminal",
      function: resetScreen
    },
    "menulist":{
      command: "menulist",
      description: "list available menus",
      function: printMenuList
    }
    // "menu":{
    //   command: "menu",
    //   description: "swap between menus",
    //   function: swapMenu
    // }
  }

  const addToHistory = (text: string | Array<string>) => {
    if (typeof(text) === "string") {
      setHistory( history.length < historyLength ? [...history, text] : [...history.slice(1,historyLength), text]);
    }
    else {
      setHistory( history.length + text.length < historyLength ? [...history, ...text] : [...history.slice(text.length,historyLength), ...text]);
    }
  }

  const commandHandler = (command: string) => {
    if (command === "") {
      addToHistory(" ");
      return
    }
    setCommandInput("");
    if (Object.keys(commandList).includes(command)) {
      setFailedCommands(0);
      // @ts-expect-error
      commandList[command].function(command);
    }
    else {
      addToHistory([
        `> ${command}`,
        `Command "${command}" not recognised. ${failedCommands > 1 ? "Try 'help'" : ""}`
      ])
      setFailedCommands(failedCommands + 1);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      commandHandler(commandInput);
    }
    else if(e.key === 'Backspace'){
      setCommandInput(commandInput.substring(0, commandInput.length-1));
    }
    else if (allowedKeys.indexOf(e.key) > -1 && commandInput.length < 50) {setCommandInput(commandInput + e.key)}
  }


  return (
    <>
        <div className="TerminalContainer">
          <div className="overlay" onClick={() => {document.getElementById("inputField")?.focus()}}/>
          <input 
            style={{width:`${commandInput.length+1}ch`}}
            type="text" 
            autoFocus
            id="inputField"
            value={commandInput}
            onKeyDown={handleKeyPress}
          />
          <div className="history">
          {history.map((command,i)=> {
            return (
              <div className="historyItem" key={i}>
                <pre>{command}</pre>
              </div>
            )
          })}
          </div>
        </div>
    </>
  )
}
