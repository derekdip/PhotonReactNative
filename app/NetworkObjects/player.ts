import { Animated } from "react-native";
export interface PlayerCharacteristic{
    faceIndex:number,
    color:string
}

export class PhotonPlayer{
    private hasBeenNetworkInitialized:boolean=false;
    private playerXYRef:React.MutableRefObject<Animated.ValueXY>
    private playerID:string=""
    private characteristics:PlayerCharacteristic={
        faceIndex:0,
        color:""
    }
    public setCharacteristic:(params:{faceIndex:number;color:string})=>void
    public playerVelocity=0;

    public constructor(playerXYRef:React.MutableRefObject<Animated.ValueXY>, setCharacteristic:(params:{faceIndex:number;color:string})=>void){
        this.playerXYRef=playerXYRef
        this.setCharacteristic=setCharacteristic
    }
    public getCharacteristic(){
        return this.characteristics
    }
    public setNetworkInitialized(isInitialized:boolean){
        this.hasBeenNetworkInitialized=isInitialized
    }
    public getHasBeenNetworkInitialized(){
        return this.hasBeenNetworkInitialized
    }
    public getPlayerID(){
        return this.playerID
    }
    public setPlayerID(playerID:string){
        this.playerID=playerID
    }
    public getPlayerRef(){
        return this.playerXYRef
    }
}