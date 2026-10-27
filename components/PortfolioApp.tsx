import { DemoSwitcher } from './DemoSwitcher';
import { Navigation } from './Navigation';
import { DemoOne } from './designs/DemoOne';
import { DemoTwo } from './designs/DemoTwo';
import { DemoThree } from './designs/DemoThree';
export function PortfolioApp({design}:{design:'1'|'2'|'3'}){return <><DemoSwitcher active={design}/><Navigation design={design}/><main id="main">{design==='1'?<DemoOne/>:design==='2'?<DemoTwo/>:<DemoThree/>}</main></>}
