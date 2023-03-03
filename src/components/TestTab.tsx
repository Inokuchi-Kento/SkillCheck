import { Tabs } from "./Tab";

import { Menu } from "./Menu";

export function TestTab(){
    // 1. 配列オブジェクトを作ってラベルと表示したいコンテンツを書きます
    const tabs = [
        {label: "猪口", content: <div>猪口</div>},
        {label: "石川", content: <div>石川</div>},
        {label: "高山", content: <div>高山</div>},
        {label: "とりあえずメニュー画面", content: <Menu/>},
    ]

    return(
        <>
            {/* 2. 配列オブジェクトをTabsコンポーネントにpropsとして渡します。 */}
            <Tabs tabs={tabs}/>
            {/* 
            こっちの書き方でもできます
            <Tabs tabs={
                [
                    {label: "猪口", content: <div>猪口 test</div>},
                    {label: "石川", content: <div>石川 test</div>},
                    {label: "高山", content: <div>高山 test</div>},
                ]
            }/> */}
        </>
    )
}