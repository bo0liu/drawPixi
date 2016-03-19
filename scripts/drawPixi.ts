/**
 * Created by shino on 2016/3/18.
 */
/// <reference path="../typings/pixi.js/pixi.js.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
module Realrig
{
    import SystemRenderer = PIXI.SystemRenderer;
    export class DrawPixi
    {
        private renderer:SystemRenderer;
        private stage:PIXI.Container;
        private bgGraphics1:PIXI.Graphics;
        private bgGraphics2:PIXI.Graphics;
        private bgGraphics3:PIXI.Graphics;
        private lines1:PIXI.Graphics[];
        private lines2:PIXI.Graphics[];
        private lines3:PIXI.Graphics[];
        private lineEnds1:number[] = [0,0,0];
        private lineEnds2:number[] = [0,0,0];
        private lineEnds3:number[] = [0,0,0];
        private colors:number[] = [0xff0000,0x00ff00,0x0000ff];
        constructor()
        {
            var self = this;
            var i:number;
            var line:PIXI.Graphics;
            this.renderer = PIXI.autoDetectRenderer(630,600,{transparent:true});
            this.renderer.autoResize = true;
            $("#container").append(this.renderer.view);

            this.stage = new PIXI.Container();
            this.stage.interactive = true;

            this.bgGraphics1 = new PIXI.Graphics();
            this.stage.addChild(this.bgGraphics1);
            this.bgGraphics1.x = 0;
            this.createBg(this.bgGraphics1);

            this.lines1 = [];
            for(i = 0;i<3;i++)
            {
                line = new PIXI.Graphics();
                this.bgGraphics1.addChild(line);
                this.lines1.push(line);
            }

            this.bgGraphics2 = new PIXI.Graphics();
            this.stage.addChild(this.bgGraphics2);
            this.bgGraphics2.x = 200;
            this.createBg(this.bgGraphics2);

            this.lines2 = [];
            for(i = 0;i<3;i++)
            {
                line = new PIXI.Graphics();
                this.bgGraphics2.addChild(line);
                this.lines2.push(line);
            }

            this.bgGraphics3 = new PIXI.Graphics();
            this.stage.addChild(this.bgGraphics3);
            this.bgGraphics3.x = 400;
            this.createBg(this.bgGraphics3);

            this.lines3 = [];
            for(i = 0;i<3;i++)
            {
                line = new PIXI.Graphics();
                this.bgGraphics3.addChild(line);
                this.lines3.push(line);
            }

            this.renderer.render(this.stage);
            $("#navbar-btn-add-point").click(function()
            {
                self.drawTenThousandPoints();
            }
        }

        createBg(g:PIXI.Graphics):void
        {
            var startH:number;
            if(g.height > 0)
            {
                startH = g.height-2;
            }
            else
            {
                startH = g.height;
            }
            var endH:number = startH + 200;

            g.lineStyle(1,0x000000)
            g.moveTo(0,startH);
            g.lineTo(200,startH);
            g.moveTo(0,startH);
            g.lineTo(0,endH);
            g.moveTo(200,startH);
            g.lineTo(200,endH);
            g.moveTo(0,endH);
            g.lineTo(200,endH);
            var i = 0;
            g.lineStyle(1,0xcccccc);
            for (i = 1;i<5;i++)
            {
                g.moveTo(i*40,startH);
                g.lineTo(i*40,endH);

                g.moveTo(0,startH+i*40);
                g.lineTo(200,startH+i*40);
            }
            this.renderer.render(this.stage);
            if(g.height > this.renderer.view.height)
            {
                this.renderer.resize(630,g.height);
                this.renderer.render(this.stage);
            }
        }

        private drawTenThousandPoints()
        {
            this.drawTenThousandPoint(this.bgGraphics1,this.lines1,this.lineEnds1);
            this.drawTenThousandPoint(this.bgGraphics2,this.lines2,this.lineEnds2);
            this.drawTenThousandPoint(this.bgGraphics3,this.lines3,this.lineEnds3);
        }

        private drawTenThousandPoint(g:PIXI.Graphics,lines:PIXI.Graphics[],lineEnds:number[])
        {
            for(var i = 0;i < 1000;i++)
            {
                for(var j = 0;j<3;j++)
                {
                    var line:PIXI.Graphics = lines[j];

                    var startY:number = lineEnds[j];
                    var endY:number = startY + 5;
                    line.lineStyle(1,this.colors[j],1);
                    if(startY == 0)
                    {
                        line.moveTo(Math.random()*200,0);
                    }

                    if(endY > g.height)
                    {
                        this.createBg(g);
                    }
                    line.lineTo(Math.random()*200,endY);
                    lineEnds[j] = endY;
                }
            }
            this.renderer.render(this.stage);
        }
    }
    export var draw:Realrig.DrawPixi = new Realrig.DrawPixi();
}