import { useContext, useEffect, useRef, useState} from 'react';
import { Animated, View, Text } from 'react-native';
import { blockSize } from '@GameConfig';
import { StationaryBalloon, balloonFaces } from '@Assets/balloon';
import { MazeContext, PhotonClientContext, VisualContext } from '@ContextManager';
import { PhotonPlayer, PlayerCharacteristic } from "@NetworkObjects/player"
import { MazeData } from '@Assets/maps';


 function Player(){
    let loadBalancerClient = useContext(PhotonClientContext)
    if(!(loadBalancerClient)){
        return <></>
    }
    if(loadBalancerClient.isJoinedToRoom()){
        let rrf=useRef(new Animated.ValueXY())
        const [playerCharacteristic,setPlayerCharacteristic]=useState<PlayerCharacteristic>({faceIndex:0,color:"red"})
        const networkPlayer=new PhotonPlayer(rrf,setPlayerCharacteristic);
        loadBalancerClient.setPlayersRef(networkPlayer)
    return (
        <Animated.View style={{position:'absolute', width:blockSize, height:blockSize, transform: rrf.current.getTranslateTransform() }}>
            <View style={{left:-blockSize/2,top:-blockSize/2}}>
            <StationaryBalloon Face={balloonFaces[playerCharacteristic.faceIndex]()} Color={playerCharacteristic.color}/>
            </View>
        </Animated.View>
    )
    }
    return <></>
 }

export default function Maze() {
    const [mazeData,setMazeData]=useContext(MazeContext);
    const [visuals]=useContext(VisualContext)
    function Map(mazeData:MazeData){
        let mapWalls: Array<JSX.Element>=[]
        for(let wall of mazeData.wallVals){
            mapWalls.push(<View style={{position:'absolute',top:blockSize*Math.floor(wall/mazeData.mapWidth), left:blockSize*Math.floor(wall%mazeData.mapWidth),backgroundColor:visuals.blockColor,width:blockSize,height:blockSize}}></View>)
        }
        mapWalls.push(
            <View style={{position:'absolute',backgroundColor:"white",left:blockSize*mazeData.endBlock.horizontal,top:blockSize*mazeData.endBlock.vertical, width:blockSize,height:blockSize,zIndex:100}}>
                    <Text>endBlock</Text>
            </View>
        )
        return mapWalls
    }
    let players:Array<JSX.Element>=[]
    for(let i=0;i<10;i++){
        players[i]=Player();
    }
    let loadBalancerClient = useContext(PhotonClientContext)
    if(!(loadBalancerClient)){
            return <></>
    }
    if(loadBalancerClient.isJoinedToRoom()){
        loadBalancerClient.initializePlayers()
        useEffect(()=>{ //very important useEffect when settingPlayerCharacteristics it causes a re-render so we only send out that data once 
            loadBalancerClient?.setPlayerCharacteristics({color:visuals.balloonColor,faceIndex:visuals.face})
        },[])
    }

    return (
        <View>
            {players}
            {Map(mazeData)} 
        </View>
    );
  }
