
import { ScrollView,TouchableWithoutFeedback, View } from 'react-native';
import { StationaryBalloon,balloonFaces } from '@Assets/balloon';
import { useContext, useEffect, useRef, useState } from 'react';
import { windowHeight } from '@GameConfig';
import { VisualContext } from '@ContextManager';
interface CarouselParams{
    children: Array<JSX.Element>
    snapToInterval:number
    height?:number|string
    onIndexChange?:Function
    startingIndex?:number
    scrollEnabled?:boolean
}
interface PlayerCarouselParams{
    scrollEnabled?:boolean
}
export function Carousel({children,snapToInterval,onIndexChange,startingIndex,height,scrollEnabled}:CarouselParams){
    const scrollViewRef = useRef<ScrollView | null>(null);
    const [scrollViewRefSet, setScrollViewRefSet] = useState(false);

    const handleMomentumScrollEnd = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / snapToInterval); // Calculate the index
        if(onIndexChange){
            onIndexChange(index)
        };
    };
    const scrollToIndex = (index:number) => {
        if (scrollViewRef.current) {
          const offset = index * snapToInterval;
          scrollViewRef.current.scrollTo({ x: offset, animated: false });
        }
      };
      useEffect(() => {
        if (!scrollViewRefSet && scrollViewRef.current) {
          setTimeout(()=>{scrollToIndex(startingIndex?startingIndex:0)}); 
          setScrollViewRefSet(true); 
        }
      }, [scrollViewRefSet]);
    return(
            <ScrollView style={{width:snapToInterval,height:height, alignSelf:'center'}} ref={scrollViewRef} snapToInterval={snapToInterval} pagingEnabled={true} snapToAlignment='center' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled={scrollEnabled!=undefined?scrollEnabled:true} horizontal={true} onMomentumScrollEnd={handleMomentumScrollEnd}>
                <TouchableWithoutFeedback >
                    <View style={{flexDirection:'row'}}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
    )
}
export function PlayerChoiceCarousel({scrollEnabled}:PlayerCarouselParams){
    let choices=[]
    const [visual,setVisual] = useContext(VisualContext);
    let individualHeight=Math.round( windowHeight*.15)
    let i=0
    for(let face of balloonFaces){
        choices.push(
        <View key={i} style={{width:individualHeight,height:individualHeight}}>
                  <View style={{width:"100%",height:"100%",alignSelf:'center'}}>
                  <StationaryBalloon Face={face()}/>
                  </View>
        </View>
        )
        i++
    }
    
    return(
        <Carousel   
            snapToInterval={individualHeight} 
            scrollEnabled={scrollEnabled}
            onIndexChange={(index:number)=>{
                setVisual({face:index,balloonColor:visual.balloonColor,blockColor:visual.blockColor})
            }} 
            startingIndex={balloonFaces.findIndex((func)=>func.name==balloonFaces[visual.face]().props.id)}>
              {choices}
        </Carousel>
            
    )
}