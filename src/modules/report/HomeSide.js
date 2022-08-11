import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';
import SimpleFetch from '../../components/simpleFetch';
import backUrl, { SetFilter } from '../../env';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css'


function HomeSide(props){ 
    const setting = SimpleFetch(backUrl+'/setting')
    const [checked, setChecked] = useState(true);
    //SetFilter(filterId,props.filter,props.setFilter);

    //console.log(props.filter)
    return(<><div className='sku'>
        <input type="text" placeholder='شناسه'/>
        <input type="button" value="S" onClick={(e)=>{SetFilter('sku:'+e.target.previousSibling.value,props.filter,props.setFilter)}}/></div>
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
                            onClick={()=>SetFilter('kind:'+filter.kind,props.filter,props.setFilter)} key={filter._id}/>
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
                            onClick={()=>SetFilter('size:'+filter.size,props.filter,props.setFilter)} key={filter._id}/>
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
                            onClick={()=>SetFilter('thick:'+filter.thick,props.filter,props.setFilter)} key={filter._id}/>
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
                            onClick={()=>SetFilter('leng:'+"range-12",props.filter,props.setFilter)} />
                        <FormControlLabel control={<Checkbox />} label={"12 متر"} 
                            onClick={()=>SetFilter('leng:'+"range=12",props.filter,props.setFilter)} />
                        <FormControlLabel control={<Checkbox />} label={"بالای 12 متر"} 
                            onClick={()=>SetFilter('leng:'+"range+12",props.filter,props.setFilter)} />
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
                            onClick={()=>SetFilter('degree:'+filter.degree,props.filter,props.setFilter)} key={filter._id} />
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
                        {setting.quality.map(filter=>(// defaultChecked 
                            <FormControlLabel control={<Checkbox/>} label={filter.size} 
                            onClick={()=>SetFilter('size:'+filter.size,props.filter,props.setFilter)} key={filter._id}/>
                        ))}
                    </FormGroup>
                </AccordionItemPanel>
            </AccordionItem>
            
        </Accordion>}
        </>
    )
}
export default HomeSide