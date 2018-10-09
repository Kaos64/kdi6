import { Injectable } from "@angular/core";

export class KdiMainSetting {
    public bShowToolbar?: boolean;
    public bShowAppSidenav?: boolean;
    public bShowSummarySidenav?: boolean;
    public bShowFooter?: boolean;
    public bShowBreadcrump?: boolean;

    clone?():KdiMainSetting{
        let clone = new KdiMainSetting();
        Object.assign(clone, this);
        return clone;
    }
}

@Injectable({
    providedIn: 'root'
})
export class KdiAppSetting{
    public app_name: string;
    public main: KdiMainSetting = new KdiMainSetting();
    
    clone?(): KdiAppSetting{
        let clone = new KdiAppSetting();
        Object.assign(clone, this);
        
        clone.main = this.main.clone();
        return clone;
    }
}