import React from 'react';
import './index.scss'


export const Terminal = () => {
  const [commandInput, setCommandInput] = React.useState<string>("");
  const [history, setHistory] = React.useState<Array<string>>([""]);
  const [failedCommands, setFailedCommands] = React.useState<number>(0);

  React.useEffect(()=>{
    setHistory([]);
  },[]);

  const historyLength = 32;

  const allowedKeys="abcdefghijklmnopqrstuvwxyz0123456789/ ";


  const menuList = {
    "main": {
      lines: [
        "Main Menu"
      ]
    },
    "logs": {
      lines: [
        "Log list corrupted. Providing most recently available log"
      ]
    },
    "subject": {
      lines: [
        "Caution. Subject data partially corrupted."
      ]
    }
  }


  const splashScreen = [
                                               
    "         _____             _____ _____     ___     ___   ",
    "        |     |___ ___ ___|     |   __|_ _|_  |   |   |  ",
    "        | | | | -_| .'|_ -|  |  |__   | | |_| |_ _| | |  ",
    "        |_|_|_|___|__,|___|_____|_____|\\_/|_____|_|___|  ",
    `                     Lee Measures © ${new Date().getFullYear()}`,
    "                                                               ",
    "===============================================================",
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
  const printMenuList = (e: string) => {
    const lines = [
      `> ${e}`,
      " ",
      "List of Menus:",
      ...Object.keys(menuList).map((item)=>{return `> ${item}`})
    ]
    addToHistory(lines);
  }

  const printMenu = (e: string) => {
    console.log(e);
    if (e.split(" ").length > 2) {
      addToHistory(`Error. Too many parameters passed in command '${e}'`);
    }
    const menuName = e.split(" ")[1];
    // @ts-expect-error
    const lines = menuList[menuName].lines;
    addToHistory(lines);
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
    },
    "menu":{
      command: "menu",
      description: "Swap between menus. Usage: `menu <menu_name>`",
      function: printMenu
    }
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
    const fullCommand = command;
    if (command === "") {
      addToHistory(" ");
      return
    }
    setCommandInput("");
    if (command.split(" ").length > 1){
      command = command.split(" ")[0];
    }
    if (Object.keys(commandList).includes(command)) {
      setFailedCommands(0);
      // @ts-expect-error
      commandList[command].function(fullCommand);
    }
    else {
      addToHistory([
        `> ${command}`,
        `Command not recognised. ${failedCommands > 1 ? "Try 'help'" : ""}`
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
        <div className="overlay" onClick={() => {document.getElementById("inputField")?.focus()}}/>
        <pre id="arrow">{">"}</pre>
        <input 
          className="textinput"
          style={{maxWidth:`${commandInput.length+1}ch`}}
          type="text" 
          id="inputField"
          maxLength={15}
          autoFocus
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
        <div className="tscanlines"/>
    </>
  )
}
