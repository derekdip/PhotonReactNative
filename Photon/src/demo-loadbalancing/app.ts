// <reference path="Photon/Photon-Javascript_SDK.d.ts"/>
import { Exitgames, Photon } from "./Photon/Photon-Javascript_SDK"
import { Animated } from "react-native";
import { blockSize } from "@GameConfig";
import { PhotonPlayer,PlayerCharacteristic } from "@NetworkObjects/player";
import { PHOTON_APP_ID, PHOTON_APP_VERSION} from "@env"
import { mazeData } from "@Assets/maps";

let AppId = PHOTON_APP_ID;
let AppVersion = PHOTON_APP_VERSION
let MasterServer: string 
let NameServer: string

let ConnectOnStart = true;
export class DemoLoadBalancing extends Photon.LoadBalancing.LoadBalancingClient {
    logger = new Exitgames.Common.Logger("Demo:");
    public players:Array<PhotonPlayer>=[]
    constructor() {
        super(1, AppId, AppVersion);
        this.setLogLevel(Exitgames.Common.Logger.Level.INFO);
    }
    start() {
        //this.setupUI();
        // connect if no fb auth required
        if (ConnectOnStart) {
            if (MasterServer) {
                this.setMasterServerAddress(MasterServer);
                this.connect();
            }
            if (NameServer) {
                this.setNameServerAddress(NameServer);
                this.connectToRegionMaster("usw");
            }
            else {
                this.connectToRegionMaster("usw");
                //this.connectToNameServer({ region: "EU", lobbyType: Photon.LoadBalancing.Constants.LobbyType.Default });
            }
        }
        
        setTimeout(()=>{
            if(this.availableRooms().length>0){
                this.joinRoom(this.availableRooms()[0].name, { expectedUsers:  this.availableRooms()[0].expectedUsers });
            }else{
                if (this.isInLobby()) {
                    this.createRoom();
                }
            }
            
        },2000)
    }
    getActorByActorNum(actorNr:number){
        let targetActor:Photon.LoadBalancing.Actor|undefined=undefined;
        for(let actor of this.myRoomActorsArray()){
            if(actor.actorNr==actorNr){
                    targetActor=actor
                }
        }
        return targetActor
    }
    setPlayersRef(player:PhotonPlayer){
            this.players.push(player)
    }
    setPlayerCharacteristics({color,faceIndex}:PlayerCharacteristic){
        this.myActor().setCustomProperty("face", faceIndex)
        this.myActor().setCustomProperty("color", color)
        this.raiseEvent(2,{message:"player Characteristics", senderName: "user" + this.myActor().actorNr})
    }
    async onJoinRoom(createdByMe: boolean){
        if(createdByMe){
            // const response = await fetch(`${EXPO_PUBLIC_MAZEURL.toString()}/v4/maze`); //an API approach to generated random maps
            // const mazeData= await response.json()
            this.myRoom().setCustomProperty("map",mazeData)
        }
    }
    initializePlayers(){
        let playerCount=0;
        for(let actor of this.myRoomActorsArray()){
            if(this.players[playerCount]&& !this.players[playerCount].getHasBeenNetworkInitialized()){
                this.players[playerCount].setNetworkInitialized(true)
                this.players[playerCount].setPlayerID(actor.actorNr.toString())
                this.players[playerCount].getPlayerRef().current.setValue({x:0,y:0})
            }else{
                return
            }
            playerCount++;
        }
        for(let actor of this.myRoomActorsArray()){
            for(let p of this.players){
                if(p.getPlayerID()==actor.actorNr.toString()&& p.getPlayerID()!=this.myActor().actorNr.toString()){
                    p.setCharacteristic({color:actor.getCustomProperty("color"),faceIndex:actor.getCustomProperty("face")})
                }
            }
        }
    }
    onActorJoin(actor: Photon.LoadBalancing.Actor){
        for(let p of this.players){
            if(!p.getHasBeenNetworkInitialized()){
                p.setNetworkInitialized(true)
                p.setPlayerID(actor.actorNr.toString())
                p.getPlayerRef().current.setValue({x:0,y:0})
                return;
            }
        }
    }
    onError(errorCode: number, errorMsg: string) {
        // console.log("Error " + errorCode + ": " + errorMsg);
    }
    onEvent(code: number, content: any, actorNr: number) {
        switch(code) {
            case 1:
                for(let p of this.players){
                    if(p.getPlayerID()==actorNr.toString()){
                            Animated.spring(p.getPlayerRef().current, {
                                toValue: {x:parseFloat(content?.message?.left)*blockSize,y:parseFloat(content?.message?.top)*blockSize},
                                useNativeDriver: true,
                            }).start();
                        }
                }
                break;
            case 2:
                let targetActor=this.getActorByActorNum(actorNr)
                if(!targetActor){
                    return
                }
                for(let p of this.players){
                    if(p.getPlayerID()==actorNr.toString()){
                        console.log(this.myRoomActors()[actorNr].getCustomProperty("face"))
                        p.setCharacteristic({color:targetActor.getCustomProperty("color"),faceIndex:targetActor.getCustomProperty("face")})
                    }
                }
                break;
            default:
            }
    }
    onActorLeave(actor: Photon.LoadBalancing.Actor, cleanup: boolean){}

    onRoomListUpdate(rooms: Photon.LoadBalancing.Room[], roomsUpdated: Photon.LoadBalancing.Room[], roomsAdded: Photon.LoadBalancing.Room[], roomsRemoved: Photon.LoadBalancing.Room[]) {
        this.onRoomList(rooms);
    }

    onRoomList(rooms: Photon.LoadBalancing.Room[]) {}
    sendMessage(left: number, top: number) {
        try {
            this.raiseEvent(1, { message:  {left: left, top: top}, senderName: "user" + this.myActor().actorNr});
            this.myActor().setCustomProperty("position",{left:left, top:top})
        }
        catch (err) {
            console.log("error"+err)
        }
    }

}