import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { PaperScope, Project, Path, Point, View, Raster, Size, MouseEvent, Rectangle } from 'paper';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent implements OnInit {

  zoomInit : number;
  boundsInit: Rectangle;
  @HostListener('mousewheel', ['$event']) onMouseWheel(event){
    console.warn(event);
    if(this.scope.view){
      const coef: number = event.wheelDelta < 0 ? -0.1 : 0.1;
      
      if(this.scope.view.zoom === undefined)
      {
        this.scope.view.zoom = 1.0;
      }

      if( this.scope.view.zoom + coef > this.zoomInit){

        this.scope.view.zoom = this.scope.view.zoom + coef;
      }else{
        this.scope.view.zoom = this.zoomInit
      }


      const delta = new Point(0,0);
      let minX = this.project.activeLayer.bounds.x;
      let minY = this.project.activeLayer.bounds.y;
      let maxX = this.project.activeLayer.bounds.x + this.project.activeLayer.bounds.width;
      let maxY = this.project.activeLayer.bounds.y + this.project.activeLayer.bounds.height;
      
      if( this.project.view.bounds.x < minX){
        delta.x =  minX - this.project.view.bounds.x ;
      }
      if( this.project.view.bounds.y < minY){
        delta.y =  minY - this.project.view.bounds.y ;
      }
    
      if(this.project.view.bounds.topRight.x > maxX){
        delta.x =  - (this.project.view.bounds.topRight.x - maxX)
      }
      if(this.project.view.bounds.bottomLeft.y > maxY){
        delta.y = - (this.project.view.bounds.bottomLeft.y - maxY);
      }

      this.project.view.scrollBy(delta);
      this.showInfo();
     

    }
  }
  @ViewChild('canvasElement') canvasElt: ElementRef;
  scope: PaperScope;
  project: Project;
  view : View;

  raster: Raster = null;
  

  constructor(protected render: Renderer2) { }

  ngOnInit() {
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElt.nativeElement);

    
    this.scope.view.onResize = (event)=>{
      console.log('Resized');
    };

    this.scope.view.on('mousewheel', (event)=>{
      console.log('(view mouse wheel)');
    })

    this.scope.view.onMouseDrag = (event: MouseEvent) => {
      console.log("Point : " + event.point);
      console.log("Delta : " + event.delta);
      //console.log(this.scope.view.viewToProject(new Point(this.scope.view.bounds.x,this.scope.view.bounds.y)));
      const delta = event.delta;
      const projectBounds = this.scope.view.bounds;
      // Déplacement sur l'axe des X
      if(delta.x < 0){
        let minX = this.project.activeLayer.bounds.x;
        delta.x = minX > (projectBounds.x + delta.x) ? 0 : delta.x ;
      }else{
        //@TODO : Gestion du déplacement ne fonction du centre de l'image 
        let maxX = this.project.activeLayer.bounds.x + this.project.activeLayer.bounds.width;
        delta.x = maxX < (projectBounds.topRight.x + delta.x) ? 0 : delta.x ;
      }

      // Déplacement sur l'axe Y
      if(delta.y < 0){
        let minY = this.project.activeLayer.bounds.y;
        delta.y = minY > (projectBounds.y + delta.y) ? 0 : delta.y;
      }else{
        let maxY = this.project.activeLayer.bounds.y + this.project.activeLayer.bounds.height;
        delta.y = maxY < (projectBounds.bottomRight.y + delta.y) ? 0 : delta.y ;
      }
      this.showInfo();
      this.scope.view.scrollBy(delta); 
     
    };

    this.scope.view.onDoubleClick = (event:MouseEvent) => {
      console.log("Double click");
      this.scope.view.zoom = this.zoomInit;
      let delta = new Point( this.boundsInit.x - this.scope.view.bounds.x , this.boundsInit.y - this.scope.view.bounds.y );
      this.scope.view.scrollBy(delta );
    };
    

    var path = new Path.Circle({
      center: this.scope.view.center,
      radius: 30,
      strokeColor: 'black'
    });

    this.raster = new Raster('assets/datas/09.jpg', this.scope.view.center);
    this.raster.on('load', (event)=>{
      console.warn(event);
      this.scope.view.viewSize = new Size (640, 800);
      // 1280 x 1803;
      const ratio = 640 / 800;
      //this.raster.scale(1);
      this.scope.view.zoom = 0.44;
      this.zoomInit = 0.44;
      this.boundsInit = this.scope.view.bounds;
      this.raster.position =  this.scope.view.center;
      this.project.activeLayer.addChild(this.raster);

      let rect = new Path.Rectangle(new Rectangle(this.boundsInit));
      rect.strokeColor = 'black';
      this.project.activeLayer.addChild(rect);
      this.showInfo();
    });

   // this.project.activeLayer.addChild(path);
    
  }
  public plusX(){
    let delta: Point = new Point(50, 0);
    this.scope.view.scrollBy(delta); 
  }

  public moinsX(){
    let delta: Point = new Point(-50, 0);
    this.scope.view.scrollBy(delta); 
  }


  private showInfo(){
     /* console.log("Zoom : " + this.scope.view.zoom);
      console.log("Project Size : " +this.scope.view.size);
      console.log("Project  Bounds :" + this.scope.view.bounds.top);
      console.log("Project  Center :" + this.scope.view.center);
      console.log("view Size : " + this.scope.view.viewSize);
      console.log("ActiveLayer bounds : " + this.project.activeLayer.bounds);
*/

  }

}
