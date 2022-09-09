import './inputConfirmation.css'

function inputConfirmation() {

    return (
        <div className="inputConfirmation">
            <h1>青果　入力確認</h1>
            <h2>入力に誤りがなければ「送信」を押してください。</h2>
            <button className='submitbutton' >戻る</button>
            <button className='submitbutton' >送信</button>
        </div>
    )
}