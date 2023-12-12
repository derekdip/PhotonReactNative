import { createContext} from 'react';
import { DemoLoadBalancing } from 'Photon/src/demo-loadbalancing/app';
import { PhotonPlayer } from './NetworkObjects/player';
import { MazeData,mazeData } from '../assets/maps';

export interface BlockInfo{
    vertical:number,
    horizontal:number
}
export class Block{
    vertical:number;
    horizontal:number;
    constructor(v:number,h:number){
        this.vertical=v
        this.horizontal=h
    }
}
export interface GameSession{
    complete:string;
    speedMultiplier?:number
}
export interface VisualProperties{
    face:number,
    balloonColor:string,
    blockColor:string
}
export interface Player{
    name:string,
    position:{
        x:number;
        y:number;
    },
    message?:string
}
export const MazeContext = createContext<[MazeData,Function]>([mazeData,()=>{}])
export const PlayerContext=createContext<[Block,Function]>([new Block(0,0),()=>{}])
export const VisualContext=createContext<[VisualProperties,Function]>([{face:0, balloonColor:"red", blockColor:"yellow" },()=>{}])
export const GameStateContext = createContext<[GameSession,Function]>([{complete:"false"},()=>{}])
export const PhotonClientContext = createContext<DemoLoadBalancing|undefined>(undefined);
export const PhotonPlayersContext = createContext<[Array<PhotonPlayer>,Function]>([[],()=>{}]);