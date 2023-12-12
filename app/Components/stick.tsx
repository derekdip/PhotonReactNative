import React,{ useContext, useEffect, useRef, useState} from 'react';
import { Animated, GestureResponderEvent, StyleSheet, View } from 'react-native';
import { blockSize, joyStickHorizontalMax, joyStickVerticalMax, playerSize, speed, userDisplacement } from '@GameConfig';
import { StationaryBalloon, balloonFaces } from '@Assets/balloon';
import { PlayerContext, MazeContext, GameStateContext, VisualContext, PhotonClientContext } from '@ContextManager';
interface StickParams{
  updateRef:Function
}

export default function Stick({updateRef}:StickParams){
  const [playerData]=useContext(PlayerContext);
  const [mazeData] = useContext(MazeContext);
  const [gameState,setGameState] = useContext(GameStateContext);
  const [playerStyle]= useContext(VisualContext)
  const loadBalancerClient = useContext(PhotonClientContext)


  const touch = useRef(new Animated.ValueXY({x:0,y:0})).current
  const playerPosition2=useRef({x:playerData.horizontal,y:playerData.vertical}).current

  const [joyStick,setJoyStick]=useState({visible:0,x:0,y:0})
  const [touchState,setTouchState]=useState({x:0,y:0}) 
  const [playerEnabled,setPlayerEnabled]=useState(true)
  const newSpeed=speed * (gameState.speedMultiplier?gameState.speedMultiplier:1)
  
  let lastMessageSent={x:0, y:0}

  function updateUser(direction:string){ //----------player position is broadcast to other photon players at the end of this function ----------------//
    let newX=playerPosition2.x
    let newY=playerPosition2.y
    let oldX=newX
    let oldY=newY
      if(direction.includes("up")) {
        newY=playerPosition2.y-newSpeed
      }
      if(direction.includes("down")) {
          newY=playerPosition2.y+newSpeed
      }
      if(direction.includes("right")) {
          newX=playerPosition2.x+newSpeed
      }
      if(direction.includes("left")) {
          newX=playerPosition2.x-newSpeed
      }
      if(direction.includes("up") && direction.includes("right")){
        newY=playerPosition2.y-(newSpeed*.7)
        newX=playerPosition2.x+(newSpeed*.7)
      }
      if(direction.includes("up") && direction.includes("left")){
        newY=playerPosition2.y-(newSpeed*.7)
        newX=playerPosition2.x-(newSpeed*.7)
      }
      if(direction.includes("down") && direction.includes("right")){
        newY=playerPosition2.y+(newSpeed*.7)
        newX=playerPosition2.x+(newSpeed*.7)
      }
      if(direction.includes("down") && direction.includes("left")){
        newY=playerPosition2.y+(newSpeed*.7)
        newX=playerPosition2.x-(newSpeed*.7)
      }
      
      let isValid=checkPlayerBounds(oldX,oldY,newX,newY)
      if(isValid.validX){
        playerPosition2.x=newX
      }
      if(isValid.validY){
        playerPosition2.y=newY
      }
      updateRef(playerPosition2.x,playerPosition2.y)
      if(loadBalancerClient!=null){
        if(Math.abs(lastMessageSent.x-playerPosition2.x)>0.3||Math.abs(lastMessageSent.y-playerPosition2.y)>0.3){
          loadBalancerClient.sendMessage(playerPosition2.x, playerPosition2.y)
          lastMessageSent={x:playerPosition2.x,y:playerPosition2.y}
        }
      }
}
function checkPlayerBounds(oldX:number,oldY:number,newX: number,newY: number){
  let validityX=true
  let validityY=true

  // if(mazeData.mapWidth<Math.floor(newY)+1||Math.floor(newY)<0){
  //   validityY=false
  // }
  // if(mazeData.mapHeight<Math.floor(newX)+1||Math.floor(newX)<0){
  //   validityX=false
  // }

  if(validityX){
    if(mazeData.wallVals.indexOf(Math.floor(oldY)*mazeData.mapWidth+Math.floor(newX))!=-1){ //a better approach would to store the blocks in a hastable so checking would only take O(1) on average instead of O(n)
      validityX=false
    } 
    if(newX-oldX>0&&newX+(playerSize/blockSize)<mazeData.mapWidth&&mazeData.wallVals.indexOf(Math.floor(oldY)*mazeData.mapWidth+Math.floor(newX))!=-1){
      validityX=false
    }
  }
  if(validityY){
    if(mazeData.wallVals.indexOf(Math.floor(newY)*mazeData.mapWidth+Math.floor(oldX))!=-1){
      validityY=false
    }
    if(newY-oldY>0&&newY+(playerSize/blockSize)<mazeData.mapHeight&&mazeData.wallVals.indexOf(Math.floor(newY)*mazeData.mapWidth+Math.floor(oldX))!=-1){
      validityY=false
    }
  }
  
  if(!validityX||!validityY){
    return {validX:validityX,validY:validityY}
  }

  if(mazeData.endBlock.vertical==Math.floor(newY)&& mazeData.endBlock.horizontal==Math.floor(newX)){
    console.log("you made it")
    setPlayerEnabled(false)
    validityX=true
    validityY=true
    setTimeout(()=>{
      updateRef(Math.floor(newX),Math.floor(newY)-.3)
      setGameState({complete:"true",speedMultiplier:gameState.speedMultiplier})
    },70)
    return {validX:validityX,validY:validityY}
  }
  
  return {validX:validityX,validY:validityY}
  
}
  function updateTouchState(e:GestureResponderEvent) {
    if(!playerEnabled){
        setJoyStick({visible:0,x:0,y:0})
        touch.setValue({x:0,y:0})
      return
    }
    setTouchState({x:e.nativeEvent.locationX,y:e.nativeEvent.locationY})
    touch.setValue({x:e.nativeEvent.locationX,y:e.nativeEvent.locationY})
    let direction=""
    if (Math.abs(touchState.x-joyStick.x)>10 && touchState.x-joyStick.x>10){
        direction+="right"
    }else if(touchState.x-joyStick.x<-10){
        direction+="left"
    }else{
        direction=""
    }
    if (Math.abs(touchState.y-joyStick.y)>10 && touchState.y-joyStick.y>10){
        direction+="down"
    }else if(touchState.y-joyStick.y<-10){
        direction+="up"
    }else if(direction==""){
        direction=""
    }
    updateUser(direction)
  }


  useEffect(()=>{
    updateRef(playerData.horizontal,playerData.vertical)
  },[])

  return(
    <View style={styles.container} onStartShouldSetResponder={()=>true}
    onResponderStart={(e)=>{
      if(playerEnabled){
        setJoyStick({visible:1,x:e.nativeEvent.locationX,y:e.nativeEvent.locationY})
        setTouchState({x:e.nativeEvent.locationX,y:e.nativeEvent.locationY})
        touch.setValue({x:e.nativeEvent.locationX,y:e.nativeEvent.locationY})
      }
    }}
    onResponderEnd={(e)=>{
      if(playerEnabled){
        setJoyStick({visible:0,x:0,y:0})
        touch.setValue({x:0,y:0})
      }
    }}
    onResponderMove={(e)=>{
        updateTouchState(e)
    }} 
    >
      {playerEnabled&&
      <>
        <View style={{position:'absolute',
        left:joyStick.x,
        top:joyStick.y,
        height:50,
        width:50,
        borderRadius:20,
        backgroundColor:`rgba(0,10,110,${joyStick.visible})`,
        zIndex:4,
        }}>
        </View>
        <Animated.View style={{position:'absolute',
        left:(Math.abs(touchState.x-joyStick.x)<joyStickHorizontalMax 
            ?touch.x
            :
                (touchState.x-joyStick.x)>joyStickHorizontalMax
                ?joyStick.x+joyStickHorizontalMax
                :joyStick.x-joyStickHorizontalMax
            ),
        top:(Math.abs(touchState.y-joyStick.y)<joyStickVerticalMax 
            ?touch.y
            :
            (touchState.y-joyStick.y)>joyStickVerticalMax
            ?joyStick.y+joyStickVerticalMax
            :joyStick.y-joyStickVerticalMax
        ),
        height:30,
        width:30,
        borderRadius:20,
        backgroundColor:`rgba(200,100,0,${joyStick.visible})`,
        zIndex:4,
        }}>

        </Animated.View>
        </>
}
        <View style={{position:'absolute',
        flex: 1,
        height: blockSize,
        width:blockSize,
        left:userDisplacement.x-blockSize/2,
        top:userDisplacement.y-blockSize/2,
        marginTop:0,
        marginLeft:0,
        alignSelf:"center",
        zIndex:4,
        }}>
            <StationaryBalloon Face={balloonFaces[playerStyle.face]()}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position:'absolute',
      width:"100%",
      height:1000,
      zIndex:5,
    },
  });