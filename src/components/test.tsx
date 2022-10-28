import { Accordion } from "./Accordion";
import {EditScore} from './EditScore'
import {Send} from './Send'

export function Test() {
  return (
    <div className="App">
      <Accordion>
        <EditScore/>
      </Accordion>
      <Send id={1} score={1}/>
    </div>
  );
}