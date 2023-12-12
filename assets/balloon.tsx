import { useContext, useEffect, useRef, useState } from "react"
import { Animated, Easing } from "react-native"
import Svg, { G, Path } from "react-native-svg"
import { VisualContext } from "@ContextManager"
//use https://react-svgr.com/playground/?native=true to help convert svg images to React Native Code where you can animate and manipulate assets 
//or use a different method in animating assets

export interface JSXFunction{
  ():JSX.Element
}
interface BalloonStyle{
  Face?:JSX.Element,
  Color?:string
}
export const balloonFaces: JSXFunction[]=[DefaultFace,Smile,Frown,D1,D2,CoolGuy,BlindFolded,Athlete,Serious]
function DefaultFace(){
  return(<></>)
}
function Smile(){
  return(
    <G id="Smile" fill="#000120" stroke="#000120">
        <Path
          d="M481.748 194.513h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M624.42 194.488h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M500.919 214.51h20.001v19.996h-20.001V214.51Z"
        />
        <Path
          d="M624.42 214.51h-103.5v36.829h103.5V214.51Z"
        />
        <Path
          d="M520.92 154.356h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M604.468 154.311h20v19.997h-20v-19.997Z"
        />
      </G>
  )
}
function Frown(){
  return (
    <G id="Frown" fill="#000120" stroke="#000120">
    <Path
      d="M604.719 155.367h20.001v19.997h-20.001v-19.997Z"
    />
    <Path
      d="M521.171 155.367h20.001v19.997h-20.001v-19.997Z"
    />
    <Path
      d="M502.728 255.575h20.001v19.996h-20.001v-19.996Z"
    />
    <Path
      d="M521.171 235.353h20.001v19.997h-20.001v-19.997Z"
    />
    <Path
      d="M614.72 235.578h20v19.997h-20v-19.997Z"
    />
    <Path
      d="M634.768 255.575h20v19.996h-20v-19.996Z"
    />
    <Path
      d="M541.172 215.541h73.548v29.811h-73.548v-29.811Z"
    />
  </G>
  )
}
function D1(){
  return(
    <G id="D1" fill="#000120" stroke="#000120">
      <Path
        d="M495.883 175.337h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M519.066 155.34h20.001v19.997h-20.001V155.34Z"
      />
      <Path
        d="M539.067 135.254h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M499.066 135.344h20v19.996h-20v-19.996Z"
      />
      <Path
        d="M539.067 175.337h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M502.612 254.276h20.001v19.997h-20.001v-19.997Z"
      />
      <Path
        d="M482.612 234.279h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M522.613 254.276h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M542.613 274.273h20v19.996h-20v-19.996Z"
      />
      <Path
        d="M562.613 274.273h20.001v19.996h-20.001v-19.996Z"
      />
      <Path
        d="M582.614 274.273h20v19.996h-20v-19.996Z"
      />
      <Path
        d="M602.614 254.276h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M622.614 254.276h20.001v19.997h-20.001v-19.997Z"
      />
      <Path
        d="M642.615 234.279h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M622.614 135.254h20.001v19.997h-20.001v-19.997Z"
      />
      <Path
        d="M602.614 155.34h20v19.997h-20V155.34Z"
      />
      <Path
        d="M582.566 135.254h20v19.997h-20v-19.997Z"
      />
      <Path
        d="M622.614 175.337h20.001v19.997h-20.001v-19.997Z"
      />
      <Path
        d="M582.614 175.337h20v19.997h-20v-19.997Z"
      />
    </G>
  )
}
function D2(){
  return (
    <G id="D2" fill="#000120" stroke="#000120">
        <Path
          d="M489.126 234.602h153.549v21.282H489.126v-21.282Z"
        />
        <Path
          d="M499.126 175.337h20.001v19.997h-20.001v-19.997Z"
        />
        <Path
          d="M519.127 155.34h20v19.997h-20V155.34Z"
        />
        <Path
          d="M539.127 135.254h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M499.126 135.344h20.001v19.996h-20.001v-19.996Z"
        />
        <Path
          d="M539.127 175.337h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M622.675 135.254h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M602.675 155.34h20v19.997h-20V155.34Z"
        />
        <Path
          d="M582.626 135.254h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M622.675 175.337h20v19.997h-20v-19.997Z"
        />
        <Path
          d="M582.674 175.337h20.001v19.997h-20.001v-19.997Z"
        />
      </G>
  )
}
function CoolGuy(){
  return(
    <G id="CoolGuy" fill="#000120" stroke="#000120">
        <Path
          d="M521.818 232.617h103.549v32.997H521.818v-32.997Z"
        />
        <Path
          d="M461.91 155.34h225.083v19.997H461.91V155.34Z"
        />
        <Path
          d="M483.07 135.254h77.496v58.273H483.07v-58.273Z"
        />
        <Path
          d="M586.619 135.254h77.496v58.273h-77.496v-58.273Z"
        />
      </G>
  )
}


