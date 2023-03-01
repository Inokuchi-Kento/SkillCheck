import { useState, ReactNode, FC } from "react";
import './TabDesign.css'

type Tab = {
    label: string;
    content: ReactNode;
}

type TabsProps = {
    tabs: Tab[];
};

export const Tabs = (props: TabsProps) => {
    const {tabs} = props;
    const [active, setActive] = useState(0);

    const handleTabClick = (index: number) => {
        setActive(index);
    };

    return(
        <>
            <div className="tabs">
                {tabs.map((tab, index)=>(
                    <div
                        key={tab.label}
                        className={`tab ${index === active ? "active" : ""}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {tabs[active].content}
            </div>
        </>
    )
}