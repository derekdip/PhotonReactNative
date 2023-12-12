import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Slider from "@react-native-community/slider"
import { GameStateContext } from '@ContextManager';

interface sliderParams{
    enabled?:boolean
}

export function NumberSlider ({enabled}:sliderParams) {
    const [gameState,setGameState] = useContext(GameStateContext);
    const [sliderValue, setSliderValue] = useState(1); // Initial value

    const handleSliderChange = (value:number) => {
      setSliderValue((value));
      setGameState({complete:"false",speedMultiplier:(value).toFixed(1)})
    };
    useEffect(()=>{
        let x=new Number(gameState.speedMultiplier?gameState.speedMultiplier:1)
        setSliderValue(x.valueOf())
    },[])
  
    return (
      <View >
        <Text style={{fontFamily:"8bitOperatorPlusSC-Bold"}}>Speed Multiplier {sliderValue.toFixed(1)}X</Text>
        <Slider
          disabled={enabled!=undefined?!enabled:true}
          minimumValue={.5}
          maximumValue={3}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
      </View>
    );
};
  