import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';
import SimpleFetch from '../../components/simpleFetch';
import backUrl from '../../env';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css'

function HomeSide(){
    const setting = SimpleFetch(backUrl+'/setting')
    const [filter,setFilter] = useState([])
    const [checked, setChecked] = useState(true);
    const SetFilter=(filterId)=>{
        setFilter([...filter, filterId]
          )
    }
    console.log(filter)
    return(<>
        {setting&&<Accordion className='sideAcc'>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        نوع
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <FormGroup>
                        {setting.kinds.map(filter=>(
                            <FormControlLabel control={<Checkbox />} label={filter.kind} 
                            onClick={()=>SetFilter(filter._id)} key={filter._id}/>
                        ))}
                    </FormGroup>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        سایز
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <FormGroup>
                        {setting.sizes.map(filter=>(
                            <FormControlLabel control={<Checkbox />} label={filter.size} 
                            onClick={()=>SetFilter(filter._id)} key={filter._id}/>
                        ))}
                    </FormGroup>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        ضخامت
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <FormGroup>
                        {setting.thickness.map(filter=>(
                            <FormControlLabel control={<Checkbox />} label={filter.thick} 
                            onClick={()=>SetFilter(filter._id)} key={filter._id}/>
                        ))}
                    </FormGroup>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        طول
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label={"زیر 12 متر"} 
                            onClick={()=>SetFilter("12-")} />
                        <FormControlLabel control={<Checkbox />} label={"12 متر"} 
                            onClick={()=>SetFilter("12")} />
                        <FormControlLabel control={<Checkbox />} label={"بالای 12 متر"} 
                            onClick={()=>SetFilter("12+")} />
                    </FormGroup>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        درجه
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <FormGroup>
                        {setting.degree.map(filter=>(
                            <FormControlLabel control={<Checkbox />} label={filter.degree}
                            onClick={()=>SetFilter(filter._id)} key={filter._id} />
                        ))}
                    </FormGroup>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        کیفیت
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <FormGroup>
                        {setting.quality.map(filter=>(
                            <FormControlLabel control={<Checkbox defaultChecked />} label={filter.size} 
                            onClick={()=>SetFilter(filter._id)} key={filter._id}/>
                        ))}
                    </FormGroup>
                </AccordionItemPanel>
            </AccordionItem>
            
        </Accordion>}
        </>
    )
}
export default HomeSide