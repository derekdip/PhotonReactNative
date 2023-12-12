import { ReactElement, useState } from "react"
import { TouchableWithoutFeedback, Modal, View, Text } from "react-native"

interface DefaultModalParams{
    content:ReactElement,
    ButtonView:ReactElement
}

export function DefaultModal({content, ButtonView}:DefaultModalParams){
    const [modalVisible,setModalVisible]=useState(false)
    return (
        < >
            
        <TouchableWithoutFeedback onPress={()=>{
            setModalVisible(true)
        }}>
            {ButtonView}
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
                            {content}
                        </View>
                        </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}