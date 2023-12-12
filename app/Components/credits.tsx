import React from 'react';
import { View, Image, Text } from 'react-native';
const bitStudio=require("@Assets/appIcon.png")
const photonEngine=require("@Assets/by-photon_long_c.png")
export const CreditsComponent = () => {
  return (
    <View style={{alignItems:'center', marginTop:"10%"}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',width:"90%"}} >
            <Text style={{flex: 1, textAlign:'center', fontFamily:"8bitOperatorPlusSC-Bold"}}>Game Framework{`\n`}by{`\n`}Binary Bit Studio</Text>
        <Image
            source={bitStudio}
            resizeMode="contain"
            style={{width:"30%",height:'100%' }}
        />
        </View>
        <View style={{width:"90%"}}>
        <Image
            source={photonEngine}
            resizeMode="contain"
            style={{width:"100%"}}
        />
        </View>
      </View>
  );
};
