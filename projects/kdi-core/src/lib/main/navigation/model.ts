/*
export enum KdiNavigationType{
  container = 'container',
  item = 'item',
  separator = 'separator'
}*/

export class KdiNavigation{

    constructor(){
      this.state = 'collapsed';
      this.type = 'item';
    } 
    
    state?: null | 'collapsed' | 'expanded';
    type?: 'container' | 'item' | 'separator' = 'item';
    url?: string;
    icon?: string;
    label?: string;
    badge1?: KdiBadge;
    badge2?: KdiBadge;
    children?: KdiNavigation[];
  }
  
  export class KdiBadge {
    name: string;
    color: string; 
    content?: string;
  }
  