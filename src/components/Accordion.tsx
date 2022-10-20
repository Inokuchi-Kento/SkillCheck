import {useState, useEffect} from 'react'
import {css} from '@emotion/react'
import {supabase} from '../supabaseClient'

type List = {
  name: string
}

export function Accordion(props:any){
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState<List[]>();

    const fetchName = async() => {
      try{
        setLoading(true)
        const {data, error} = await supabase
        .from('skills')
        .select('name')
        .eq('id',1)

        if(error){
          throw error
        }
        if(data){
          setName(data)
        }
      }catch(error:any){
        alert(error.message)
      }finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      fetchName()
    },[])

    const toggleAccordion = () => {
        setActive(!active ? true:false)
    };

    const accordionHeight = active
      ? css`
          max-height: 800px;
        `
      : css`
          max-height: 0px;
        `;

    const rotate = active
      ? css`
          margin-top: 5px;
        `
      : css`
          margin-bottom: 10px;
          transform: rotate(135deg);
      `;

    const accordionContainer = css`
      display: flex;
      flex-direction: column;
    `;

    const accordion = css`
      color: #dddddd;
      background: #ffffff;
      cursor: pointer;
      height: 38px;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
    `;

    const accordionTitle = css`
      font-family: "Open Sans", sans-serif;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      justify-content: center;;/
      align-items: center;
    `;

    const accordionArrow = css`
      width: 10px;
      height: 10px;
      border: 2px solid;
      border-color: #565656 #565656 transparent transparent;
      transform: rotate(-45deg);
      cursor: pointer;
      transition: transform 0.3s ease;
    `;

    const accordionContent = css`
      overflow: auto;
      transition: max-height 0.3s ease;
    `;

    if (loading) return <div>loading...</div>;
    if (!name!.length) return <div>missing data...</div>;
    
    return (
        <div css={accordionContainer}>
          <div css={[accordionContent, accordionHeight]}>{props.children}</div>
          <button css={accordion} onClick={toggleAccordion}>
            <div css={accordionTitle}>
              {name!.map((item)=>(
                <h4>{item.name}</h4>
              ))}
              {/* <label css={[accordionArrow, rotate]} /> */}
            </div>
          </button>
        </div>
    );
}