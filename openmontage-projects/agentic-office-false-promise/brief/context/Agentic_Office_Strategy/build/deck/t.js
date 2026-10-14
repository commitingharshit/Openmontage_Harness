const P=require('pptxgenjs');const p=new P();p.layout='LAYOUT_WIDE';
let s=p.addSlide();s.addChart(p.charts.BAR,[{name:'a',labels:['x','y','z'],values:[1,2,3]}],{x:1,y:1,w:6,h:4});
s=p.addSlide();s.addChart(p.charts.BAR,[{name:'a',labels:['x','y','z'],values:[1,2,3]}],{x:1,y:1,w:6,h:4,barDir:'bar',showValue:true,valAxisHidden:true,valGridLine:{style:'none'},catGridLine:{style:'none'},chartColors:['3157F6']});
s=p.addSlide();s.addChart(p.charts.BAR,[{name:'a',labels:['x','y','z'],values:[1,2,3]}],{x:1,y:1,w:6,h:4,catAxisOrientation:'maxMin',varyColors:true,chartColors:['3157F6','B9B6AE','B9B6AE']});
p.writeFile({fileName:process.argv[2]});
