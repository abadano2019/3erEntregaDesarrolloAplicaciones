import { ActivityIndicator, View } from "react-native";
import { Game, GameOver, Records, StartGame } from "./screens";

import { Header } from "./components";
import { colors } from "./constants";
import { styles } from "./styles";
import { useFonts } from "expo-font";
import { useState } from "react";

const App = () => {
  const [loaded] = useFonts({
    "Karma-Regular": require("../assets/fonts/Karma-Regular.ttf"),
    "Karma-Bold": require("../assets/fonts/Karma-Bold.ttf"),
    "Karma-Medium": require("../assets/fonts/Karma-Medium.ttf"),
    "Karma-Light": require("../assets/fonts/Karma-Light.ttf"),
    "Karma-SemiBold": require("../assets/fonts/Karma-SemiBold.ttf"),
  });
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timeEnd, setTimeEnd] = useState(0);
  const [endGame,setEndGame] = useState(true)
  const [error, setGuessErrors] = useState(0);
  const [viewRecords, setViewRecords] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [orderTasks, setOrderTasks] = useState([])
  

  const onHandleStarGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
    const start = new Date();
    setTimeStart(start.getTime());
  };

  const onHandleGameOver = (rounds, error) => {
    setGuessRounds(rounds);
    setGuessErrors(error);
    const end = new Date();
    setTimeEnd(end.getTime())
    setEndGame(true)
  };

  const onHandleRestartGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
    setTimeEnd(0);
    setTimeStart(0);
    setGuessErrors(0);
  };

  const orderRecord = () =>{
    tasks.sort( (a, b) => {
      if(a.rounds < b.rounds) {
        return -1;
      }
      if(a.rounds > b.rounds) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      if (a.error < b.error) {
        return -1;
      }
      if (a.error < b.error) {
        return 1;
      }
      return 0;
    }) 

    setOrderTasks(tasks)
      

  }


  const onHandleRecords = () =>{
    
    if(endGame) {setTasks([
              ...tasks,
              {
                id: Math.random().toString(),
                rounds: guessRounds,
                time: timeEnd - timeStart,
                error: error,
              }
      
              ])}

    //orderRecord()
    
    tasks.sort( (a, b) => {
      if(a.rounds < b.rounds) {
        return -1;
      }
      if(a.rounds > b.rounds) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      if (a.error < b.error) {
        return -1;
      }
      if (a.error < b.error) {
        return 1;
      }
      return 0;
    }) 
          
    setOrderTasks(tasks)
    setViewRecords(true);
    
  }

  
  const onHandleReturn = () =>{
    setViewRecords(false)
    setEndGame(false)
  }
  
  const Content = () => {
    
    if (viewRecords) {
      return(<Records 
        onHandleReturn={onHandleReturn} 
        tasks = {tasks}/>)
    }
    
    if (userNumber && guessRounds <= 0) {
      return <Game selectedNumber={userNumber} onHandleGameOver={onHandleGameOver}/>;
    }

    if (guessRounds > 0) {
      
      
      return (
        <GameOver
          onHandleRestartGame={onHandleRestartGame}
          onHandleRecords={onHandleRecords}
          rounds={guessRounds}
          selectedNumber={userNumber}
          time = {timeEnd - timeStart}
          error = {error}
        
        />
      );
    }

    return <StartGame onHandleStarGame={onHandleStarGame} />;
  };

  if (!loaded) {
    return (
      <View style={styles.containerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Adivina el numero" />
      <Content />
    </View>
  );
};

export default App;
