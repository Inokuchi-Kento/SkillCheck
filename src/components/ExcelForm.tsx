import fish from "../../icons/fish.png"
import flesh from "../../icons/flesh.png"
import "./button.css"

export function ExcelForm(){
    const getExcel = () => {
        alert("鮮魚");
    }

    const sendExcel = () => {
        alert("精肉");
    }

    return(
        <div className="excelForm">
            <form>
                <p>
                <input type="image" src={fish} className="department" onClick={getExcel}></input>
                <input type="image" src={flesh} className="department" onClick={sendExcel}></input>
                </p>
            </form>
        </div>
    );
}