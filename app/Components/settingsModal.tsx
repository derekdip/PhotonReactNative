import React,{useContext, useState} from 'react'
import { Modal, View,Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Carousel, PlayerChoiceCarousel } from '@Components/carousel'
import { windowHeight, windowWidth } from '@GameConfig'
import { NumberSlider } from '@Components/slider'
import { VisualContext } from '@ContextManager'
interface settingTypes{
    navigation:any
    SettingsView?:JSX.Element[]| React.ReactElement<any, string | React.JSXElementConstructor<any>>
}


export function Settings({navigation, SettingsView}:settingTypes){
    const [modalVisible,setModalVisible]=useState(false)
    const [playerStyle,setPlayerStyle]= useContext(VisualContext)
    const colors=['red','green','blue','yellow','pink','orange']
    let colorViewsBlock:Array< JSX.Element>=[]
    let colorViewsBalloon:Array< JSX.Element>=[]
    let colorPickerWidth=windowWidth/2
    let colorPickerHeight=windowHeight/20
    for(let color of colors){
        colorViewsBlock.push(
                <View style={{backgroundColor:color, width:colorPickerWidth ,height:colorPickerHeight}}></View>
            )
    }
    for(let color of colors){
        colorViewsBalloon.push(
                <View style={{backgroundColor:color, width:colorPickerWidth ,height:colorPickerHeight}}></View>
            )
    }


    
    return(
        < >
            
                <TouchableWithoutFeedback onPress={()=>{
                    setModalVisible(true)
                }}>
                    {SettingsView}
                </TouchableWithoutFeedback>
            
            <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{
                setModalVisible(false)
            }}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    setModalVisible(false)
                }}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <TouchableWithoutFeedback onPress={()=>{
                        setModalVisible(true)}
                        }>
                    <View style={{ alignSelf:'center',width:"60%",backgroundColor:'rgba(256,256,256,1)'}}>
                        <View style={{padding:"3%"}}>
                        <ScrollView >
                        <View style={{marginBottom:"8%"}}>
                            <Text style={{fontFamily:"8bitOperatorPlusSC-Bold",marginBottom:"3%"}}>Block Colors</Text>
                            <Carousel scrollEnabled={true} snapToInterval={colorPickerWidth} children={colorViewsBlock} height={colorPickerHeight}
                            onIndexChange={(index:number)=>setPlayerStyle({face:playerStyle.face, blockColor:colors[index], balloonColor:playerStyle.balloonColor})}
                            startingIndex={colors.findIndex((color)=>color==playerStyle.blockColor)}
                            />
                        </View>
                        <View style={{marginBottom:"8%"}}>
                            <Text style={{fontFamily:"8bitOperatorPlusSC-Bold",marginBottom:"3%"}}>Balloon Colors</Text>
                            <Carousel scrollEnabled={true} snapToInterval={colorPickerWidth} children={colorViewsBalloon} height={colorPickerHeight}
                            onIndexChange={(index: number)=>setPlayerStyle({face:playerStyle.face, blockColor:playerStyle.blockColor, balloonColor:colors[index]})}
                            startingIndex={colors.findIndex((color)=>color==playerStyle.balloonColor)}
                            />
                        </View>
                        <View >
                            <Text style={{fontFamily:"8bitOperatorPlusSC-Bold"}}>Styles</Text>
                            <PlayerChoiceCarousel scrollEnabled={true}/>
                        </View>
                        <View >
                            <NumberSlider enabled={true}/>
                        </View>
                        </ScrollView>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export function Menu({navigation, SettingsView}:settingTypes){
    const [modalVisible,setModalVisible]=useState(false)
    
    return(
        < >
            <View style={{position:'absolute',alignItems:'center',justifyContent:'center', zIndex:10, right:"10%",top:"15%",padding:"2%", backgroundColor:'white'}}>
                <TouchableWithoutFeedback onPress={()=>{
                        setModalVisible(true)
                    }}>
                        <Text style={{fontFamily:"8bitOperatorPlusSC-Bold"}}>Menu</Text>
                    </TouchableWithoutFeedback>
            </View>
            <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{setModalVisible(false)}}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    setModalVisible(false)
                }}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <TouchableWithoutFeedback onPress={()=>{
                        setModalVisible(true)}
                        }>
                    <View style={{ justifyContent:'space-evenly',alignSelf:'center',alignItems:'center',width:"70%",height:"20%",backgroundColor:'rgba(256,256,256,1)'}}>
                        <TouchableWithoutFeedback onPress={()=>{
                            navigation.navigate('home')
                            setModalVisible(false)
                            }}>
                            <Text style={{fontFamily:"8bitOperatorPlusSC-Bold"}}>Home</Text>
                        </TouchableWithoutFeedback>
                    
                    </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}