function BlindFolded(){
  return (
    <G id="BlindFolded" fill="#000120" stroke="#000120">
    <Path
      d="M514.887 250.188H642.43v28.601H514.887v-28.601Z"
    />
    <Path
      d="M461.91 112.588h220.73v66.087H461.91v-66.087Z"
    />
  </G>
  )
}

function Athlete(){
  return(
  <G id="Athlete" >
    <Path
      fill="#000120"
      stroke="#000120"
      d="M503.835 165.126h20v19.997h-20v-19.997Z"
    />
    <Path
      fill="#000120"
      stroke="#000120"
      d="M601.572 166.566h20.001v19.997h-20.001v-19.997Z"
    />
    <Path
      fill="#fff"
      stroke="#fff"
      d="M561.03 254.556h40.542v27.067H561.03v-27.067Z"
    />
    <Path
      fill="#000120"
      stroke="#000120"
      d="M462.557 95.504h220.73v44.423h-220.73V95.504Z"
    />
    <Path
      fill="#fff"
      stroke="#fff"
      d="M462.557 109.824h220.73v15.783h-220.73v-15.783Z"
    />
  </G>
  )
}
function Serious(){
  return(
    <G id="Serious" fill="#000120" stroke="#000120">
        <Path
          d="M499.174 135.254h60.001v20.042h-60.001v-20.042Z"
        />
        <Path
          d="M539.175 226.051h60.001v20.041h-60.001v-20.041Z"
        />
        <Path
          d="M582.674 135.254h60.001v20.042h-60.001v-20.042Z"
        />
        <Path
          d="M519.175 155.296h20v19.996h-20v-19.996Z"
        />
        <Path
          d="M602.675 155.296h20v19.996h-20v-19.996Z"
        />
      </G>
  )
}


