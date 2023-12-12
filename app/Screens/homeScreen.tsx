import React, { useContext, useState } from 'react';
import { View,Text,TouchableWithoutFeedback } from 'react-native';
import { Settings } from '@Components/settingsModal';
import { StationaryBalloon, balloonFaces } from '@Assets/balloon';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { VisualContext } from '@ContextManager';
import { DefaultModal } from '@Components/modal';
import {CreditsComponent} from '@Components/credits'

interface HomeScreenParams{
  navigation: NavigationProp<ParamListBase>
} 
export default function HomeScreen({navigation}:HomeScreenParams) {
    const [disableGameRerender,setDisableGameRerender]=useState(false)
    const [playerStyle,]= useContext(VisualContext)

    return (
        <View style={{flex:1, backgroundColor:"black"}}>
          <View style={{flex:1, alignItems:"center"}}>
              <View style={{width:"30%",height:"30%"}}>
                <StationaryBalloon Face={balloonFaces[playerStyle.face]()}/>
              </View>
              <TouchableWithoutFeedback disabled={disableGameRerender} onPress={()=>{
                  navigation.navigate("game",{isMulti:false})
                  setDisableGameRerender(true)
                  setDisableGameRerender(false)
              }}>
                  <Text style={{color:"white",marginTop:"20%", fontFamily:"8bitOperatorPlusSC-Bold"}}>Solo</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback disabled={disableGameRerender} onPress={()=>{
                  navigation.navigate("game",{isMulti:true})
                  setDisableGameRerender(true)
                  setDisableGameRerender(false)
              }}>
                  <Text style={{color:"white",marginTop:"20%", fontFamily:"8bitOperatorPlusSC-Bold"}}>Multiplayer</Text>
              </TouchableWithoutFeedback>
              <Settings navigation={navigation} SettingsView={<Text style={{color:"white",marginTop:"20%", fontFamily:"8bitOperatorPlusSC-Bold"}}>Settings</Text>}></Settings>
              <DefaultModal content={<CreditsComponent/>}  ButtonView={<Text style={{color:"white",marginTop:"20%", fontFamily:"8bitOperatorPlusSC-Bold"}}>Credits</Text>}></DefaultModal>
          </View>
        </View>
    );
  }