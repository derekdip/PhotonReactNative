import {Dimensions} from 'react-native';
export const windowWidth = Dimensions.get('screen').width;
export const windowHeight = Dimensions.get('screen').height;

export const playerSize=18
export const blockSize=windowHeight/9
export const joyStickHorizontalMax=100
export const joyStickVerticalMax=100
export const userDisplacement={
    x:windowWidth/2,
    y:windowHeight/2
}
export const speed=.05