export function StationaryBalloon({Face,Color}:BalloonStyle){
    //const translateY = useRef(new Animated.Value(0)).current;
    const [outlineColor,setOutlineColor]=useState("grey")
    const [visuals]=useContext(VisualContext)
    let balloonFillColor=Color?Color:visuals.balloonColor
    const translateY = useRef(new Animated.Value(0)).current;
    const faces=balloonFaces
    useEffect(()=>{},[visuals])
    useEffect(() => {
        const animationConfig = {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease), // Use Easing.inOut for smoother transitions
        };
    
        const upAndDownAnimation = Animated.sequence([
          Animated.timing(translateY, {
            ...animationConfig,
            toValue: 1,
          }),
          Animated.timing(translateY, {
            ...animationConfig,
            toValue: 0,
          }),
        ]);
    
        // Add a delay between animations to create smoother transitions
        const animationWithDelay = Animated.sequence([
          upAndDownAnimation,
          Animated.delay(100), // Adjust the delay duration as needed
        ]);
    
        Animated.loop(animationWithDelay).start();
    
        return () => {
          animationWithDelay.stop();
        };
      }, [translateY]);


    return (
        <Animated.View style={{transform: [{ translateY: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [-15, 0], // Adjust the vertical range as needed
          }) }]}}>
            <Svg
              strokeMiterlimit={10}
              viewBox="400 0 750 720"
              fillRule="nonzero"
              clipRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              height={"110%"}
              width={"110%"}
              style={{left:"25%",top:"8%"}}
            >
              <G
                fill={balloonFillColor}
                stroke={balloonFillColor}
                strokeLinejoin="round"
                strokeWidth={0.1}
              >
                <Path
                  d="M502.896 56.602h139.779v239.76H502.896V56.602z"
                  
                />
                <Path
                  d="M462.331 96.504h220.73v199.858h-220.73V96.504zM522.814 296.362h99.765v40.012h-99.765v-40.012zM542.854 336.374h59.941v40.012h-59.941v-40.012z"
                  
                />
              </G>
              {Face}
              <G
                fill={outlineColor}
                stroke={outlineColor}
                strokeLinejoin="round"
                strokeWidth={0.1}
              >
                <G >
                  <Path
                    d="M482.718 76.492h20v19.997h-20V76.492zM502.718 56.495h20v19.997h-20V56.495zM542.719 36.498h20v19.997h-20V36.498zM602.72 56.495h20v19.997h-20V56.495zM582.719 36.498h20.001v19.997h-20.001V36.498zM562.719 36.498h20v19.997h-20V36.498zM622.72 56.495h20v19.997h-20V56.495zM662.721 96.489h20v19.996h-20V96.489zM662.721 116.485h20v19.997h-20v-19.997zM682.721 136.482h20v19.997h-20v-19.997zM682.721 156.479h20v19.997h-20v-19.997zM682.721 176.476h20v19.997h-20v-19.997zM682.721 196.473h20v19.996h-20v-19.996z"
                    
                  />
                  <Path
                    d="M682.721 216.469h20v19.997h-20v-19.997zM682.721 236.466h20v19.997h-20v-19.997zM662.721 256.463h20v19.997h-20v-19.997z"
                    
                  />
                  <Path
                    d="M662.721 276.46h20v19.996h-20V276.46zM642.72 296.456h20.001v19.997H642.72v-19.997zM622.72 296.456h20v19.997h-20v-19.997zM602.72 316.453h20v19.997h-20v-19.997zM582.719 336.45h20.001v19.997h-20.001V336.45zM562.719 336.45h20v19.997h-20V336.45zM542.719 336.45h20v19.997h-20V336.45zM522.718 316.453h20.001v19.997h-20.001v-19.997z"
                    
                  />
                  <Path
                    d="M502.718 296.456h20v19.997h-20v-19.997zM482.718 296.456h20v19.997h-20v-19.997zM462.717 276.46h20.001v19.996h-20.001V276.46z"
                    
                  />
                  <Path
                    d="M462.717 256.463h20.001v19.997h-20.001v-19.997zM442.717 236.466h20v19.997h-20v-19.997zM442.717 216.469h20v19.997h-20v-19.997z"
                    
                  />
                  <Path
                    d="M442.717 196.473h20v19.996h-20v-19.996zM442.717 176.476h20v19.997h-20v-19.997zM442.717 156.479h20v19.997h-20v-19.997zM442.717 136.482h20v19.997h-20v-19.997zM462.717 116.485h20.001v19.997h-20.001v-19.997zM462.717 96.489h20.001v19.996h-20.001V96.489zM522.718 356.447h20.001v19.997h-20.001v-19.997zM502.718 376.444h20v19.996h-20v-19.996z"
                    
                  />
                  <Path
                    d="M522.718 376.444h20.001v19.996h-20.001v-19.996zM542.719 376.444h20v19.996h-20v-19.996zM602.72 356.447h20v19.997h-20v-19.997zM622.72 376.444h20v19.996h-20v-19.996zM602.72 376.444h20v19.996h-20v-19.996zM582.719 376.444h20.001v19.996h-20.001v-19.996zM562.719 376.444h20v19.996h-20v-19.996zM642.72 76.492h20.001v19.997H642.72V76.492zM522.718 56.495h20.001v19.997h-20.001V56.495z"
                    
                  />
                </G>
                <G >
                  <Path
                    d="M559.079 416.437h20v19.997h-20v-19.997zM539.079 436.434h20v19.997h-20v-19.997zM539.079 476.427h20v19.997h-20v-19.997zM559.079 516.421h20v19.997h-20v-19.997zM559.079 536.418h20v19.997h-20v-19.997zM559.079 556.415h20v19.996h-20v-19.996zM539.079 576.411h20v19.997h-20v-19.997zM539.079 596.408h20v19.997h-20v-19.997zM559.079 616.405h20v19.997h-20v-19.997zM559.079 636.402h20v19.997h-20v-19.997zM559.079 496.424h20v19.997h-20v-19.997z"
                    
                  />
                  <Path
                    d="M539.079 456.431h20v19.996h-20v-19.996zM559.079 396.44h20v19.997h-20V396.44z"
                    
                  />
                </G>
              </G>
            </Svg>
        </Animated.View>
          )
}