import React,{ useContext, useEffect, useRef, useState} from 'react';
import { Animated, Modal, TouchableWithoutFeedback, View,Text} from 'react-native';
import Maze from "@Components/maze"
import {Menu} from '@Components/settingsModal';
import Stick from '@Components/stick';
import { blockSize, userDisplacement } from '@GameConfig';
import { Block, GameStateContext, MazeContext, PhotonClientContext, PlayerContext, PhotonPlayersContext } from '@ContextManager'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { PhotonPlayer } from '@NetworkObjects/player';
import { mazeData, MazeData} from "@Assets/maps"

interface GameParams{
  navigation: NavigationProp<ParamListBase>
  setToggleRestart: Function
  isMulti:boolean
} 

interface GameScreenParams{
  navigation:NavigationProp<ParamListBase>
}
interface MapRefBufferParams{
  playerData:Block
}
function MapRefBuffer({playerData}:MapRefBufferParams){
  let mapPositionRef=useRef(new Animated.ValueXY({x:userDisplacement.x-playerData.horizontal*blockSize,y:userDisplacement.y-playerData.vertical*blockSize})).current
  useEffect(()=>{
    mapPositionRef.setValue({x:userDisplacement.x-playerData.horizontal*blockSize,y:userDisplacement.y-playerData.vertical*blockSize})
  },[playerData])
    return (
      <>
        <Stick updateRef={(updateX: number, updateY: number) => {
          mapPositionRef.setValue({ x: userDisplacement.x - updateX * blockSize, y: userDisplacement.y - updateY * blockSize });
        }}/>
        <Animated.View style={{ left: mapPositionRef.x, top: mapPositionRef.y }}>
            <Maze/>
        </Animated.View>
      </>
    )
}

export function GameScreen(props: { navigation: any; route: { params: { isMulti: boolean; }; }; }){
  const [toggleRestart,setToggleRestart]=useState(false)
  const [gameState,setGameState] = useContext(GameStateContext);
  const navigation=props.navigation
  const isMulti=props.route.params.isMulti
  function restart(){
    setToggleRestart(!toggleRestart)
    setGameState({complete:"",speedMultiplier:gameState.speedMultiplier})
  }
  useEffect(()=>{
    setGameState({complete:"",speedMultiplier:gameState.speedMultiplier})
  },[])
  
  return(
    <>
    {toggleRestart && <Game navigation={navigation} setToggleRestart={()=>restart()} isMulti={isMulti}/>}
    {!toggleRestart && <Game navigation={navigation} setToggleRestart={()=>restart()} isMulti={isMulti}/>}
    </>
  )
}

export default function Game({navigation,setToggleRestart,isMulti}:GameParams) {
  const [mazeDataInfo, setMazeData] = useState<MazeData>(mazeData);
  const [playerData, setPlayerData] = useState<Block>(new Block(0,0));
  const [rerenderMap,setRerenderMap]=useState<boolean>(true)
  const [modalVisible,setModalVisible]=useState<boolean>(false)
  const loadBalancerClient = useContext(PhotonClientContext)
  if(!isMulti){
    useEffect(()=>{
      let map=mazeData
      let path=map
      setMazeData(path)
      setPlayerData(new Block(map?.playerPosition.vertical,map.playerPosition.horizontal))
      setRerenderMap(false)
    },[])
  }else{
    useEffect(()=>{
      loadBalancerClient?.start()
      setTimeout(()=>{
        const gameData=loadBalancerClient?.myRoom().getCustomProperty("map")
        if(!gameData){ //we dont create a map if theres no map
          return;
        }
        let path:MazeData;
        let startBlock:Block;
        path=gameData
        startBlock=new Block(gameData?.playerPosition.vertical,gameData.playerPosition.horizontal)
        setMazeData(path)
        setPlayerData(startBlock)
        setRerenderMap(false)
      },5000)
      return(()=>{
        loadBalancerClient?.disconnect()
      })
    },[])
  }
const [_,setPlayersProviderState]=useState<Array<PhotonPlayer>>([])
const players:Array<React.MutableRefObject<Animated.ValueXY>|undefined>=Array.apply(0, new Array(10)).map(i => undefined)
  return (
    
    <PlayerContext.Provider value={[playerData,setPlayerData]}>
      <PhotonPlayersContext.Provider value={[[],setPlayersProviderState]}>
      <MazeContext.Provider value={[mazeDataInfo,setMazeData]}>
      { modalVisible &&
      <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      >
          <View style={{flex:1, justifyContent:'center'}}>
              <View style={{ justifyContent:'space-evenly',alignSelf:'center',alignItems:'center',width:"50%",height:"20%",backgroundColor:'rgba(256,256,256,1)'}}>
                  <TouchableWithoutFeedback onPress={()=>{
                      setToggleRestart()
                      setModalVisible(false)
                      }}>
                      <Text style={{fontFamily:"8bitOperatorPlusSC-Bold"}}>Play Again</Text>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>{
                      navigation.navigate('home')
                      setModalVisible(false)
                      }}>
                      <Text style={{fontFamily:"8bitOperatorPlusSC-Bold"}}>Home</Text>
                  </TouchableWithoutFeedback>
              
              </View>
              </View>
      </Modal>
      }
      <View style={{backgroundColor:"black",position:'relative',width:'100%',height:'100%'}}>
        {!rerenderMap&& <MapRefBuffer playerData={playerData}/>}
        <Menu navigation={navigation} ></Menu>
      </View>
      </MazeContext.Provider>
      </PhotonPlayersContext.Provider>
    </PlayerContext.Provider>
  );
}

