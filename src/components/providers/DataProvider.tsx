import {createContext, FC} from "react";

type DataType = {
    id: number
    name: string
    score: number
}

export const DataContext = createContext<DataType>({} as DataType)

//名前、スコアをグローバルstateとして
export const AdminFlagProvider = (props:any) => {
    const {children} = props;


}