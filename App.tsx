import React, { useCallback, useState } from 'react';
import HomeScreen from '@Screens/homeScreen';
import { GameScreen } from '@Screens/gameScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { VisualProperties, VisualContext, GameStateContext, GameSession, PhotonClientContext } from '@ContextManager';
import { DemoLoadBalancing } from 'Photon/src/demo-loadbalancing/app';

const Stack=createNativeStackNavigator()
export default function App() {
  const [visualProperties,setVisualProperties]=useState<VisualProperties>({face:0,balloonColor:"red",blockColor:"yellow"});
  const [gameComplete,setGameComplete]=useState<GameSession>({complete:"false"});
  const [loadBalancer,setLoadBalancer]=useState<DemoLoadBalancing>(new DemoLoadBalancing)
  const [fontsLoaded] = useFonts({
    '8bitOperatorPlusSC-Bold': require('./assets/8bitOperatorPlusSC-Bold.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {}, [fontsLoaded]);

  if (!fontsLoaded ) {
    return null;
  }


  return (
    <VisualContext.Provider value={[visualProperties,setVisualProperties]}>
        <GameStateContext.Provider value= {[gameComplete,setGameComplete]}>
        <PhotonClientContext.Provider value={loadBalancer}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
              name='home'
              component={HomeScreen}
              options={{header(props) {
                  return<View style={{height:50, backgroundColor:'black'}}></View>
              },}}
              />
              <Stack.Screen
                name='game'
                component={GameScreen}
                options={{header(props) {
                    return<></>
                },gestureEnabled:false,animation:'none'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
          </PhotonClientContext.Provider>
        </GameStateContext.Provider>
    </VisualContext.Provider>
  );
}

