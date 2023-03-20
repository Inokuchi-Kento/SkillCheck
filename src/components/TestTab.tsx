import { Tabs } from "./Tab";
import { Menu } from "./Menu";
import { Chart } from "./Chart";
import { Edit } from "./Edit";

export function TestTab(){
    // 1. 配列オブジェクトを作ってラベルと表示したいコンテンツを書きます
    const tabs = [
        {label: "メニュー", content: <Menu/>},
        {label: "レーダーチャート", content: <Chart emp_id={10128353}/>},
        {label: "技能評価", content: <Edit/>},
        {label: "テスト", content: <div>test</div>}
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