import { useState } from "react";
import { Tabs } from "./Tab"; 
import { Chart } from "./Chart";

export function TestContents(){
    //[{label: string, content: ReactNode},{},];
    const tabs = [
        {label: "Tab1", content: <div>Tab 1 content</div>,},
        {label: "Tab 2",content: <div>Tab 2 content</div>,},
        {label: "チャート",content: <div><Chart emp_id={10016862}/></div>,},
    ];

    return(
        <div className="tab-contents">
            <Tabs tabs={tabs}/>
        </div>
    )
}