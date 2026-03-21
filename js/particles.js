'use strict';

document.addEventListener('DOMContentLoaded',()=>{
  const canvas=document.getElementById('particlesCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];
  const GOLD='rgba(201,168,76,';
  const COUNT=55;

  function resize(){
    W=canvas.width=canvas.offsetWidth;
    H=canvas.height=canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize',resize,{passive:true});

  class Particle{
    constructor(){this.reset(true);}
    reset(init=false){
      this.x=Math.random()*W;
      this.y=init?Math.random()*H:H+10;
      this.size=Math.random()*2.2+0.4;
      this.speedX=(Math.random()-0.5)*0.35;
      this.speedY=-(Math.random()*0.55+0.2);
      this.opacity=Math.random()*0.6+0.1;
      this.life=0;
      this.maxLife=Math.random()*300+150;
      this.twinkle=Math.random()*Math.PI*2;
      this.twinkleSpeed=Math.random()*0.03+0.01;
    }
    update(){
      this.x+=this.speedX;
      this.y+=this.speedY;
      this.life++;
      this.twinkle+=this.twinkleSpeed;
      const prog=this.life/this.maxLife;
      this.currentOpacity=this.opacity*(1-Math.pow(prog,2))*
        (0.7+0.3*Math.sin(this.twinkle));
      if(this.life>=this.maxLife||this.y<-10)this.reset();
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fillStyle=GOLD+this.currentOpacity+')';
      ctx.fill();
      // Tiny glow
      if(this.size>1.4){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size*2.2,0,Math.PI*2);
        ctx.fillStyle=GOLD+(this.currentOpacity*0.15)+')';
        ctx.fill();
      }
    }
  }

  for(let i=0;i<COUNT;i++)particles.push(new Particle());

  function animate(){
    ctx.clearRect(0,0,W,H);
    // Draw connecting lines between close particles
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<90){
          const alpha=(1-dist/90)*0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=GOLD+alpha+')';
          ctx.lineWidth=0.5;
          ctx.stroke();
        }
      }
    }
    particles.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animate);
  }
  animate();
});
