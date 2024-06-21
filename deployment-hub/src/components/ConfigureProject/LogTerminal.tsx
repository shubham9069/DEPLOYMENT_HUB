import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import Image from 'next/image';
import { Button } from '../ui/button';

const LogTerminal = ({ projectState, setProjectState, logArray }: any) => {



const disabledBtn  = useMemo(()=>{
let value = logArray[logArray.length - 1];
if (value?.log =="upload successfully" ){
   setProjectState("live");
  return false
 
}else {
  return true
}
},[logArray])



  return (
    <div className="mt-6">
      <Accordion
        type="single"
        collapsible={projectState != "config" ?false:true}
        className="w-full border rounded-md px-4 active:border-black"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm font-normal text-zinc-700 ">
            <div className="flex gap-2">
              <Image
                src={projectState == "live" ? "/image/icon/tick-icon.svg":"/image/icon/spinner.gif"}
                height={20}
                width={20}
                alt="loader"
              />
              Build process
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="h-52 w-full bg-black rounded-sm p-2 overflow-y-auto "
              id="log-container"
            >
              {logArray?.map(({ log,i }) => {
                return (
                  <p key={i} className="text-zinc-200 text-xs font-normal my-1 break-all ">
                    root@48.217.193.141:- {log}
                  </p>
                );
              })}
            </div>
            <div id="terminal-scroll"></div>
            <Button
              className="w-full my-6"
              disabled={disabledBtn}
     
            >
              Live{" "}
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LogTerminal;