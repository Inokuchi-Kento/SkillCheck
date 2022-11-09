import download from "../../icons/download.png"
import message from "../../icons/message.png"
import upload from "../../icons/upload.png"
import "./button.css"

export function ExcelForm(){
    const getExcel = () => {
        alert("ファイルをダウンロードしました。");
    }

    const sendExcel = () => {
        alert("ファイルをアップロードしました。");
    }

    return(
        <div className="excelForm">
            <form>
                <p>
                <input type="image" src={download} className="excelForm" onClick={getExcel}></input>
                <input type="image" src={message} className="excelForm"></input>
                <input type="image" src={upload} className="excelForm" onClick={sendExcel}></input>
                </p>
            </form>
        </div>
    );
}