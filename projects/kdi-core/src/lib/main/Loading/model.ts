
export enum KdiLoadingBarEventType{
    PROGRESS,
    VISIBLE,
    COLOR,
    MODE
  }
  
  
  export class KdiLoadingBarEvent{
    constructor(
      public type: KdiLoadingBarEventType,
      public value: any
    ){}
    
  }