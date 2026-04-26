var Wy=Object.defineProperty;var qo=e=>{throw TypeError(e)};var Ly=(e,t,r)=>t in e?Wy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Vo=(e,t,r)=>Ly(e,typeof t!="symbol"?t+"":t,r),Go=(e,t,r)=>t.has(e)||qo("Cannot "+r);var Bi=(e,t,r)=>(Go(e,t,"read from private field"),r?r.call(e):t.get(e)),ir=(e,t,r)=>t.has(e)?qo("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r);var Be=(e,t,r)=>(Go(e,t,"access private method"),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const ke={width:960,height:540,paddleWidth:14,paddleHeight:96,paddleInset:24,paddleSpeedInitialPxPerSec:120,paddleSpeedMaxPxPerSec:460,paddleAccelerationPxPerSec2:920,paddleDecelerationPxPerSec2:700,paddleDirectionChangeDecelerationPxPerSec2:1300,ballRadius:10,ballSpeedInitialPxPerSec:280,ballSpeedMaxPxPerSec:700,ballSpeedIncreasePerPaddleHit:20,maxBounceAngleDeg:65,fixedDeltaTime:1/60,scoreLimit:5,replayFps:60,enableCheatBot:!1,maxReplayHistory:20},Za={replayHistoryKey:"pong:replays",lastCsvKey:"pong:last-csv"};function Fo(e,t,r,a){const n=wr(e,a.x,a.x+a.width),i=wr(t,a.y,a.y+a.height),o=e-n,l=t-i;return o*o+l*l<=r*r}function wr(e,t,r){return Math.min(Math.max(e,t),r)}const qy=Math.PI/180;function Ho(e,t,r,a){const n=e.vy,i=e.lastAction??"stay";let o=n;t==="stay"?o=0:((i==="up"&&t==="down"||i==="down"&&t==="up")&&(o=0),o+=(t==="up"?-1:1)*r.paddleAccelerationPxPerSec2*a),o=wr(o,-r.paddleSpeedMaxPxPerSec,r.paddleSpeedMaxPxPerSec),e.vy=o,e.y+=e.vy*a,e.y=wr(e.y,0,r.height-r.paddleHeight),e.lastAction=t}function Vy(e,t,r){const{ball:a}=e;a.x+=a.vx*r,a.y+=a.vy*r,a.y-t.ballRadius<=0&&(a.y=t.ballRadius,a.vy*=-1),a.y+t.ballRadius>=t.height&&(a.y=t.height-t.ballRadius,a.vy*=-1);const n=e.leftPaddle,i=e.rightPaddle;a.vx<0&&Fo(a.x,a.y,t.ballRadius,jo(n,t))?Ko(a,n,t,1):a.vx>0&&Fo(a.x,a.y,t.ballRadius,jo(i,t))&&Ko(a,i,t,-1)}function Gy(e,t){return e.ball.x+t.ballRadius<0?(e.rightScore+=1,Aa(e,t,-1),"right"):e.ball.x-t.ballRadius>t.width?(e.leftScore+=1,Aa(e,t,1),"left"):null}function Aa(e,t,r=Math.random()>.5?1:-1){e.ball.x=t.width/2,e.ball.y=t.height/2,e.ball.speed=t.ballSpeedInitialPxPerSec,e.ball.vx=t.ballSpeedInitialPxPerSec*r,e.ball.vy=0}function jo(e,t){return{x:e.x,y:e.y,width:t.paddleWidth,height:t.paddleHeight}}function Ko(e,t,r,a){const n=t.y+r.paddleHeight/2,i=(e.y-n)/(r.paddleHeight/2),l=wr(i,-1,1)*r.maxBounceAngleDeg*qy;e.speed=Math.min((e.speed??r.ballSpeedInitialPxPerSec)+r.ballSpeedIncreasePerPaddleHit,r.ballSpeedMaxPxPerSec),e.vx=Math.cos(l)*e.speed*a,e.vy=Math.sin(l)*e.speed,a>0?e.x=t.x+r.paddleWidth+r.ballRadius:e.x=t.x-r.ballRadius}var Sr,di,Mp;class Fy{constructor(t,r,a={}){ir(this,di);ir(this,Sr,t=>{var a,n;if(!this.running)return;const r=(t-this.lastTime)/1e3;for(this.lastTime=t,this.accumulator+=Math.min(r,.05);this.accumulator>=this.config.fixedDeltaTime;)Be(this,di,Mp).call(this,this.config.fixedDeltaTime),this.accumulator-=this.config.fixedDeltaTime;(n=(a=this.callbacks).onRender)==null||n.call(a,this.state),this.rafId=requestAnimationFrame(Bi(this,Sr))});this.config=t,this.controller=r,this.callbacks=a,this.running=!1,this.accumulator=0,this.lastTime=0,this.frameIndex=0,this.state=Qo(t)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.accumulator=0,this.frameIndex=0,this.rafId=requestAnimationFrame(Bi(this,Sr)))}stop(){this.running=!1,this.rafId&&cancelAnimationFrame(this.rafId)}snapshot(){return structuredClone(this.state)}reset(t){this.state=Qo(this.config),Aa(this.state,this.config,t),this.frameIndex=0}}Sr=new WeakMap,di=new WeakSet,Mp=function(t){var n,i,o,l,p,d;const r=this.controller(this.snapshot());Ho(this.state.leftPaddle,r.left,this.config,t),Ho(this.state.rightPaddle,r.right,this.config,t),Vy(this.state,this.config,t);const a=Gy(this.state,this.config);if(a&&(this.state.leftScore>=this.config.scoreLimit||this.state.rightScore>=this.config.scoreLimit)){(i=(n=this.callbacks).onFrame)==null||i.call(n,this.snapshot(),r,this.frameIndex),(l=(o=this.callbacks).onMatchEnd)==null||l.call(o,this.snapshot(),a),this.stop();return}(d=(p=this.callbacks).onFrame)==null||d.call(p,this.snapshot(),r,this.frameIndex),this.frameIndex+=1};function Qo(e){return{leftPaddle:{x:e.paddleInset,y:e.height/2-e.paddleHeight/2,vy:0,lastAction:"stay"},rightPaddle:{x:e.width-e.paddleInset-e.paddleWidth,y:e.height/2-e.paddleHeight/2,vy:0,lastAction:"stay"},ball:{x:e.width/2,y:e.height/2,vx:e.ballSpeedInitialPxPerSec,vy:0,speed:e.ballSpeedInitialPxPerSec},leftScore:0,rightScore:0}}var kr,Oa;class Hy{constructor(){ir(this,kr);this.keys=new Set,window.addEventListener("keydown",t=>{this.keys.add(t.code)}),window.addEventListener("keyup",t=>{this.keys.delete(t.code)})}getP1Action(){const t=this.keys.has("KeyW"),r=this.keys.has("KeyS");return Be(this,kr,Oa).call(this,t,r)}getP2Action(){const t=this.keys.has("ArrowUp"),r=this.keys.has("ArrowDown");return Be(this,kr,Oa).call(this,t,r)}}kr=new WeakSet,Oa=function(t,r){return t&&!r?"up":r&&!t?"down":"stay"};function jy(e){return()=>({left:e.getP1Action(),right:e.getP2Action()})}function Ky(e,t){return r=>({left:e.getP1Action(),right:t.predictRightAction(r)})}function Qy(e){return t=>({left:e.predictLeftAction(t),right:e.predictRightAction(t)})}function Zo(e,t,r=6){const n=(e==="left"?t.leftPaddle:t.rightPaddle).y+48;return t.ball.y<n-r?"up":t.ball.y>n+r?"down":"stay"}/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Xa=Object.defineProperty,Zy=Object.getOwnPropertyDescriptor,Xy=Object.getOwnPropertyNames,Yy=Object.prototype.hasOwnProperty,Jy=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t)=>()=>(e&&(t=e(e=0)),t),Ir=(e,t)=>{for(var r in t)Xa(e,r,{get:t[r],enumerable:!0})},e0=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Xy(t))!Yy.call(e,n)&&n!==r&&Xa(e,n,{get:()=>t[n],enumerable:!(a=Zy(t,n))||a.enumerable});return e},ri=e=>e0(Xa({},"__esModule",{value:!0}),e),ar,_t,Mt,Xo,Np,Dp=L(()=>{ar=new Map,_t=[],Mt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let a=ar.get(e);if(a===void 0)ar.set(e,{backend:t,priority:r});else{if(a.priority>r)return;if(a.priority===r&&a.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=_t.indexOf(e);n!==-1&&_t.splice(n,1);for(let i=0;i<_t.length;i++)if(ar.get(_t[i]).priority<=r){_t.splice(i,0,e);return}_t.push(e)}return}throw new TypeError("not a valid backend")},Xo=async e=>{let t=ar.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(a){return r||(t.error=`${a}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Np=async e=>{let t=e.executionProviders||[],r=t.map(p=>typeof p=="string"?p:p.name),a=r.length===0?_t:r,n,i=[],o=new Set;for(let p of a){let d=await Xo(p);typeof d=="string"?i.push({name:p,err:d}):(n||(n=d),n===d&&o.add(p))}if(!n)throw new Error(`no available backend found. ERR: ${i.map(p=>`[${p.name}] ${p.err}`).join(", ")}`);for(let{name:p,err:d}of i)r.includes(p)&&console.warn(`removing requested execution provider "${p}" from session options because it is not available: ${d}`);let l=t.filter(p=>o.has(typeof p=="string"?p:p.name));return[n,new Proxy(e,{get:(p,d)=>d==="executionProviders"?l:Reflect.get(p,d)})]}}),t0=L(()=>{Dp()}),Pp,r0=L(()=>{Pp="1.21.0"}),Mi,He,Up=L(()=>{r0(),Mi="warning",He={wasm:{},webgl:{},webgpu:{},versions:{common:Pp},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Mi=e}},get logLevel(){return Mi}},Object.defineProperty(He,"logLevel",{enumerable:!0})}),we,i0=L(()=>{Up(),we=He}),Wp,Lp,a0=L(()=>{Wp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let a=r.getContext("2d");if(a!=null){let n,i;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],i=e.dims[3]):(n=e.dims[3],i=e.dims[2]);let o=(t==null?void 0:t.format)!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,p,d;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?d=[0,0,0,0]:typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(d[3]=l.bias[3]));let f=i*n,g=0,y=f,_=f*2,w=-1;o==="RGBA"?(g=0,y=f,_=f*2,w=f*3):o==="RGB"?(g=0,y=f,_=f*2):o==="RBG"&&(g=0,_=f,y=f*2);for(let b=0;b<i;b++)for(let S=0;S<n;S++){let v=(e.data[g++]-d[0])*p[0],$=(e.data[y++]-d[1])*p[1],I=(e.data[_++]-d[2])*p[2],k=w===-1?255:(e.data[w++]-d[3])*p[3];a.fillStyle="rgba("+v+","+$+","+I+","+k+")",a.fillRect(S,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Lp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(r!=null){let n,i,o;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],i=e.dims[1],o=e.dims[3]):(n=e.dims[3],i=e.dims[2],o=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",p=t==null?void 0:t.norm,d,f;p===void 0||p.mean===void 0?d=[255,255,255,255]:typeof p.mean=="number"?d=[p.mean,p.mean,p.mean,p.mean]:(d=[p.mean[0],p.mean[1],p.mean[2],255],p.mean[3]!==void 0&&(d[3]=p.mean[3])),p===void 0||p.bias===void 0?f=[0,0,0,0]:typeof p.bias=="number"?f=[p.bias,p.bias,p.bias,p.bias]:(f=[p.bias[0],p.bias[1],p.bias[2],0],p.bias[3]!==void 0&&(f[3]=p.bias[3]));let g=i*n;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let y=4,_=0,w=1,b=2,S=3,v=0,$=g,I=g*2,k=-1;l==="RGBA"?(v=0,$=g,I=g*2,k=g*3):l==="RGB"?(v=0,$=g,I=g*2):l==="RBG"&&(v=0,I=g,$=g*2),a=r.createImageData(n,i);for(let T=0;T<i*n;_+=y,w+=y,b+=y,S+=y,T++)a.data[_]=(e.data[v++]-f[0])*d[0],a.data[w]=(e.data[$++]-f[1])*d[1],a.data[b]=(e.data[I++]-f[2])*d[2],a.data[S]=k===-1?255:(e.data[k++]-f[3])*d[3]}else throw new Error("Can not access image data");return a}}),Ur,qp,Vp,Gp,Fp,Hp,n0=L(()=>{Ya(),Ur=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:a}=t,n=t.norm??{mean:255,bias:0},i,o;typeof n.mean=="number"?i=[n.mean,n.mean,n.mean,n.mean]:i=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?o=[n.bias,n.bias,n.bias,n.bias]:o=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",p=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*a,f=p==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),g=4,y=0,_=1,w=2,b=3,S=0,v=d,$=d*2,I=-1;l==="RGB"&&(g=3,y=0,_=1,w=2,b=-1),p==="RGBA"?I=d*3:p==="RBG"?(S=0,$=d,v=d*2):p==="BGR"&&($=0,v=d,S=d*2);for(let k=0;k<d;k++,y+=g,w+=g,_+=g,b+=g)f[S++]=(e[y]+o[0])/i[0],f[v++]=(e[_]+o[1])/i[1],f[$++]=(e[w]+o[2])/i[2],I!==-1&&b!==-1&&(f[I++]=(e[b]+o[3])/i[3]);return p==="RGBA"?new Le("float32",f,[1,4,r,a]):new Le("float32",f,[1,3,r,a])},qp=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,a=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",o,l=t??{},p=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=p();f.width=e.width,f.height=e.height;let g=d(f);if(g!=null){let y=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(y=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=y,l.width=_}else l.tensorFormat="RGBA",l.height=y,l.width=_;g.drawImage(e,0,0),o=g.getImageData(0,0,_,y).data}else throw new Error("Can not access image data")}else if(a){let f,g;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,g=t.resizedWidth):(f=e.height,g=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=f,l.width=g,t!==void 0){let y=p();y.width=g,y.height=f;let _=d(y);if(_!=null)_.putImageData(e,0,0),o=_.getImageData(0,0,g,f).data;else throw new Error("Can not access image data")}else o=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=p();f.width=e.width,f.height=e.height;let g=d(f);if(g!=null){let y=e.height,_=e.width;return g.drawImage(e,0,0,_,y),o=g.getImageData(0,0,_,y).data,l.height=y,l.width=_,Ur(o,l)}else throw new Error("Can not access image data")}else{if(i)return new Promise((f,g)=>{let y=p(),_=d(y);if(!e||!_)return g();let w=new Image;w.crossOrigin="Anonymous",w.src=e,w.onload=()=>{y.width=w.width,y.height=w.height,_.drawImage(w,0,0,y.width,y.height);let b=_.getImageData(0,0,y.width,y.height);l.height=y.height,l.width=y.width,f(Ur(b.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return Ur(o,l);throw new Error("Input data provided is not supported - aborted tensor creation")},Vp=(e,t)=>{let{width:r,height:a,download:n,dispose:i}=t,o=[1,a,r,4];return new Le({location:"texture",type:"float32",texture:e,dims:o,download:n,dispose:i})},Gp=(e,t)=>{let{dataType:r,dims:a,download:n,dispose:i}=t;return new Le({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:a,download:n,dispose:i})},Fp=(e,t)=>{let{dataType:r,dims:a,download:n,dispose:i}=t;return new Le({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:a,download:n,dispose:i})},Hp=(e,t,r)=>new Le({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Ot,hr,Ni,jp,s0=L(()=>{Ot=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),hr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ni=!1,jp=()=>{if(!Ni){Ni=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,a=typeof r<"u"&&r.from;e&&(Ot.set("int64",BigInt64Array),hr.set(BigInt64Array,"int64")),t&&(Ot.set("uint64",BigUint64Array),hr.set(BigUint64Array,"uint64")),a?(Ot.set("float16",r),hr.set(r,"float16")):Ot.set("float16",Uint16Array)}}}),Kp,Qp,o0=L(()=>{Ya(),Kp=e=>{let t=1;for(let r=0;r<e.length;r++){let a=e[r];if(typeof a!="number"||!Number.isSafeInteger(a))throw new TypeError(`dims[${r}] must be an integer, got: ${a}`);if(a<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${a}`);t*=a}return t},Qp=(e,t)=>{switch(e.location){case"cpu":return new Le(e.type,e.data,t);case"cpu-pinned":return new Le({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Le({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Le({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Le({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Le,Ya=L(()=>{a0(),n0(),s0(),o0(),Le=class{constructor(e,t,r){jp();let a,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,a=e.type,n=e.dims,e.location){case"cpu-pinned":{let o=Ot.get(a);if(!o)throw new TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(a!=="float32")throw new TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint64"&&a!=="int8"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,l;if(typeof e=="string")if(a=e,l=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let p=Ot.get(e);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&p===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${p.name} as data.`);e==="uint64"||e==="int64"?o=p.from(t,BigInt):o=p.from(t)}else if(t instanceof p)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&p!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${a} tensor's data must be type of ${p}`)}else if(l=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof e[0];if(p==="string")a="string",o=e;else if(p==="boolean")a="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(e instanceof Uint8ClampedArray)a="uint8",o=Uint8Array.from(e);else{let p=hr.get(e.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);a=p,o=e}if(l===void 0)l=[o.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");n=l,this.cpuData=o,this.dataLocation="cpu"}let i=Kp(n);if(this.cpuData&&i!==this.cpuData.length&&!((a==="uint4"||a==="int4")&&Math.ceil(i/2)===this.cpuData.length))throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=n,this.size=i}static async fromImage(e,t){return qp(e,t)}static fromTexture(e,t){return Vp(e,t)}static fromGpuBuffer(e,t){return Gp(e,t)}static fromMLTensor(e,t){return Fp(e,t)}static fromPinnedBuffer(e,t,r){return Hp(e,t,r)}toDataURL(e){return Wp(this,e)}toImageData(e){return Lp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Qp(this,e)}}}),Je,Zp=L(()=>{Ya(),Je=Le}),br,Di,tt,je,Xp=L(()=>{Up(),br=(e,t)=>{(typeof He.trace>"u"?!He.wasm.trace:!He.trace)||console.timeStamp(`${e}::ORT::${t}`)},Di=(e,t)=>{var n;let r=((n=new Error().stack)==null?void 0:n.split(/\r\n|\r|\n/g))||[],a=!1;for(let i=0;i<r.length;i++){if(a&&!r[i].includes("TRACE_FUNC")){let o=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(o+=`::${t}`),br("CPU",o);return}r[i].includes("TRACE_FUNC")&&(a=!0)}},tt=e=>{(typeof He.trace>"u"?!He.wasm.trace:!He.trace)||Di("BEGIN",e)},je=e=>{(typeof He.trace>"u"?!He.wasm.trace:!He.trace)||Di("END",e)}}),Yp,u0=L(()=>{Dp(),Zp(),Xp(),Yp=class Jp{constructor(t){this.handler=t}async run(t,r,a){tt();let n={},i={};if(typeof t!="object"||t===null||t instanceof Je||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Je)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);n[d]=null}if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,f=Object.getOwnPropertyNames(r);for(let g of this.outputNames)if(f.indexOf(g)!==-1){let y=r[g];(y===null||y instanceof Je)&&(d=!0,o=!1,n[g]=y)}if(d){if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(o)for(let d of this.outputNames)n[d]=null;let l=await this.handler.run(t,n,i),p={};for(let d in l)if(Object.hasOwnProperty.call(l,d)){let f=l[d];f instanceof Je?p[d]=f:p[d]=new Je(f.type,f.data,f.dims)}return je(),p}async release(){return this.handler.dispose()}static async create(t,r,a,n){tt();let i,o={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,g=0,y=t.byteLength;if(typeof r=="object"&&r!==null)o=r;else if(typeof r=="number"){if(g=r,!Number.isSafeInteger(g))throw new RangeError("'byteOffset' must be an integer.");if(g<0||g>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(y=t.byteLength-g,typeof a=="number"){if(y=a,!Number.isSafeInteger(y))throw new RangeError("'byteLength' must be an integer.");if(y<=0||g+y>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-g}].`);if(typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof a<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(f,g,y)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,p]=await Np(o),d=await l.createInferenceSessionHandler(i,p);return je(),new Jp(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),Ja,l0=L(()=>{u0(),Ja=Yp}),d0=L(()=>{}),p0=L(()=>{}),c0=L(()=>{}),h0=L(()=>{}),ec={};Ir(ec,{InferenceSession:()=>Ja,TRACE:()=>br,TRACE_FUNC_BEGIN:()=>tt,TRACE_FUNC_END:()=>je,Tensor:()=>Je,env:()=>we,registerBackend:()=>Mt});var rt=L(()=>{t0(),i0(),l0(),Zp(),d0(),p0(),Xp(),c0(),h0()}),en=L(()=>{}),tc={};Ir(tc,{default:()=>rc});var Pi,Ui,rc,f0=L(()=>{var e;sm(),Ut(),tn(),Pi="ort-wasm-proxy-worker",Ui=((e=globalThis.self)==null?void 0:e.name)===Pi,Ui&&(self.onmessage=t=>{let{type:r,in:a}=t.data;try{switch(r){case"init-wasm":rn(a.wasm).then(()=>{$n(a).then(()=>{postMessage({type:r})},n=>{postMessage({type:r,err:n})})},n=>{postMessage({type:r,err:n})});break;case"init-ep":{let{epName:n,env:i}=a;vn(i,n).then(()=>{postMessage({type:r})},o=>{postMessage({type:r,err:o})});break}case"copy-from":{let{buffer:n}=a,i=ui(n);postMessage({type:r,out:i});break}case"create":{let{model:n,options:i}=a;xn(n,i).then(o=>{postMessage({type:r,out:o})},o=>{postMessage({type:r,err:o})});break}case"release":Sn(a),postMessage({type:r});break;case"run":{let{sessionId:n,inputIndices:i,inputs:o,outputIndices:l,options:p}=a;kn(n,i,o,l,new Array(l.length).fill(null),p).then(d=>{d.some(f=>f[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:d},Tn([...o,...d]))},d=>{postMessage({type:r,err:d})});break}case"end-profiling":In(a),postMessage({type:r});break;default:}}catch(n){postMessage({type:r,err:n})}}),rc=Ui?null:t=>new Worker(t??We,{type:"module",name:Pi})}),ic={};Ir(ic,{default:()=>ac});var Wi,Li,ac,Yo,m0=L(()=>{var e,t;Li=(Wi=import.meta.url,async function(r={}){var Lo;var a,n,i=r,o=new Promise((s,u)=>{a=s,n=u}),l=typeof window=="object",p=typeof WorkerGlobalScope<"u",d=p&&((Lo=self.name)==null?void 0:Lo.startsWith("em-pthread"));i.mountExternalData=(s,u)=>{s.startsWith("./")&&(s=s.substring(2)),(i.Bd||(i.Bd=new Map)).set(s,u)},i.unmountExternalData=()=>{delete i.Bd};var f=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let g=()=>{let s=(c,h,m)=>(...x)=>{let C=at,A=h==null?void 0:h();x=c(...x);let R=h==null?void 0:h();return A!==R&&(c=R,m(A),h=m=null),at!=C?new Promise((U,F)=>{Ii={resolve:U,reject:F}}):x},u=c=>async(...h)=>{var m;try{if(i.Cd)throw Error("Session already started");let x=i.Cd={be:h[0],errors:[]},C=await c(...h);if(i.Cd!==x)throw Error("Session mismatch");(m=i.Dd)==null||m.flush();let A=x.errors;if(0<A.length){let R=await Promise.all(A);if(R=R.filter(U=>U),0<R.length)throw Error(R.join(`
`))}return C}finally{i.Cd=null}};i._OrtCreateSession=s(i._OrtCreateSession,()=>i._OrtCreateSession,c=>i._OrtCreateSession=c),i._OrtRun=u(s(i._OrtRun,()=>i._OrtRun,c=>i._OrtRun=c)),i._OrtRunWithBinding=u(s(i._OrtRunWithBinding,()=>i._OrtRunWithBinding,c=>i._OrtRunWithBinding=c)),i._OrtBindInput=s(i._OrtBindInput,()=>i._OrtBindInput,c=>i._OrtBindInput=c),g=void 0};i.jsepInit=(s,u)=>{if(g==null||g(),s==="webgpu"){[i.Dd,i.Rd,i.Vd,i.Hd,i.Ud,i.hc,i.Wd,i.Zd,i.Sd,i.Td,i.Xd]=u;let c=i.Dd;i.jsepRegisterBuffer=(h,m,x,C)=>c.registerBuffer(h,m,x,C),i.jsepGetBuffer=h=>c.getBuffer(h),i.jsepCreateDownloader=(h,m,x)=>c.createDownloader(h,m,x),i.jsepOnCreateSession=h=>{c.onCreateSession(h)},i.jsepOnReleaseSession=h=>{c.onReleaseSession(h)},i.jsepOnRunStart=h=>c.onRunStart(h),i.$d=(h,m)=>{c.upload(h,m)}}else if(s==="webnn"){[i.Dd,i.Yd,i.Id,i.jsepEnsureTensor,i.Jd,i.jsepDownloadTensor]=u,i.jsepReleaseTensorId=i.Id,i.jsepUploadTensor=i.Jd;let c=i.Dd;i.jsepOnRunStart=h=>c.onRunStart(h),i.jsepOnRunEnd=c.onRunEnd.bind(c),i.jsepRegisterMLContext=(h,m)=>{c.registerMLContext(h,m)},i.jsepOnReleaseSession=h=>{c.onReleaseSession(h)},i.jsepCreateMLTensorDownloader=(h,m)=>c.createMLTensorDownloader(h,m),i.jsepRegisterMLTensor=(h,m,x,C)=>c.registerMLTensor(h,m,x,C),i.jsepCreateMLContext=h=>c.createMLContext(h),i.jsepRegisterMLConstant=(h,m,x,C,A)=>c.registerMLConstant(h,m,x,C,A,i.Bd),i.jsepRegisterGraphInput=c.registerGraphInput.bind(c),i.jsepIsGraphInput=c.isGraphInput.bind(c),i.jsepCreateTemporaryTensor=c.createTemporaryTensor.bind(c)}};var y,_,w=Object.assign({},i),b=(s,u)=>{throw u},S="";(l||p)&&(p?S=self.location.href:typeof document<"u"&&document.currentScript&&(S=document.currentScript.src),Wi&&(S=Wi),S=S.startsWith("blob:")?"":S.slice(0,S.replace(/[?#].*/,"").lastIndexOf("/")+1),p&&(_=s=>{var u=new XMLHttpRequest;return u.open("GET",s,!1),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),y=async s=>{if(ge(s))return new Promise((c,h)=>{var m=new XMLHttpRequest;m.open("GET",s,!0),m.responseType="arraybuffer",m.onload=()=>{m.status==200||m.status==0&&m.response?c(m.response):h(m.status)},m.onerror=h,m.send(null)});var u=await fetch(s,{credentials:"same-origin"});if(u.ok)return u.arrayBuffer();throw Error(u.status+" : "+u.url)});var v=console.log.bind(console),$=console.error.bind(console),I=v,k=$;Object.assign(i,w),w=null;var T,E,z,B,W,G,ee,ae,Z,te,Y,V,de,me=i.wasmBinary,H=!1,ge=s=>s.startsWith("file://");function N(){return T.buffer!=B.buffer&&ye(),B}function q(){return T.buffer!=B.buffer&&ye(),W}function le(){return T.buffer!=B.buffer&&ye(),G}function $e(){return T.buffer!=B.buffer&&ye(),ee}function D(){return T.buffer!=B.buffer&&ye(),ae}function ce(){return T.buffer!=B.buffer&&ye(),Z}function Ve(){return T.buffer!=B.buffer&&ye(),te}function De(){return T.buffer!=B.buffer&&ye(),de}if(d){let s=function(u){try{var c=u.data,h=c.yd;if(h==="load"){let m=[];self.onmessage=x=>m.push(x),self.startWorker=()=>{postMessage({yd:"loaded"});for(let x of m)s(x);self.onmessage=s};for(let x of c.Od)i[x]&&!i[x].proxy||(i[x]=(...C)=>{postMessage({yd:"callHandler",Nd:x,args:C})},x=="print"&&(I=i[x]),x=="printErr"&&(k=i[x]));T=c.he,ye(),St(c.ie)}else if(h==="run"){Im(c.xd),zi(c.xd,0,0,1,0,0),Ln(),Si(c.xd),Te||(Ms(),Te=!0);try{Tm(c.de,c.Fd)}catch(m){if(m!="unwind")throw m}}else c.target!=="setimmediate"&&(h==="checkMailbox"?Te&&Er():h&&(k(`worker: received unknown command ${h}`),k(c)))}catch(m){throw Ns(),m}};var St,Te=!1;k=function(...u){u=u.join(" "),console.error(u)},self.alert=function(...u){postMessage({yd:"alert",text:u.join(" "),fe:Dr()})},self.onunhandledrejection=u=>{throw u.reason||u},self.onmessage=s}function ye(){var s=T.buffer;i.HEAP8=B=new Int8Array(s),i.HEAP16=G=new Int16Array(s),i.HEAPU8=W=new Uint8Array(s),i.HEAPU16=ee=new Uint16Array(s),i.HEAP32=ae=new Int32Array(s),i.HEAPU32=Z=new Uint32Array(s),i.HEAPF32=te=new Float32Array(s),i.HEAPF64=de=new Float64Array(s),i.HEAP64=Y=new BigInt64Array(s),i.HEAPU64=V=new BigUint64Array(s)}function ct(){d?startWorker(i):P.Bb()}d||(T=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ye());var Zt,kt=0,Xt=null;function Bn(){if(--kt==0&&Xt){var s=Xt;Xt=null,s()}}function ot(s){throw k(s="Aborted("+s+")"),H=!0,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),n(s),s}function Mn(){return{a:{Ta:km,Va:Sm,W:Cm,la:Em,b:Am,u:Om,R:Rm,Za:Bm,d:Mm,pb:Fn,g:zm,T:Kn,Ga:Qn,lb:Xn,nb:Yn,Ha:Jn,Ea:es,wb:ts,Da:rs,pa:is,mb:as,jb:ns,Fa:ss,kb:os,Ma:Nm,za:Dm,eb:Pm,cb:Wm,ya:qm,V:Vm,N:Gm,db:Fm,ma:Ym,fb:Jm,zb:eg,hb:tg,qb:rg,ab:ig,Aa:ag,yb:Si,Ja:ng,S:sg,Wa:og,$:dg,G:pg,E:hg,m:$i,H:fg,B:yg,X:_g,J:wg,v:bg,O:$g,D:vg,t:xg,A:Sg,z:kg,w:Ig,r:Tg,tb:Cg,ub:Eg,vb:zg,rb:$s,sb:vs,bb:xs,Oa:Og,La:Bg,y:Mg,ja:Ng,Ba:Dg,Ka:Rg,qa:Pg,Ia:Ug,ib:Wg,U:Ag,fa:Lg,Sa:qg,gb:Vg,Qa:Gg,Pa:Fg,Ab:Ts,Ca:Cs,ob:mi,aa:Es,oa:zs,xb:As,na:Os,$a:_y,ia:Ay,sa:Ny,ga:gy,da:Sy,ua:By,p:fy,e:Yg,c:Zg,ea:vy,f:Jg,n:ty,k:dy,Y:iy,ka:py,j:my,wa:$y,Ra:Uy,ca:Ey,Ua:Py,P:xy,K:ny,_:Cy,Q:yy,Z:Oy,x:ay,l:Xg,va:Ty,i:Qg,h:ry,ra:Dy,ta:My,o:ey,q:sy,s:uy,I:ly,C:hy,L:cy,xa:by,_a:wy,F:zy,Ya:ky,ba:Ry,M:oy,Xa:Iy,ha:jg,a:T,Na:fi}}}var pi={1319426:()=>typeof wasmOffsetConverter<"u",1319483:(s,u,c,h,m)=>{if(i===void 0||!i.Bd)return 1;if((s=Ie(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=i.Bd.get(s)))return 2;if(u=Number(u>>>0),c=Number(c>>>0),h=Number(h>>>0),u+c>s.byteLength)return 3;try{let x=s.subarray(u,u+c);switch(m){case 0:q().set(x,h>>>0);break;case 1:i.$d(h,x);break;default:return 4}return 0}catch{return 4}},1320198:(s,u,c)=>{i.Jd(s,q().subarray(u>>>0,u+c>>>0))},1320261:()=>i.Yd(),1320302:s=>{i.Id(s)},1320338:()=>{i.Sd()},1320369:()=>{i.Td()},1320398:()=>{i.Xd()},1320423:s=>i.Rd(s),1320456:s=>i.Vd(s),1320488:(s,u,c)=>{i.Hd(Number(s),Number(u),Number(c),!0)},1320551:(s,u,c)=>{i.Hd(Number(s),Number(u),Number(c))},1320608:s=>{i.hc("Abs",s,void 0)},1320659:s=>{i.hc("Neg",s,void 0)},1320710:s=>{i.hc("Floor",s,void 0)},1320763:s=>{i.hc("Ceil",s,void 0)},1320815:s=>{i.hc("Reciprocal",s,void 0)},1320873:s=>{i.hc("Sqrt",s,void 0)},1320925:s=>{i.hc("Exp",s,void 0)},1320976:s=>{i.hc("Erf",s,void 0)},1321027:s=>{i.hc("Sigmoid",s,void 0)},1321082:(s,u,c)=>{i.hc("HardSigmoid",s,{alpha:u,beta:c})},1321161:s=>{i.hc("Log",s,void 0)},1321212:s=>{i.hc("Sin",s,void 0)},1321263:s=>{i.hc("Cos",s,void 0)},1321314:s=>{i.hc("Tan",s,void 0)},1321365:s=>{i.hc("Asin",s,void 0)},1321417:s=>{i.hc("Acos",s,void 0)},1321469:s=>{i.hc("Atan",s,void 0)},1321521:s=>{i.hc("Sinh",s,void 0)},1321573:s=>{i.hc("Cosh",s,void 0)},1321625:s=>{i.hc("Asinh",s,void 0)},1321678:s=>{i.hc("Acosh",s,void 0)},1321731:s=>{i.hc("Atanh",s,void 0)},1321784:s=>{i.hc("Tanh",s,void 0)},1321836:s=>{i.hc("Not",s,void 0)},1321887:(s,u,c)=>{i.hc("Clip",s,{min:u,max:c})},1321956:s=>{i.hc("Clip",s,void 0)},1322008:(s,u)=>{i.hc("Elu",s,{alpha:u})},1322066:s=>{i.hc("Gelu",s,void 0)},1322118:s=>{i.hc("Relu",s,void 0)},1322170:(s,u)=>{i.hc("LeakyRelu",s,{alpha:u})},1322234:(s,u)=>{i.hc("ThresholdedRelu",s,{alpha:u})},1322304:(s,u)=>{i.hc("Cast",s,{to:u})},1322362:s=>{i.hc("Add",s,void 0)},1322413:s=>{i.hc("Sub",s,void 0)},1322464:s=>{i.hc("Mul",s,void 0)},1322515:s=>{i.hc("Div",s,void 0)},1322566:s=>{i.hc("Pow",s,void 0)},1322617:s=>{i.hc("Equal",s,void 0)},1322670:s=>{i.hc("Greater",s,void 0)},1322725:s=>{i.hc("GreaterOrEqual",s,void 0)},1322787:s=>{i.hc("Less",s,void 0)},1322839:s=>{i.hc("LessOrEqual",s,void 0)},1322898:(s,u,c,h,m)=>{i.hc("ReduceMean",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323073:(s,u,c,h,m)=>{i.hc("ReduceMax",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323247:(s,u,c,h,m)=>{i.hc("ReduceMin",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323421:(s,u,c,h,m)=>{i.hc("ReduceProd",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323596:(s,u,c,h,m)=>{i.hc("ReduceSum",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323770:(s,u,c,h,m)=>{i.hc("ReduceL1",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323943:(s,u,c,h,m)=>{i.hc("ReduceL2",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324116:(s,u,c,h,m)=>{i.hc("ReduceLogSum",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324293:(s,u,c,h,m)=>{i.hc("ReduceSumSquare",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324473:(s,u,c,h,m)=>{i.hc("ReduceLogSumExp",s,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324653:s=>{i.hc("Where",s,void 0)},1324706:(s,u,c)=>{i.hc("Transpose",s,{perm:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[]})},1324830:(s,u,c,h)=>{i.hc("DepthToSpace",s,{blocksize:u,mode:Ie(c),format:h?"NHWC":"NCHW"})},1324963:(s,u,c,h)=>{i.hc("DepthToSpace",s,{blocksize:u,mode:Ie(c),format:h?"NHWC":"NCHW"})},1325096:(s,u,c,h,m,x,C,A,R,U,F,X,se,be,Fe)=>{i.hc("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:u,dilations:[c],group:h,kernelShape:[m],pads:[x,C],strides:[A],wIsConst:()=>!!N()[U>>>0],outputPadding:F?Array.from(D().subarray(Number(F)>>>0,Number(X)>>>0)):[],outputShape:se?Array.from(D().subarray(Number(se)>>>0,Number(be)>>>0)):[],activation:Ie(Fe)})},1325529:(s,u,c,h,m,x,C,A,R,U,F,X,se,be)=>{i.hc("ConvTranspose",s,{format:A?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:h,kernelShape:Array.from(D().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!N()[R>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(F)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[],activation:Ie(be)})},1326190:(s,u,c,h,m,x,C,A,R,U,F,X,se,be,Fe)=>{i.hc("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:u,dilations:[c],group:h,kernelShape:[m],pads:[x,C],strides:[A],wIsConst:()=>!!N()[U>>>0],outputPadding:F?Array.from(D().subarray(Number(F)>>>0,Number(X)>>>0)):[],outputShape:se?Array.from(D().subarray(Number(se)>>>0,Number(be)>>>0)):[],activation:Ie(Fe)})},1326623:(s,u,c,h,m,x,C,A,R,U,F,X,se,be)=>{i.hc("ConvTranspose",s,{format:A?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:h,kernelShape:Array.from(D().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!N()[R>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(F)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[],activation:Ie(be)})},1327284:(s,u)=>{i.hc("GlobalAveragePool",s,{format:u?"NHWC":"NCHW"})},1327375:(s,u,c,h,m,x,C,A,R,U,F,X,se,be)=>{i.hc("AveragePool",s,{format:be?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(F)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1327854:(s,u)=>{i.hc("GlobalAveragePool",s,{format:u?"NHWC":"NCHW"})},1327945:(s,u,c,h,m,x,C,A,R,U,F,X,se,be)=>{i.hc("AveragePool",s,{format:be?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(F)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1328424:(s,u)=>{i.hc("GlobalMaxPool",s,{format:u?"NHWC":"NCHW"})},1328511:(s,u,c,h,m,x,C,A,R,U,F,X,se,be)=>{i.hc("MaxPool",s,{format:be?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(F)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1328986:(s,u)=>{i.hc("GlobalMaxPool",s,{format:u?"NHWC":"NCHW"})},1329073:(s,u,c,h,m,x,C,A,R,U,F,X,se,be)=>{i.hc("MaxPool",s,{format:be?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(F)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1329548:(s,u,c,h,m)=>{i.hc("Gemm",s,{alpha:u,beta:c,transA:h,transB:m})},1329652:s=>{i.hc("MatMul",s,void 0)},1329706:(s,u,c,h)=>{i.hc("ArgMax",s,{keepDims:!!u,selectLastIndex:!!c,axis:h})},1329814:(s,u,c,h)=>{i.hc("ArgMin",s,{keepDims:!!u,selectLastIndex:!!c,axis:h})},1329922:(s,u)=>{i.hc("Softmax",s,{axis:u})},1329985:(s,u)=>{i.hc("Concat",s,{axis:u})},1330045:(s,u,c,h,m)=>{i.hc("Split",s,{axis:u,numOutputs:c,splitSizes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1330201:s=>{i.hc("Expand",s,void 0)},1330255:(s,u)=>{i.hc("Gather",s,{axis:Number(u)})},1330326:(s,u)=>{i.hc("GatherElements",s,{axis:Number(u)})},1330405:(s,u)=>{i.hc("GatherND",s,{batch_dims:Number(u)})},1330484:(s,u,c,h,m,x,C,A,R,U,F)=>{i.hc("Resize",s,{antialias:u,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Ie(m),cubicCoeffA:x,excludeOutside:C,extrapolationValue:A,keepAspectRatioPolicy:Ie(R),mode:Ie(U),nearestMode:Ie(F)})},1330846:(s,u,c,h,m,x,C)=>{i.hc("Slice",s,{starts:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[],ends:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[],axes:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[]})},1331110:s=>{i.hc("Tile",s,void 0)},1331162:(s,u,c)=>{i.hc("InstanceNormalization",s,{epsilon:u,format:c?"NHWC":"NCHW"})},1331276:(s,u,c)=>{i.hc("InstanceNormalization",s,{epsilon:u,format:c?"NHWC":"NCHW"})},1331390:s=>{i.hc("Range",s,void 0)},1331443:(s,u)=>{i.hc("Einsum",s,{equation:Ie(u)})},1331524:(s,u,c,h,m)=>{i.hc("Pad",s,{mode:u,value:c,pads:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1331667:(s,u,c,h,m,x)=>{i.hc("BatchNormalization",s,{epsilon:u,momentum:c,spatial:!!m,trainingMode:!!h,format:x?"NHWC":"NCHW"})},1331836:(s,u,c,h,m,x)=>{i.hc("BatchNormalization",s,{epsilon:u,momentum:c,spatial:!!m,trainingMode:!!h,format:x?"NHWC":"NCHW"})},1332005:(s,u,c)=>{i.hc("CumSum",s,{exclusive:Number(u),reverse:Number(c)})},1332102:(s,u,c)=>{i.hc("DequantizeLinear",s,{axis:u,blockSize:c})},1332192:(s,u,c,h,m)=>{i.hc("GridSample",s,{align_corners:u,mode:Ie(c),padding_mode:Ie(h),format:m?"NHWC":"NCHW"})},1332362:(s,u,c,h,m)=>{i.hc("GridSample",s,{align_corners:u,mode:Ie(c),padding_mode:Ie(h),format:m?"NHWC":"NCHW"})},1332532:(s,u)=>{i.hc("ScatterND",s,{reduction:Ie(u)})},1332617:(s,u,c,h,m,x,C,A,R)=>{i.hc("Attention",s,{numHeads:u,isUnidirectional:c,maskFilterValue:h,scale:m,doRotary:x,qkvHiddenSizes:C?Array.from(D().subarray(Number(A)>>>0,Number(A)+C>>>0)):[],pastPresentShareBuffer:!!R})},1332889:s=>{i.hc("BiasAdd",s,void 0)},1332944:s=>{i.hc("BiasSplitGelu",s,void 0)},1333005:s=>{i.hc("FastGelu",s,void 0)},1333061:(s,u,c,h,m,x,C,A,R,U,F,X,se,be,Fe,rr)=>{i.hc("Conv",s,{format:X?"NHWC":"NCHW",auto_pad:u,dilations:c?Array.from(D().subarray(Number(c)>>>0,Number(h)>>>0)):[],group:m,kernel_shape:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],pads:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],strides:U?Array.from(D().subarray(Number(U)>>>0,Number(F)>>>0)):[],w_is_const:()=>!!N()[Number(se)>>>0],activation:Ie(be),activation_params:Fe?Array.from(Ve().subarray(Number(Fe)>>>0,Number(rr)>>>0)):[]})},1333645:s=>{i.hc("Gelu",s,void 0)},1333697:(s,u,c,h,m,x,C,A,R)=>{i.hc("GroupQueryAttention",s,{numHeads:u,kvNumHeads:c,scale:h,softcap:m,doRotary:x,rotaryInterleaved:C,smoothSoftmax:A,localWindowSize:R})},1333914:(s,u,c,h)=>{i.hc("LayerNormalization",s,{axis:u,epsilon:c,simplified:!!h})},1334025:(s,u,c,h)=>{i.hc("LayerNormalization",s,{axis:u,epsilon:c,simplified:!!h})},1334136:(s,u,c,h,m,x)=>{i.hc("MatMulNBits",s,{k:u,n:c,accuracyLevel:h,bits:m,blockSize:x})},1334263:(s,u,c,h,m,x)=>{i.hc("MultiHeadAttention",s,{numHeads:u,isUnidirectional:c,maskFilterValue:h,scale:m,doRotary:x})},1334422:(s,u)=>{i.hc("QuickGelu",s,{alpha:u})},1334486:(s,u,c,h,m)=>{i.hc("RotaryEmbedding",s,{interleaved:!!u,numHeads:c,rotaryEmbeddingDim:h,scale:m})},1334625:(s,u,c)=>{i.hc("SkipLayerNormalization",s,{epsilon:u,simplified:!!c})},1334727:(s,u,c)=>{i.hc("SkipLayerNormalization",s,{epsilon:u,simplified:!!c})},1334829:(s,u,c,h)=>{i.hc("GatherBlockQuantized",s,{gatherAxis:u,quantizeAxis:c,blockSize:h})},1334950:s=>{i.Wd(s)},1334984:(s,u)=>i.Zd(Number(s),Number(u),i.Cd.be,i.Cd.errors)};function Sm(s,u,c){return ms(async()=>{await i.Ud(Number(s),Number(u),Number(c))})}function km(){return typeof wasmOffsetConverter<"u"}class ci{constructor(u){Vo(this,"name","ExitStatus");this.message=`Program terminated with exit(${u})`,this.status=u}}var Nn=s=>{s.terminate(),s.onmessage=()=>{}},hi=[],Dn=s=>{ft.length==0&&(Vn(),qn(ft[0]));var u=ft.pop();if(!u)return 6;Yt.push(u),It[s.xd]=u,u.xd=s.xd;var c={yd:"run",de:s.ce,Fd:s.Fd,xd:s.xd};return u.postMessage(c,s.Ld),0},ht=0,ve=(s,u,...c)=>{for(var h=2*c.length,m=ie(),x=Oi(8*h),C=x>>>3,A=0;A<c.length;A++){var R=c[A];typeof R=="bigint"?(Y[C+2*A]=1n,Y[C+2*A+1]=R):(Y[C+2*A]=0n,De()[C+2*A+1>>>0]=R)}return s=Ds(s,0,h,x,u),re(m),s};function fi(s){if(d)return ve(0,1,s);if(z=s,!(0<ht)){for(var u of Yt)Nn(u);for(u of ft)Nn(u);ft=[],Yt=[],It={},H=!0}b(0,new ci(s))}function Pn(s){if(d)return ve(1,0,s);mi(s)}var mi=s=>{if(z=s,d)throw Pn(s),"unwind";fi(s)},ft=[],Yt=[],Un=[],It={},Wn=s=>{var u=s.xd;delete It[u],ft.push(s),Yt.splice(Yt.indexOf(s),1),s.xd=0,Ps(u)};function Ln(){Un.forEach(s=>s())}var qn=s=>new Promise(u=>{s.onmessage=m=>{var x=(m=m.data).yd;if(m.Ed&&m.Ed!=Dr()){var C=It[m.Ed];C?C.postMessage(m,m.Ld):k(`Internal error! Worker sent a message "${x}" to target pthread ${m.Ed}, but that thread no longer exists!`)}else x==="checkMailbox"?Er():x==="spawnThread"?Dn(m):x==="cleanupThread"?Wn(It[m.ee]):x==="loaded"?(s.loaded=!0,u(s)):x==="alert"?alert(`Thread ${m.fe}: ${m.text}`):m.target==="setimmediate"?s.postMessage(m):x==="callHandler"?i[m.Nd](...m.args):x&&k(`worker sent an unknown command ${x}`)},s.onerror=m=>{throw k(`worker sent an error! ${m.filename}:${m.lineno}: ${m.message}`),m};var c,h=[];for(c of[])i.propertyIsEnumerable(c)&&h.push(c);s.postMessage({yd:"load",Od:h,he:T,ie:E})});function Vn(){var s=new Worker(import.meta.url.startsWith("file:")?new URL("/assets/ort.bundle.min-OfoG_cy9.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ft.push(s)}var Im=s=>{ye();var u=ce()[s+52>>>2>>>0];s=ce()[s+56>>>2>>>0],Ls(u,u-s),re(u)},Tm=(s,u)=>{ht=0,s=Ri(s,u),0<ht?z=s:Ai(s)},Cr=[];function Cm(s){var u=new gi(s>>>=0);if(N()[u.wd+12>>>0]==0){var c=1;N()[u.wd+12>>>0]=c}return c=0,N()[u.wd+13>>>0]=c,Cr.push(u),Vs(s),Fs(s)}var Lt=0,Em=()=>{ne(0,0);var s=Cr.pop();qs(s.Gd),Lt=0};class gi{constructor(u){this.Gd=u,this.wd=u-24}}function zm(s){throw Lt||(Lt=s>>>0),Lt}var yi=s=>{var u=Lt;if(!u)return tr(0),0;var c=new gi(u);ce()[c.wd+16>>>2>>>0]=u;var h=ce()[c.wd+4>>>2>>>0];if(!h)return tr(0),u;for(var m of s){if(m===0||m===h)break;if(Gs(m,h,c.wd+16))return tr(m),u}return tr(h),u};function Am(){return yi([])}function Om(s){return yi([s>>>0])}function Rm(s,u){return yi([s>>>0,u>>>0])}var Bm=()=>{var s=Cr.pop();s||ot("no exception to throw");var u=s.Gd;if(N()[s.wd+13>>>0]==0){Cr.push(s);var c=1;N()[s.wd+13>>>0]=c,c=0,N()[s.wd+12>>>0]=c}throw Lt=u};function Mm(s,u,c){var h=new gi(s>>>=0);throw u>>>=0,c>>>=0,ce()[h.wd+16>>>2>>>0]=0,ce()[h.wd+4>>>2>>>0]=u,ce()[h.wd+8>>>2>>>0]=c,Lt=s}function Gn(s,u,c,h){return d?ve(2,1,s,u,c,h):Fn(s,u,c,h)}function Fn(s,u,c,h){if(s>>>=0,c>>>=0,h>>>=0,f===void 0)return 6;var m=[];return d&&m.length===0?Gn(s,u>>>=0,c,h):(s={ce:c,xd:s,Fd:h,Ld:m},d?(s.yd="spawnThread",postMessage(s,m),0):Dn(s))}var Hn=typeof TextDecoder<"u"?new TextDecoder:void 0,jn=(s,u=0,c=NaN)=>{var h=(u>>>=0)+c;for(c=u;s[c]&&!(c>=h);)++c;if(16<c-u&&s.buffer&&Hn)return Hn.decode(s.buffer instanceof ArrayBuffer?s.subarray(u,c):s.slice(u,c));for(h="";u<c;){var m=s[u++];if(128&m){var x=63&s[u++];if((224&m)==192)h+=String.fromCharCode((31&m)<<6|x);else{var C=63&s[u++];65536>(m=(240&m)==224?(15&m)<<12|x<<6|C:(7&m)<<18|x<<12|C<<6|63&s[u++])?h+=String.fromCharCode(m):(m-=65536,h+=String.fromCharCode(55296|m>>10,56320|1023&m))}}else h+=String.fromCharCode(m)}return h},Ie=(s,u)=>(s>>>=0)?jn(q(),s,u):"";function Kn(s,u,c){return d?ve(3,1,s,u,c):0}function Qn(s,u){if(d)return ve(4,1,s,u)}var Zn=s=>{for(var u=0,c=0;c<s.length;++c){var h=s.charCodeAt(c);127>=h?u++:2047>=h?u+=2:55296<=h&&57343>=h?(u+=4,++c):u+=3}return u},qt=(s,u,c)=>{var h=q();if(u>>>=0,0<c){var m=u;c=u+c-1;for(var x=0;x<s.length;++x){var C=s.charCodeAt(x);if(55296<=C&&57343>=C&&(C=65536+((1023&C)<<10)|1023&s.charCodeAt(++x)),127>=C){if(u>=c)break;h[u++>>>0]=C}else{if(2047>=C){if(u+1>=c)break;h[u++>>>0]=192|C>>6}else{if(65535>=C){if(u+2>=c)break;h[u++>>>0]=224|C>>12}else{if(u+3>=c)break;h[u++>>>0]=240|C>>18,h[u++>>>0]=128|C>>12&63}h[u++>>>0]=128|C>>6&63}h[u++>>>0]=128|63&C}}h[u>>>0]=0,s=u-m}else s=0;return s};function Xn(s,u){if(d)return ve(5,1,s,u)}function Yn(s,u,c){if(d)return ve(6,1,s,u,c)}function Jn(s,u,c){return d?ve(7,1,s,u,c):0}function es(s,u){if(d)return ve(8,1,s,u)}function ts(s,u,c){if(d)return ve(9,1,s,u,c)}function rs(s,u,c,h){if(d)return ve(10,1,s,u,c,h)}function is(s,u,c,h){if(d)return ve(11,1,s,u,c,h)}function as(s,u,c,h){if(d)return ve(12,1,s,u,c,h)}function ns(s){if(d)return ve(13,1,s)}function ss(s,u){if(d)return ve(14,1,s,u)}function os(s,u,c){if(d)return ve(15,1,s,u,c)}var us,mt,Nm=()=>ot(""),it=s=>{for(var u="";q()[s>>>0];)u+=us[q()[s++>>>0]];return u},_i={},wi={};function ut(s,u,c={}){return(function(h,m,x={}){var C=m.name;if(!h)throw new mt(`type "${C}" must have a positive integer typeid pointer`);if(wi.hasOwnProperty(h)){if(x.Pd)return;throw new mt(`Cannot register type '${C}' twice`)}wi[h]=m,_i.hasOwnProperty(h)&&(m=_i[h],delete _i[h],m.forEach(A=>A()))})(s,u,c)}var ls=(s,u,c)=>{switch(u){case 1:return c?h=>N()[h>>>0]:h=>q()[h>>>0];case 2:return c?h=>le()[h>>>1>>>0]:h=>$e()[h>>>1>>>0];case 4:return c?h=>D()[h>>>2>>>0]:h=>ce()[h>>>2>>>0];case 8:return c?h=>Y[h>>>3]:h=>V[h>>>3];default:throw new TypeError(`invalid integer width (${u}): ${s}`)}};function Dm(s,u,c){c>>>=0,ut(s>>>=0,{name:u=it(u>>>0),fromWireType:h=>h,toWireType:function(h,m){if(typeof m!="bigint"&&typeof m!="number")throw m=m===null?"null":(h=typeof m)=="object"||h==="array"||h==="function"?m.toString():""+m,new TypeError(`Cannot convert "${m}" to ${this.name}`);return typeof m=="number"&&(m=BigInt(m)),m},zd:gt,readValueFromPointer:ls(u,c,u.indexOf("u")==-1),Ad:null})}var gt=8;function Pm(s,u,c,h){ut(s>>>=0,{name:u=it(u>>>0),fromWireType:function(m){return!!m},toWireType:function(m,x){return x?c:h},zd:gt,readValueFromPointer:function(m){return this.fromWireType(q()[m>>>0])},Ad:null})}var bi=[],lt=[];function $i(s){9<(s>>>=0)&&--lt[s+1]==0&&(lt[s]=void 0,bi.push(s))}var Ue=s=>{if(!s)throw new mt("Cannot use deleted val. handle = "+s);return lt[s]},Ge=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let u=bi.pop()||lt.length;return lt[u]=s,lt[u+1]=1,u}};function vi(s){return this.fromWireType(ce()[s>>>2>>>0])}var Um={name:"emscripten::val",fromWireType:s=>{var u=Ue(s);return $i(s),u},toWireType:(s,u)=>Ge(u),zd:gt,readValueFromPointer:vi,Ad:null};function Wm(s){return ut(s>>>0,Um)}var Lm=(s,u)=>{switch(u){case 4:return function(c){return this.fromWireType(Ve()[c>>>2>>>0])};case 8:return function(c){return this.fromWireType(De()[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${u}): ${s}`)}};function qm(s,u,c){c>>>=0,ut(s>>>=0,{name:u=it(u>>>0),fromWireType:h=>h,toWireType:(h,m)=>m,zd:gt,readValueFromPointer:Lm(u,c),Ad:null})}function Vm(s,u,c,h,m){if(s>>>=0,c>>>=0,u=it(u>>>0),m===-1&&(m=4294967295),m=A=>A,h===0){var x=32-8*c;m=A=>A<<x>>>x}var C=u.includes("unsigned")?function(A,R){return R>>>0}:function(A,R){return R};ut(s,{name:u,fromWireType:m,toWireType:C,zd:gt,readValueFromPointer:ls(u,c,h!==0),Ad:null})}function Gm(s,u,c){function h(x){var C=ce()[x>>>2>>>0];return x=ce()[x+4>>>2>>>0],new m(N().buffer,x,C)}var m=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][u];ut(s>>>=0,{name:c=it(c>>>0),fromWireType:h,zd:gt,readValueFromPointer:h},{Pd:!0})}function Fm(s,u){ut(s>>>=0,{name:u=it(u>>>0),fromWireType:function(c){for(var h,m=ce()[c>>>2>>>0],x=c+4,C=x,A=0;A<=m;++A){var R=x+A;A!=m&&q()[R>>>0]!=0||(C=Ie(C,R-C),h===void 0?h=C:(h+="\0",h+=C),C=R+1)}return nt(c),h},toWireType:function(c,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var m=typeof h=="string";if(!(m||h instanceof Uint8Array||h instanceof Uint8ClampedArray||h instanceof Int8Array))throw new mt("Cannot pass non-string to std::string");var x=m?Zn(h):h.length,C=Pr(4+x+1),A=C+4;if(ce()[C>>>2>>>0]=x,m)qt(h,A,x+1);else if(m)for(m=0;m<x;++m){var R=h.charCodeAt(m);if(255<R)throw nt(C),new mt("String has UTF-16 code units that do not fit in 8 bits");q()[A+m>>>0]=R}else for(m=0;m<x;++m)q()[A+m>>>0]=h[m];return c!==null&&c.push(nt,C),C},zd:gt,readValueFromPointer:vi,Ad(c){nt(c)}})}var ds=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Hm=(s,u)=>{for(var c=s>>1,h=c+u/2;!(c>=h)&&$e()[c>>>0];)++c;if(32<(c<<=1)-s&&ds)return ds.decode(q().slice(s,c));for(c="",h=0;!(h>=u/2);++h){var m=le()[s+2*h>>>1>>>0];if(m==0)break;c+=String.fromCharCode(m)}return c},jm=(s,u,c)=>{if(c??(c=2147483647),2>c)return 0;var h=u;c=(c-=2)<2*s.length?c/2:s.length;for(var m=0;m<c;++m){var x=s.charCodeAt(m);le()[u>>>1>>>0]=x,u+=2}return le()[u>>>1>>>0]=0,u-h},Km=s=>2*s.length,Qm=(s,u)=>{for(var c=0,h="";!(c>=u/4);){var m=D()[s+4*c>>>2>>>0];if(m==0)break;++c,65536<=m?(m-=65536,h+=String.fromCharCode(55296|m>>10,56320|1023&m)):h+=String.fromCharCode(m)}return h},Zm=(s,u,c)=>{if(u>>>=0,c??(c=2147483647),4>c)return 0;var h=u;c=h+c-4;for(var m=0;m<s.length;++m){var x=s.charCodeAt(m);if(55296<=x&&57343>=x&&(x=65536+((1023&x)<<10)|1023&s.charCodeAt(++m)),D()[u>>>2>>>0]=x,(u+=4)+4>c)break}return D()[u>>>2>>>0]=0,u-h},Xm=s=>{for(var u=0,c=0;c<s.length;++c){var h=s.charCodeAt(c);55296<=h&&57343>=h&&++c,u+=4}return u};function Ym(s,u,c){if(s>>>=0,u>>>=0,c=it(c>>>=0),u===2)var h=Hm,m=jm,x=Km,C=A=>$e()[A>>>1>>>0];else u===4&&(h=Qm,m=Zm,x=Xm,C=A=>ce()[A>>>2>>>0]);ut(s,{name:c,fromWireType:A=>{for(var R,U=ce()[A>>>2>>>0],F=A+4,X=0;X<=U;++X){var se=A+4+X*u;X!=U&&C(se)!=0||(F=h(F,se-F),R===void 0?R=F:(R+="\0",R+=F),F=se+u)}return nt(A),R},toWireType:(A,R)=>{if(typeof R!="string")throw new mt(`Cannot pass non-string to C++ string type ${c}`);var U=x(R),F=Pr(4+U+u);return ce()[F>>>2>>>0]=U/u,m(R,F+4,U+u),A!==null&&A.push(nt,F),F},zd:gt,readValueFromPointer:vi,Ad(A){nt(A)}})}function Jm(s,u){ut(s>>>=0,{Qd:!0,name:u=it(u>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function eg(s){zi(s>>>0,!p,1,!l,131072,!1),Ln()}var xi=s=>{if(!H)try{if(s(),!(0<ht))try{d?Ai(z):mi(z)}catch(u){u instanceof ci||u=="unwind"||b(0,u)}}catch(u){u instanceof ci||u=="unwind"||b(0,u)}};function Si(s){s>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(D(),s>>>2,s).value.then(Er),s+=128,Atomics.store(D(),s>>>2,1))}var Er=()=>{var s=Dr();s&&(Si(s),xi(Ws))};function tg(s,u){(s>>>=0)==u>>>0?setTimeout(Er):d?postMessage({Ed:s,yd:"checkMailbox"}):(s=It[s])&&s.postMessage({yd:"checkMailbox"})}var ki=[];function rg(s,u,c,h,m){for(u>>>=0,h/=2,ki.length=h,c=m>>>0>>>3,m=0;m<h;m++)ki[m]=Y[c+2*m]?Y[c+2*m+1]:De()[c+2*m+1>>>0];return(u?pi[u]:Kg[s])(...ki)}var ig=()=>{ht=0};function ag(s){s>>>=0,d?postMessage({yd:"cleanupThread",ee:s}):Wn(It[s])}function ng(s){}var zr=(s,u)=>{var c=wi[s];if(c===void 0)throw s=Bs(s),c=it(s),nt(s),new mt(`${u} has unknown type ${c}`);return c},ps=(s,u,c)=>{var h=[];return s=s.toWireType(h,c),h.length&&(ce()[u>>>2>>>0]=Ge(h)),s};function sg(s,u,c){return u>>>=0,c>>>=0,s=Ue(s>>>0),u=zr(u,"emval::as"),ps(u,c,s)}function og(s,u){return u>>>=0,s=Ue(s>>>0),(u=zr(u,"emval::as")).toWireType(null,s)}var Ar=s=>{try{s()}catch(u){ot(u)}},yt=0,at=null,cs=0,Or=[],hs={},fs={},ug=0,Ii=null,lg=[];function ms(s){return(function(u){if(!H){if(yt===0){var c=!1,h=!1;u((m=0)=>{if(!H&&(cs=m,c=!0,h)){yt=2,Ar(()=>Uo(at)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),m=!1;try{var x=(function(){var R=D()[at+8>>>2>>>0];return R=P[fs[R]],--ht,R()})()}catch(R){x=R,m=!0}var C=!1;if(!at){var A=Ii;A&&(Ii=null,(m?A.reject:A.resolve)(x),C=!0)}if(m&&!C)throw x}}),h=!0,c||(yt=1,at=(function(){var m=Pr(65548),x=m+12;ce()[m>>>2>>>0]=x,ce()[m+4>>>2>>>0]=x+65536,x=Or[0];var C=hs[x];return C===void 0&&(C=ug++,hs[x]=C,fs[C]=x),x=C,D()[m+8>>>2>>>0]=x,m})(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),Ar(()=>Do(at)))}else yt===2?(yt=0,Ar(Wo),nt(at),at=null,lg.forEach(xi)):ot(`invalid state: ${yt}`);return cs}})(u=>{s().then(u)})}function dg(s){return s>>>=0,ms(async()=>{var u=await Ue(s);return Ge(u)})}var Rr=[];function pg(s,u,c,h){return c>>>=0,h>>>=0,(s=Rr[s>>>0])(null,u=Ue(u>>>0),c,h)}var cg={},Br=s=>{var u=cg[s];return u===void 0?it(s):u};function hg(s,u,c,h,m){return c>>>=0,h>>>=0,m>>>=0,(s=Rr[s>>>0])(u=Ue(u>>>0),u[c=Br(c)],h,m)}var gs=()=>typeof globalThis=="object"?globalThis:Function("return this")();function fg(s){return(s>>>=0)==0?Ge(gs()):(s=Br(s),Ge(gs()[s]))}var mg=s=>{var u=Rr.length;return Rr.push(s),u},gg=(s,u)=>{for(var c=Array(s),h=0;h<s;++h)c[h]=zr(ce()[u+4*h>>>2>>>0],"parameter "+h);return c},ys=(s,u)=>Object.defineProperty(u,"name",{value:s});function yg(s,u,c){var h=(u=gg(s,u>>>0)).shift();s--;var m=`return function (obj, func, destructorsRef, args) {
`,x=0,C=[];c===0&&C.push("obj");for(var A=["retType"],R=[h],U=0;U<s;++U)C.push("arg"+U),A.push("argType"+U),R.push(u[U]),m+=`  var arg${U} = argType${U}.readValueFromPointer(args${x?"+"+x:""});
`,x+=u[U].zd;return m+=`  var rv = ${c===1?"new func":"func.call"}(${C.join(", ")});
`,h.Qd||(A.push("emval_returnValue"),R.push(ps),m+=`  return emval_returnValue(retType, destructorsRef, rv);
`),A.push(m+`};
`),s=(function(F){var X=Function;if(!(X instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof X} which is not a function`);var se=ys(X.name||"unknownFunctionName",function(){});return se.prototype=X.prototype,se=new se,(F=X.apply(se,F))instanceof Object?F:se})(A)(...R),c=`methodCaller<(${u.map(F=>F.name).join(", ")}) => ${h.name}>`,mg(ys(c,s))}function _g(s){return s=Br(s>>>0),Ge(i[s])}function wg(s,u){return u>>>=0,s=Ue(s>>>0),u=Ue(u),Ge(s[u])}function bg(s){9<(s>>>=0)&&(lt[s+1]+=1)}function $g(){return Ge([])}function vg(s){s=Ue(s>>>0);for(var u=Array(s.length),c=0;c<s.length;c++)u[c]=s[c];return Ge(u)}function xg(s){return Ge(Br(s>>>0))}function Sg(){return Ge({})}function kg(s){for(var u=Ue(s>>>=0);u.length;){var c=u.pop();u.pop()(c)}$i(s)}function Ig(s,u,c){u>>>=0,c>>>=0,s=Ue(s>>>0),u=Ue(u),c=Ue(c),s[u]=c}function Tg(s,u){return u>>>=0,s=(s=zr(s>>>0,"_emval_take_value")).readValueFromPointer(u),Ge(s)}function Cg(s,u){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),u>>>=0,s=new Date(1e3*s),D()[u>>>2>>>0]=s.getUTCSeconds(),D()[u+4>>>2>>>0]=s.getUTCMinutes(),D()[u+8>>>2>>>0]=s.getUTCHours(),D()[u+12>>>2>>>0]=s.getUTCDate(),D()[u+16>>>2>>>0]=s.getUTCMonth(),D()[u+20>>>2>>>0]=s.getUTCFullYear()-1900,D()[u+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[u+28>>>2>>>0]=s}var _s=s=>s%4==0&&(s%100!=0||s%400==0),ws=[0,31,60,91,121,152,182,213,244,274,305,335],bs=[0,31,59,90,120,151,181,212,243,273,304,334];function Eg(s,u){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),u>>>=0,s=new Date(1e3*s),D()[u>>>2>>>0]=s.getSeconds(),D()[u+4>>>2>>>0]=s.getMinutes(),D()[u+8>>>2>>>0]=s.getHours(),D()[u+12>>>2>>>0]=s.getDate(),D()[u+16>>>2>>>0]=s.getMonth(),D()[u+20>>>2>>>0]=s.getFullYear()-1900,D()[u+24>>>2>>>0]=s.getDay();var c=(_s(s.getFullYear())?ws:bs)[s.getMonth()]+s.getDate()-1|0;D()[u+28>>>2>>>0]=c,D()[u+36>>>2>>>0]=-60*s.getTimezoneOffset(),c=new Date(s.getFullYear(),6,1).getTimezoneOffset();var h=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(c!=h&&s.getTimezoneOffset()==Math.min(h,c)),D()[u+32>>>2>>>0]=s}function zg(s){s>>>=0;var u=new Date(D()[s+20>>>2>>>0]+1900,D()[s+16>>>2>>>0],D()[s+12>>>2>>>0],D()[s+8>>>2>>>0],D()[s+4>>>2>>>0],D()[s>>>2>>>0],0),c=D()[s+32>>>2>>>0],h=u.getTimezoneOffset(),m=new Date(u.getFullYear(),6,1).getTimezoneOffset(),x=new Date(u.getFullYear(),0,1).getTimezoneOffset(),C=Math.min(x,m);return 0>c?D()[s+32>>>2>>>0]=+(m!=x&&C==h):0<c!=(C==h)&&(m=Math.max(x,m),u.setTime(u.getTime()+6e4*((0<c?C:m)-h))),D()[s+24>>>2>>>0]=u.getDay(),c=(_s(u.getFullYear())?ws:bs)[u.getMonth()]+u.getDate()-1|0,D()[s+28>>>2>>>0]=c,D()[s>>>2>>>0]=u.getSeconds(),D()[s+4>>>2>>>0]=u.getMinutes(),D()[s+8>>>2>>>0]=u.getHours(),D()[s+12>>>2>>>0]=u.getDate(),D()[s+16>>>2>>>0]=u.getMonth(),D()[s+20>>>2>>>0]=u.getYear(),s=u.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function $s(s,u,c,h,m,x,C){return d?ve(16,1,s,u,c,h,m,x,C):-52}function vs(s,u,c,h,m,x){if(d)return ve(17,1,s,u,c,h,m,x)}var Jt={},Ag=()=>performance.timeOrigin+performance.now();function xs(s,u){if(d)return ve(18,1,s,u);if(Jt[s]&&(clearTimeout(Jt[s].id),delete Jt[s]),!u)return 0;var c=setTimeout(()=>{delete Jt[s],xi(()=>Us(s,performance.timeOrigin+performance.now()))},u);return Jt[s]={id:c,ke:u},0}function Og(s,u,c,h){s>>>=0,u>>>=0,c>>>=0,h>>>=0;var m=new Date().getFullYear(),x=new Date(m,0,1).getTimezoneOffset();m=new Date(m,6,1).getTimezoneOffset();var C=Math.max(x,m);ce()[s>>>2>>>0]=60*C,D()[u>>>2>>>0]=+(x!=m),s=(u=A=>{var R=Math.abs(A);return`UTC${0<=A?"-":"+"}${String(Math.floor(R/60)).padStart(2,"0")}${String(R%60).padStart(2,"0")}`})(x),u=u(m),m<x?(qt(s,c,17),qt(u,h,17)):(qt(s,h,17),qt(u,c,17))}var Rg=()=>Date.now();function Bg(s,u,c){return 0<=s&&3>=s?(s===0?s=Date.now():s=performance.timeOrigin+performance.now(),Y[c>>>0>>>3]=BigInt(Math.round(1e6*s)),0):28}var Ti=[],Ss=(s,u)=>{Ti.length=0;for(var c;c=q()[s++>>>0];){var h=c!=105;u+=(h&=c!=112)&&u%8?4:0,Ti.push(c==112?ce()[u>>>2>>>0]:c==106?Y[u>>>3]:c==105?D()[u>>>2>>>0]:De()[u>>>3>>>0]),u+=h?8:4}return Ti};function Mg(s,u,c){return s>>>=0,u=Ss(u>>>0,c>>>0),pi[s](...u)}function Ng(s,u,c){return s>>>=0,u=Ss(u>>>0,c>>>0),pi[s](...u)}var Dg=()=>{};function Pg(s,u){return k(Ie(s>>>0,u>>>0))}var Ug=()=>{throw ht+=1,"unwind"};function Wg(){return 4294901760}var Lg=()=>navigator.hardwareConcurrency;function qg(){return ot("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Vg(s){s>>>=0;var u=q().length;if(s<=u||4294901760<s)return!1;for(var c=1;4>=c;c*=2){var h=u*(1+.2/c);h=Math.min(h,s+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(s,h)/65536))-T.buffer.byteLength+65535)/65536|0;try{T.grow(h),ye();var m=1;break e}catch{}m=void 0}if(m)return!0}return!1}var Mr=()=>(ot("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),er={},ks=s=>{s.forEach(u=>{Mr()})};function Gg(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),ks(s),er.Kd=Mr(),er.ae=s,er.Kd}function Fg(s,u,c){if(s>>>=0,u>>>=0,er.Kd==s)var h=er.ae;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),ks(h);for(var m=3;h[m]&&Mr()!=s;)++m;for(s=0;s<c&&h[s+m];++s)D()[u+4*s>>>2>>>0]=Mr();return s}var Ci,Ei={},Is=()=>{if(!Ci){var s,u={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(s in Ei)Ei[s]===void 0?delete u[s]:u[s]=Ei[s];var c=[];for(s in u)c.push(`${s}=${u[s]}`);Ci=c}return Ci};function Ts(s,u){if(d)return ve(19,1,s,u);s>>>=0,u>>>=0;var c=0;return Is().forEach((h,m)=>{var x=u+c;for(m=ce()[s+4*m>>>2>>>0]=x,x=0;x<h.length;++x)N()[m++>>>0]=h.charCodeAt(x);N()[m>>>0]=0,c+=h.length+1}),0}function Cs(s,u){if(d)return ve(20,1,s,u);s>>>=0,u>>>=0;var c=Is();ce()[s>>>2>>>0]=c.length;var h=0;return c.forEach(m=>h+=m.length+1),ce()[u>>>2>>>0]=h,0}function Es(s){return d?ve(21,1,s):52}function zs(s,u,c,h){return d?ve(22,1,s,u,c,h):52}function As(s,u,c,h){return d?ve(23,1,s,u,c,h):70}var Hg=[null,[],[]];function Os(s,u,c,h){if(d)return ve(24,1,s,u,c,h);u>>>=0,c>>>=0,h>>>=0;for(var m=0,x=0;x<c;x++){var C=ce()[u>>>2>>>0],A=ce()[u+4>>>2>>>0];u+=8;for(var R=0;R<A;R++){var U=q()[C+R>>>0],F=Hg[s];U===0||U===10?((s===1?I:k)(jn(F)),F.length=0):F.push(U)}m+=A}return ce()[h>>>2>>>0]=m,0}function jg(s){return s>>>0}d||(function(){for(var s=i.numThreads-1;s--;)Vn();hi.unshift(()=>{kt++,(function(u){d?u():Promise.all(ft.map(qn)).then(u)})(()=>Bn())})})();for(var Rs=Array(256),Nr=0;256>Nr;++Nr)Rs[Nr]=String.fromCharCode(Nr);us=Rs,mt=i.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},i.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},lt.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>lt.length/2-5-bi.length;var P,Kg=[fi,Pn,Gn,Kn,Qn,Xn,Yn,Jn,es,ts,rs,is,as,ns,ss,os,$s,vs,xs,Ts,Cs,Es,zs,As,Os];(async function(){function s(h,m){return P=h.exports,P=(function(){var x=P,C={};for(let[A,R]of Object.entries(x))C[A]=typeof R=="function"?(...U)=>{Or.push(A);try{return R(...U)}finally{H||(Or.pop(),at&&yt===1&&Or.length===0&&(yt=0,ht+=1,Ar(Po),typeof Fibers<"u"&&Fibers.le()))}}:R;return C})(),P=(function(){var x=P,C=R=>U=>R(U)>>>0,A=R=>()=>R()>>>0;return(x=Object.assign({},x)).Cb=C(x.Cb),x.fc=A(x.fc),x.ic=C(x.ic),x.vc=C(x.vc),x.wc=A(x.wc),x.Ac=C(x.Ac),x})(),Un.push(P.jc),E=m,Bn(),P}kt++;var u=Mn();if(i.instantiateWasm)return new Promise(h=>{i.instantiateWasm(u,(m,x)=>{s(m,x),h(m.exports)})});if(d)return new Promise(h=>{St=m=>{var x=new WebAssembly.Instance(m,Mn());h(s(x,m))}});Zt??(Zt=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",S):S+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-D5Jk56-t.wasm",import.meta.url).href);try{var c=await(async function(h){var m=Zt;if(!me&&typeof WebAssembly.instantiateStreaming=="function"&&!ge(m))try{var x=fetch(m,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(x,h)}catch(C){k(`wasm streaming compile failed: ${C}`),k("falling back to ArrayBuffer instantiation")}return(async function(C,A){try{var R=await(async function(U){if(!me)try{var F=await y(U);return new Uint8Array(F)}catch{}if(U==Zt&&me)U=new Uint8Array(me);else{if(!_)throw"both async and sync fetching of the wasm failed";U=_(U)}return U})(C);return await WebAssembly.instantiate(R,A)}catch(U){k(`failed to asynchronously prepare wasm: ${U}`),ot(U)}})(m,h)})(u);return s(c.instance,c.module)}catch(h){return n(h),Promise.reject(h)}})();var Bs=s=>(Bs=P.Cb)(s),Ms=()=>(Ms=P.Db)();i._OrtInit=(s,u)=>(i._OrtInit=P.Eb)(s,u),i._OrtGetLastError=(s,u)=>(i._OrtGetLastError=P.Fb)(s,u),i._OrtCreateSessionOptions=(s,u,c,h,m,x,C,A,R,U)=>(i._OrtCreateSessionOptions=P.Gb)(s,u,c,h,m,x,C,A,R,U),i._OrtAppendExecutionProvider=(s,u)=>(i._OrtAppendExecutionProvider=P.Hb)(s,u),i._OrtAddFreeDimensionOverride=(s,u,c)=>(i._OrtAddFreeDimensionOverride=P.Ib)(s,u,c),i._OrtAddSessionConfigEntry=(s,u,c)=>(i._OrtAddSessionConfigEntry=P.Jb)(s,u,c),i._OrtReleaseSessionOptions=s=>(i._OrtReleaseSessionOptions=P.Kb)(s),i._OrtCreateSession=(s,u,c)=>(i._OrtCreateSession=P.Lb)(s,u,c),i._OrtReleaseSession=s=>(i._OrtReleaseSession=P.Mb)(s),i._OrtGetInputOutputCount=(s,u,c)=>(i._OrtGetInputOutputCount=P.Nb)(s,u,c),i._OrtGetInputName=(s,u)=>(i._OrtGetInputName=P.Ob)(s,u),i._OrtGetOutputName=(s,u)=>(i._OrtGetOutputName=P.Pb)(s,u),i._OrtFree=s=>(i._OrtFree=P.Qb)(s),i._OrtCreateTensor=(s,u,c,h,m,x)=>(i._OrtCreateTensor=P.Rb)(s,u,c,h,m,x),i._OrtGetTensorData=(s,u,c,h,m)=>(i._OrtGetTensorData=P.Sb)(s,u,c,h,m),i._OrtReleaseTensor=s=>(i._OrtReleaseTensor=P.Tb)(s),i._OrtCreateRunOptions=(s,u,c,h)=>(i._OrtCreateRunOptions=P.Ub)(s,u,c,h),i._OrtAddRunConfigEntry=(s,u,c)=>(i._OrtAddRunConfigEntry=P.Vb)(s,u,c),i._OrtReleaseRunOptions=s=>(i._OrtReleaseRunOptions=P.Wb)(s),i._OrtCreateBinding=s=>(i._OrtCreateBinding=P.Xb)(s),i._OrtBindInput=(s,u,c)=>(i._OrtBindInput=P.Yb)(s,u,c),i._OrtBindOutput=(s,u,c,h)=>(i._OrtBindOutput=P.Zb)(s,u,c,h),i._OrtClearBoundOutputs=s=>(i._OrtClearBoundOutputs=P._b)(s),i._OrtReleaseBinding=s=>(i._OrtReleaseBinding=P.$b)(s),i._OrtRunWithBinding=(s,u,c,h,m)=>(i._OrtRunWithBinding=P.ac)(s,u,c,h,m),i._OrtRun=(s,u,c,h,m,x,C,A)=>(i._OrtRun=P.bc)(s,u,c,h,m,x,C,A),i._OrtEndProfiling=s=>(i._OrtEndProfiling=P.cc)(s),i._JsepOutput=(s,u,c)=>(i._JsepOutput=P.dc)(s,u,c),i._JsepGetNodeName=s=>(i._JsepGetNodeName=P.ec)(s);var Dr=()=>(Dr=P.fc)(),nt=i._free=s=>(nt=i._free=P.gc)(s),Pr=i._malloc=s=>(Pr=i._malloc=P.ic)(s),zi=(s,u,c,h,m,x)=>(zi=P.kc)(s,u,c,h,m,x),Ns=()=>(Ns=P.lc)(),Ds=(s,u,c,h,m)=>(Ds=P.mc)(s,u,c,h,m),Ps=s=>(Ps=P.nc)(s),Ai=s=>(Ai=P.oc)(s),Us=(s,u)=>(Us=P.pc)(s,u),Ws=()=>(Ws=P.qc)(),ne=(s,u)=>(ne=P.rc)(s,u),tr=s=>(tr=P.sc)(s),Ls=(s,u)=>(Ls=P.tc)(s,u),re=s=>(re=P.uc)(s),Oi=s=>(Oi=P.vc)(s),ie=()=>(ie=P.wc)(),qs=s=>(qs=P.xc)(s),Vs=s=>(Vs=P.yc)(s),Gs=(s,u,c)=>(Gs=P.zc)(s,u,c),Fs=s=>(Fs=P.Ac)(s),Hs=i.dynCall_iii=(s,u,c)=>(Hs=i.dynCall_iii=P.Bc)(s,u,c),js=i.dynCall_vi=(s,u)=>(js=i.dynCall_vi=P.Cc)(s,u),Ri=i.dynCall_ii=(s,u)=>(Ri=i.dynCall_ii=P.Dc)(s,u),Ks=i.dynCall_vii=(s,u,c)=>(Ks=i.dynCall_vii=P.Ec)(s,u,c),Qs=i.dynCall_iiii=(s,u,c,h)=>(Qs=i.dynCall_iiii=P.Fc)(s,u,c,h),Zs=i.dynCall_viii=(s,u,c,h)=>(Zs=i.dynCall_viii=P.Gc)(s,u,c,h),Xs=i.dynCall_iiiii=(s,u,c,h,m)=>(Xs=i.dynCall_iiiii=P.Hc)(s,u,c,h,m),Ys=i.dynCall_viiii=(s,u,c,h,m)=>(Ys=i.dynCall_viiii=P.Ic)(s,u,c,h,m),Js=i.dynCall_viiiiii=(s,u,c,h,m,x,C)=>(Js=i.dynCall_viiiiii=P.Jc)(s,u,c,h,m,x,C),eo=i.dynCall_viiiiiii=(s,u,c,h,m,x,C,A)=>(eo=i.dynCall_viiiiiii=P.Kc)(s,u,c,h,m,x,C,A),to=i.dynCall_ji=(s,u)=>(to=i.dynCall_ji=P.Lc)(s,u),ro=i.dynCall_v=s=>(ro=i.dynCall_v=P.Mc)(s),io=i.dynCall_viiiii=(s,u,c,h,m,x)=>(io=i.dynCall_viiiii=P.Nc)(s,u,c,h,m,x),ao=i.dynCall_i=s=>(ao=i.dynCall_i=P.Oc)(s),no=i.dynCall_fii=(s,u,c)=>(no=i.dynCall_fii=P.Pc)(s,u,c),so=i.dynCall_viiiiiiii=(s,u,c,h,m,x,C,A,R)=>(so=i.dynCall_viiiiiiii=P.Qc)(s,u,c,h,m,x,C,A,R),oo=i.dynCall_viiiiiiiiii=(s,u,c,h,m,x,C,A,R,U,F)=>(oo=i.dynCall_viiiiiiiiii=P.Rc)(s,u,c,h,m,x,C,A,R,U,F),uo=i.dynCall_jiii=(s,u,c,h)=>(uo=i.dynCall_jiii=P.Sc)(s,u,c,h),lo=i.dynCall_dii=(s,u,c)=>(lo=i.dynCall_dii=P.Tc)(s,u,c),po=i.dynCall_viiiiiiiii=(s,u,c,h,m,x,C,A,R,U)=>(po=i.dynCall_viiiiiiiii=P.Uc)(s,u,c,h,m,x,C,A,R,U),co=i.dynCall_viiiiiiiiiii=(s,u,c,h,m,x,C,A,R,U,F,X)=>(co=i.dynCall_viiiiiiiiiii=P.Vc)(s,u,c,h,m,x,C,A,R,U,F,X),ho=i.dynCall_iiiiii=(s,u,c,h,m,x)=>(ho=i.dynCall_iiiiii=P.Wc)(s,u,c,h,m,x),fo=i.dynCall_iij=(s,u,c)=>(fo=i.dynCall_iij=P.Xc)(s,u,c),mo=i.dynCall_iiiiiiiiii=(s,u,c,h,m,x,C,A,R,U)=>(mo=i.dynCall_iiiiiiiiii=P.Yc)(s,u,c,h,m,x,C,A,R,U),go=i.dynCall_iiiiiiiiiii=(s,u,c,h,m,x,C,A,R,U,F)=>(go=i.dynCall_iiiiiiiiiii=P.Zc)(s,u,c,h,m,x,C,A,R,U,F),yo=i.dynCall_vij=(s,u,c)=>(yo=i.dynCall_vij=P._c)(s,u,c),_o=i.dynCall_iiif=(s,u,c,h)=>(_o=i.dynCall_iiif=P.$c)(s,u,c,h),wo=i.dynCall_iiij=(s,u,c,h)=>(wo=i.dynCall_iiij=P.ad)(s,u,c,h),bo=i.dynCall_fiii=(s,u,c,h)=>(bo=i.dynCall_fiii=P.bd)(s,u,c,h),$o=i.dynCall_viiiiiiiiiiiii=(s,u,c,h,m,x,C,A,R,U,F,X,se,be)=>($o=i.dynCall_viiiiiiiiiiiii=P.cd)(s,u,c,h,m,x,C,A,R,U,F,X,se,be),vo=i.dynCall_vjiii=(s,u,c,h,m)=>(vo=i.dynCall_vjiii=P.dd)(s,u,c,h,m),xo=i.dynCall_vif=(s,u,c)=>(xo=i.dynCall_vif=P.ed)(s,u,c),So=i.dynCall_iiiiiii=(s,u,c,h,m,x,C)=>(So=i.dynCall_iiiiiii=P.fd)(s,u,c,h,m,x,C),ko=i.dynCall_iiiij=(s,u,c,h,m)=>(ko=i.dynCall_iiiij=P.gd)(s,u,c,h,m),Io=i.dynCall_iiiiiiii=(s,u,c,h,m,x,C,A)=>(Io=i.dynCall_iiiiiiii=P.hd)(s,u,c,h,m,x,C,A),To=i.dynCall_viiiiiiiiiiii=(s,u,c,h,m,x,C,A,R,U,F,X,se)=>(To=i.dynCall_viiiiiiiiiiii=P.id)(s,u,c,h,m,x,C,A,R,U,F,X,se),Co=i.dynCall_diii=(s,u,c,h)=>(Co=i.dynCall_diii=P.jd)(s,u,c,h),Eo=i.dynCall_jiiii=(s,u,c,h,m)=>(Eo=i.dynCall_jiiii=P.kd)(s,u,c,h,m),zo=i.dynCall_viiij=(s,u,c,h,m)=>(zo=i.dynCall_viiij=P.ld)(s,u,c,h,m),Ao=i.dynCall_fiiii=(s,u,c,h,m)=>(Ao=i.dynCall_fiiii=P.md)(s,u,c,h,m),Oo=i.dynCall_viiif=(s,u,c,h,m)=>(Oo=i.dynCall_viiif=P.nd)(s,u,c,h,m),Ro=i.dynCall_diiii=(s,u,c,h,m)=>(Ro=i.dynCall_diiii=P.od)(s,u,c,h,m),Bo=i.dynCall_viiid=(s,u,c,h,m)=>(Bo=i.dynCall_viiid=P.pd)(s,u,c,h,m),Mo=i.dynCall_iiiijii=(s,u,c,h,m,x,C)=>(Mo=i.dynCall_iiiijii=P.qd)(s,u,c,h,m,x,C),No=i.dynCall_iiiiiij=(s,u,c,h,m,x,C)=>(No=i.dynCall_iiiiiij=P.rd)(s,u,c,h,m,x,C),Do=s=>(Do=P.sd)(s),Po=()=>(Po=P.td)(),Uo=s=>(Uo=P.ud)(s),Wo=()=>(Wo=P.vd)();function Qg(s,u,c){var h=ie();try{Ks(s,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function Zg(s,u,c){var h=ie();try{return Hs(s,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function Xg(s,u){var c=ie();try{js(s,u)}catch(h){if(re(c),h!==h+0)throw h;ne(1,0)}}function Yg(s,u){var c=ie();try{return Ri(s,u)}catch(h){if(re(c),h!==h+0)throw h;ne(1,0)}}function Jg(s,u,c,h){var m=ie();try{return Qs(s,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function ey(s,u,c,h,m){var x=ie();try{Ys(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function ty(s,u,c,h,m){var x=ie();try{return Xs(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function ry(s,u,c,h){var m=ie();try{Zs(s,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function iy(s,u,c,h,m,x,C){var A=ie();try{return So(s,u,c,h,m,x,C)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function ay(s){var u=ie();try{ro(s)}catch(c){if(re(u),c!==c+0)throw c;ne(1,0)}}function ny(s,u,c){var h=ie();try{return fo(s,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function sy(s,u,c,h,m,x){var C=ie();try{io(s,u,c,h,m,x)}catch(A){if(re(C),A!==A+0)throw A;ne(1,0)}}function oy(s,u,c){var h=ie();try{yo(s,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function uy(s,u,c,h,m,x,C){var A=ie();try{Js(s,u,c,h,m,x,C)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function ly(s,u,c,h,m,x,C,A){var R=ie();try{eo(s,u,c,h,m,x,C,A)}catch(U){if(re(R),U!==U+0)throw U;ne(1,0)}}function dy(s,u,c,h,m,x){var C=ie();try{return ho(s,u,c,h,m,x)}catch(A){if(re(C),A!==A+0)throw A;ne(1,0)}}function py(s,u,c,h,m,x,C,A){var R=ie();try{return Io(s,u,c,h,m,x,C,A)}catch(U){if(re(R),U!==U+0)throw U;ne(1,0)}}function cy(s,u,c,h,m,x,C,A,R,U){var F=ie();try{po(s,u,c,h,m,x,C,A,R,U)}catch(X){if(re(F),X!==X+0)throw X;ne(1,0)}}function hy(s,u,c,h,m,x,C,A,R){var U=ie();try{so(s,u,c,h,m,x,C,A,R)}catch(F){if(re(U),F!==F+0)throw F;ne(1,0)}}function fy(s){var u=ie();try{return ao(s)}catch(c){if(re(u),c!==c+0)throw c;ne(1,0)}}function my(s,u,c,h,m,x,C,A,R,U){var F=ie();try{return mo(s,u,c,h,m,x,C,A,R,U)}catch(X){if(re(F),X!==X+0)throw X;ne(1,0)}}function gy(s,u,c){var h=ie();try{return no(s,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function yy(s,u,c,h){var m=ie();try{return uo(s,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;return ne(1,0),0n}}function _y(s,u,c){var h=ie();try{return lo(s,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function wy(s,u,c,h,m,x,C,A,R,U,F,X){var se=ie();try{co(s,u,c,h,m,x,C,A,R,U,F,X)}catch(be){if(re(se),be!==be+0)throw be;ne(1,0)}}function by(s,u,c,h,m,x,C,A,R,U,F){var X=ie();try{oo(s,u,c,h,m,x,C,A,R,U,F)}catch(se){if(re(X),se!==se+0)throw se;ne(1,0)}}function $y(s,u,c,h,m,x,C,A,R,U,F){var X=ie();try{return go(s,u,c,h,m,x,C,A,R,U,F)}catch(se){if(re(X),se!==se+0)throw se;ne(1,0)}}function vy(s,u,c,h){var m=ie();try{return _o(s,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function xy(s,u,c,h){var m=ie();try{return wo(s,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function Sy(s,u,c,h){var m=ie();try{return bo(s,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function ky(s,u,c,h,m,x,C,A,R,U,F,X,se,be){var Fe=ie();try{$o(s,u,c,h,m,x,C,A,R,U,F,X,se,be)}catch(rr){if(re(Fe),rr!==rr+0)throw rr;ne(1,0)}}function Iy(s,u,c,h,m){var x=ie();try{vo(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function Ty(s,u,c){var h=ie();try{xo(s,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function Cy(s,u){var c=ie();try{return to(s,u)}catch(h){if(re(c),h!==h+0)throw h;return ne(1,0),0n}}function Ey(s,u,c,h,m){var x=ie();try{return ko(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function zy(s,u,c,h,m,x,C,A,R,U,F,X,se){var be=ie();try{To(s,u,c,h,m,x,C,A,R,U,F,X,se)}catch(Fe){if(re(be),Fe!==Fe+0)throw Fe;ne(1,0)}}function Ay(s,u,c,h){var m=ie();try{return Co(s,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function Oy(s,u,c,h,m){var x=ie();try{return Eo(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;return ne(1,0),0n}}function Ry(s,u,c,h,m){var x=ie();try{zo(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function By(s,u,c,h,m){var x=ie();try{return Ao(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function My(s,u,c,h,m){var x=ie();try{Oo(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function Ny(s,u,c,h,m){var x=ie();try{return Ro(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function Dy(s,u,c,h,m){var x=ie();try{Bo(s,u,c,h,m)}catch(C){if(re(x),C!==C+0)throw C;ne(1,0)}}function Py(s,u,c,h,m,x,C){var A=ie();try{return Mo(s,u,c,h,m,x,C)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function Uy(s,u,c,h,m,x,C){var A=ie();try{return No(s,u,c,h,m,x,C)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}return i.stackSave=()=>ie(),i.stackRestore=s=>re(s),i.stackAlloc=s=>Oi(s),i.setValue=function(s,u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":N()[s>>>0]=u;break;case"i16":le()[s>>>1>>>0]=u;break;case"i32":D()[s>>>2>>>0]=u;break;case"i64":Y[s>>>3]=BigInt(u);break;case"float":Ve()[s>>>2>>>0]=u;break;case"double":De()[s>>>3>>>0]=u;break;case"*":ce()[s>>>2>>>0]=u;break;default:ot(`invalid type for setValue: ${c}`)}},i.getValue=function(s,u="i8"){switch(u.endsWith("*")&&(u="*"),u){case"i1":case"i8":return N()[s>>>0];case"i16":return le()[s>>>1>>>0];case"i32":return D()[s>>>2>>>0];case"i64":return Y[s>>>3];case"float":return Ve()[s>>>2>>>0];case"double":return De()[s>>>3>>>0];case"*":return ce()[s>>>2>>>0];default:ot(`invalid type for getValue: ${u}`)}},i.UTF8ToString=Ie,i.stringToUTF8=qt,i.lengthBytesUTF8=Zn,(function s(){if(0<kt)Xt=s;else if(d)a(i),ct();else{for(;0<hi.length;)hi.shift()(i);0<kt?Xt=s:(i.calledRun=!0,H||(ct(),a(i)))}})(),i.PTR_SIZE=4,o}),ac=Li,Yo=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Yo&&Li()}),qi,Jo,We,nc,Wr,eu,tu,Vi,ru,Gi,sc,Fi,oc,tn=L(()=>{en(),qi=typeof location>"u"?void 0:location.origin,Jo=()=>{var e;return(e=import.meta.url)!=null&&e.startsWith("file:")?new URL(new URL("/assets/ort.bundle.min-OfoG_cy9.mjs",import.meta.url).href,qi).href:import.meta.url},We=Jo(),nc=()=>{if(We&&!We.startsWith("blob:"))return We.substring(0,We.lastIndexOf("/")+1)},Wr=(e,t)=>{try{let r=t??We;return(r?new URL(e,r):new URL(e)).origin===qi}catch{return!1}},eu=(e,t)=>{let r=t??We;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},tu=(e,t)=>`${t??"./"}${e}`,Vi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},ru=async e=>(await import(e)).default,Gi=(f0(),ri(tc)).default,sc=async()=>{if(!We)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Wr(We))return[void 0,Gi()];let e=await Vi(We);return[e,Gi(e)]},Fi=(m0(),ri(ic)).default,oc=async(e,t,r)=>{if(!e&&!t&&Fi&&We&&Wr(We))return[void 0,Fi];{let a="ort-wasm-simd-threaded.jsep.mjs",n=e??eu(a,t),i=r&&n&&!Wr(n,t),o=i?await Vi(n):n??tu(a,t);return[i?o:void 0,await ru(o)]}}}),Hi,Lr,nr,ji,iu,au,rn,Ee,Ut=L(()=>{tn(),Lr=!1,nr=!1,ji=!1,iu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},au=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},rn=async e=>{if(Lr)return Promise.resolve();if(nr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ji)throw new Error("previous call to 'initializeWebAssembly()' failed.");nr=!0;let t=e.initTimeout,r=e.numThreads;if(!au())throw new Error("WebAssembly SIMD is not supported in the current environment.");let a=iu();r>1&&!a&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,i=typeof n=="string"?n:void 0,o=n==null?void 0:n.mjs,l=(o==null?void 0:o.href)??o,p=n==null?void 0:n.wasm,d=(p==null?void 0:p.href)??p,f=e.wasmBinary,[g,y]=await oc(l,i,r>1),_=!1,w=[];if(t>0&&w.push(new Promise(b=>{setTimeout(()=>{_=!0,b()},t)})),w.push(new Promise((b,S)=>{let v={numThreads:r};if(f)v.wasmBinary=f;else if(d||i)v.locateFile=$=>d??i+$;else if(l&&l.indexOf("blob:")!==0)v.locateFile=$=>new URL($,l).href;else if(g){let $=nc();$&&(v.locateFile=I=>$+I)}y(v).then($=>{nr=!1,Lr=!0,Hi=$,b(),g&&URL.revokeObjectURL(g)},$=>{nr=!1,ji=!0,S($)})})),await Promise.race(w),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ee=()=>{if(Lr&&Hi)return Hi;throw new Error("WebAssembly is not initialized yet.")}}),Re,ii,fe,an=L(()=>{Ut(),Re=(e,t)=>{let r=Ee(),a=r.lengthBytesUTF8(e)+1,n=r._malloc(a);return r.stringToUTF8(e,n,a),t.push(n),n},ii=(e,t,r,a)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,i])=>{let o=t?t+n:n;if(typeof i=="object")ii(i,o+".",r,a);else if(typeof i=="string"||typeof i=="number")a(o,i.toString());else if(typeof i=="boolean")a(o,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},fe=e=>{let t=Ee(),r=t.stackSave();try{let a=t.PTR_SIZE,n=t.stackAlloc(2*a);t._OrtGetLastError(n,n+a);let i=Number(t.getValue(n,a===4?"i32":"i64")),o=t.getValue(n+a,"*"),l=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${l}`)}finally{t.stackRestore(r)}}}),uc,g0=L(()=>{Ut(),an(),uc=e=>{let t=Ee(),r=0,a=[],n=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(n.terminate=!1);let i=0;return(e==null?void 0:e.tag)!==void 0&&(i=Re(e.tag,a)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,i),r===0&&fe("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&ii(e.extra,"",new WeakSet,(o,l)=>{let p=Re(o,a),d=Re(l,a);t._OrtAddRunConfigEntry(r,p,d)!==0&&fe(`Can't set a run config entry: ${o} - ${l}.`)}),[r,a]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),a.forEach(o=>t._free(o)),i}}}),nu,su,ou,uu,lc,y0=L(()=>{Ut(),an(),nu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},su=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},ou=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},uu=(e,t,r)=>{for(let a of t){let n=typeof a=="string"?a:a.name;switch(n){case"webnn":if(n="WEBNN",typeof a!="string"){let o=a==null?void 0:a.deviceType;if(o){let l=Re("deviceType",r),p=Re(o,r);Ee()._OrtAddSessionConfigEntry(e,l,p)!==0&&fe(`Can't set a session config entry: 'deviceType' - ${o}.`)}}break;case"webgpu":if(n="JS",typeof a!="string"){let o=a;if(o!=null&&o.preferredLayout){if(o.preferredLayout!=="NCHW"&&o.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${o.preferredLayout}`);let l=Re("preferredLayout",r),p=Re(o.preferredLayout,r);Ee()._OrtAddSessionConfigEntry(e,l,p)!==0&&fe(`Can't set a session config entry: 'preferredLayout' - ${o.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let i=Re(n,r);Ee()._OrtAppendExecutionProvider(e,i)!==0&&fe(`Can't append execution provider: ${n}.`)}},lc=e=>{let t=Ee(),r=0,a=[],n=e||{};ou(n);try{let i=nu(n.graphOptimizationLevel??"all"),o=su(n.executionMode??"sequential"),l=typeof n.logId=="string"?Re(n.logId,a):0,p=n.logSeverityLevel??2;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log serverity level is not valid: ${p}`);let d=n.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let f=typeof n.optimizedModelFilePath=="string"?Re(n.optimizedModelFilePath,a):0;if(r=t._OrtCreateSessionOptions(i,!!n.enableCpuMemArena,!!n.enableMemPattern,o,!!n.enableProfiling,0,l,p,d,f),r===0&&fe("Can't create session options."),n.executionProviders&&uu(r,n.executionProviders,a),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);let g=Re("enableGraphCapture",a),y=Re(n.enableGraphCapture.toString(),a);t._OrtAddSessionConfigEntry(r,g,y)!==0&&fe(`Can't set a session config entry: 'enableGraphCapture' - ${n.enableGraphCapture}.`)}if(n.freeDimensionOverrides)for(let[g,y]of Object.entries(n.freeDimensionOverrides)){if(typeof g!="string")throw new Error(`free dimension override name must be a string: ${g}`);if(typeof y!="number"||!Number.isInteger(y)||y<0)throw new Error(`free dimension override value must be a non-negative integer: ${y}`);let _=Re(g,a);t._OrtAddFreeDimensionOverride(r,_,y)!==0&&fe(`Can't set a free dimension override: ${g} - ${y}.`)}return n.extra!==void 0&&ii(n.extra,"",new WeakSet,(g,y)=>{let _=Re(g,a),w=Re(y,a);t._OrtAddSessionConfigEntry(r,_,w)!==0&&fe(`Can't set a session config entry: ${g} - ${y}.`)}),[r,a]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),a.forEach(o=>t._free(o)),i}}}),Ft,Rt,Bt,nn,ai,sn,on,Ra,J=L(()=>{Ft=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Rt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Bt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],a=typeof t=="number"?t:t.reduce((n,i)=>n*i,1);return r>0?Math.ceil(a*r):void 0},nn=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ai=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},sn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",on=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ra=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),un,dc=L(()=>{en(),un=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),a=r?parseInt(r,10):0;if(a<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),i;try{i=new ArrayBuffer(a)}catch(l){if(l instanceof RangeError){let p=Math.ceil(a/65536);i=new WebAssembly.Memory({initial:p,maximum:p}).buffer}else throw l}let o=0;for(;;){let{done:l,value:p}=await n.read();if(l)break;let d=p.byteLength;new Uint8Array(i,o,d).set(p),o+=d}return new Uint8Array(i,0,a)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),lu,du,pu,cu,ln,hu,pe,pt=L(()=>{J(),lu=["V","I","W","E","F"],du=(e,t)=>{console.log(`[${lu[e]},${new Date().toISOString()}]${t}`)},ln=(e,t)=>{pu=e,cu=t},hu=(e,t)=>{let r=ai(e),a=ai(pu);r>=a&&du(r,typeof t=="function"?t():t)},pe=(...e)=>{cu&&hu(...e)}}),dn,pc=L(()=>{J(),dn=(e,t)=>new(nn(t))(e)}),pn=L(()=>{}),Ki,qr,Vr,fu,mu,Qi,Ba,gu,cc,_0=L(()=>{pt(),pn(),Ki=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),qr=[],Vr=e=>Math.ceil(Number(e)/16)*16,fu=e=>{for(let t=0;t<qr.length;t++){let r=qr[t];if(e<=r)return r}return Math.ceil(e/16)*16},mu=1,Qi=()=>mu++,Ba=async(e,t,r,a)=>{let n=Vr(r),i=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,i,0,n),e.flush(),await i.mapAsync(GPUMapMode.READ);let l=i.getMappedRange();if(a){let p=a();return p.set(new Uint8Array(l,0,r)),p}else return new Uint8Array(l.slice(0,r))}finally{i.destroy()}},gu=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ki)qr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,a=t.byteOffset,n=t.byteLength,i=Vr(n),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${n}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=l.getMappedRange();new Uint8Array(p).set(new Uint8Array(r,a,n)),l.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(l,0,o.gpuData.buffer,0,i),this.backend.device.queue.submit([d.finish()]),l.destroy(),pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(t);if(!a)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==a.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Vr(r.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(r.gpuData.buffer,0,a.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let a;if(r){if(a=r[0],e===r[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=Qi();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:e},originalSize:t}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, registered.`),a}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=fu(e),a,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||i){let l=(n?this.freeBuffers:this.freeUniformBuffers).get(r);l?l.length>0?a=l.pop():a=this.backend.device.createBuffer({size:r,usage:t}):a=this.backend.device.createBuffer({size:r,usage:t})}else a=this.backend.device.createBuffer({size:r,usage:t});let o={id:Qi(),type:0,buffer:a};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Ba(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ki.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},cc=(...e)=>new gu(...e)}),yu,_e,Se=L(()=>{yu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},_e=e=>new yu(e)}),_u,Kt,O,ni,hc,fc,mc,oe=L(()=>{_u=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Kt=class{static calcShape(e,t,r=!1){let a=e.length,n=t.length;if(a===0)return t;if(n===0)return e;let i=Math.max(e.length,t.length),o=new Array(i);if(r){if(a<2||n<2)return;let l=_u.calcMatMulShape([e[a-2],e[a-1]],[t[n-2],t[n-1]]);if(l===void 0)return;[o[i-2],o[i-1]]=l}for(let l=r?3:1;l<=i;l++){let p=a-l<0?1:e[a-l],d=n-l<0?1:t[n-l];if(p!==d&&p>1&&d>1)return;let f=Math.max(p,d);if(p&&d)o[i-l]=Math.max(p,d);else{if(f>1)return;o[i-l]=0}}return o}static isValidBroadcast(e,t){let r=e.length,a=t.length;if(r>a)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[a-n])return!1;return!0}},O=class Jr{static size(t){return Jr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let a=t.length;if(a===0)return[];let n=new Array(a),i=a-1;for(;i>=0;){if(t[i]%r===0){n[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");n[i]=1,r/=t[i],i--}for(i--;i>=0;i--)n[i]=t[i];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Jr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Jr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,a){let n=1;for(let i=r;i<a;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[i])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let a=new Array(r);a[r-1]=1,a[r-2]=t[r-1];for(let n=r-3;n>=0;--n)a[n]=a[n+1]*t[n+1];return a}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(a=>this.normalizeAxis(a,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(a=>t[a]):t.slice().reverse()}static padShape(t,r){let a=t.length;return t.map((n,i)=>n+r[i]+r[i+a])}static areEqual(t,r){return t.length!==r.length?!1:t.every((a,n)=>a===r[n])}},ni=class fr{static adjustPoolAttributes(t,r,a,n,i,o){if(!t&&a.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=a.length?a.push(r[l+2]):a[l]=r[l+2];for(let l=0;l<a.length;l++)if(l<n.length){if(n[l]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let l=0;l<a.length;l++)if(l<i.length){if(i[l]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let l=0;l<a.length*2;l++)if(l<o.length){if(o[l]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let l=0;l<a.length;l++){if(a[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[l]>=a[l]||o[l+a.length]>=a[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,a,n,i,o,l){if(l){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let p=0;p<t.length-2;p++)fr.adjustPadAndReturnShape(t[p+(o?1:2)],r[p],a[p],n[p],i,p,p+t.length-2,l)}}static computePoolOutputShape(t,r,a,n,i,o,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let p=[r[0],r[1]];return fr.computeShapeHelper(t,r,p,a,n,i,o,l),p}static computeConvOutputShape(t,r,a,n,i,o,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let p=[t[0],r[0]];return fr.computeShapeHelper(!1,t,p,a,n,i,o,l),p}static computeShapeHelper(t,r,a,n,i,o,l,p){if(t)for(let d=0;d<r.length-2;d++)a.push(1);else for(let d=0;d<r.length-2;d++)a.push(fr.adjustPadAndReturnShape(r[d+2],n[d],i[d],o[d],l,d,d+r.length-2,p))}static adjustPadAndReturnShape(t,r,a,n,i,o,l,p){let d=a*(n-1)+1;if(p&&p!=="NOTSET")switch(p){case"VALID":return i[o]=0,i[l]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(a!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((t+r-1)/r-1)*r+n-t;return i[o]=Math.floor(p==="SAME_LOWER"?(f+1)/2:f/2),i[l]=f-i[o],Math.floor((t+f-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[o]+i[l]-d)/r+1)}},hc=class{static getShapeOfGemmResult(e,t,r,a,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let i,o,l;t?(i=e[1],o=e[0]):(i=e[0],o=e[1]);let p=-1;if(a?(l=r[0],p=1):(l=r[1],p=0),r[p]!==o)throw new Error("dimension mismatch");if(i<=0||l<=0||o<=0)throw new Error("invalid shape specified");if(n&&!Kt.isValidBroadcast(n,[i,l]))throw new Error("gemm: invalid bias shape for broadcast");return[i,l,o]}},fc=-34028234663852886e22,mc=34028234663852886e22}),Qt,Gr,Ae,Me,Q,xe,Ma,Ht,vt,K,sr,M,j,gc,cn,wu,yc,ue=L(()=>{J(),oe(),Qt=64,Gr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ae=(e,t=1)=>{let r=Gr(e,t);return typeof r=="string"?r:r[0]},Me=(e,t=1)=>{let r=Gr(e,t);return typeof r=="string"?r:r[1]},Q=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:O.computeStrides(r)})}),t},xe=e=>e%4===0?4:e%2===0?2:1,Ma=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ht=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,vt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,r,a)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?a==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:a==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,sr=(e,t,r,a,n)=>{let i=typeof r=="number",o=i?r:r.length,l=[...new Array(o).keys()],p=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,d=Gr(t,n),f=typeof d=="string"?d:d[1],g=typeof d=="string"?d:d[0],y={indices:p,value:f,storage:g,tensor:t},_=N=>typeof N=="string"?N:`${N}u`,w={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=i?"uniforms.":"",S=`${b}${e}_shape`,v=`${b}${e}_strides`,$="";for(let N=0;N<o-1;N++)$+=`
    let dim${N} = current / ${K(v,N,o)};
    let rest${N} = current % ${K(v,N,o)};
    indices[${N}] = dim${N};
    current = rest${N};
    `;$+=`indices[${o-1}] = current;`;let I=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${y.indices} {
    var indices: ${y.indices};
    var current = offset;
    ${$}
    return indices;
  }`,k=N=>(w.offsetToIndices=!0,o<2?N:`o2i_${e}(${N})`),T=[];if(o>=2)for(let N=o-1;N>=0;N--)T.push(`${K(v,N,o)} * (indices[${N}])`);let E=o<2?"":`
  fn i2o_${e}(indices: ${y.indices}) -> u32 {
    return ${T.join("+")};
  }`,z=N=>(w.indicesToOffset=!0,o<2?N:`i2o_${e}(${N})`),B=(...N)=>o===0?"0u":`${y.indices}(${N.map(_).join(",")})`,W=(N,q)=>o<2?`${N}`:`${K(N,q,o)}`,G=(N,q,le)=>o<2?`${N}=${le};`:`${K(N,q,o)}=${le};`,ee={},ae=(N,q)=>{w.broadcastedIndicesToOffset=!0;let le=`${q.name}broadcastedIndicesTo${e}Offset`;if(le in ee)return`${le}(${N})`;let $e=[];for(let D=o-1;D>=0;D--){let ce=q.indicesGet("outputIndices",D+q.rank-o);$e.push(`${W(v,D)} * (${ce} % ${W(S,D)})`)}return ee[le]=`fn ${le}(outputIndices: ${q.type.indices}) -> u32 {
             return ${$e.length>0?$e.join("+"):"0u"};
           }`,`${le}(${N})`},Z=(N,q)=>(()=>{if(y.storage===y.value)return`${e}[${N}]=${q};`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`${e}[${N}]=vec2<u32>(u32(${q}), select(0u, 0xFFFFFFFFu, ${q} < 0));`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`${e}[${N}]=vec2<u32>(u32(${q}), 0u);`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`${e}[${N}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${q}));`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),te=N=>(()=>{if(y.storage===y.value)return`${e}[${N}]`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`i32(${e}[${N}].x)`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`u32(${e}[${N}].x)`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${N}] & 0xFFu), bool(${e}[${N}] & 0xFF00u), bool(${e}[${N}] & 0xFF0000u), bool(${e}[${N}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),Y=o<2?"":`
  fn get_${e}ByIndices(indices: ${y.indices}) -> ${f} {
    return ${te(`i2o_${e}(indices)`)};
  }`,V=o<2?"":(()=>{let N=l.map(le=>`d${le}: u32`).join(", "),q=l.map(le=>`d${le}`).join(", ");return`
  fn get_${e}(${N}) -> ${f} {
    return get_${e}ByIndices(${B(q)});
  }`})(),de=(...N)=>{if(N.length!==o)throw new Error(`indices length must be ${o}`);let q=N.map(_).join(",");return o===0?te("0u"):o===1?te(q[0]):(w.get=!0,w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}(${q})`)},me=N=>o<2?te(N):(w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}ByIndices(${N})`),H=o<2?"":`
  fn set_${e}ByIndices(indices: ${y.indices}, value: ${f}) {
    ${Z(`i2o_${e}(indices)`,"value")}
  }`,ge=o<2?"":(()=>{let N=l.map(le=>`d${le}: u32`).join(", "),q=l.map(le=>`d${le}`).join(", ");return`
  fn set_${e}(${N}, value: ${f}) {
    set_${e}ByIndices(${B(q)}, value);
  }`})();return{impl:()=>{let N=[],q=!1;return w.offsetToIndices&&(N.push(I),q=!0),w.indicesToOffset&&(N.push(E),q=!0),w.broadcastedIndicesToOffset&&(Object.values(ee).forEach(le=>N.push(le)),q=!0),w.set&&(N.push(ge),q=!0),w.setByIndices&&(N.push(H),q=!0),w.get&&(N.push(V),q=!0),w.getByIndices&&(N.push(Y),q=!0),!i&&q&&N.unshift(`const ${S} = ${y.indices}(${r.join(",")});`,`const ${v} = ${y.indices}(${O.computeStrides(r).join(",")});`),N.join(`
`)},type:y,offsetToIndices:k,indicesToOffset:z,broadcastedIndicesToOffset:ae,indices:B,indicesGet:W,indicesSet:G,set:(...N)=>{if(N.length!==o+1)throw new Error(`indices length must be ${o}`);let q=N[o];if(typeof q!="string")throw new Error("value must be string");let le=N.slice(0,o).map(_).join(",");return o===0?Z("0u",q):o===1?Z(le[0],q):(w.set=!0,w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}(${le}, ${q})`)},setByOffset:Z,setByIndices:(N,q)=>o<2?Z(N,q):(w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}ByIndices(${N}, ${q});`),get:de,getByOffset:te,getByIndices:me,usage:a,name:e,strides:v,shape:S,rank:o}},M=(e,t,r,a=1)=>sr(e,t,r,"input",a),j=(e,t,r,a=1)=>sr(e,t,r,"output",a),gc=(e,t,r)=>sr(e,t,r,"atomicOutput",1),cn=(e,t,r,a=1)=>sr(e,t,r,"internal",a),wu=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Qt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],a=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*a>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*a}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${a})
  fn main(${i}) {
    ${o}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",a=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${a}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:a}of this.uniforms)if(a&&a>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(a/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(a/4)}>`);else{let n=a==null||a===1?r:`vec${a}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},yc=(e,t)=>new wu(e,t)}),bu,Zi,$u,vu,xu,Su,qe,_c,wc,xt=L(()=>{J(),oe(),Se(),ue(),bu=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Zi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),$u=(e,t)=>O.sortBasedOnPerm(e,Zi(e.length,t)),vu=(e,t,r,a)=>{let n=`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)n+=`a[${e[i]}]=i[${i}];`;return n+="return a;}"},xu=(e,t)=>{let r=[],a=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&a.push(t[n]);return{newShape:r,newPerm:a}},Su=(e,t)=>{let r=0;for(let a=0;a<e.length;++a)if(t[e[a]]!==1){if(e[a]<r)return!1;r=e[a]}return!0},qe=(e,t)=>{let r=e.dataType,a=e.dims.length,n=Zi(a,t),i=$u(e.dims,n),o=e.dims,l=i,p=a<2||Su(n,e.dims),d;if(p)return d=w=>{let b=M("input",r,o,4),S=j("output",r,l,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(b,S)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:d};let{newShape:f,newPerm:g}=xu(e.dims,n),y=O.areEqual(g,[2,3,1]),_=O.areEqual(g,[3,1,2]);if(f.length===2||y||_){o=y?[f[0],f[1]*f[2]]:_?[f[0]*f[1],f[2]]:f,l=[o[1],o[0]];let w=16;return d=b=>{let S=M("a",r,o.length),v=j("output",r,l.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(S,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${b.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/w),y:Math.ceil(l[0]/w)},programUniforms:[{type:12,data:b},...Q(o,l)]}},getShaderSource:d}}return d=w=>{let b=M("a",r,o.length),S=j("output",r,l.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(b,S)}

  ${vu(n,a,b,S)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...Q(o,l)]}},getShaderSource:d}},_c=(e,t)=>{bu(e.inputs,t.perm),e.compute(qe(e.inputs[0],t.perm))},wc=e=>_e({perm:e.perm})}),ku,Iu,Tu,Cu,Eu,zu,Au,Ou,Ru,Bu,Ke,bc,$c,vc,xc,Sc,kc,Ic,Tc,Cc,Ec,w0=L(()=>{J(),oe(),ue(),hn(),xt(),ku={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Iu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Tu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Cu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Eu=(e,t)=>{let r=[];for(let a=t-e;a<t;++a)r.push(a);return r},zu=(e,t)=>{let r=[],a=e.length;for(let i=0;i<a;i++)t.indexOf(i)===-1&&r.push(e[i]);let n=t.map(i=>e[i]);return[r,n]},Au=(e,t)=>{let r=e.length+t.length,a=[],n=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?a.push(e[n++]):a.push(1);return a},Ou=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Ru=(e,t)=>{let r=[];if(!Ou(e,t)){for(let a=0;a<t;++a)e.indexOf(a)===-1&&r.push(a);e.forEach(a=>r.push(a))}return r},Bu=(e,t,r,a,n,i,o)=>{let l=r[0].dims,p=O.size(i),d=O.size(o),f=M("_A",r[0].dataType,l),g=j("output",n,i),y=64;p===1&&(y=256);let _=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,w=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(f,g)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Tu[a]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${ku[a]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Iu[a]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${g.setByOffset("outputIndex",`${a==="mean"?`${g.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${g.type.storage}(${Cu[a]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${y}`,inputDependencies:["type"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:p},programUniforms:[{type:12,data:d}]})}},Ke=(e,t,r,a)=>{let n=e.inputs.length===1?r:Na(e.inputs,r),i=n.axes;i.length===0&&!n.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((_,w)=>w));let o=O.normalizeAxes(i,e.inputs[0].dims.length),l=o,p=e.inputs[0],d=Ru(l,e.inputs[0].dims.length);d.length>0&&(p=e.compute(qe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],l=Eu(l.length,p.dims.length));let[f,g]=zu(p.dims,l),y=f;n.keepDims&&(y=Au(f,o)),e.compute(Bu(t,n.cacheKey,[p],a,e.inputs[0].dataType,y,g),{inputs:[p]})},bc=(e,t)=>{Ke(e,"ReduceMeanShared",t,"mean")},$c=(e,t)=>{Ke(e,"ReduceL1Shared",t,"l1")},vc=(e,t)=>{Ke(e,"ReduceL2Shared",t,"l2")},xc=(e,t)=>{Ke(e,"ReduceLogSumExpShared",t,"logSumExp")},Sc=(e,t)=>{Ke(e,"ReduceMaxShared",t,"max")},kc=(e,t)=>{Ke(e,"ReduceMinShared",t,"min")},Ic=(e,t)=>{Ke(e,"ReduceProdShared",t,"prod")},Tc=(e,t)=>{Ke(e,"ReduceSumShared",t,"sum")},Cc=(e,t)=>{Ke(e,"ReduceSumSquareShared",t,"sumSquare")},Ec=(e,t)=>{Ke(e,"ReduceLogSumShared",t,"logSum")}}),Qe,Mu,si,Na,Ze,Nu,Du,Pu,Uu,Wu,Lu,qu,Vu,Gu,Fu,Xe,zc,Ac,Oc,Rc,Bc,Mc,Nc,Dc,Pc,Uc,hn=L(()=>{J(),oe(),Se(),ue(),w0(),Qe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Mu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],si=(e,t,r,a,n,i,o=!1,l=!1)=>{let p=[],d=r[0].dims,f=d.length,g=O.normalizeAxes(n,f),y=!l&&g.length===0;d.forEach((b,S)=>{y||g.indexOf(S)>=0?o&&p.push(1):p.push(b)});let _=p.length,w=O.size(p);return{name:e,shaderCache:t,getShaderSource:b=>{let S=[],v=M("_A",r[0].dataType,f),$=j("output",i,_),I=a(v,$,g),k=I[2];for(let T=0,E=0;T<f;T++)y||g.indexOf(T)>=0?(o&&E++,k=`for(var j${T}: u32 = 0; j${T} < ${d[T]}; j${T}++) {
                  ${I[2].includes("last_index")?`let last_index = j${T};`:""}
                  ${v.indicesSet("input_indices",T,`j${T}`)}
                  ${k}
                }`):(S.push(`${v.indicesSet("input_indices",T,$.indicesGet("output_indices",E))};`),E++);return`

        ${b.registerUniform("output_size","u32").declareVariables(v,$)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${$.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${k}
          ${I[3]}
          ${I.length===4?$.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:p,dataType:i}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...Q(d,p)]})}},Na=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),_e({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ze=(e,t,r,a)=>{let n=e.inputs,i=n.length===1?r:Na(n,r);e.compute(si(t,{hint:i.cacheKey,inputDependencies:["rank"]},[n[0]],i.noopWithEmptyAxes&&i.axes.length===0?Mu:a,i.axes,n[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Nu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceLogSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Du=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceL1",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Pu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceL2",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Uu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceLogSumExp",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Wu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceMax",t,(r,a,n)=>{let i=[];for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&i.push(r.indicesSet("input_indices",o,0));return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},Lu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceMean",t,(r,a,n)=>{let i=1;for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&(i*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${a.type.value}(sum / ${i});`]})},qu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceMin",t,(r,a,n)=>{let i=[];for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&i.push(`input_indices[${o}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Vu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceProd",t,(r,a)=>[`var value = ${a.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Gu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Fu=(e,t)=>{Qe(e.inputs),Ze(e,"ReduceSumSquare",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Xe=(e,t,r)=>{if(t.length===0)return r;let a=1,n=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?a*=e[i]:n*=e[i];return n<32&&a>1024},zc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Lu(e,t):bc(e,t)},Ac=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Du(e,t):$c(e,t)},Oc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Pu(e,t):vc(e,t)},Rc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Uu(e,t):xc(e,t)},Bc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wu(e,t):Sc(e,t)},Mc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qu(e,t):kc(e,t)},Nc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vu(e,t):Ic(e,t)},Dc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Gu(e,t):Tc(e,t)},Pc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Fu(e,t):Cc(e,t)},Uc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Nu(e,t):Ec(e,t)}}),Xi,Wc,Lc,Da,b0=L(()=>{J(),Se(),hn(),Xi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Wc=(e,t)=>{Xi(e.inputs);let r=(a,n,i)=>{let o=[];for(let l=0;l<a.rank;l++)(i.indexOf(l)>=0||i.length===0)&&o.push(`input_indices[${l}] = 0;`);return[`${o.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(si("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Lc=(e,t)=>{Xi(e.inputs);let r=(a,n,i)=>{let o=[];for(let l=0;l<a.rank;l++)(i.indexOf(l)>=0||i.length===0)&&o.push(`input_indices[${l}] = 0;`);return[`${o.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(si("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Da=e=>_e(e)}),Hu,Fr,ju,Ku,Qu,$r,Zu,qc,fn=L(()=>{J(),oe(),pn(),ue(),Hu=(e,t)=>{let r=e[0],a=e[1],n=e[2],i=e[3],o=e[4],l=e[5];if(o&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let p=r.dims[0],d=r.dims[1],f=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(a.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==a.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let g=n.dims[0]/3,y=g,_=y;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of t.qkvHiddenSizes)if(I%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");g=t.qkvHiddenSizes[0],y=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let w=d;if(g!==y)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==g+y+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(o){if(y!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==p)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==y/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=o.dims[3])}let S=w+b,v=-1,$=0;if(i)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[2]!==d||l.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:d,pastSequenceLength:b,kvSequenceLength:w,totalSequenceLength:S,maxSequenceLength:v,inputHiddenSize:f,hiddenSize:g,vHiddenSize:_,headSize:Math.floor(g/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Fr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,ju=(e,t,r,a,n,i,o,l)=>{let p=xe(o?1:i),d=64,f=i/p;f<d&&(d=32);let g=Math.ceil(i/p/d),y=[{type:12,data:t},{type:12,data:r},{type:12,data:a},{type:12,data:n},{type:12,data:f},{type:12,data:g}],_=Ae(e.dataType,p),w=Me(1,p),b=["type"];o&&b.push("type"),l&&b.push("type");let S=v=>{let $=j("x",e.dataType,e.dims,p),I=[$],k=o?M("seq_lens",o.dataType,o.dims):void 0;k&&I.push(k);let T=l?M("total_sequence_length_input",l.dataType,l.dims):void 0;T&&I.push(T);let E=Me(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(z).declareVariables(...I)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Fr(k,T,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${w}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${w}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(p){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${p}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${w}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${w}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(p){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${p}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${w}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${_};${p}`,inputDependencies:b},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/d),y:n,z:t*r},programUniforms:y})}},Ku=(e,t,r,a,n,i,o,l,p)=>{let d=o+i.kvSequenceLength,f=[i.batchSize,i.numHeads,i.sequenceLength,d],g=e>1&&a,y=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=g?[i.batchSize,y,d,i.headSize]:void 0,w=i.nReps?i.nReps:1,b=i.scale===0?1/Math.sqrt(i.headSize):i.scale,S=xe(i.headSize),v=i.headSize/S,$=12,I={x:Math.ceil(d/$),y:Math.ceil(i.sequenceLength/$),z:i.batchSize*i.numHeads},k=[{type:12,data:i.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:b},{type:12,data:o},{type:12,data:i.kvSequenceLength},{type:12,data:w}],T=g&&a&&O.size(a.dims)>0,E=["type","type"];T&&E.push("type"),n&&E.push("type"),l&&E.push("type"),p&&E.push("type");let z=[{dims:f,dataType:t.dataType,gpuDataType:0}];g&&z.push({dims:_,dataType:t.dataType,gpuDataType:0});let B=W=>{let G=M("q",t.dataType,t.dims,S),ee=M("key",r.dataType,r.dims,S),ae=[G,ee];if(T){let H=M("past_key",a.dataType,a.dims,S);ae.push(H)}n&&ae.push(M("attention_bias",n.dataType,n.dims));let Z=l?M("seq_lens",l.dataType,l.dims):void 0;Z&&ae.push(Z);let te=p?M("total_sequence_length_input",p.dataType,p.dims):void 0;te&&ae.push(te);let Y=j("output",t.dataType,f),V=[Y];g&&V.push(j("present_key",t.dataType,_,S));let de=Me(1,S),me=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${G.type.storage}, ${$*$}>;
  ${W.registerUniforms(me).declareVariables(...ae,...V)}
  ${W.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${w===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${w===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Fr(Z,te,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${T&&g?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${g?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${de}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${T&&g?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${g?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${de}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${Y.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${n!==void 0};${a!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:z,dispatchGroup:I,programUniforms:k}),getShaderSource:B}},Qu=(e,t,r,a,n,i,o=void 0,l=void 0)=>{let p=i+n.kvSequenceLength,d=n.nReps?n.nReps:1,f=n.vHiddenSize*d,g=e>1&&a,y=n.kvNumHeads?n.kvNumHeads:n.numHeads,_=g?[n.batchSize,y,p,n.headSize]:void 0,w=[n.batchSize,n.sequenceLength,f],b=12,S={x:Math.ceil(n.vHeadSize/b),y:Math.ceil(n.sequenceLength/b),z:n.batchSize*n.numHeads},v=[{type:12,data:n.sequenceLength},{type:12,data:p},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:f},{type:12,data:i},{type:12,data:n.kvSequenceLength},{type:12,data:d}],$=g&&a&&O.size(a.dims)>0,I=["type","type"];$&&I.push("type"),o&&I.push("type"),l&&I.push("type");let k=[{dims:w,dataType:t.dataType,gpuDataType:0}];g&&k.push({dims:_,dataType:t.dataType,gpuDataType:0});let T=E=>{let z=M("probs",t.dataType,t.dims),B=M("v",r.dataType,r.dims),W=[z,B];$&&W.push(M("past_value",a.dataType,a.dims));let G=o?M("seq_lens",o.dataType,o.dims):void 0;o&&W.push(G);let ee=l?M("total_sequence_length_input",l.dataType,l.dims):void 0;l&&W.push(ee);let ae=[j("output",t.dataType,w)];g&&ae.push(j("present_value",t.dataType,_));let Z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${z.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${z.type.value}, ${b*b}>;
  ${E.registerUniforms(Z).declareVariables(...W,...ae)}
  ${E.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Fr(G,ee,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&g?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${g?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&g?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${g?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${a!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:k,dispatchGroup:S,programUniforms:v}),getShaderSource:T}},$r=(e,t,r,a,n,i,o,l,p,d,f=void 0,g=void 0)=>{let y=Math.min(e.outputCount,1+(o?1:0)+(l?1:0)),_=y>1?d.pastSequenceLength:0,w=_+d.kvSequenceLength,b=p&&O.size(p.dims)>0?p:void 0,S=[t,r];y>1&&o&&O.size(o.dims)>0&&S.push(o),b&&S.push(b),f&&S.push(f),g&&S.push(g);let v=e.compute(Ku(y,t,r,o,b,d,_,f,g),{inputs:S,outputs:y>1?[-1,1]:[-1]})[0];e.compute(ju(v,d.batchSize,d.numHeads,_,d.sequenceLength,w,f,g),{inputs:f&&g?[v,f,g]:[v],outputs:[]});let $=[v,a];y>1&&l&&O.size(l.dims)>0&&$.push(l),f&&$.push(f),g&&$.push(g),e.compute(Qu(y,v,a,l,d,_,f,g),{inputs:$,outputs:y>1?[0,2]:[0]})},Zu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],a=t.sequenceLength,n=t.inputHiddenSize,i=t.headSize,o=12,l={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},p=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:a},{type:12,data:n},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=g=>{let y=j("output_q",p[0].dataType,r),_=j("output_k",p[0].dataType,r),w=j("output_v",p[0].dataType,r),b=M("input",p[0].dataType,p[0].dims),S=M("weight",p[1].dataType,p[1].dims),v=M("bias",p[2].dataType,p[2].dims),$=b.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${$}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${$}, ${o*o}>;
  var<workgroup> tileWeightK: array<${$}, ${o*o}>;
  var<workgroup> tileWeightV: array<${$}, ${o*o}>;
  ${g.registerUniforms(I).declareVariables(b,S,v,y,_,w)}
  ${g.mainStart([o,o,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:d}),getShaderSource:f},{inputs:p,outputs:[-1,-1,-1]})},qc=(e,t)=>{let r=Hu(e.inputs,t),[a,n,i]=Zu(e,r);return $r(e,a,n,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Xu,Yu,Ju,Vc,$0=L(()=>{rt(),J(),oe(),Se(),ue(),Xu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(a,n,i)=>{let o=n.length;if(o!==a.length)throw new Error(`${i}: num dimensions != ${o}`);n.forEach((l,p)=>{if(l!==a[p])throw new Error(`${i}: dim[${p}] do not match`)})};if(e[0].dims.length>1){let a=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,a,"Invalid input scale"),r(e[2].dims,a,"Invalid input B"),r(e[3].dims,a,"Invalid input mean"),r(e[4].dims,a,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Yu=(e,t)=>{let{epsilon:r,spatial:a,format:n}=t,i=e[0].dims,o=a?xe(i[i.length-1]):1,l=n==="NHWC"&&i.length>1?o:1,p=O.size(i)/o,d=a,f=d?i.length:i,g=M("x",e[0].dataType,e[0].dims,o),y=M("scale",e[1].dataType,e[1].dims,l),_=M("bias",e[2].dataType,e[2].dims,l),w=M("inputMean",e[3].dataType,e[3].dims,l),b=M("inputVar",e[4].dataType,e[4].dims,l),S=j("y",e[0].dataType,f,o),v=()=>{let I="";if(a)I=`let cOffset = ${i.length===1?"0u":n==="NHWC"?`outputIndices[${i.length-1}] / ${o}`:"outputIndices[1]"};`;else if(n==="NCHW")I=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${y.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let k=1;k<y.rank;k++)I+=`cIndices[${k}] = outputIndices[${k}];`;I+=`let cOffset = ${y.indicesToOffset("cIndices")};`}return I},$=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(g,y,_,w,b,S)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${o}`)};
    ${v()}
    let scale = ${y.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${w.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${g.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${a}_${o}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:d?[{type:12,data:p},...Q(i)]:[{type:12,data:p}]})}},Ju=e=>_e(e),Vc=(e,t)=>{let{inputs:r,outputCount:a}=e,n=Ju({...t,outputCount:a});if(we.webgpu.validateInputContent&&Xu(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Yu(r,n))}}),el,tl,Gc,v0=L(()=>{oe(),ue(),el=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},tl=e=>{let t=e[0].dims,r=e[0].dims[2],a=O.size(t)/4,n=e[0].dataType,i=M("input",n,t,4),o=M("bias",n,[r],4),l=M("residual",n,t,4),p=j("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(i,o,l,p)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${i.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${p.setByOffset("global_idx","value")}
  }`}},Gc=e=>{el(e.inputs),e.compute(tl(e.inputs))}}),rl,he,Fc,Hc,jc,Kc,Qc,Zc,Xc,Yc,Jc,il,eh,th,rh,ih,mr,ah,ei,nh,sh,oh,uh,lh,dh,ph,ch,hh,fh,mh,gh,yh,_h,wh,bh,Yi,$h,Pa,Ua,vh,xh,Sh,al,nl,kh,mn=L(()=>{J(),oe(),Se(),ue(),rl=(e,t,r,a,n,i,o)=>{let l=Math.ceil(t/4),p="";typeof n=="string"?p=`${n}(a)`:p=n("a");let d=M("inputData",r,[l],4),f=j("outputData",a,[l],4),g=[{name:"vec_size",type:"u32"}];return o&&g.push(...o),`
      ${e.registerUniforms(g).declareVariables(d,f)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",p)}
  }`},he=(e,t,r,a,n,i=e.dataType,o,l)=>{let p=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return o&&p.push(...o),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:d=>rl(d,O.size(e.dims),e.dataType,i,r,a,l),getRunData:d=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(O.size(d[0].dims)/64/4)},programUniforms:p})}},Fc=e=>{e.compute(he(e.inputs[0],"Abs","abs"))},Hc=e=>{e.compute(he(e.inputs[0],"Acos","acos"))},jc=e=>{e.compute(he(e.inputs[0],"Acosh","acosh"))},Kc=e=>{e.compute(he(e.inputs[0],"Asin","asin"))},Qc=e=>{e.compute(he(e.inputs[0],"Asinh","asinh"))},Zc=e=>{e.compute(he(e.inputs[0],"Atan","atan"))},Xc=e=>{e.compute(he(e.inputs[0],"Atanh","atanh"))},Yc=e=>_e(e),Jc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(he(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},il=e=>{let t,r,a=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=a?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=a?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return _e({min:t,max:r})},eh=(e,t)=>{let r=t||il(e.inputs),a=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},th=e=>{e.compute(he(e.inputs[0],"Ceil","ceil"))},rh=e=>{e.compute(he(e.inputs[0],"Cos","cos"))},ih=e=>{e.compute(he(e.inputs[0],"Cosh","cosh"))},mr=e=>_e(e),ah=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Elu",a=>`elu_vf32(${a})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ei=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,nh=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,ei(t)))},sh=e=>{e.compute(he(e.inputs[0],"Exp","exp"))},oh=e=>{e.compute(he(e.inputs[0],"Floor","floor"))},uh=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ei(t)))},lh=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"LeakyRelu",a=>`select(leaky_relu_alpha_ * ${a}, ${a}, ${a} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},dh=e=>{e.compute(he(e.inputs[0],"Not",t=>`!${t}`))},ph=e=>{e.compute(he(e.inputs[0],"Neg",t=>`-${t}`))},ch=e=>{e.compute(he(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},hh=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},fh=e=>{e.compute(he(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},mh=e=>_e(e),gh=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSigmoid",a=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${a} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},yh=e=>{e.compute(he(e.inputs[0],"Sin","sin"))},_h=e=>{e.compute(he(e.inputs[0],"Sinh","sinh"))},wh=e=>{e.compute(he(e.inputs[0],"Sqrt","sqrt"))},bh=e=>{e.compute(he(e.inputs[0],"Tan","tan"))},Yi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,$h=e=>{e.compute(he(e.inputs[0],"Tanh",Yi))},Pa=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Yi("v")};
}
`,Ua=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,vh=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"FastGelu",Ua,Pa(t),void 0,e.inputs[0].dataType))},xh=(e,t)=>{let r=Me(e.inputs[0].dataType);return e.compute(he(e.inputs[0],"ThresholdedRelu",a=>`select(vec4<${r}>(0.0), ${a}, ${a} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Sh=e=>{e.compute(he(e.inputs[0],"Log","log"))},al=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,nl=e=>`quick_gelu_impl(${e})`,kh=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"QuickGelu",nl,al(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),sl,ol,Ih,x0=L(()=>{oe(),ue(),mn(),sl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},ol=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=M("input",e[0].dataType,e[0].dims,4),a=M("bias",e[0].dataType,[e[0].dims[2]],4),n=j("output",e[0].dataType,t,4),i=O.size(t)/4,o=Ae(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,a,n)}

  ${ei(o)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ih=e=>{sl(e.inputs),e.compute(ol(e.inputs))}}),ul,ll,Ye,Th,Ch,Eh,zh,Ah,Oh,Rh,Bh,Mh,Nh,S0=L(()=>{J(),oe(),ue(),ul=(e,t,r,a,n,i,o,l,p,d,f,g)=>{let y,_;typeof l=="string"?y=_=($,I)=>`${l}((${$}),(${I}))`:typeof l=="function"?y=_=l:(y=l.scalar,_=l.vector);let w=j("outputData",f,a.length,4),b=M("aData",p,t.length,4),S=M("bData",d,r.length,4),v;if(n)if(i){let $=O.size(t)===1,I=O.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,T=r.length>0&&r[r.length-1]%4===0;$||I?v=w.setByOffset("global_idx",_($?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),I?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):v=`
            let outputIndices = ${w.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",w)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",w)};
            ${w.setByOffset("global_idx",_(o||k?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||T?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=w.setByOffset("global_idx",_(b.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(I,k,T="")=>{let E=`aData[indexA${k}][componentA${k}]`,z=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${w.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${b.broadcastedIndicesToOffset(`outputIndices${k}`,w)};
            let offsetB${k} = ${S.broadcastedIndicesToOffset(`outputIndices${k}`,w)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${I}[${k}] = ${T}(${y(E,z)});
          `};f===9?v=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,S,w)}

        ${g??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},ll=(e,t,r,a,n,i,o=r.dataType)=>{let l=r.dims.map(b=>Number(b)??1),p=a.dims.map(b=>Number(b)??1),d=!O.areEqual(l,p),f=l,g=O.size(l),y=!1,_=!1,w=[d];if(d){let b=Kt.calcShape(l,p,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");f=b.slice(),g=O.size(f);let S=O.size(l)===1,v=O.size(p)===1,$=l.length>0&&l[l.length-1]%4===0,I=p.length>0&&p[p.length-1]%4===0;w.push(S),w.push(v),w.push($),w.push(I);let k=1;for(let T=1;T<f.length;T++){let E=l[l.length-T],z=p[p.length-T];if(E===z)k*=E;else break}k%4===0?(_=!0,y=!0):(S||v||$||I)&&(y=!0)}else y=!0;return w.push(y),{name:e,shaderCache:{hint:t+w.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>ul(b,l,p,f,y,d,_,n,r.dataType,a.dataType,o,i),getRunData:()=>({outputs:[{dims:f,dataType:o}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(f)/4)},...Q(l,p,f)]})}},Ye=(e,t,r,a,n,i)=>{e.compute(ll(t,n??"",e.inputs[0],e.inputs[1],r,a,i))},Th=e=>{Ye(e,"Add",(t,r)=>`${t}+${r}`)},Ch=e=>{Ye(e,"Div",(t,r)=>`${t}/${r}`)},Eh=e=>{Ye(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},zh=e=>{Ye(e,"Mul",(t,r)=>`${t}*${r}`)},Ah=e=>{let t=M("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ye(e,"Pow",{scalar:(r,a)=>`pow_custom(${r},${a})`,vector:(r,a)=>`pow_vector_custom(${r},${a})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Oh=e=>{Ye(e,"Sub",(t,r)=>`${t}-${r}`)},Rh=e=>{Ye(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Bh=e=>{Ye(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Mh=e=>{Ye(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Nh=e=>{Ye(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),dl,pl,cl,hl,Dh,Ph,k0=L(()=>{J(),oe(),Se(),ue(),dl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,a=e[r],n=a.dataType,i=a.dims.length;e.forEach((o,l)=>{if(l!==r){if(o.dataType!==n)throw new Error("input tensors should be one type");if(o.dims.length!==i)throw new Error("input tensors should have the same shape");o.dims.forEach((p,d)=>{if(d!==t&&p!==a.dims[d])throw new Error("non concat dimensions must match")})}})},pl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,cl=(e,t)=>{let r=e.length,a=[];for(let n=0;n<r;++n){let i=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?a.push(i):n===0?a.push(`if (inputIndex == ${n}u) { ${i} }`):n===r-1?a.push(`else { ${i} }`):a.push(`else if (inputIndex == ${n}) { ${i} }`)}return a.join(`
`)},hl=(e,t,r,a)=>{let n=O.size(r),i=new Array(e.length),o=new Array(e.length),l=0,p=[],d=[],f=[{type:12,data:n}];for(let b=0;b<e.length;++b)l+=e[b].dims[t],i[b]=l,d.push(e[b].dims.length),o[b]=M(`input${b}`,a,d[b]),p.push("rank"),f.push({type:12,data:i[b]});for(let b=0;b<e.length;++b)f.push(...Q(e[b].dims));f.push(...Q(r));let g=j("output",a,r.length),y=g.indicesGet("indices",t),_=Array.from(Array(i.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),w=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)b.registerUniform(`sizeInConcatAxis${S}`,"u32");return b.declareVariables(...o,g)})()}

  ${pl(i.length,_)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${g.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${y});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${_});
      ${y} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${cl(o,g)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:r,dataType:a}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:f}),getShaderSource:w}},Dh=(e,t)=>{let r=e.inputs,a=r[0].dims,n=O.normalizeAxis(t.axis,a.length);dl(r,n);let i=a.slice();i[n]=r.reduce((l,p)=>l+(p.dims.length>n?p.dims[n]:0),0);let o=r.filter(l=>O.size(l.dims)>0);e.compute(hl(o,n,i,r[0].dataType),{inputs:o})},Ph=e=>_e({axis:e.axis})}),Nt,Dt,Pt,gn,Wt=L(()=>{J(),oe(),Nt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Dt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Pt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},gn=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,a]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:a}}else if(t==="Clip"){let[r,a]=(e==null?void 0:e.activation_params)||[fc,mc];return{activation:t,clipMax:a,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Oe,Uh,yn=L(()=>{Oe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Uh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Wh,I0=L(()=>{Wh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),_r,_n,wn=L(()=>{J(),oe(),ue(),Wt(),_r=(e,t,r,a,n)=>{let i=a-r;return`
      ${Array.from({length:r}).map((o,l)=>`
      if (${K(t.shape,l,t.rank)} != 1) {
        ${t.indicesSet(e,l,K(n,l+i,a))}
      } else {
        ${t.indicesSet(e,l,0)}
      }`).join("")}
`},_n=(e,t,r,a,n=!1,i)=>{let o=e[0].dims,l=e[1].dims,p=o[o.length-2],d=l[l.length-1],f=o[o.length-1],g=xe(d),y=xe(f),_=xe(p),w=O.size(r)/g/_,b=e.length>2,S=a?a.slice(0,-2):r.slice(0,-2),v=[O.size(S),p,d],$=[{type:12,data:w},{type:12,data:p},{type:12,data:d},{type:12,data:f}];Dt(t,$),$.push(...Q(S,o,l)),b&&$.push(...Q(e[2].dims)),$.push(...Q(v));let I=k=>{let T=cn("batch_dims",e[0].dataType,S.length),E=M("a",e[0].dataType,o.length,y),z=M("b",e[1].dataType,l.length,g),B=j("output",e[0].dataType,v.length,g),W=Ae(B.type.tensor),G=Nt(t,B.type.value,W),ee=[E,z],ae="";if(b){let Y=n?g:1;ee.push(M("bias",e[2].dataType,e[2].dims.length,Y)),ae=`${n?`value += bias[col / ${Y}];`:`value += ${B.type.value}(bias[row + i]);`}`}let Z=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Pt(t,Z);let te=()=>{let Y=`var a_data: ${E.type.value};`;for(let V=0;V<y;V++)Y+=`
              let b_data${V} = b[(b_offset + (k + ${V}) * uniforms.N + col) / ${g}];`;for(let V=0;V<_;V++){Y+=`a_data = a[(a_offset + (row + ${V}) * uniforms.K + k) / ${y}];`;for(let de=0;de<y;de++)Y+=`
            values[${V}] = fma(${z.type.value}(a_data${y===1?"":`[${de}]`}), b_data${de}, values[${V}]);
`}return Y};return`
  ${k.registerUniforms(Z).registerInternalVariables(T).declareVariables(...ee,B)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${g})) * ${g};
    var index1 = global_idx / (uniforms.N / ${g});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${T.offsetToIndices("batch")};`}

    var a_indices: ${E.type.indices};
    ${_r("a_indices",E,E.rank-2,T.rank,"batch_indices")}
    ${E.indicesSet("a_indices",E.rank-2,0)}
    ${E.indicesSet("a_indices",E.rank-1,0)}
    let a_offset = ${E.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${_r("b_indices",z,z.rank-2,T.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${B.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${y}) {
      ${te()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${ae}
      ${G}
      let cur_indices = ${B.type.indices}(batch, row + i, col);
      let offset = ${B.indicesToOffset("cur_indices")};
      ${B.setByOffset(`offset / ${g}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${g};${y};${_};${n}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:$}),getShaderSource:I}}}),fl,ml,Wa,Ji,gl,La,yl,oi,bn=L(()=>{J(),oe(),ue(),Wt(),wn(),yn(),fl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,ml=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Wa=(e,t,r="f32",a,n=!1,i=32,o=!1,l=32)=>{let p=t[1]*e[1],d=t[0]*e[0],f=n?p:i,g=n?i:p,y=f/t[0],_=i/t[1];if(!((n&&y===4&&e[1]===4||!n&&(y===3||y===4))&&f%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${r}>, ${f/y}>, ${g}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${y};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${p};

  let num_tiles = ${o?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${fl(n,a)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${y===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${ml(n,y)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ji=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,gl=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",La=(e,t,r="f32",a,n=!1,i=32,o=!1,l=32,p=!1)=>{let d=e[1]*t[1],f=e[0]*t[0],g=n?d:i,y=n?i:d;if(!(y%t[1]===0&&g%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${y} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${g} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let _=y/t[1],w=g/t[0],b=i/t[1],S=p?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${y}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${g}; inputCol = inputCol + ${t[0]}) {
          ${Ji(n,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${w};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${w}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ji(n,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${gl(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${g}>, ${y}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},yl=(e,t,r,a,n=!1)=>{let[i,o,l,p]=a,d=Ae(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Oe(e,d)} {
      var value = ${Oe(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${_r("aIndices",o,o.rank-2,i.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Oe(e,d)} {
      var value = ${Oe(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${_r("bIndices",l,l.rank-2,i.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Oe(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Oe(e,d)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},oi=(e,t,r,a,n=!1,i)=>{let o=e[0].dims,l=e[1].dims,p=o.slice(0,-2),d=l.slice(0,-2),f=a?a.slice(0,-2):r.slice(0,-2),g=O.size(f),y=o[o.length-2],_=o[o.length-1],w=l[l.length-1],b=_%4===0&&w%4===0,S=y<=8?[4,1,1]:[4,4,1],v=[8,8,1],$=[Math.ceil(w/v[0]/S[0]),Math.ceil(y/v[1]/S[1]),Math.ceil(g/v[2]/S[2])],I=b?4:1,k=[...p,y,_/I],T=k.length,E=[...d,_,w/I],z=E.length,B=[g,y,w/I],W=[{type:6,data:y},{type:6,data:w},{type:6,data:_}];Dt(t,W),W.push(...Q(f,k,E));let G=["rank","rank"],ee=e.length>2;ee&&(W.push(...Q(e[2].dims)),G.push("rank")),W.push(...Q(B));let ae=Z=>{let te=f.length,Y=cn("batchDims",e[0].dataType,te,1),V=Ae(e[0].dataType),de=M("a",e[0].dataType,T,I),me=M("b",e[1].dataType,z,I),H=j("result",e[0].dataType,B.length,I),ge=[de,me];if(ee){let D=n?I:1;ge.push(M("bias",e[2].dataType,e[2].dims.length,D))}let N=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Pt(t,N);let q=Ae(H.type.tensor),le=Nt(t,H.type.value,q),$e=yl(I,ee,le,[Y,de,me,H],n);return`
  ${Z.registerUniforms(N).registerInternalVariables(Y).declareVariables(...ge,H)}
  ${$e}
  ${b?Wa(S,v,V,Y):La(S,v,V,Y)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${b};${n}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:W}),getShaderSource:ae}}}),_l,Lh,T0=L(()=>{J(),pt(),ue(),Wt(),yn(),I0(),bn(),_l=(e,t,r,a,n=!1,i,o=4,l=4,p=4,d="f32")=>{let f=W=>{switch(W){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},g=W=>{switch(W){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},y=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,w=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",v=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Oe(o,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${w} && xCol >= 0 && xCol < ${b}) {
      ${y}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(o)}
    }
    return resData;`,I=e?t&&a?`
    let col = colIn * ${o};
    ${$}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Oe(o,d)}(0.0);`:a&&r?`
    let col = colIn * ${o};
    ${$}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Oe(o,d)}(0.0);`,k=e?a&&r?g(l):`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g(l)}
    }
    return ${Oe(l,d)}(0.0);`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${g(l)}
    }
    return ${Oe(l,d)}(0.0);`,T=Oe(p,d),E=Oe(e?o:l,d),z=Oe(e?l:o,d),B=Nt(i,T,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?I:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?k:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${T}) {
      let col = colIn * ${p};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Uh(n)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Lh=(e,t,r,a,n,i,o,l,p)=>{let d=t.format==="NHWC",f=d?e[0].dims[3]:e[0].dims[1],g=r[0],y=d?r[2]:r[3],_=d?r[1]:r[2],w=d?r[3]:r[1],b=d&&(f%4===0||f%3===0)&&w%4===0,S=d?w:y*_,v=d?y*_:w,$=[8,8,1],I=a<=8?[4,1,1]:[4,4,1],k=[Math.ceil(S/$[0]/I[0]),Math.ceil(v/$[1]/I[1]),Math.ceil(g/$[2]/I[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let T=b?d&&f%4!==0?3:4:1,E=$[1]*I[1],z=$[0]*I[0],B=Math.max($[0]*T,$[1]),W=a%E===0,G=n%z===0,ee=i%B===0,ae=b?[T,4,4]:[1,1,1],Z=[{type:6,data:a},{type:6,data:n},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Dt(t,Z),Z.push(...Q(e[0].dims,e[1].dims));let te=["rank","rank"];o&&(Z.push(...Q(e[2].dims)),te.push("rank")),Z.push(...Q(r));let Y=V=>{let de=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Pt(t,de);let me=b?4:1,H=Ae(e[0].dataType),ge=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${H}>`:H}) {
        result[flatIndex] = ${b?`vec4<${H}>`:H}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${H}>`:H}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,N=M("x",e[0].dataType,e[0].dims.length,T===3?1:T),q=M("w",e[1].dataType,e[1].dims.length,me),le=[N,q],$e=j("result",e[0].dataType,r.length,me);if(o){let D=M("bias",e[2].dataType,e[2].dims.length,me);le.push(D),ge+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${H}>`:H} {
          return bias[coords.${d?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${Wh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${V.registerUniforms(de).declareVariables(...le,$e)}
        ${ge}
        ${_l(d,W,G,ee,o,t,ae[0],ae[1],ae[2],H)}
        ${b?Wa(I,$,H,void 0,!d,B):La(I,$,H,void 0,!d,B,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${T};${b};${W};${G};${ee};${E};${z};${B}`,inputDependencies:te},getRunData:()=>({outputs:[{dims:p?p(r):r,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:Z}),getShaderSource:Y}}}),wl,ea,or,bl,ta,$l,qh,Vh,C0=L(()=>{J(),pt(),oe(),ue(),Wt(),yn(),wl=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},ea=e=>typeof e=="number"?[e,e,e]:e,or=(e,t)=>t<=1?e:e+(e-1)*(t-1),bl=(e,t,r,a=1)=>{let n=or(t,a);return Math.floor((e[0]*(r-1)-r+n)/2)},ta=(e,t,r,a,n)=>{n==null&&(n=bl(e,t[0],a[0]));let i=[0,0,0,r];for(let o=0;o<3;o++)e[o]+2*n>=t[o]&&(i[o]=Math.trunc((e[o]-t[o]+2*n)/a[o]+1));return i},$l=(e,t,r,a,n,i,o,l,p,d)=>{let f,g,y,_;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let w=ta([t,r,a,1],[l,p,d],1,[n,i,o],e);g=w[0],y=w[1],_=w[2]}else if(Array.isArray(e)){if(!e.every((b,S,v)=>b===v[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let w=ta([t,r,a,1],[l,p,d],1,[n,i,o],e[0]);g=w[0],y=w[1],_=w[2]}else if(e==="SAME_UPPER"){g=Math.ceil(t/n),y=Math.ceil(r/i),_=Math.ceil(a/o);let w=(g-1)*n+l-t,b=(y-1)*i+p-r,S=(_-1)*o+d-a,v=Math.floor(w/2),$=w-v,I=Math.floor(b/2),k=b-I,T=Math.floor(S/2),E=S-T;f={top:I,bottom:k,left:T,right:E,front:v,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:g,outHeight:y,outWidth:_}},qh=(e,t,r,a,n,i=!1,o="channelsLast")=>{let l,p,d,f,g;if(o==="channelsLast")[l,p,d,f,g]=e;else if(o==="channelsFirst")[l,g,p,d,f]=e;else throw new Error(`Unknown dataFormat ${o}`);let[y,,_,w,b]=t,[S,v,$]=ea(r),[I,k,T]=ea(a),E=or(_,I),z=or(w,k),B=or(b,T),{padInfo:W,outDepth:G,outHeight:ee,outWidth:ae}=$l(n,p,d,f,S,v,$,E,z,B),Z=i?y*g:y,te=[0,0,0,0,0];return o==="channelsFirst"?te=[l,Z,G,ee,ae]:o==="channelsLast"&&(te=[l,G,ee,ae,Z]),{batchSize:l,dataFormat:o,inDepth:p,inHeight:d,inWidth:f,inChannels:g,outDepth:G,outHeight:ee,outWidth:ae,outChannels:Z,padInfo:W,strideDepth:S,strideHeight:v,strideWidth:$,filterDepth:_,filterHeight:w,filterWidth:b,effectiveFilterDepth:E,effectiveFilterHeight:z,effectiveFilterWidth:B,dilationDepth:I,dilationHeight:k,dilationWidth:T,inShape:e,outShape:te,filterShape:t}},Vh=(e,t,r,a,n,i)=>{let o=i==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let l=[64,1,1],p={x:r.map((S,v)=>v)},d=[Math.ceil(wl(p.x.map(S=>r[S]))/l[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let f=1,g=O.size(r),y=[{type:12,data:g},{type:12,data:a},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Dt(t,y),y.push(...Q(e[0].dims,e[1].dims));let _=["rank","rank"],w=e.length===3;w&&(y.push(...Q(e[2].dims)),_.push("rank")),y.push(...Q(r));let b=S=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Pt(t,v);let $=1,I=Ae(e[0].dataType),k=M("x",e[0].dataType,e[0].dims.length,f),T=M("W",e[1].dataType,e[1].dims.length,$),E=[k,T],z=j("result",e[0].dataType,r.length,$),B="";if(w){let ee=M("bias",e[2].dataType,e[2].dims.length,$);E.push(ee),B+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${I} {
          return bias[${o?K("coords",4,5):K("coords",1,5)}];
        }`}let W=Oe(f,I),G=Nt(t,W,I);return`
            ${B}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
          ${S.registerUniforms(v).declareVariables(...E,z)}
          ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,k.rank)};
              let d2 = ${o?K("coords",k.rank-1,k.rank):K("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${o?K("coords",1,k.rank):K("coords",2,k.rank)},
              ${o?K("coords",2,k.rank):K("coords",3,k.rank)},
              ${o?K("coords",3,k.rank):K("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?K("uniforms.x_shape",1,k.rank):K("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${o?K("uniforms.x_shape",2,k.rank):K("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${o?K("uniforms.x_shape",3,k.rank):K("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${o?K("uniforms.x_shape",4,k.rank):K("uniforms.x_shape",1,k.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${G}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${f};${w}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:y}),getShaderSource:b}}}),Gh,Fh,E0=L(()=>{J(),oe(),ue(),Wt(),Gh=(e,t,r,a)=>{let n=e.length>2,i=n?"value += b[output_channel];":"",o=e[0].dims,l=e[1].dims,p=t.format==="NHWC",d=p?r[3]:r[1],f=d/t.group,g=p&&f>=4?xe(d):1,y=O.size(r)/g,_=[{type:12,data:y},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Dt(t,_),_.push(...Q(o,[l[0],l[1],l[2],l[3]/g]));let w=n?["rank","rank","rank"]:["rank","rank"];_.push(...Q([r[0],r[1],r[2],r[3]/g]));let b=S=>{let v=j("output",e[0].dataType,r.length,g),$=Ae(v.type.tensor),I=Nt(t,v.type.value,$),k=M("x",e[0].dataType,o.length),T=M("w",e[1].dataType,l.length,g),E=[k,T];n&&E.push(M("b",e[2].dataType,e[2].dims,g));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Pt(t,z);let B=p?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${T.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${T.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(z).declareVariables(...E,v)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${p?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${p?1:2}], outputIndices[${p?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${g} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${p?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${B}
    ${i}
    ${I}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${g}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:b}},Fh=(e,t,r,a)=>{let n=e.length>2,i=xe(r[3]),o=xe(r[2]),l=O.size(r)/i/o,p=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],f=[r[0],r[1],r[2],r[3]/i],g=[{type:12,data:l},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Dt(t,g),g.push(...Q(p,d,f));let y=(o-1)*t.strides[1]+d[1],_=w=>{let b=j("output",e[0].dataType,f.length,i),S=Ae(b.type.tensor),v=Nt(t,b.type.value,S),$=M("x",e[0].dataType,p.length,i),I=M("w",e[1].dataType,d.length,i),k=[$,I];n&&k.push(M("b",e[2].dataType,e[2].dims,i));let T=n?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Pt(t,E),`
  ${w.registerUniforms(E).declareVariables(...k,b)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${y}>;
    var values: array<${b.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${y}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${T}
      ${v}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${o};${y};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:_}}}),vl,Hr,xl,jr,qa,ra,Sl,kl,Va,z0=L(()=>{oe(),T0(),C0(),bn(),E0(),Wt(),wn(),xt(),vl=(e,t,r,a,n,i)=>{let o=e[0],l=e.slice(i?1:2,i?3:4),p=l.length,d=t[0],f=t.slice(2).map((y,_)=>y+(y-1)*(r[_]-1)),g=l.map((y,_)=>y+a[_]+a[_+p]).map((y,_)=>Math.floor((y-f[_]+n[_])/n[_]));return g.splice(0,0,o),g.splice(i?3:1,0,d),g},Hr=[2,3,1,0],xl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[1]*t.group;if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},jr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let a=e.pads.slice();ni.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,a,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:a}),n},qa=e=>{let t=gn(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,i=e.group,o=e.kernel_shape,l=e.pads,p=e.strides,d=e.w_is_const();return{autoPad:a,format:r,dilations:n,group:i,kernelShape:o,pads:l,strides:p,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},ra=(e,t,r,a)=>{let n=r.format==="NHWC",i=vl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let E=[t[0]];if(n){let z=e.kernelCustomData.wT??e.compute(qe(t[1],Hr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),E.push(z)}else E.push(t[1]);t.length===3&&E.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Fh(E,r,i,a),{inputs:E}):e.compute(Gh(E,r,i,a),{inputs:E});return}let o=t.length===3,l=t[0].dims[n?1:2],p=t[0].dims[n?2:3],d=t[0].dims[n?3:1],f=t[1].dims[2],g=t[1].dims[3],y=i[n?1:2],_=i[n?2:3],w=i[n?3:1],b=n&&f===l&&g===p&&r.pads[0]===0&&r.pads[1]===0;if(b||f===1&&g===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let E=i[0],z,B,W,G=[];if(n){let Z=e.kernelCustomData.wT??e.compute(qe(t[1],Hr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=Z),b){let te=l*p*d;z=t[0].reshape([1,E,te]),B=Z.reshape([1,te,w]),W=[1,E,w]}else z=t[0].reshape([E,l*p,d]),B=Z.reshape([1,d,w]),W=[E,y*_,w];G.push(z),G.push(B)}else z=t[0].reshape([E,d,l*p]),B=t[1].reshape([1,w,d]),W=[E,w,y*_],G.push(B),G.push(z);o&&G.push(t[2]);let ee=W[2],ae=G[0].dims[G[0].dims.length-1];ee<8&&ae<8?e.compute(_n(G,r,i,W,n,a),{inputs:G}):e.compute(oi(G,r,i,W,n,a),{inputs:G});return}let S=!0,v=e.kernelCustomData.wT??e.compute(qe(t[1],Hr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let $=[t[0],v];o&&$.push(t[2]);let I=n?y*_:w,k=n?w:y*_,T=f*g*d;e.compute(Lh($,r,i,I,k,T,o,S,a),{inputs:$})},Sl=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),o=[1].concat(t.dilations),l=[1].concat(t.kernelShape),p=jr({...t,pads:n,strides:i,dilations:o,kernelShape:l},a);ra(e,a,p,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},kl=(e,t,r)=>{let a=r.format==="NHWC"?"channelsLast":"channelsFirst",n=jr(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,o=qh(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,a);e.compute(Vh(t,n,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],a))},Va=(e,t)=>{if(xl(e.inputs,t),e.inputs[0].dims.length===3)Sl(e,t);else if(e.inputs[0].dims.length===5)kl(e,e.inputs,t);else{let r=jr(t,e.inputs);ra(e,e.inputs,r)}}}),Hh,A0=L(()=>{J(),pt(),oe(),ue(),Hh=(e,t,r)=>{let a=e.length>2,n=t.outputShape,i=t.format==="NHWC",o=t.group,l=e[1].dims,p=l[2]/o,d=l[3],f=i?xe(p):1,g=i?xe(d):1,y=i?d===1?f:g:1,_=O.size(n)/g,w=[Math.ceil(_/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let b=["rank","rank"],S=[t.strides[0],t.strides[1]],v=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],$=[t.dilations[0],t.dilations[1]],I=[v[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),v[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],k=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],T=[{type:12,data:_},{type:12,data:S},{type:12,data:v},{type:12,data:$},{type:12,data:I},{type:6,data:k},{type:12,data:p},{type:12,data:d},...Q(e[0].dims,e[1].dims)];a&&(T.push(...Q(e[2].dims)),b.push("rank")),T.push(...Q(n));let E=z=>{let B=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:k.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],W=Ae(e[0].dataType),G=i?1:2,ee=i?2:3,ae=i?3:1,Z=M("W",e[1].dataType,e[1].dims.length,y),te=M("Dy",e[0].dataType,e[0].dims.length,f),Y=[te,Z];a&&Y.push(M("bias",e[2].dataType,[n[ae]].length,g));let V=j("result",e[0].dataType,n.length,g),de=()=>{let H="";if(f===1)H+=`
        let w_offset = ${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${Z.getByOffset(`w_offset / ${y}`)};
        dotProd = dotProd + xValue * wValue;`;else if(d===1)H+=`
          let wValue = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${y}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let ge=0;ge<f;ge++)H+=`
            let wValue${ge} = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ge}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${ge}] * wValue${ge};`;return H},me=`
            let outputIndices = ${V.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${V.indicesGet("outputIndices",0)};
            let d1 = ${V.indicesGet("outputIndices",ae)};
            let r = ${V.indicesGet("outputIndices",G)};
            let c = ${V.indicesGet("outputIndices",ee)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${V.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${W}(dyRCorner) + ${W}(wR)) / ${W}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${W}(uniforms.Dy_shape[${G}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }

              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${W}(dyCCorner) + ${W}(wC)) / ${W}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${W}(uniforms.Dy_shape[${ee}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${f}) {
                  let xValue = ${i?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):te.get("batch","inputChannel","idyR","idyC")};
                  ${de()}
                  inputChannel = inputChannel + ${f};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${g}]`:""};
            ${V.setByOffset("global_idx","value")};
          `;return`
    ${z.registerUniforms(B).declareVariables(...Y,V)}
      ${z.mainStart()}
      ${z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${me}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${y}${g}${d===1}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:T}),getShaderSource:E}}}),Il,Tl,Cl,ia,jh,El,aa,zl,Kh,O0=L(()=>{A0(),Wt(),xt(),Il=(e,t,r,a,n,i)=>(e-1)*t+r+(a-1)*n+1-i,Tl=(e,t,r,a,n)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[a]=i,r[n]=e-i):t==="SAME_LOWER"&&(r[a]=e-i,r[n]=i)},Cl=(e,t,r,a,n,i,o,l,p,d)=>{let f=e.length-2,g=d.length===0;p.length<f&&p.push(...Array(f-p.length).fill(0));let y=e[0],_=t[l?3:1]*n;for(let w=0,b=e.length-f-(l?1:0);w<f;++w,++b){let S=e[b],v=g?S*o[w]:d[w],$=Il(S,o[w],i[w],t[b],r[w],v);Tl($,a,i,w,w+f),g&&d.push(o[w]*(S-1)+p[w]+(t[b]-1)*r[w]+1-i[w]-i[w+f])}d.splice(0,0,y),d.splice(l?3:1,0,_)},ia=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((g,y)=>g*y,1)===0){r.length=0;for(let g=2;g<t[1].dims.length;++g)r.push(t[1].dims[g])}let a=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(a?3:1,0,t[1].dims[1]);let n=e.pads.slice(),i=e.outputShape.slice(),o=e.outputPadding.slice(),l=t[0].dims,p=e.dilations.slice();if(p.reduce((g,y)=>g+y,0)===0){let g=t[0].dims.length-2;p=new Array(g).fill(1)}let d=e.strides.slice();if(d.reduce((g,y)=>g+y,0)===0){let g=t[0].dims.length-2;d=new Array(g).fill(1)}Cl(l,r,p,e.autoPad,e.group,n,d,a,o,i);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:n,outputPadding:o,outputShape:i,dilations:p,strides:d}),f},jh=e=>{let t=gn(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,i=e.group,o=e.kernelShape,l=e.pads,p=e.strides,d=e.wIsConst(),f=e.outputPadding,g=e.outputShape;return{autoPad:a,format:r,dilations:n,group:i,kernelShape:o,outputPadding:f,outputShape:g,pads:l,strides:p,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},El=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[0];if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((o,l)=>o+l,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((o,l)=>o+l,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((o,l)=>o+l,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((o,l)=>o+l,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},aa=(e,t,r,a)=>{let n=e.kernelCustomData.wT??e.compute(qe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let i=[t[0],n];t.length===3&&i.push(t[2]),e.compute(Hh(i,r,a),{inputs:i})},zl=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],o=[1].concat(o),i=[1].concat(i),n=[1].concat(n);let p=t.outputPadding;p=[0].concat(p);let d=ia({...t,pads:l,strides:o,dilations:i,kernelShape:n,outputPadding:p},a);aa(e,a,d,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},Kh=(e,t)=>{if(El(e.inputs,t),e.inputs[0].dims.length===3)zl(e,t);else{let r=ia(t,e.inputs);aa(e,e.inputs,r)}}}),Al,Qh,Zh,R0=L(()=>{J(),oe(),Se(),ue(),Al=(e,t,r,a)=>{let n=O.size(t),i=t.length,o=M("input",e,i),l=j("output",e,i),p=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=O.normalizeAxis(p,i),f=g=>{let y=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",i),w=a.reverse?y+(a.exclusive?" + 1":""):"0",b=a.reverse?_:y+(a.exclusive?"":" + 1");return`
                ${g.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,l)}
                ${g.mainStart()}
                  ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${w};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:a.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:d},...Q(t,t)]}),getShaderSource:f}},Qh=(e,t)=>{let r=e.inputs[0].dims,a=e.inputs[0].dataType,n=e.inputs[1];e.compute(Al(a,r,n,t),{inputs:[0]})},Zh=e=>{let t=e.exclusive===1,r=e.reverse===1;return _e({exclusive:t,reverse:r})}}),Ol,Rl,Bl,Xh,Yh,B0=L(()=>{J(),oe(),Se(),ue(),Ol=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Rl=(e,t,r,a)=>{let n=[];n.push(`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)n.push(r.indicesSet("a",e[i],`i[${i}]`));return n.push("return a;}"),n.join(`
`)},Bl=(e,t)=>{let r,a,n,i,o,l,p=t.format==="NHWC",d=t.blocksize,f=t.mode==="DCR";p?([r,a,n,i]=e.dims,o=f?[r,a,n,d,d,i/d**2]:[r,a,n,i/d**2,d,d],l=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,a,n,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=f?[r,d,d,i/d**2,a,n]:[r,i/d**2,d,d,a,n],l=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let g=e.reshape(o),y=g.dims.length,_=e.dataType,w=M("a",_,y),b=j("output",_,y),S=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(w,b)}

  ${Rl(l,y,w,b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let $=p?[r,a*d,n*d,i/d**2]:[r,i/d**2,a*d,n*d],I=O.size($),k=g.dims,T=O.sortBasedOnPerm(k,l);return{outputs:[{dims:$,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...Q(k,T)]}},getShaderSource:S}},Xh=(e,t)=>{Ol(e.inputs),e.compute(Bl(e.inputs[0],t))},Yh=e=>_e({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Kr,ur,na,Ml,Nl,Dl,Pl,sa,Ul,Jh,ef,M0=L(()=>{J(),oe(),Se(),ue(),Kr="[a-zA-Z]|\\.\\.\\.",ur="("+Kr+")+",na="^"+ur+"$",Ml="("+ur+",)*"+ur,Nl="^"+Ml+"$",Dl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Pl=class{constructor(e,t){var n;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,a]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Nl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,o)=>{let l=e[o].dims.slice();if(!i.match(RegExp(na)))throw new Error("Invalid LHS term");let p=this.processTerm(i,!0,l,o);this.lhs.push(p)}),a==="")a+=[...this.symbolToInfo.entries()].filter(([i,o])=>o.count===1||i==="...").map(([i])=>i).join("");else if(!a.match(RegExp(ur)))throw new Error("Invalid RHS");(n=a.match(RegExp(Kr,"g")))==null||n.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let o=this.symbolToInfo.get(i);if(o===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(o.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(e,t,r){let a=this.symbolToInfo.get(e);if(a!==void 0){if(a.dimValue!==t&&a.count!==1)throw new Error("Dimension mismatch");a.count++,a.inputIndices.push(r)}else a={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,a)}processTerm(e,t,r,a=-1){let n=r.length,i=!1,o=[],l=0;if(!e.match(RegExp(na))&&!t&&e!=="")throw new Error("Invalid LHS term");let p=e.match(RegExp(Kr,"g")),d=new Dl(a);return p==null||p.forEach((f,g)=>{if(f==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let y=n-p.length+1;if(y<0)throw new Error("Ellipsis out of bounds");if(o=r.slice(l,l+y),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<o.length;_++){let w=String.fromCharCode(48+_);d.addSymbol(w,g+_),this.addSymbol(w,r[l++],a)}}else d.addSymbol(f,g+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[l++],a)}),d}},sa=e=>e+"_max",Ul=(e,t,r,a)=>{let n=e.map(d=>d.length).map((d,f)=>M(`input${f}`,t,d)),i=O.size(a),o=j("output",t,a.length),l=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),p=d=>{let f=[],g="var prod = 1.0;",y="var sum = 0.0;",_="sum += prod;",w=[],b=[],S=[],v=[],$=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,T)=>{var E;if(r.rhs.symbolToIndices.has(T)){let z=(E=r.rhs.symbolToIndices.get(T))==null?void 0:E[0];z!==void 0&&r.lhs.forEach((B,W)=>{if(k.inputIndices.includes(W)){let G=B.symbolToIndices.get(T);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(ee=>{f.push(`${n[W].indicesSet(`input${W}Indices`,ee,o.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,B)=>{if(k.inputIndices.includes(B)){let W=z.symbolToIndices.get(T);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(G=>{w.push(`${n[B].indicesSet(`input${B}Indices`,G,`${T}`)}`)}),v.push(`prod *= ${n[B].getByIndices(`input${B}Indices`)};`)}}),b.push(`for(var ${T}: u32 = 0; ${T} < uniforms.${sa(T)}; ${T}++) {`),S.push("}")});let I=$?[...f,`let sum = ${n.map((k,T)=>k.getByIndices(`input${T}Indices`)).join(" * ")};`]:[...f,y,...b,...w,g,...v,_,...S];return`
            ${d.registerUniforms(l.map(k=>({name:`${sa(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,o)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${n.map((k,T)=>`var input${T}Indices: ${n[T].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=l.filter(g=>r.symbolToInfo.has(g)).map(g=>{var y;return{type:12,data:((y=r.symbolToInfo.get(g))==null?void 0:y.dimValue)||0}});d.push({type:12,data:i});let f=e.map((g,y)=>[...Q(g)]).reduce((g,y)=>g.concat(y),d);return f.push(...Q(a)),{outputs:[{dims:a,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:f}},getShaderSource:p}},Jh=(e,t)=>{let r=new Pl(e.inputs,t.equation),a=r.outputDims,n=e.inputs.map((i,o)=>i.dims);e.compute(Ul(n,e.inputs[0].dataType,r,a))},ef=e=>{let t=e.equation.replace(/\s+/g,"");return _e({equation:t})}}),Wl,oa,Ll,ql,tf,N0=L(()=>{J(),oe(),ue(),Wl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;a<r.length&&n<t.length;++a,++n)if(r[a]!==t[n]&&r[a]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},oa=(e,t)=>{let r=e.length-t.length,a=[];for(let n=0;n<r;++n)a.push(e[n]);for(let n=0;n<t.length;++n)a.push(t[n]===1?e[n+r]:t[n]);return a},Ll=(e,t)=>e.length>t.length?oa(e,t):oa(t,e),ql=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=Ll(t,r),n=e[0].dataType,i=n===9||O.size(t)===1,o=n===9||t.length>0&&t[t.length-1]%4===0?4:1,l=i||a.length>0&&a[a.length-1]%4===0?4:1,p=Math.ceil(O.size(a)/l),d=g=>{let y=M("input",n,t.length,o),_=j("output",n,a.length,l),w;if(n===9){let b=(S,v,$="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${y.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${S}[${v}] = ${$}(${y.getByOffset(`index${v}`)}[component${v}]);
        `;w=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else w=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${y.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${y.getByOffset(`inputOffset / ${o}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${g.registerUniform("vec_size","u32").declareVariables(y,_)}
    ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${w}`},f=[{type:12,data:p},...Q(t,a)];return{name:"Expand",shaderCache:{hint:`${a.length};${o}${l}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f})}},tf=e=>{Wl(e.inputs),e.compute(ql(e.inputs),{inputs:[0]})}}),Vl,rf,D0=L(()=>{J(),oe(),ue(),mn(),Vl=e=>{let t=e[0].dataType,r=O.size(e[0].dims),a=O.size(e[1].dims),n=a%4===0,i=o=>{let l=M("x",t,[1],4),p=M("bias",t,[1],4),d=j("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],g=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${p.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,y=n?`
      let bias = ${p.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${g(0)}${g(1)}${g(2)}${g(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(f).declareVariables(l,p,d)}

    ${Pa(Me(t))}

    ${o.mainStart(Qt)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${y}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Ua("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(r/Qt/4)}})}},rf=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?vh(e):e.compute(Vl(e.inputs))}}),Gl,Fl,af,nf,P0=L(()=>{J(),oe(),Se(),ue(),Gl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Fl=(e,t)=>{let r=e[0].dims,a=e[1].dims,n=r.length,i=O.normalizeAxis(t.axis,n),o=r.slice(0);o.splice(i,1,...a);let l=r[i],p=e[0].dataType===9?4:1,d=Math.ceil(O.size(o)/p),f=[{type:12,data:d},{type:6,data:l},{type:12,data:i},...Q(e[0].dims,e[1].dims,o)],g=y=>{let _=M("data",e[0].dataType,e[0].dims.length,p),w=M("inputIndices",e[1].dataType,e[1].dims.length),b=j("output",e[0].dataType,o.length,p),S=$=>{let I=a.length,k=`var indicesIndices${$}  = ${w.type.indices}(0);`;for(let T=0;T<I;T++)k+=`${I>1?`indicesIndices${$}[${T}]`:`indicesIndices${$}`} = ${o.length>1?`outputIndices${$}[uniforms.axis + ${T}]`:`outputIndices${$}`};`;k+=`
          var idx${$} = ${w.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${_.type.indices};
        `;for(let T=0,E=0;T<n;T++)T===i?(k+=`${n>1?`dataIndices${$}[${T}]`:`dataIndices${$}`} = u32(idx${$});`,E+=I):(k+=`${n>1?`dataIndices${$}[${T}]`:`dataIndices${$}`} = ${o.length>1?`outputIndices${$}[${E}]`:`outputIndices${$}`};`,E++);return k},v;if(e[0].dataType===9){let $=(I,k,T="")=>`
          let outputIndices${k} = ${b.offsetToIndices(`outputOffset + ${k}u`)};
          ${S(k)};
          let offset${k} = ${_.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${I}[${k}] = ${T}(${_.getByOffset(`index${k}`)}[component${k}]);
        `;v=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,w,b)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:g}},af=e=>_e({axis:e.axis}),nf=(e,t)=>{let r=e.inputs;Gl(r),e.compute(Fl(e.inputs,t))}}),Hl,sf,of,U0=L(()=>{J(),oe(),ue(),Hl=(e,t,r,a,n,i,o,l,p)=>{let d=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:l},{type:12,data:p}],f=[i];d.push(...Q(t.dims,f));let g=y=>{let _=M("indices_data",t.dataType,t.dims.length),w=j("input_slice_offsets_data",12,1,1),b=[_,w],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${y.registerUniforms(S).declareVariables(...b)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}),getShaderSource:g},{inputs:[t],outputs:[-1]})[0]},sf=(e,t)=>{let r=e.inputs,a=r[0].dims,n=r[0].dataType,i=r[1].dims,o=i[i.length-1],l=O.sizeToDimension(i,i.length-1),p=O.sizeFromDimension(a,t.batchDims+o),d=O.sizeToDimension(a,t.batchDims),f=O.sizeFromDimension(a,t.batchDims),g=l/d,y=new Array(o),_=p;for(let k=0;k<o;++k)y[o-1-k]=_,_*=a[t.batchDims+o-1-k];let w=Hl(e,r[1],y,t.batchDims,a,l,g,f,o),b=t.batchDims+o;if(b>a.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=i.slice(0,-1).concat(a.slice(b)),v=O.size(S),$=[{type:12,data:v},{type:12,data:p},...Q(r[0].dims,w.dims,S)],I=k=>{let T=M("data",r[0].dataType,r[0].dims.length),E=M("slice_offsets",12,w.dims.length),z=j("output",r[0].dataType,S.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(T,E,z)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:n}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:$}),getShaderSource:I},{inputs:[r[0],w]})},of=e=>({batchDims:e.batch_dims,cacheKey:""})}),jl,Kl,uf,lf,W0=L(()=>{J(),oe(),Se(),ue(),jl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),a=t.blockSize,n=e[0],i=e[2],o=e.length===4?e[3]:void 0;if(i.dims.length!==n.dims.length||!n.dims.map((l,p)=>p===r?Math.ceil(l/a)===i.dims[p]:l===i.dims[p]).reduce((l,p)=>l&&p,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==i.dims.length||!o.dims.map((l,p)=>l===i.dims[p]).reduce((l,p)=>l&&p,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Kl=(e,t)=>{let r=e[0].dims,a=e[1].dims,n=r.length,i=O.normalizeAxis(t.gatherAxis,n),o=O.normalizeAxis(t.quantizeAxis,n),l=r.slice(0);l.splice(i,1,...a);let p=O.size(l),d=e[2].dataType,f=e[0].dataType===22,g=[{type:12,data:p},{type:12,data:o},{type:12,data:i},{type:12,data:t.blockSize},...Q(...e.map((_,w)=>_.dims),l)],y=_=>{let w=M("data",e[0].dataType,e[0].dims.length),b=M("inputIndices",e[1].dataType,e[1].dims.length),S=M("scales",e[2].dataType,e[2].dims.length),v=e.length>3?M("zeroPoint",e[3].dataType,e[3].dims.length):void 0,$=j("output",d,l.length),I=[w,b,S];v&&I.push(v);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(k).declareVariables(...I,$)}
        ${_.mainStart()}
        let output_indices = ${$.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${a.length>1?`
          for (var i: u32 = 0; i < ${a.length}; i++) {
            let index = ${$.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${$.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${$.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${$.indicesGet("output_indices",`i + ${a.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Me(d)}(quantized_data - zero_point) * scale;
        ${$.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,w)=>w!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,w)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:d}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:y}},uf=(e,t)=>{let r=e.inputs;jl(r,t),e.compute(Kl(e.inputs,t))},lf=e=>_e({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Ql,Zl,df,pf,L0=L(()=>{J(),oe(),Se(),ue(),Ql=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Zl=(e,t)=>{let r=e[0].dims,a=e[0].dataType,n=r.length,i=e[1].dims,o=e[1].dataType,l=O.normalizeAxis(t.axis,n),p=r[l],d=i.slice(0),f=O.size(d),g=M("input",a,n),y=M("indicesInput",o,i.length),_=j("output",a,d.length),w=[{type:12,data:f},{type:6,data:p},{type:12,data:l}];return w.push(...Q(r,i,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:w}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,y,_)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${y.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${g.type.indices}(outputIndices);
      ${g.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${g.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},df=e=>_e({axis:e.axis}),pf=(e,t)=>{let r=e.inputs;Ql(r),e.compute(Zl(e.inputs,t))}}),Xl,Yl,cf,hf,q0=L(()=>{J(),oe(),ue(),Xl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Yl=(e,t)=>{let r=e[0].dims.slice(),a=e[1].dims.slice(),[n,i,o]=hc.getShapeOfGemmResult(r,t.transA,a,t.transB,e.length===3?e[2].dims:void 0),l=[n,i];if(!l)throw new Error("Can't use gemm on the given tensors");let p=16,d=Math.ceil(i/p),f=Math.ceil(n/p),g=!0,y=O.size(l),_=[{type:12,data:g?d:y},{type:12,data:n},{type:12,data:i},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],w=["type","type"];e.length===3&&(_.push(...Q(e[2].dims)),w.push("rank")),_.push(...Q(l));let b=v=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=t.alpha===1?"":"value *= uniforms.alpha;",k=M("a",e[0].dataType,e[0].dims),T=M("b",e[1].dataType,e[1].dims),E=k.type.value,z=null,B=[k,T];e.length===3&&(z=M("c",e[2].dataType,e[2].dims.length),B.push(z));let W=j("output",e[0].dataType,l.length);B.push(W);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(G).declareVariables(...B)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${I}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",W)}; value += ${E}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=v=>{let $=M("a",e[0].dataType,e[0].dims),I=M("b",e[1].dataType,e[1].dims),k=null,T=[$,I];e.length===3&&(k=M("c",e[2].dataType,e[2].dims.length),T.push(k));let E=j("output",e[0].dataType,l.length);T.push(E);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],B="",W="";t.transA&&t.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(z).declareVariables(...T)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${p}>, ${p}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${p}>, ${p}>;
  ${v.mainStart([p,p,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${p};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${p};
    let num_tiles = (uniforms.K - 1) / ${p} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${W}
      k_start = k_start + ${p};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${p}; k++) {
        ${B}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return g?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:d*f},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:b}},cf=e=>{let t=e.transA,r=e.transB,a=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:a,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},hf=(e,t)=>{Xl(e.inputs),e.compute(Yl(e.inputs,t))}}),st,dt,Tt,Ct,Jl,ed,td,rd,id,ad,nd,sd,ff,mf,V0=L(()=>{J(),oe(),Se(),ue(),[st,dt,Tt,Ct]=[0,1,2,3],Jl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},ed=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,td=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,rd=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,id=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,ad=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${st}] = batch;
     indices[${dt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Tt}] = u32(r);
            indices[${Ct}] = u32(c);
          }
        `;case"border":return`
          indices[${Tt}] = u32(clamp(r, 0, H - 1));
          indices[${Ct}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Tt}] = gs_reflect(r, border[1], border[3]);
          indices[${Ct}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,nd=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${st}], indices[${dt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${st}], indices[${dt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${st}], indices[${dt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${st}], indices[${dt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${st}], indices[${dt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${st}], indices[${dt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,sd=(e,t)=>{let r=M("x",e[0].dataType,e[0].dims.length),a=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=M("grid",e[1].dataType,a.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[st,dt,Tt,Ct]=[0,3,1,2]);let o=j("output",e[0].dataType,i.length),l=r.type.value,p=O.size(i),d=[{type:12,data:p},...Q(e[0].dims,a,i)],f=g=>`
  ${g.registerUniform("output_size","u32").declareVariables(r,n,o)}
  ${ed}
  ${td(l)}
  ${rd(t)}
  ${id(t)}
  ${ad(r,l,t)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Tt}]);
      let W_in = i32(uniforms.x_shape[${Ct}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${st}], indices[${Tt}], indices[${Ct}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${nd(o,l,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:g=>{let y=O.size(i);return{outputs:[{dims:i,dataType:g[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:d}},getShaderSource:f}},ff=(e,t)=>{Jl(e.inputs),e.compute(sd(e.inputs,t))},mf=e=>_e({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ne,od,gf,ua,ud,gr,yf,_f=L(()=>{J(),oe(),Se(),pn(),fn(),ue(),xt(),Ne=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,od=(e,t)=>{let r=e[0],a=Ne(e,1),n=Ne(e,2),i=Ne(e,3),o=Ne(e,4),l=Ne(e,5),p=Ne(e,6),d=Ne(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],g=r.dims[1],y=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=g,w=0,b=0,S=Math.floor(y/t.numHeads);if(p&&d&&O.size(p.dims)&&O.size(d.dims)){if(p.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=p.dims[2],b=p.dims[2]}else if(p&&O.size(p.dims)||d&&O.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(a&&O.size(a.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(a.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=a.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(i&&O.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(a&&a.dims.length===5&&a.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=w+_,I=0;if(o&&O.size(o.dims)>0){I=8;let z=o.dims;throw z.length===1?z[0]===f?I=1:z[0]===3*f+2&&(I=3):z.length===2&&z[0]===f&&z[1]===$&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,T=y;if(n&&O.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(_!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');T=n.dims[2]}else{if(_!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');T=n.dims[1]*n.dims[3],k=!0}}let E=!1;if(o&&O.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(l&&O.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[2]!==g||l.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:g,pastSequenceLength:w,kvSequenceLength:_,totalSequenceLength:$,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:y,vHiddenSize:T,headSize:S,vHeadSize:Math.floor(T/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:I,scale:t.scale,broadcastResPosBias:E,passPastInKv:k,qkvFormat:v}},gf=e=>_e({...e}),ua=_e({perm:[0,2,1,3]}),ud=(e,t,r,a,n,i,o)=>{let l=[a,n,i],p=O.size(l),d=[{type:12,data:p},{type:12,data:o},{type:12,data:i}],f=g=>{let y=j("qkv_with_bias",t.dataType,l),_=M("qkv",t.dataType,l),w=M("bias",r.dataType,l),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${g.registerUniforms(b).declareVariables(_,w,y)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:d}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},gr=(e,t,r,a,n,i,o,l)=>{let p=i;if(o&&O.size(o.dims)>0){if(a===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return p=ud(e,i,o,t,a,r*n,l),p=p.reshape([t,a,r,n]),r===1||a===1?p:e.compute(qe(p,ua.perm),{inputs:[p],outputs:[-1]})[0]}else return i.dims.length===3&&(p=i.reshape([t,a,r,n])),r===1||a===1?p:e.compute(qe(p,ua.perm),{inputs:[p],outputs:[-1]})[0]},yf=(e,t)=>{let r=od(e.inputs,t),a=e.inputs[0],n=Ne(e.inputs,1),i=Ne(e.inputs,2),o=Ne(e.inputs,3),l=Ne(e.inputs,4),p=Ne(e.inputs,5),d=Ne(e.inputs,6),f=Ne(e.inputs,7);if(a.dims.length===5)throw new Error("Packed QKV is not implemented");if((n==null?void 0:n.dims.length)===5)throw new Error("Packed KV is not implemented");let g=n&&i&&n.dims.length===4&&i.dims.length===4,y=gr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,a,o,0);if(g)return $r(e,y,n,i,l,void 0,d,f,p,r);if(!n||!i)throw new Error("key and value must be provided");let _=gr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,o,r.hiddenSize),w=gr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,o,2*r.hiddenSize);$r(e,y,_,w,l,void 0,d,f,p,r)}}),ld,dd,pd,cd,Ga,wf,bf,$f=L(()=>{J(),oe(),Se(),ue(),ld=e=>{if(!e||e.length<1)throw new Error("too few inputs")},dd=(e,t)=>{let r=[],a=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),a=r.length),_e({numOutputs:a,axis:t.axis,splitSizes:r})},pd=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,cd=e=>{let t=e.length,r=[];for(let a=0;a<t;++a){let n=e[a].setByIndices("indices","input[global_idx]");t===1?r.push(n):a===0?r.push(`if (output_number == ${a}u) { ${n} }`):a===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${a}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Ga=(e,t)=>{let r=e[0].dims,a=O.size(r),n=e[0].dataType,i=O.normalizeAxis(t.axis,r.length),o=new Array(t.numOutputs),l=M("input",n,r.length),p=new Array(t.numOutputs),d=[],f=[],g=0,y=[{type:12,data:a}];for(let w=0;w<t.numOutputs;w++){g+=t.splitSizes[w],p[w]=g;let b=r.slice();b[i]=t.splitSizes[w],f.push(b),o[w]=j(`output${w}`,n,b.length),d.push({dims:f[w],dataType:e[0].dataType})}y.push({type:12,data:p},...Q(r,...f));let _=w=>`
  ${w.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",p.length).declareVariables(l,...o)}
  ${pd(p.length)}
  ${cd(o)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",p.length)};
      ${l.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:y})}},wf=(e,t)=>{ld(e.inputs);let r=e.inputs.length===1?t:dd(e.inputs,t);e.compute(Ga(e.inputs,r),{inputs:[0]})},bf=e=>{let t=e.axis,r=e.splitSizes,a=e.numOutputs<0?r.length:e.numOutputs;if(a!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return _e({axis:t,numOutputs:a,splitSizes:r})}}),hd,fd,la,vf,G0=L(()=>{Se(),fn(),_f(),$f(),xt(),hd=(e,t)=>{if(t.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],a=e[1],n=e[2],i=e[3],o=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,p=r.dims[0],d=r.dims[1],f=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],g=d,y=0,_=!a||a.dims.length===0,w=Math.floor(_?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);_&&(f=w*t.numHeads);let b=i&&i.dims.length!==0,S=o&&o.dims.length!==0;if(b&&i.dims.length===4&&i.dims[0]===p&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===w)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=i.dims[2]}else if(b||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(a&&a.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(r.dims[2]%a.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');g=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');g=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=a.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let $=0,I=!1,k=t.kvNumHeads?w*t.kvNumHeads:f;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(g!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=n.dims[2]}else{if(g!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=n.dims[1]*n.dims[3],I=!0}}let T=e.length>4?e[5]:void 0;if(T&&T.dims.length!==1&&T.dims[0]!==p)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:p,sequenceLength:d,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:k,headSize:w,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:v}},fd=_e({perm:[0,2,1,3]}),la=(e,t,r)=>{let a=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(a=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),a=e.compute(qe(a,fd.perm),{inputs:[a],outputs:[-1]})[0]),a},vf=(e,t)=>{var S;let r=hd(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((S=e.inputs[1])==null?void 0:S.dims.length)===5)throw new Error("Packed KV is not implemented");let a=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,l=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,p=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,g=_e({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[y,_,w]=!n&&!i?e.compute(Ga([a],g),{inputs:[a],outputs:[-1,-1,-1]}):[a,n,i],b=gr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,y,void 0,0);$r(e,b,la(e,_,r),la(e,w,r),void 0,void 0,o,l,void 0,r,p,d)}}),da,md,gd,xf,F0=L(()=>{J(),oe(),xt(),ue(),da=(e,t,r,a,n,i,o,l)=>{let p=xe(i),d=p===1?"f32":`vec${p}f`,f=p===1?"vec2f":`mat2x${p}f`,g=n*o,y=64;g===1&&(y=256);let _=[n,o,i/p],w=[n,o,2],b=["rank","type","type"],S=[];S.push(...Q(_,w));let v=$=>{let I=M("x",t.dataType,3,p),k=M("scale",r.dataType,r.dims),T=M("bias",a.dataType,a.dims),E=j("output",1,3,2),z=[I,k,T,E];return`
  var<workgroup> workgroup_shared : array<${f}, ${y}>;
  const workgroup_size = ${y}u;
  ${$.declareVariables(...z)}
  ${$.mainStart(y)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${vt("workgroup_shared[0][0]",p)} / f32(hight * ${p});
      let squared_sum_final = ${vt("workgroup_shared[0][1]",p)} / f32(hight * ${p});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${p};${l};${y}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:g},programUniforms:S}),getShaderSource:v},{inputs:[t,r,a],outputs:[-1]})[0]},md=(e,t,r)=>{let a=t[0].dims,n=a,i=2,o=a[0],l=a[1],p=O.sizeFromDimension(a,i),d=xe(p),f=O.size(n)/d,g=da(e,t[0],t[1],t[2],o,p,l,r.epsilon),y=[o,l,p/d],_=[o,l],w=["type","none"],b=S=>{let v=M("x",t[0].dataType,y.length,d),$=M("scale_shift",1,_.length,2),I=j("output",t[0].dataType,y.length,d),k=[v,$,I];return`
  ${S.registerUniform("output_size","u32").declareVariables(...k)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...Q(y,_,y)]}),getShaderSource:b},{inputs:[t[0],g]})},gd=(e,t,r)=>{let a=t[0].dims,n=a,i=a[0],o=a[a.length-1],l=O.sizeFromDimension(a,1)/o,p=xe(o),d=O.size(n)/p,f=[{type:12,data:l},{type:12,data:Math.floor(o/p)}],g=["type","type"],y=!1,_=[0,a.length-1];for(let v=0;v<a.length-2;v++)y=y||a[v+1]!==1,_.push(v+1);y=y&&a[a.length-1]!==1;let w=y?e.compute(qe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:a.length},(v,$)=>a[_[$]])),b=da(e,w,t[1],t[2],i,l,o,r.epsilon),S=v=>{let $=Ae(t[0].dataType),I=p===1?"vec2f":`mat${p}x2f`,k=z=>{let B=z===0?"x":"y",W=p===1?"f32":`vec${p}f`;switch(p){case 1:return`${$}(${W}(scale.${B}))`;case 2:return`vec2<${$}>(${W}(scale[0].${B}, scale[1].${B}))`;case 4:return`vec4<${$}>(${W}(scale[0].${B}, scale[1].${B}, scale[2].${B}, scale[3].${B}))`;default:throw new Error(`Not supported compoents ${p}`)}},T=M("input",t[0].dataType,t[0].dims,p),E=j("output",t[0].dataType,n,p);return`
  @group(0) @binding(0) var<storage, read> input : array<${T.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${p}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:S},{inputs:[t[0],b]})},xf=(e,t)=>{t.format==="NHWC"?gd(e,e.inputs,t):md(e,e.inputs,t)}}),yd,_d,Sf,H0=L(()=>{J(),oe(),ue(),yd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},_d=(e,t,r)=>{let a=t.simplified,n=e[0].dims,i=e[1],o=!a&&e[2],l=n,p=O.normalizeAxis(t.axis,n.length),d=O.sizeToDimension(n,p),f=O.sizeFromDimension(n,p),g=O.size(i.dims),y=o?O.size(o.dims):0;if(g!==f||o&&y!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${g} and bias size of ${y}`);let _=[];for(let T=0;T<n.length;++T)T<p?_.push(n[T]):_.push(1);let w=xe(f),b=["type","type"],S=[{type:12,data:d},{type:1,data:f},{type:12,data:Math.floor(f/w)},{type:1,data:t.epsilon}];o&&b.push("type");let v=r>1,$=r>2,I=T=>{let E=Ae(e[0].dataType),z=[M("x",e[0].dataType,e[0].dims,w),M("scale",i.dataType,i.dims,w)];o&&z.push(M("bias",o.dataType,o.dims,w)),z.push(j("output",e[0].dataType,l,w)),v&&z.push(j("mean_data_output",1,_)),$&&z.push(j("inv_std_output",1,_));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${T.registerUniforms(B).declareVariables(...z)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ma("f32",w)};
    var mean_square_vector = ${Ma("f32",w)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ht(E,w,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${vt("mean_vector",w)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${vt("mean_square_vector",w)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ht(E,w,"x[j + offset]")};
      let f32scale = ${Ht(E,w,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${Ht(E,w,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:l,dataType:e[0].dataType}];return v&&k.push({dims:_,dataType:1}),$&&k.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${w};${r};${a}`,inputDependencies:b},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:S}),getShaderSource:I}},Sf=(e,t)=>{yd(e.inputs),e.compute(_d(e.inputs,t,e.outputCount))}}),wd,kf,j0=L(()=>{oe(),wn(),bn(),wd=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},kf=e=>{wd(e.inputs);let t=Kt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&a<8)e.compute(_n(e.inputs,{activation:""},t));else{let n=t[t.length-2],i=O.size(e.inputs[0].dims.slice(0,-2)),o=O.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&n===1&&o===1){let l=e.inputs[0].reshape([1,i,a]),p=e.inputs[1].reshape([1,a,r]),d=[1,i,r],f=[l,p];e.compute(oi(f,{activation:""},t,d),{inputs:f})}else e.compute(oi(e.inputs,{activation:""},t))}}}),bd,$d,vd,If,Tf,K0=L(()=>{J(),oe(),Se(),ue(),bd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],a=r.dims.length;if(r.dims[a-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,o=e[1];if(!O.areEqual(o.dims,[t.n,n,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(O.size(l)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let p=e[3].dims,d=t.bits>4?t.n*n:t.n*Math.floor((n+1)/2);if(O.size(p)!==d)throw new Error("zeroPoints input size error.")}},$d=(e,t)=>{let r=e[0].dims,a=r.length,n=r[a-2],i=t.k,o=t.n,l=r.slice(0,a-2),p=O.size(l),d=e[1].dims[2]/4,f=e[0].dataType,g=xe(t.k),y=xe(d),_=xe(o),w=l.concat([n,o]),b=n>1&&o/_%2===0?2:1,S=O.size(w)/_/b,v=64,$=[],I=[p,n,i/g],k=O.convertShape(e[1].dims).slice();k.splice(-1,1,d/y),$.push(...Q(I)),$.push(...Q(k)),$.push(...Q(e[2].dims)),e.length===4&&$.push(...Q(O.convertShape(e[3].dims)));let T=[p,n,o/_];$.push(...Q(T));let E=z=>{let B=I.length,W=M("a",e[0].dataType,B,g),G=M("b",12,k.length,y),ee=M("scales",e[2].dataType,e[2].dims.length),ae=[W,G,ee],Z=e.length===4?M("zero_points",12,e[3].dims.length):void 0;Z&&ae.push(Z);let te=T.length,Y=j("output",e[0].dataType,te,_),V=Ae(e[0].dataType),de=(()=>{switch(g){case 1:return`array<${V}, 8>`;case 2:return`mat4x2<${V}>`;case 4:return`mat2x4<${V}>`;default:throw new Error(`${g}-component is not supported.`)}})(),me=()=>{let N=`
          // reuse a data
            var input_offset = ${W.indicesToOffset(`${W.type.indices}(batch, row, word_offset)`)};
            var a_data: ${de};
            for (var j: u32 = 0; j < ${8/g}; j++) {
              a_data[j] = ${W.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let q=0;q<_*b;q++)N+=`
            b_value = ${y===1?`b${q}_data`:`b${q}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${de}(${Array.from({length:4},(le,$e)=>`${V}(b_value_lower[${$e}]), ${V}(b_value_upper[${$e}])`).join(", ")});
            b_dequantized_values = ${g===1?`${de}(${Array.from({length:8},(le,$e)=>`(b_quantized_values[${$e}] - ${Z?`zero_point${q}`:"zero_point"}) * scale${q}`).join(", ")});`:`(b_quantized_values - ${de}(${Array(8).fill(`${Z?`zero_point${q}`:"zero_point"}`).join(",")})) * scale${q};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(q/_)}]${_>1?`[${q%_}]`:""} += ${Array.from({length:8/g},(le,$e)=>`${g===1?`a_data[${$e}] * b_dequantized_values[${$e}]`:`dot(a_data[${$e}], b_dequantized_values[${$e}])`}`).join(" + ")};
          `;return N},H=()=>{let N=`
            var col_index = col * ${_};
            ${Z?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${V}(8);`}
            `;for(let q=0;q<_*b;q++)N+=`
            let scale${q} = ${ee.getByOffset("col_index * nBlocksPerCol + block")};
            ${Z?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${q} = ${V}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return N},ge=()=>{let N=`col_index = col * ${_};`;for(let q=0;q<_*b;q++)N+=`
            let b${q}_data = ${G.getByIndices(`${G.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return N+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${de};
            var b_dequantized_values: ${de};`,N};return`
        var<workgroup> workgroup_shared: array<${Y.type.value}, ${b*v}>;
        ${z.declareVariables(...ae,Y)}
        ${z.mainStart([v,1,1])}
          let output_indices = ${Y.offsetToIndices(`(global_idx / ${v}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/g};
            ${H()}
            for (var word: u32 = 0; word < ${d}; word += ${y}) {
              ${ge()}
              for (var i: u32 = 0; i < ${y}; i++) {
                ${me()}
                word_offset += ${8/g};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${g};${y};${_};${b};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:f}],dispatchGroup:{x:S},programUniforms:$}),getShaderSource:E}},vd=(e,t)=>{let r=e[0].dims,a=r.length,n=r[a-2],i=t.k,o=t.n,l=r.slice(0,a-2),p=O.size(l),d=e[1].dims[2]/4,f=e[0].dataType,g=xe(t.k),y=xe(d),_=l.concat([n,o]),w=128,b=o%8===0?8:o%4===0?4:1,S=w/b,v=S*y*8,$=v/g,I=v/t.blockSize,k=O.size(_)/b,T=[],E=[p,n,i/g],z=O.convertShape(e[1].dims).slice();z.splice(-1,1,d/y),T.push(...Q(E)),T.push(...Q(z)),T.push(...Q(e[2].dims)),e.length===4&&T.push(...Q(O.convertShape(e[3].dims)));let B=[p,n,o];T.push(...Q(B));let W=G=>{let ee=E.length,ae=M("a",e[0].dataType,ee,g),Z=M("b",12,z.length,y),te=M("scales",e[2].dataType,e[2].dims.length),Y=[ae,Z,te],V=e.length===4?M("zero_points",12,e[3].dims.length):void 0;V&&Y.push(V);let de=B.length,me=j("output",e[0].dataType,de),H=Ae(e[0].dataType),ge=()=>{switch(g){case 1:return`
          let a_data0 = vec4<${H}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${H}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${H}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${H}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${g}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ae.type.value}, ${$}>;
        var<workgroup> inter_results: array<array<${me.type.value}, ${S}>, ${b}>;
        ${G.declareVariables(...Y,me)}
        ${G.mainStart([S,b,1])}
          let output_indices = ${me.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${$};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${$}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ae.getByIndices(`${ae.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ae.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${V?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${V.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${H}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${H}(8);`}
            let scale = ${te.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Z.getByIndices(`${Z.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/g};
            for (var i: u32 = 0; i < ${y}; i++) {
              ${ge()}
              let b_value = ${y===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${H}>(${Array.from({length:4},(N,q)=>`${H}(b_value_lower[${q}]), ${H}(b_value_upper[${q}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${H}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(N,q)=>`${`dot(a_data${q}, b_dequantized_values[${q}])`}`).join(" + ")};
              word_offset += ${8/g};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${me.type.value} = ${me.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${me.setByIndices(`${me.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${g};${y};${S};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x:k},programUniforms:T}),getShaderSource:W}},If=(e,t)=>{bd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(vd(e.inputs,t)):e.compute($d(e.inputs,t))},Tf=e=>_e(e)}),xd,Sd,kd,Id,Td,Cd,Ed,zd,Cf,Q0=L(()=>{J(),oe(),ue(),xd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Sd=(e,t,r)=>{let a="";for(let n=t-1;n>=0;--n)a+=`
            k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `},kd=(e,t,r)=>{let a="";for(let n=t-1;n>=0;--n)a+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Id=(e,t,r)=>{let a="";for(let n=t-1;n>=0;--n)a+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",n,t)})) {
                  k = i32(${K("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Td=(e,t,r)=>{let a="";for(let n=t-1;n>=0;--n)a+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",n,t)})) {
                  k -= i32(${K("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Cd=(e,t,r)=>{switch(r.mode){case 0:return Sd(e,t,r.pads.length);case 1:return kd(e,t,r.pads.length);case 2:return Id(e,t,r.pads.length);case 3:return Td(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Ed=(e,t)=>{let r=O.padShape(e[0].dims.slice(),t.pads),a=e[0].dims,n=O.size(r),i=[{type:12,data:n},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&i.push({type:o?e[2].dataType:1,data:t.value}),i.push(...Q(e[0].dims,r));let l=["rank"],p=d=>{let f=j("output",e[0].dataType,r.length),g=M("x",e[0].dataType,a.length),y=g.type.value,_=Cd(f,a.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:o?y:"f32"}),`
            ${d.registerUniforms(w).declareVariables(g,f)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${y}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(r)/64)},programUniforms:i}),getShaderSource:p}},zd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),a=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,i=new Int32Array(2*n).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let p=0;p<l.length;p++)i[Number(l[p])]=Number(r[p]),i[Number(l[p])+n]=Number(r[p+l.length])}else r.forEach((l,p)=>i[Number(p)]=Number(l));let o=[];return i.forEach(l=>o.push(l)),{mode:t.mode,value:a,pads:o}}else return t},Cf=(e,t)=>{xd(e.inputs);let r=zd(e.inputs,t);e.compute(Ed(e.inputs,r),{inputs:[0]})}}),lr,pa,ca,ha,fa,Ad,Od,ma,ga,Ef,zf,ya,Af,Of,_a,Rf,Bf,Mf,Nf,Z0=L(()=>{rt(),J(),oe(),ue(),lr=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},pa=(e,t,r)=>{let a=t.format==="NHWC",n=e.dims.slice();a&&n.splice(1,0,n.pop());let i=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),l=t.strides.slice(),p=i?t.dilations.slice():[],d=t.pads.slice();ni.adjustPoolAttributes(r,n,o,l,p,d);let f=ni.computePoolOutputShape(r,n,l,p,o,d,t.autoPad),g=Object.assign({},t);i?Object.assign(g,{kernelShape:o,strides:l,pads:d,dilations:p,cacheKey:t.cacheKey}):Object.assign(g,{kernelShape:o,strides:l,pads:d,cacheKey:t.cacheKey});let y=f.slice();return y.push(y.splice(1,1)[0]),[g,a?y:f]},ca=(e,t)=>{let r=t.format==="NHWC",a=O.size(e),n=O.size(t.kernelShape),i=[{type:12,data:a},{type:12,data:n}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],p=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],g=!!(d+f);i.push({type:12,data:l},{type:12,data:p},{type:12,data:d},{type:12,data:f}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let y=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],w=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];y=!!(b+S),i.push({type:12,data:_},{type:12,data:w},{type:12,data:b},{type:12,data:S}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,o,!0,g,y]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=O.computeStrides(t.kernelShape);i.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let p=t.pads.reduce((d,f)=>d+f);return[i,o,!!p,!1,!1]}},ha=(e,t,r,a,n,i,o,l,p,d,f,g)=>{let y=n.format==="NHWC",_=t.type.value,w=j("output",t.type.tensor,a);if(n.kernelShape.length<=2){let b="",S="",v="",$=r-(y?2:1);if(f?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,n.kernelShape.length===2){let I=r-(y?3:2);g?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(p).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var value = ${_}(${l});
              var pad = 0;
              ${S}
              ${b}
              ${v}
              ${o}

              output[global_idx] = value;
            }`}else{if(y)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=n.kernelShape.length,S=n.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(p).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${_}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${K("uniforms.pads","j - 2u",S)};
                  ${v}
              }
              ${o}

              output[global_idx] = value;
            }`}},fa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Ad=e=>`${fa(e)};${e.countIncludePad}`,Od=e=>`${fa(e)};${e.storageOrder};${e.dilations}`,ma=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ga=(e,t,r,a)=>{let[n,i]=pa(t,a,r),o=M("x",t.dataType,t.dims.length),l=o.type.value,p="value += x_val;",d="";n.countIncludePad?d+=`value /= ${l}(uniforms.kernelSize);`:d+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[f,g,y,_,w]=ca(i,n);f.push(...Q(t.dims,i));let b=["rank"];return{name:e,shaderCache:{hint:`${a.cacheKey};${y};${_};${w}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:f}),getShaderSource:S=>ha(S,o,t.dims.length,i.length,n,p,d,0,g,y,_,w)}},Ef=e=>{let t=e.count_include_pad!==0,r=ma(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let a={countIncludePad:t,...r,cacheKey:""};return{...a,cacheKey:Ad(a)}},zf=(e,t)=>{lr(e.inputs),e.compute(ga("AveragePool",e.inputs[0],!1,t))},ya={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Af=e=>{let t=e.format;return{format:t,...ya,cacheKey:t}},Of=(e,t)=>{lr(e.inputs),e.compute(ga("GlobalAveragePool",e.inputs[0],!0,t))},_a=(e,t,r,a)=>{let[n,i]=pa(t,a,r),o=`
      value = max(x_val, value);
    `,l="",p=M("x",t.dataType,t.dims.length),d=["rank"],[f,g,y,_,w]=ca(i,n);return f.push(...Q(t.dims,i)),{name:e,shaderCache:{hint:`${a.cacheKey};${y};${_};${w}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:f}),getShaderSource:b=>ha(b,p,t.dims.length,i.length,n,o,l,t.dataType===10?-65504:-1e5,g,y,_,w)}},Rf=(e,t)=>{lr(e.inputs),e.compute(_a("MaxPool",e.inputs[0],!1,t))},Bf=e=>{let t=e.storage_order,r=e.dilations,a=ma(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(a.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...a,cacheKey:""};return{...n,cacheKey:Od(n)}},Mf=e=>{let t=e.format;return{format:t,...ya,cacheKey:t}},Nf=(e,t)=>{lr(e.inputs),e.compute(_a("GlobalMaxPool",e.inputs[0],!0,t))}}),Rd,Bd,Df,Pf,X0=L(()=>{J(),oe(),Se(),ue(),Rd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,a)=>r===e[2].dims[a]).reduce((r,a)=>r&&a,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,i)=>i===t.axis||n===e[0].dims[i]).reduce((n,i)=>n&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],a=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/a)||t.blockSize>Math.ceil(r/(a-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Bd=(e,t)=>{let r=O.normalizeAxis(t.axis,e[0].dims.length),a=e[0].dataType,n=a===3,i=e[0].dims,o=e[1].dataType,l=O.size(i),p=a===3||a===2,d=p?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,g=e.length>2?e[2]:void 0,y=g?p?[Math.ceil(O.size(g.dims)/4)]:g.dims:void 0,_=f.length===0||f.length===1&&f[0]===1,w=_===!1&&f.length===1,b=xe(l),S=_&&(!p||b===4),v=S?b:1,$=S&&!p?b:1,I=M("input",p?12:a,d.length,$),k=M("scale",o,f.length),T=g?M("zero_point",p?12:a,y.length):void 0,E=j("output",o,i.length,v),z=[I,k];T&&z.push(T);let B=[d,f];g&&B.push(y);let W=[{type:12,data:l/v},{type:12,data:r},{type:12,data:t.blockSize},...Q(...B,i)],G=ee=>{let ae=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${ee.registerUniforms(ae).declareVariables(...z,E)}
      ${ee.mainStart()}
          ${ee.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${k.getByOffset("0")}`:w?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${T?_?p?`
                let zero_point_input = ${T.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${T.getByOffset("0")}`:w?p?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${T.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${T.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${T.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${T.getByIndices("scale_indices")};`:`let zero_point_value = ${p?n?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:T?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:Math.ceil(l/v/64),y:1,z:1},programUniforms:W})}},Df=(e,t)=>{Rd(e.inputs,t),e.compute(Bd(e.inputs,t))},Pf=e=>_e({axis:e.axis,blockSize:e.blockSize})}),Md,Nd,Uf,Y0=L(()=>{rt(),J(),ue(),Md=(e,t,r)=>{let a=e===t,n=e<t&&r<0,i=e>t&&r>0;if(a||n||i)throw new Error("Range these inputs' contents are invalid.")},Nd=(e,t,r,a)=>{let n=Math.abs(Math.ceil((t-e)/r)),i=[n],o=n,l=[{type:12,data:o},{type:a,data:e},{type:a,data:r},...Q(i)],p=d=>{let f=j("output",a,i.length),g=f.type.value,y=[{name:"outputSize",type:"u32"},{name:"start",type:g},{name:"delta",type:g}];return`
        ${d.registerUniforms(y).declareVariables(f)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${g}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l})}},Uf=e=>{let t=0,r=0,a=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],a=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],a=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&Md(t,r,a),e.compute(Nd(t,r,a,e.inputs[0].dataType),{inputs:[]})}}),Dd,Pd,Wf,Lf,J0=L(()=>{J(),oe(),Se(),ue(),Dd=(e,t,r,a)=>{if(e!=="none"&&a!=="i32"&&a!=="u32"&&a!=="f32")throw new Error(`Input ${a} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return a==="i32"||a==="u32"?`atomicAdd(&${t}, bitcast<${a}>(${r}));`:`
              ${n}bitcast<${a}>(oldValue) + (${r})${i}`;case"max":return a==="i32"||a==="u32"?`atomicMax(&${t}, bitcast<${a}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return a==="i32"||a==="u32"?`atomicMin(&${t}, bitcast<${a}>(${r}));`:`${n}min(bitcast<${a}>(oldValue), (${r}))${i}`;case"mul":return`${n}(bitcast<${a}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Pd=(e,t)=>{let r=e[0].dims,a=e[1].dims,n=r,i=1,o=Math.ceil(O.size(a)/i),l=a[a.length-1],p=O.sizeFromDimension(r,l),d=[{type:12,data:o},{type:12,data:l},{type:12,data:p},...Q(e[1].dims,e[2].dims,n)],f=g=>{let y=M("indices",e[1].dataType,e[1].dims.length),_=M("updates",e[2].dataType,e[2].dims.length,i),w=t.reduction!=="none"&&t.reduction!==""?gc("output",e[0].dataType,n.length):j("output",e[0].dataType,n.length,i);return`
      ${g.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(y,_,w)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${O.size(a)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Dd(t.reduction,"output[data_offset + i]","value",w.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:f}},Wf=e=>_e({reduction:e.reduction}),Lf=(e,t)=>{e.compute(Pd(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Ud,Wd,Ld,wa,qd,Vd,Gd,Fd,Hd,jd,Kd,Qd,ba,Zd,Xd,Yd,Jd,ep,qf,Vf,e_=L(()=>{J(),oe(),Se(),ue(),Ud=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Wd=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let a=new Array(r).fill(1);return t.forEach((n,i)=>a[n]=e[i]),a},Ld=(e,t,r,a,n,i)=>{let[o,l,p]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(f=>i.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0){if(e[l].getFloat32Array().forEach(f=>a.push(f)),a.length!==0&&a.length!==d&&r>=18&&a.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Ud(a,t),t.axes.length>0&&Wd(a,t.axes,d).forEach((f,g)=>a[g]=f)}if(p>0&&e.length>p&&e[p].dims.length===1&&e[p].dims[0]>0&&(e[p].getBigInt64Array().forEach(f=>n.push(Number(f))),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof a<"u"&&typeof n<"u"&&a.length>0&&n.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},wa=(e,t,r,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${a}(big / (${r}));
  let fract = ${a}(big % (${r})) / ${a}(${r});
  return whole + fract;
`,qd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${wa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${wa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Vd=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Gd=(e,t,r)=>{let a=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?a:e.slice();return t.length>0?(t.forEach((i,o)=>{a[i]=n[o],a[o+r]=n[t.length+o]}),a):n},Fd=(e,t,r,a)=>{let n=[];if(r.length>0)if(a.length>0){if(e.forEach(i=>n.push(i)),Math.max(...a)>e.length)throw new Error("axes is out of bound");a.forEach((i,o)=>n[i]=r[o])}else r.forEach(i=>n.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((i,o)=>Math.round(i*t[o]))}return n},Hd=(e,t,r)=>{let a=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=a),r.axes.forEach(i=>n[i]=Math.round(e[i]*t[i]))):(t.fill(a,0,t.length),n.forEach((i,o)=>n[o]=Math.round(i*t[o]))),n},jd=(e,t,r,a,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",a)};
        var roi_low = ${K("uniforms.roi","i",n)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Kd=(e,t,r,a,n,i,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${a.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",i)};
          var roi_hi = ${K("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${K("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",a.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Qd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ba=(e,t,r,a)=>e.rank>a?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Zd=(e,t,r,a,n)=>{let[i,o,l,p]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${ba(e,p,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${o}];
      var col:${d} = originalIndices[${l}];
      ${a?`if (row < 0 || row > (${r[o]} - 1) || col < 0 || col > (${r[l]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[o]} - 1));
      col = max(0, min(col, ${r[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${i}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Xd=(e,t,r,a,n,i,o,l,p,d)=>{let f=r.length===2,[g,y]=f?[0,1]:[2,3],_=e.type.value,w=b=>{let S=b===g?"row":"col";return`
      fn ${S}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${_} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${_} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[b]},
        ${a[b]}, ${r[b]}, ${i[b]}, ${i[b]} + ${r.length});
        var fractOriginalIdx: ${_} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${p};
        }
        var data: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${S}: ${_} = originalIdx + ${_}(i);
          if (${S} < 0 || ${S} >= ${r[b]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${p};`:`${S} = max(0, min(${S}, ${r[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${S})`)};
          data[i + 1] = ${b===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(g)};
    ${w(y)};
  fn getCubicInterpolationCoefs(s: ${_}) -> array<${_}, 4> {
    var absS = abs(s);
    var coeffs: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${_} = 1.0 - absS;
    var twoMinusAbsS: ${_} = 2.0 - absS;
    var onePlusAbsS: ${_} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${_}, 4>, coefs: array<${_}, 4>) -> ${_} {
    var coefsSum: ${_} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${_} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Yd=(e,t,r,a,n)=>{let[i,o,l,p,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${r[p]} - 1))`)};
      ${ba(e,d,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${o}];
      var height:${f} = originalIndices[${l}];
      var width:${f} = originalIndices[${p}];
      ${a?`if (depth < 0 || depth > (${r[o]} - 1) || height < 0 || height > (${r[l]} - 1) || width < 0 || (width > ${r[p]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[o]} - 1));
      height = max(0, min(height, ${r[l]} - 1));
      width = max(0, min(width, ${r[p]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${i}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Jd=(e,t,r,a,n,i)=>{let o=e.dims,l=Gd(i,t.axes,o.length),p=Fd(o,a,n,t.axes),d=a.slice();a.length===0&&(d=o.map(($,I)=>$===0?1:p[I]/$),t.keepAspectRatioPolicy!=="stretch"&&(p=Hd(o,d,t)));let f=j("output",e.dataType,p.length),g=M("input",e.dataType,o.length),y=O.size(p),_=o.length===p.length&&o.every(($,I)=>$===p[I]),w=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,S=g.type.value,v=$=>`
      ${_?"":`
      ${qd(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Qd(g,o)};
              ${Vd(t.nearestMode,r,S)};
              ${Kd(g,f,o,p,d.length,l.length,w)};
              `;case"linear":return`
              ${jd(f,o,p,d.length,l.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${Zd(g,f,o,w,b)}`;if(o.length===3||o.length===5)return`${Yd(g,f,o,w,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${Xd(g,f,o,p,d,l,t.cubicCoeffA,w,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",l.length).declareVariables(g,f)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${g.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${g.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${n.length>0?n:""}|${l.length>0?l:""}|${_}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:p,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},{type:1,data:d},{type:1,data:l},...Q(o,p)]})}},ep=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},qf=(e,t)=>{let r=[],a=[],n=[],i=ep(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Ld(e.inputs,t,i,r,a,n),e.compute(Jd(e.inputs[0],t,i,r,a,n),{inputs:[0]})},Vf=e=>{let t=e.antialias,r=e.axes,a=e.coordinateTransformMode,n=e.cubicCoeffA,i=e.excludeOutside!==0,o=e.extrapolationValue,l=e.keepAspectRatioPolicy,p=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return _e({antialias:t,axes:r,coordinateTransformMode:a,cubicCoeffA:n,excludeOutside:i,extrapolationValue:o,keepAspectRatioPolicy:l,mode:p,nearestMode:d})}}),tp,rp,Gf,t_=L(()=>{J(),oe(),Se(),ue(),tp=(e,t)=>{let[r,a,n,i]=e,{numHeads:o,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!O.areEqual(a.dims,[])&&!O.areEqual(a.dims,[1])&&a.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!O.areEqual(n.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let p=r.dims[0],d=r.dims[r.dims.length-2],f=n.dims[0],g=O.sizeFromDimension(r.dims,1)/d,y=l===0?n.dims[1]*2:g/o;if(l>y)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(a.dims.length===2){if(p!==a.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(d!==a.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(y/2!==n.dims[1]&&l/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},rp=(e,t)=>{let{interleaved:r,numHeads:a,rotaryEmbeddingDim:n,scale:i}=t,o=e[0].dims[0],l=O.sizeFromDimension(e[0].dims,1),p=e[0].dims[e[0].dims.length-2],d=l/p,f=e[2].dims[1],g=n===0?f*2:d/a,y=new Array(o,p,d/g,g-f),_=O.computeStrides(y),w=[{type:1,data:i},{type:12,data:y},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[l,d,g,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,g,p*g,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=S=>{let v=M("input",e[0].dataType,e[0].dims.length),$=M("position_ids",e[1].dataType,e[1].dims.length),I=M("cos_cache",e[2].dataType,e[2].dims.length),k=M("sin_cache",e[3].dataType,e[3].dims.length),T=j("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:y.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables(v,$,I,k,T)}

        ${S.mainStart(Qt)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",j("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${T.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${T.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${T.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:_e({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(y)/Qt)},programUniforms:w})}},Gf=(e,t)=>{tp(e.inputs,t),e.compute(rp(e.inputs,t))}}),ip,ap,Ff,r_=L(()=>{J(),oe(),ue(),ip=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],a=e[2];if(t.dataType!==r.dataType||t.dataType!==a.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(a.dims.length!==1)throw new Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},ap=(e,t,r,a)=>{let n=t.simplified,i=e[0].dims,o=O.size(i),l=i,p=o,d=i.slice(-1)[0],f=a?i.slice(0,-1).concat(1):[],g=!n&&e.length>3,y=e.length>4,_=a&&r>1,w=a&&r>2,b=r>3,S=64,v=xe(d),$=[{type:12,data:p},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],I=T=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[M("x",e[0].dataType,e[0].dims,v),M("skip",e[1].dataType,e[1].dims,v),M("gamma",e[2].dataType,e[2].dims,v)];g&&z.push(M("beta",e[3].dataType,e[3].dims,v)),y&&z.push(M("bias",e[4].dataType,e[4].dims,v)),z.push(j("output",e[0].dataType,l,v)),_&&z.push(j("mean_output",1,f)),w&&z.push(j("inv_std_output",1,f)),b&&z.push(j("input_skip_bias_sum",e[0].dataType,l,v));let B=Ae(e[0].dataType),W=Ae(1,v);return`

      ${T.registerUniforms(E).declareVariables(...z)}
      var<workgroup> sum_shared : array<${W}, ${S}>;
      var<workgroup> sum_squared_shared : array<${W}, ${S}>;

      ${T.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${y?"bias[offset1d + i]":B+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ht(B,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${vt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${vt("square_sum",v)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${w?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${g?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:l,dataType:e[0].dataType}];return r>1&&k.push({dims:f,dataType:1}),r>2&&k.push({dims:f,dataType:1}),r>3&&k.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${w};${b}`,inputDependencies:e.map((T,E)=>"type")},getShaderSource:I,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(p/d)},programUniforms:$})}},Ff=(e,t)=>{ip(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(ap(e.inputs,t,e.outputCount,!1),{outputs:r})}}),np,dr,sp,$a,op,up,Hf,jf,i_=L(()=>{J(),oe(),Se(),ue(),np=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,a)=>{if(e[a+1].dataType!==6&&e[a+1].dataType!==7)throw new Error(`Input ${a} must be an array of int32 or int64`)})},dr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(a=>r.push(Number(a)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(a=>r.push(Number(a)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},sp=(e,t)=>{if(e.length>1){let r=dr(e,1),a=dr(e,2),n=dr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),_e({starts:r,ends:a,axes:n})}else return t},$a=(e,t,r,a,n)=>{let i=e;return e<0&&(i+=r[a[t]]),n[t]<0?Math.max(0,Math.min(i,r[a[t]]-1)):Math.max(0,Math.min(i,r[a[t]]))},op=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",r.length)};
            let steps_i = ${K("uniforms.steps","i",r.length)};
            let signs_i = ${K("uniforms.signs","i",r.length)};
            let starts_i = ${K("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,up=(e,t)=>{let r=e[0].dims,a=O.size(r),n=t.axes.length>0?O.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=dr(e,4);i.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(n.length).fill(1));let o=t.starts.map((v,$)=>$a(v,$,r,n,i)),l=t.ends.map((v,$)=>$a(v,$,r,n,i));if(n.length!==o.length||n.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let v=0;v<r.length;++v)n.includes(v)||(o.splice(v,0,0),l.splice(v,0,r[v]),i.splice(v,0,1));let p=i.map(v=>Math.sign(v));i.forEach((v,$,I)=>{if(v<0){let k=(l[$]-o[$])/v,T=o[$],E=T+k*i[$];o[$]=E,l[$]=T,I[$]=-v}});let d=r.slice(0);n.forEach((v,$)=>{d[v]=Math.ceil((l[v]-o[v])/i[v])});let f={dims:d,dataType:e[0].dataType},g=j("output",e[0].dataType,d.length),y=M("input",e[0].dataType,e[0].dims.length),_=O.size(d),w=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:p.length},{name:"steps",type:"u32",length:i.length}],b=[{type:12,data:_},{type:12,data:o},{type:6,data:p},{type:12,data:i},...Q(e[0].dims,d)],S=v=>`
      ${v.registerUniforms(w).declareVariables(y,g)}
        ${op(y,g,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${g.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${g.setByOffset("global_idx",y.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${p.length}_${o.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:b})}},Hf=(e,t)=>{np(e.inputs,t);let r=sp(e.inputs,t);e.compute(up(e.inputs,r),{inputs:[0]})},jf=e=>{let t=e.starts,r=e.ends,a=e.axes;return _e({starts:t,ends:r,axes:a})}}),lp,dp,Kf,Qf,a_=L(()=>{J(),oe(),Se(),xt(),ue(),lp=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},dp=(e,t)=>{let r=e.inputs[0],a=r.dims,n=O.size(a),i=a.length,o=O.normalizeAxis(t.axis,i),l=o<a.length-1,p,d=[];l?(d=Array.from({length:i},(z,B)=>B),d[o]=i-1,d[i-1]=o,p=e.compute(qe(r,d),{inputs:[r],outputs:[-1]})[0]):p=r;let f=p.dims,g=f[i-1],y=n/g,_=xe(g),w=g/_,b=64;y===1&&(b=256);let S=(z,B)=>B===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:B===2?`max(${z}.x, ${z}.y)`:B===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,v=M("x",p.dataType,p.dims,_),$=j("result",p.dataType,p.dims,_),I=v.type.value,k=Ae(p.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,T=z=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables(v,$)}
      ${z.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${I}(${S("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${I}(${vt("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=e.compute({name:"Softmax",shaderCache:{hint:`${_};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:p.dataType}],dispatchGroup:{x:y},programUniforms:[{type:6,data:w}]}),getShaderSource:T},{inputs:[p],outputs:[l?-1:0]})[0];l&&e.compute(qe(E,d),{inputs:[E]})},Kf=(e,t)=>{lp(e.inputs),dp(e,t)},Qf=e=>_e({axis:e.axis})}),va,pp,cp,hp,Zf,n_=L(()=>{J(),oe(),ue(),va=e=>Array.from(e.getBigInt64Array(),Number),pp=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(va(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},cp=(e,t)=>{let r=[];for(let a=0;a<e.length;++a)r.push(e[a]*t[a]);return r},hp=(e,t)=>{let r=e[0].dims,a=t??va(e[1]),n=cp(r,a),i=O.size(n),o=e[0].dataType,l=M("input",o,r.length),p=j("output",o,n.length),d=f=>`
      const inputShape = ${l.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(l,p)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${p.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${p.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${p.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${a}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...Q(e[0].dims,n)]}),getShaderSource:d}},Zf=e=>{pp(e.inputs),e.compute(hp(e.inputs),{inputs:[0]})}}),fp,mp,Xf,s_=L(()=>{J(),oe(),ue(),fp=(e,t,r,a,n)=>{let i=j("output_data",n,r.length,4),o=M("a_data",t[1].dataType,t[1].dims.length,4),l=M("b_data",t[2].dataType,t[2].dims.length,4),p=M("c_data",t[0].dataType,t[0].dims.length,4),d,f=(g,y,_)=>`select(${y}, ${g}, ${_})`;if(!a)d=i.setByOffset("global_idx",f(o.getByOffset("global_idx"),l.getByOffset("global_idx"),p.getByOffset("global_idx")));else{let g=(y,_,w="")=>{let b=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${i.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${o.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_b${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_c${_} = ${p.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${y}[${_}] = ${w}(${f(b,S,v)});
          `};n===9?d=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${g("output_data[global_idx]",0)}
            ${g("output_data[global_idx]",1)}
            ${g("output_data[global_idx]",2)}
            ${g("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(p,o,l,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},mp=e=>{let t=e[1].dims,r=e[2].dims,a=e[0].dims,n=e[1].dataType,i=!(O.areEqual(t,r)&&O.areEqual(r,a)),o=t,l=O.size(t);if(i){let d=Kt.calcShape(Kt.calcShape(t,r,!1),a,!1);if(!d)throw new Error("Can't perform where op on the given tensors");o=d,l=O.size(o)}let p=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>fp(d,e,o,i,n),getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:p},...Q(a,t,r,o)]})}},Xf=e=>{e.compute(mp(e.inputs))}}),Yf,o_=L(()=>{b0(),fn(),$0(),v0(),x0(),S0(),k0(),z0(),O0(),R0(),B0(),M0(),N0(),D0(),P0(),U0(),W0(),L0(),q0(),V0(),G0(),F0(),H0(),j0(),K0(),_f(),Q0(),Z0(),X0(),Y0(),J0(),hn(),e_(),t_(),r_(),i_(),a_(),$f(),n_(),xt(),mn(),s_(),Yf=new Map([["Abs",[Fc]],["Acos",[Hc]],["Acosh",[jc]],["Add",[Th]],["ArgMax",[Lc,Da]],["ArgMin",[Wc,Da]],["Asin",[Kc]],["Asinh",[Qc]],["Atan",[Zc]],["Atanh",[Xc]],["Attention",[qc]],["AveragePool",[zf,Ef]],["BatchNormalization",[Vc]],["BiasAdd",[Gc]],["BiasSplitGelu",[Ih]],["Cast",[Jc,Yc]],["Ceil",[th]],["Clip",[eh]],["Concat",[Dh,Ph]],["Conv",[Va,qa]],["ConvTranspose",[Kh,jh]],["Cos",[rh]],["Cosh",[ih]],["CumSum",[Qh,Zh]],["DepthToSpace",[Xh,Yh]],["DequantizeLinear",[Df,Pf]],["Div",[Ch]],["Einsum",[Jh,ef]],["Elu",[ah,mr]],["Equal",[Eh]],["Erf",[nh]],["Exp",[sh]],["Expand",[tf]],["FastGelu",[rf]],["Floor",[oh]],["FusedConv",[Va,qa]],["Gather",[nf,af]],["GatherElements",[pf,df]],["GatherBlockQuantized",[uf,lf]],["GatherND",[sf,of]],["Gelu",[uh]],["Gemm",[hf,cf]],["GlobalAveragePool",[Of,Af]],["GlobalMaxPool",[Nf,Mf]],["Greater",[Rh]],["GreaterOrEqual",[Mh]],["GridSample",[ff,mf]],["GroupQueryAttention",[vf]],["HardSigmoid",[gh,mh]],["InstanceNormalization",[xf]],["LayerNormalization",[Sf]],["LeakyRelu",[lh,mr]],["Less",[Bh]],["LessOrEqual",[Nh]],["Log",[Sh]],["MatMul",[kf]],["MatMulNBits",[If,Tf]],["MaxPool",[Rf,Bf]],["Mul",[zh]],["MultiHeadAttention",[yf,gf]],["Neg",[ph]],["Not",[dh]],["Pad",[Cf]],["Pow",[Ah]],["QuickGelu",[kh,mr]],["Range",[Uf]],["Reciprocal",[ch]],["ReduceMin",[Mc]],["ReduceMean",[zc]],["ReduceMax",[Bc]],["ReduceSum",[Dc]],["ReduceProd",[Nc]],["ReduceL1",[Ac]],["ReduceL2",[Oc]],["ReduceLogSum",[Uc]],["ReduceLogSumExp",[Rc]],["ReduceSumSquare",[Pc]],["Relu",[hh]],["Resize",[qf,Vf]],["RotaryEmbedding",[Gf]],["ScatterND",[Lf,Wf]],["Sigmoid",[fh]],["Sin",[yh]],["Sinh",[_h]],["Slice",[Hf,jf]],["SkipLayerNormalization",[Ff]],["Split",[wf,bf]],["Sqrt",[wh]],["Softmax",[Kf,Qf]],["Sub",[Oh]],["Tan",[bh]],["Tanh",[$h]],["ThresholdedRelu",[xh,mr]],["Tile",[Zf]],["Transpose",[_c,wc]],["Where",[Xf]]])}),Jf,u_=L(()=>{rt(),pt(),ue(),Jf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,a,n){tt(e.programInfo.name);let i=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let d of t)l.push({binding:l.length,resource:{buffer:d.buffer}});for(let d of r)l.push({binding:l.length,resource:{buffer:d.buffer}});n&&l.push({binding:l.length,resource:n});let p=i.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:l,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:p,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}o.setPipeline(e.computePipeline),o.setBindGroup(0,p),o.dispatchWorkgroups(...a),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),je(e.programInfo.name)}dispose(){}build(e,t){tt(e.name);let r=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(d=>{r.features.has(d.feature)&&a.push(`enable ${d.extension};`)});let n=yc(t,this.backend.device.limits),i=e.getShaderSource(n),o=`${a.join(`
`)}
${n.additionalImplementations}
${i}`,l=r.createShaderModule({code:o,label:e.name});pe("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let p=r.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return je(e.name),{programInfo:e,computePipeline:p,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,a=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&a<=n)return[t,r,a];let i=t*r*a,o=Math.ceil(Math.sqrt(i));if(o>n){if(o=Math.ceil(Math.cbrt(i)),o>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),gp,yp,_p,wp,em,l_=L(()=>{rt(),J(),pt(),pc(),_0(),o_(),u_(),gp=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let a=0;a<e.length;++a){let n=e[a].dataType;switch(t[a]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let i=e[a].dims.length;r.push(`${n};${i}`);break}case"dims":{let i=e[a].dims.join(",");r.push(`${n};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[a]}`)}}return r.join("|")},yp=(e,t,r)=>{var n,i;let a=e.name;return(n=e.shaderCache)!=null&&n.hint&&(a+="["+e.shaderCache.hint+"]"),a+=":"+r+`:${gp(t,((i=e.shaderCache)==null?void 0:i.inputDependencies)??new Array(t.length).fill("dims"))}`,a},_p=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},wp=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let t=e.limits;!this.subgroupsSupported||!t.minSubgroupSize||!t.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[t.minSubgroupSize,t.maxSubgroupSize]}},em=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=i=>t.features.has(i)&&r.push(i)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups")&&n("subgroups-f16"),this.device=await t.requestDevice(a),this.deviceInfo=new wp(this.device),this.adapterInfo=new _p(t.info||await t.requestAdapterInfo()),this.gpuDataManager=cc(this),this.programManager=new Jf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ln(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;tt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var a;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let n=0;n<t.length/2;n++){let i=r[n],o=i.kernelId,l=this.kernels.get(o),p=l.kernelType,d=l.kernelName,f=i.programName,g=i.inputTensorViews,y=i.outputTensorViews,_=t[n*2],w=t[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let b=Number(_-this.queryTimeBase),S=Number(w-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if((a=this.env.webgpu.profiling)!=null&&a.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:g.map(v=>({dims:v.dims,dataType:Rt(v.dataType)})),outputsMetadata:y.map(v=>({dims:v.dims,dataType:Rt(v.dataType)})),kernelId:o,kernelType:p,kernelName:d,programName:f,startTime:b,endTime:S});else{let v="";g.forEach((I,k)=>{v+=`input[${k}]: [${I.dims}] | ${Rt(I.dataType)}, `});let $="";y.forEach((I,k)=>{$+=`output[${k}]: [${I.dims}] | ${Rt(I.dataType)}, `}),console.log(`[profiling] kernel "${o}|${p}|${d}|${f}" ${v}${$}execution time: ${S-b} ns`)}br("GPU",`${f}::${_}::${w}`)}e.unmap(),this.pendingQueries.delete(e)}),je()}run(e,t,r,a,n,i){tt(e.name);let o=[];for(let $=0;$<t.length;++$){let I=t[$].data;if(I===0)continue;let k=this.gpuDataManager.get(I);if(!k)throw new Error(`no GPU data for input: ${I}`);o.push(k)}let{outputs:l,dispatchGroup:p,programUniforms:d}=e.getRunData(t),f=r.length===0?l.map(($,I)=>I):r;if(f.length!==l.length)throw new Error(`Output size ${f.length} must be equal to ${l.length}.`);let g=[],y=[];for(let $=0;$<l.length;++$){if(!Number.isInteger(f[$])||f[$]<-3||f[$]>=i)throw new Error(`Invalid output index: ${f[$]}`);if(f[$]===-3)continue;let I=f[$]===-1,k=f[$]===-2,T=I||k?n(l[$].dataType,l[$].dims):a(f[$],l[$].dataType,l[$].dims);if(g.push(T),T.data===0)continue;let E=this.gpuDataManager.get(T.data);if(!E)throw new Error(`no GPU data for output: ${T.data}`);if(I&&this.temporaryData.push(E),k){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(E)}y.push(E)}if(o.length!==t.length||y.length!==g.length){if(y.length===0)return je(e.name),g;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(d){let $=0,I=[];d.forEach(z=>{let B=typeof z.data=="number"?[z.data]:z.data;if(B.length===0)return;let W=z.type===10?2:4,G,ee;z.type===10?(ee=B.length>4?16:B.length>2?8:B.length*W,G=B.length>4?16:W*B.length):(ee=B.length<=2?B.length*W:16,G=16),$=Math.ceil($/ee)*ee,I.push($);let ae=z.type===10?8:4;$+=B.length>4?Math.ceil(B.length/ae)*G:B.length*W});let k=16;$=Math.ceil($/k)*k;let T=new ArrayBuffer($);d.forEach((z,B)=>{let W=I[B],G=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(T,W,G.length).set(G);else if(z.type===12)new Uint32Array(T,W,G.length).set(G);else if(z.type===10)new Uint16Array(T,W,G.length).set(G);else if(z.type===1)new Float32Array(T,W,G.length).set(G);else throw new Error(`Unsupported uniform type: ${Rt(z.type)}`)});let E=this.gpuDataManager.create($,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(E.buffer,0,T,0,$),this.gpuDataManager.release(E.id),_={offset:0,size:$,buffer:E.buffer}}let w=this.programManager.normalizeDispatchGroupSize(p),b=w[1]===1&&w[2]===1,S=yp(e,t,b),v=this.programManager.getArtifact(S);if(v||(v=this.programManager.build(e,w),this.programManager.setArtifact(S,v),pe("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let $=0;$<d.length;$++){let I=d[$],k=I.type,T=typeof I.data=="number"?1:I.data.length,[E,z]=v.uniformVariablesInfo[$];if(k!==E||T!==z)throw new Error(`Uniform variable ${$} mismatch: expect type ${E} with size ${z}, got type ${k} with size ${T} in program "${v.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let $={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:g};this.pendingKernels.push($),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push($)}return this.programManager.run(v,o,y,w,_),je(e.name),g}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,a){let n=Yf.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let i={kernelType:e,kernelName:a,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,i)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let a=this.kernels.get(e);if(!a)throw new Error(`kernel not created: ${e}`);let n=a.kernelType,i=a.kernelName,o=a.kernelEntry,l=a.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${i}" is not allowed to be called recursively`);this.currentKernelId=e,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${n}] ${i}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),o(t,l[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${i}" failed. ${d}`)),1}finally{p&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${n}] ${i}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,a){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let i=n.get(t),o=this.gpuDataManager.registerExternalBuffer(r,a,i);return n.set(t,[o,r]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let a=await Ba(this,e,t);return dn(a.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let a=0;a<r;a++){let n=this.getComputePassEncoder(),i=e[a];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(i.computePipeline),n.setBindGroup(0,i.bindGroup),n.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),bp,xa,$p,Sa,ka,Ia,vp,tm,d_=L(()=>{pt(),bp=1,xa=()=>bp++,$p=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Sa=(e,t)=>{let r=$p.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((a,n)=>a*n)*r/8):0},ka=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Sa(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((a,n)=>a===r[n])}},Ia=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,a){let n=this.tensorManager.getMLContext(e);if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==Sa(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let i=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,i,!0,!0),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},vp=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=xa();return this.tensorTrackersById.set(e,new Ia(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,a,n){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${a}, copyOld: ${n}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(e,r,a,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,a){let n=this.getMLContext(e),i=xa(),o=new ka({sessionId:e,context:n,tensor:t,dataType:r,shape:a});return this.tensorTrackersById.set(i,new Ia(this,o)),this.externalTensors.add(o),i}async getCachedTensor(e,t,r,a,n,i){let o=this.getMLContext(e);for(let[p,d]of this.freeTensors.entries())if(d.canReuseTensor(o,t,r)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let f=this.freeTensors.splice(p,1)[0];return f.sessionId=e,f}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let l=await o.createTensor({dataType:t,shape:r,dimensions:r,usage:a,writable:n,readable:i});return new ka({sessionId:e,context:o,tensor:l,dataType:t,shape:r})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},tm=(...e)=>new vp(...e)}),Qr,xp,rm,p_=L(()=>{J(),Ut(),pc(),d_(),pt(),Qr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),xp=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),a=Object.keys(t).sort();return r.length===a.length&&r.every((n,i)=>n===a[i]&&e[n]===t[n])},rm=class{constructor(e){this.tensorManager=tm(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.temporaryGraphInputs=[],this.temporarySessionTensorIds=new Map,ln(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(a=>a.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let a=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:a}),a}}else if(e===void 0){let r=this.mlContextCache.findIndex(a=>a.options===void 0&&a.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let a=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:a}),a}}let t=this.mlContextCache.findIndex(r=>xp(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let a=this.mlContextCache.findIndex(n=>n.mlContext===t);a!==-1&&this.mlContextCache.splice(a,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,a,n){let i=Qr.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,i,a,n)}async createTemporaryTensor(e,t,r){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let a=Qr.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,a,r,!1);let i=this.temporarySessionTensorIds.get(e);return i?i.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!Ee().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return dn(r,t)}}registerMLTensor(e,t,r,a){let n=Qr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(e,t,n,a);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${a}} -> {tensorId: ${i}}`),i}registerMLConstant(e,t,r,a,n,i){if(!i)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=i.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(t,t+r).buffer,d;switch(n.dataType){case"float32":d=new Float32Array(p);break;case"float16":d=new Uint16Array(p);break;case"int32":d=new Int32Array(p);break;case"uint32":d=new Uint32Array(p);break;case"int64":d=new BigInt64Array(p);break;case"uint64":d=new BigUint64Array(p);break;case"int8":d=new Int8Array(p);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return pe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}}`),a.constant(n,d)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}flush(){}}}),im={};Ir(im,{init:()=>am});var Zr,Sp,am,c_=L(()=>{J(),l_(),pt(),oe(),p_(),Zr=class nm{constructor(t,r,a,n){this.module=t,this.dataType=r,this.data=a,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new nm(this.module,this.dataType,this.data,t)}},Sp=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceInfo=t.deviceInfo;let a=e.PTR_SIZE,n=r/e.PTR_SIZE,i=a===4?"i32":"i64";this.opKernelContext=Number(e.getValue(a*n++,i));let o=Number(e.getValue(a*n++,i));this.outputCount=Number(e.getValue(a*n++,i)),this.customDataOffset=Number(e.getValue(a*n++,"*")),this.customDataSize=Number(e.getValue(a*n++,i));let l=[];for(let p=0;p<o;p++){let d=Number(e.getValue(a*n++,i)),f=Number(e.getValue(a*n++,"*")),g=Number(e.getValue(a*n++,i)),y=[];for(let _=0;_<g;_++)y.push(Number(e.getValue(a*n++,i)));l.push(new Zr(e,d,f,y))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var o;let r=((o=t==null?void 0:t.inputs)==null?void 0:o.map(l=>typeof l=="number"?this.inputs[l]:l))??this.inputs,a=(t==null?void 0:t.outputs)??[],n=(l,p,d)=>new Zr(this.module,p,this.output(l,d),d),i=(l,p)=>{let d=Bt(l,p);if(!d)throw new Error(`Unsupported data type: ${l}`);let f=d>0?this.backend.gpuDataManager.create(d).id:0;return new Zr(this.module,l,f,p)};return this.backend.run(e,r,a,n,i,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let a=this.module.PTR_SIZE,n=a===4?"i32":"i64",i=this.module.stackAlloc((1+t.length)*a);this.module.setValue(i,t.length,n);for(let o=0;o<t.length;o++)this.module.setValue(i+a*(o+1),t[o],n);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(a){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${a}`)}finally{this.module.stackRestore(r)}}},am=async(e,t,r,a)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new em;await i.initialize(r,a),n("webgpu",[i,o=>i.alloc(Number(o)),o=>i.free(o),(o,l,p,d=!1)=>{if(d)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(p)}`),i.memcpy(Number(o),Number(l));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let f=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(p));i.upload(Number(l),f)}},async(o,l,p)=>{pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${p}`),await i.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(o,l,p)=>i.createKernel(o,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>i.releaseKernel(o),(o,l,p,d)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${o}, contextDataOffset=${l}`);let f=new Sp(t,i,Number(l));return i.computeKernel(Number(o),f,d)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new rm(r);n("webnn",[i,()=>i.reserveTensorId(),o=>i.releaseTensorId(o),async(o,l,p,d,f)=>i.ensureTensor(o,l,p,d,f),(o,l)=>{i.uploadTensor(o,l)},async(o,l)=>i.downloadTensor(o,l)])}}}),kp,$n,vn,wt,Ip,ui,xn,Sn,Ta,kn,In,Tn,sm=L(()=>{g0(),y0(),J(),Ut(),an(),dc(),kp=(e,t)=>{Ee()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},$n=async e=>{kp(e.wasm.numThreads,ai(e.logLevel))},vn=async(e,t)=>{{let r=(c_(),ri(im)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let a=e.webgpu.adapter;if(a){if(typeof a.limits!="object"||typeof a.features!="object"||typeof a.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(a=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:i}),!a)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ee(),e,a)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ee(),e)}}},wt=new Map,Ip=e=>{let t=Ee(),r=t.stackSave();try{let a=t.PTR_SIZE,n=t.stackAlloc(2*a);t._OrtGetInputOutputCount(e,n,n+a)!==0&&fe("Can't get session input/output count.");let i=a===4?"i32":"i64";return[Number(t.getValue(n,i)),Number(t.getValue(n+a,i))]}finally{t.stackRestore(r)}},ui=e=>{let t=Ee(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},xn=async(e,t)=>{var g,y,_;let r,a,n=Ee();Array.isArray(e)?[r,a]=e:e.buffer===n.HEAPU8.buffer?[r,a]=[e.byteOffset,e.byteLength]:[r,a]=ui(e);let i=0,o=0,l=0,p=[],d=[],f=[];try{if([o,p]=lc(t),(t==null?void 0:t.externalData)&&n.mountExternalData){let T=[];for(let E of t.externalData){let z=typeof E=="string"?E:E.path;T.push(un(typeof E=="string"?E:E.data).then(B=>{n.mountExternalData(z,B)}))}await Promise.all(T)}for(let T of(t==null?void 0:t.executionProviders)??[])if((typeof T=="string"?T:T.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof T!="string"){let E=T,z=E==null?void 0:E.context,B=E==null?void 0:E.gpuDevice,W=E==null?void 0:E.deviceType,G=E==null?void 0:E.powerPreference;z?n.currentContext=z:B?n.currentContext=await n.jsepCreateMLContext(B):n.currentContext=await n.jsepCreateMLContext({deviceType:W,powerPreference:G})}else n.currentContext=await n.jsepCreateMLContext();break}i=await n._OrtCreateSession(r,a,o),i===0&&fe("Can't create a session."),(g=n.jsepOnCreateSession)==null||g.call(n),n.currentContext&&(n.jsepRegisterMLContext(i,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[w,b]=Ip(i),S=!!(t!=null&&t.enableGraphCapture),v=[],$=[],I=[];for(let T=0;T<w;T++){let E=n._OrtGetInputName(i,T);E===0&&fe("Can't get an input name."),d.push(E),v.push(n.UTF8ToString(E))}for(let T=0;T<b;T++){let E=n._OrtGetOutputName(i,T);E===0&&fe("Can't get an output name."),f.push(E);let z=n.UTF8ToString(E);$.push(z);{if(S&&(t==null?void 0:t.preferredOutputLocation)===void 0){I.push("gpu-buffer");continue}let B=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((y=t==null?void 0:t.preferredOutputLocation)==null?void 0:y[z])??"cpu";if(B!=="cpu"&&B!=="cpu-pinned"&&B!=="gpu-buffer"&&B!=="ml-tensor")throw new Error(`Not supported preferred output location: ${B}.`);if(S&&B!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${B}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);I.push(B)}}let k=null;return I.some(T=>T==="gpu-buffer"||T==="ml-tensor")&&(l=n._OrtCreateBinding(i),l===0&&fe("Can't create IO binding."),k={handle:l,outputPreferredLocations:I,outputPreferredLocationsEncoded:I.map(T=>Ra(T))}),wt.set(i,[i,d,f,k,S,!1]),[i,v,$]}catch(w){throw d.forEach(b=>n._OrtFree(b)),f.forEach(b=>n._OrtFree(b)),l!==0&&n._OrtReleaseBinding(l)!==0&&fe("Can't release IO binding."),i!==0&&n._OrtReleaseSession(i)!==0&&fe("Can't release session."),w}finally{n._free(r),o!==0&&n._OrtReleaseSessionOptions(o)!==0&&fe("Can't release session options."),p.forEach(w=>n._free(w)),(_=n.unmountExternalData)==null||_.call(n)}},Sn=e=>{var p;let t=Ee(),r=wt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[a,n,i,o,l]=r;o&&(l&&t._OrtClearBoundOutputs(o.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&fe("Can't release IO binding.")),(p=t.jsepOnReleaseSession)==null||p.call(t,e),n.forEach(d=>t._OrtFree(d)),i.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(a)!==0&&fe("Can't release session."),wt.delete(e)},Ta=async(e,t,r,a,n,i=!1)=>{if(!e){t.push(0);return}let o=Ee(),l=o.PTR_SIZE,p=e[0],d=e[1],f=e[3],g=f,y,_;if(p==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let S=e[2].gpuBuffer;_=Bt(Ft(p),d);let v=o.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=v(a,n,S,_)}else if(f==="ml-tensor"){let S=e[2].mlTensor;_=Bt(Ft(p),d);let v=o.jsepRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=v(a,S,Ft(p),d)}else{let S=e[2];if(Array.isArray(S)){_=l*S.length,y=o._malloc(_),r.push(y);for(let v=0;v<S.length;v++){if(typeof S[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);o.setValue(y+v*l,Re(S[v],r),"*")}}else{let v=o.jsepIsGraphInput;if(p!=="string"&&v){let $=o._OrtGetInputName(a,n),I=o.UTF8ToString($);if(v(a,I)){let k=Ft(p);_=Bt(k,d),g="ml-tensor";let T=o.jsepCreateTemporaryTensor,E=o.jsepUploadTensor;if(!T||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await T(a,k,d);E(z,new Uint8Array(S.buffer,S.byteOffset,S.byteLength)),y=z}else _=S.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}else _=S.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}}let w=o.stackSave(),b=o.stackAlloc(4*d.length);try{d.forEach((v,$)=>o.setValue(b+$*l,v,l===4?"i32":"i64"));let S=o._OrtCreateTensor(Ft(p),y,_,b,d.length,Ra(g));S===0&&fe(`Can't create tensor for input/output. session=${a}, index=${n}.`),t.push(S)}finally{o.stackRestore(w)}},kn=async(e,t,r,a,n,i)=>{var ee,ae,Z;let o=Ee(),l=o.PTR_SIZE,p=wt.get(e);if(!p)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=p[0],f=p[1],g=p[2],y=p[3],_=p[4],w=p[5],b=t.length,S=a.length,v=0,$=[],I=[],k=[],T=[],E=o.stackSave(),z=o.stackAlloc(b*l),B=o.stackAlloc(b*l),W=o.stackAlloc(S*l),G=o.stackAlloc(S*l);try{[v,$]=uc(i);for(let V=0;V<b;V++)await Ta(r[V],I,T,e,t[V],_);for(let V=0;V<S;V++)await Ta(n[V],k,T,e,b+a[V],_);for(let V=0;V<b;V++)o.setValue(z+V*l,I[V],"*"),o.setValue(B+V*l,f[t[V]],"*");for(let V=0;V<S;V++)o.setValue(W+V*l,k[V],"*"),o.setValue(G+V*l,g[a[V]],"*");if(y&&!w){let{handle:V,outputPreferredLocations:de,outputPreferredLocationsEncoded:me}=y;if(f.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${f.length}).`);for(let H=0;H<b;H++){let ge=t[H];await o._OrtBindInput(V,f[ge],I[H])!==0&&fe(`Can't bind input[${H}] for session=${e}.`)}for(let H=0;H<S;H++){let ge=a[H];(ee=n[H])!=null&&ee[3]?o._OrtBindOutput(V,g[ge],k[H],0)!==0&&fe(`Can't bind pre-allocated output[${H}] for session=${e}.`):o._OrtBindOutput(V,g[ge],0,me[ge])!==0&&fe(`Can't bind output[${H}] to ${de[H]} for session=${e}.`)}wt.set(e,[d,f,g,y,_,!0])}(ae=o.jsepOnRunStart)==null||ae.call(o,d);let te;y?te=await o._OrtRunWithBinding(d,y.handle,S,W,v):te=await o._OrtRun(d,B,z,b,G,S,W,v),te!==0&&fe("failed to call OrtRun().");let Y=[];for(let V=0;V<S;V++){let de=Number(o.getValue(W+V*l,"*"));if(de===k[V]){Y.push(n[V]);continue}let me=o.stackSave(),H=o.stackAlloc(4*l),ge=!1,N,q=0;try{o._OrtGetTensorData(de,H,H+l,H+2*l,H+3*l)!==0&&fe(`Can't access output tensor data on index ${V}.`);let le=l===4?"i32":"i64",$e=Number(o.getValue(H,le));q=o.getValue(H+l,"*");let D=o.getValue(H+l*2,"*"),ce=Number(o.getValue(H+l*3,le)),Ve=[];for(let Te=0;Te<ce;Te++)Ve.push(Number(o.getValue(D+Te*l,le)));o._OrtFree(D)!==0&&fe("Can't free memory for tensor dims.");let De=Ve.reduce((Te,ye)=>Te*ye,1);N=Rt($e);let St=y==null?void 0:y.outputPreferredLocations[a[V]];if(N==="string"){if(St==="gpu-buffer"||St==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Te=[];for(let ye=0;ye<De;ye++){let ct=o.getValue(q+ye*l,"*"),Zt=o.getValue(q+(ye+1)*l,"*"),kt=ye===De-1?void 0:Zt-ct;Te.push(o.UTF8ToString(ct,kt))}Y.push([N,Ve,Te,"cpu"])}else if(St==="gpu-buffer"&&De>0){let Te=o.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ye=Te(q),ct=Bt($e,De);if(ct===void 0||!sn(N))throw new Error(`Unsupported data type: ${N}`);ge=!0,Y.push([N,Ve,{gpuBuffer:ye,download:o.jsepCreateDownloader(ye,ct,N),dispose:()=>{o._OrtReleaseTensor(de)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(St==="ml-tensor"&&De>0){let Te=o.jsepEnsureTensor;if(!Te)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Bt($e,De)===void 0||!on(N))throw new Error(`Unsupported data type: ${N}`);let ye=await Te(e,q,$e,Ve,!1);ge=!0,Y.push([N,Ve,{mlTensor:ye,download:o.jsepCreateMLTensorDownloader(q,N),dispose:()=>{o.jsepReleaseTensorId(q),o._OrtReleaseTensor(de)}},"ml-tensor"])}else{let Te=nn(N),ye=new Te(De);new Uint8Array(ye.buffer,ye.byteOffset,ye.byteLength).set(o.HEAPU8.subarray(q,q+ye.byteLength)),Y.push([N,Ve,ye,"cpu"])}}finally{o.stackRestore(me),N==="string"&&q&&o._free(q),ge||o._OrtReleaseTensor(de),(Z=o.jsepOnRunEnd)==null||Z.call(o,d)}}return y&&!_&&(o._OrtClearBoundOutputs(y.handle)!==0&&fe("Can't clear bound outputs."),wt.set(e,[d,f,g,y,_,!1])),Y}finally{o.stackRestore(E),I.forEach(te=>o._OrtReleaseTensor(te)),k.forEach(te=>o._OrtReleaseTensor(te)),T.forEach(te=>o._free(te)),v!==0&&o._OrtReleaseRunOptions(v),$.forEach(te=>o._free(te))}},In=e=>{let t=Ee(),r=wt.get(e);if(!r)throw new Error("invalid session id");let a=r[0],n=t._OrtEndProfiling(a);n===0&&fe("Can't get an profile file name."),t._OrtFree(n)},Tn=e=>{let t=[];for(let r of e){let a=r[2];!Array.isArray(a)&&"buffer"in a&&t.push(a.buffer)}return t}}),bt,Pe,Vt,pr,cr,Xr,Ca,Yr,Et,zt,Tp,om,um,lm,dm,pm,cm,hm,fm=L(()=>{rt(),sm(),Ut(),tn(),bt=()=>!!we.wasm.proxy&&typeof document<"u",Vt=!1,pr=!1,cr=!1,Yr=new Map,Et=(e,t)=>{let r=Yr.get(e);r?r.push(t):Yr.set(e,[t])},zt=()=>{if(Vt||!pr||cr||!Pe)throw new Error("worker not ready")},Tp=e=>{switch(e.data.type){case"init-wasm":Vt=!1,e.data.err?(cr=!0,Ca[1](e.data.err)):(pr=!0,Ca[0]()),Xr&&(URL.revokeObjectURL(Xr),Xr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Yr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},om=async()=>{if(!pr){if(Vt)throw new Error("multiple calls to 'initWasm()' detected.");if(cr)throw new Error("previous call to 'initWasm()' failed.");if(Vt=!0,bt())return new Promise((e,t)=>{Pe==null||Pe.terminate(),sc().then(([r,a])=>{var n;try{Pe=a,Pe.onerror=o=>t(o),Pe.onmessage=Tp,Ca=[e,t];let i={type:"init-wasm",in:we};!i.in.wasm.wasmPaths&&(r||(n=import.meta.url)!=null&&n.startsWith("file:"))&&(i.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-D5Jk56-t.wasm",import.meta.url).href}),Pe.postMessage(i),Xr=r}catch(i){t(i)}},t)});try{await rn(we.wasm),await $n(we),pr=!0}catch(e){throw cr=!0,e}finally{Vt=!1}}},um=async e=>{if(bt())return zt(),new Promise((t,r)=>{Et("init-ep",[t,r]);let a={type:"init-ep",in:{epName:e,env:we}};Pe.postMessage(a)});await vn(we,e)},lm=async e=>bt()?(zt(),new Promise((t,r)=>{Et("copy-from",[t,r]);let a={type:"copy-from",in:{buffer:e}};Pe.postMessage(a,[e.buffer])})):ui(e),dm=async(e,t)=>{if(bt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return zt(),new Promise((r,a)=>{Et("create",[r,a]);let n={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Pe.postMessage(n,i)})}else return xn(e,t)},pm=async e=>{if(bt())return zt(),new Promise((t,r)=>{Et("release",[t,r]);let a={type:"release",in:e};Pe.postMessage(a)});Sn(e)},cm=async(e,t,r,a,n,i)=>{if(bt()){if(r.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return zt(),new Promise((o,l)=>{Et("run",[o,l]);let p=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:p,outputIndices:a,options:i}};Pe.postMessage(d,Tn(p))})}else return kn(e,t,r,a,n,i)},hm=async e=>{if(bt())return zt(),new Promise((t,r)=>{Et("end-profiling",[t,r]);let a={type:"end-profiling",in:e};Pe.postMessage(a)});In(e)}}),Ea,Cp,mm,h_=L(()=>{rt(),fm(),J(),en(),dc(),Ea=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Cp=e=>{switch(e[3]){case"cpu":return new Je(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!sn(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:a,dispose:n}=e[2];return Je.fromGpuBuffer(r,{dataType:t,dims:e[1],download:a,dispose:n})}case"ml-tensor":{let t=e[0];if(!on(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:a,dispose:n}=e[2];return Je.fromMLTensor(r,{dataType:t,dims:e[1],download:a,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},mm=class{async fetchModelAndCopyToWasmMemory(e){return lm(await un(e))}async loadModel(e,t){tt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames]=await dm(r,t),je()}async dispose(){return pm(this.sessionId)}async run(e,t,r){tt();let a=[],n=[];Object.entries(e).forEach(g=>{let y=g[0],_=g[1],w=this.inputNames.indexOf(y);if(w===-1)throw new Error(`invalid input '${y}'`);a.push(_),n.push(w)});let i=[],o=[];Object.entries(t).forEach(g=>{let y=g[0],_=g[1],w=this.outputNames.indexOf(y);if(w===-1)throw new Error(`invalid output '${y}'`);i.push(_),o.push(w)});let l=a.map((g,y)=>Ea(g,()=>`input "${this.inputNames[n[y]]}"`)),p=i.map((g,y)=>g?Ea(g,()=>`output "${this.outputNames[o[y]]}"`):null),d=await cm(this.sessionId,n,l,o,p,r),f={};for(let g=0;g<d.length;g++)f[this.outputNames[o[g]]]=i[g]??Cp(d[g]);return je(),f}startProfiling(){}endProfiling(){hm(this.sessionId)}}}),gm={};Ir(gm,{OnnxruntimeWebAssemblyBackend:()=>Ha,initializeFlags:()=>Fa,wasmBackend:()=>ym});var Fa,Ha,ym,f_=L(()=>{rt(),fm(),h_(),Fa=()=>{if((typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0),we.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let e=typeof navigator>"u"?Jy("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},Ha=class{async init(e){Fa(),await om(),await um(e)}async createInferenceSessionHandler(e,t){let r=new mm;return await r.loadModel(e,t),Promise.resolve(r)}},ym=new Ha});rt();rt();rt();var m_="1.21.0",g_=ec;{let e=(f_(),ri(gm)).wasmBackend;Mt("webgpu",e,5),Mt("webnn",e,5),Mt("cpu",e,10),Mt("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:m_,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const y_=Object.freeze(Object.defineProperty({__proto__:null,get InferenceSession(){return Ja},get TRACE(){return br},get TRACE_FUNC_BEGIN(){return tt},get TRACE_FUNC_END(){return je},get Tensor(){return Je},default:g_,get env(){return we},get registerBackend(){return Mt}},Symbol.toStringTag,{value:"Module"}));let Ep=!1;function zp(){Ep||(we.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/dist/",we.wasm.numThreads=1,Ep=!0)}var Ce,ja,Ka,_m,yr,Qa,wm;class __{constructor(t){ir(this,Ce);this.config=t,this.modelSession=null,this.decisionTreeModel=null,this.ort=y_,this.sequenceLength=1,this.featureSize=1,this.leftSequence=[],this.rightSequence=[],this.labelByIndex=["up","down","stay"],this.lastLeftAction="stay",this.lastRightAction="stay",this.leftBusy=!1,this.rightBusy=!1,this.inputName="input",this.outputName="logits",this.lastInferenceError="",this.lastInferenceInfo="",this.modelKind="none"}hasUsableBot(){return this.modelSession||this.decisionTreeModel?!0:this.config.enableCheatBot}async loadOnnxModelFromUrl(t){return zp(),this.modelSession=await this.ort.InferenceSession.create(t),this.decisionTreeModel=null,this.modelKind="onnx",Be(this,Ce,Qa).call(this),Be(this,Ce,yr).call(this),!0}async loadOnnxModelFromFile(t){const r=await t.arrayBuffer();return zp(),this.modelSession=await this.ort.InferenceSession.create(r),this.decisionTreeModel=null,this.modelKind="onnx",Be(this,Ce,Qa).call(this),Be(this,Ce,yr).call(this),!0}async loadDecisionTreeFromFile(t){var o,l;const r=await t.text(),a=JSON.parse(r);if(!a||a.model_type!=="decision_tree")throw new Error("Invalid decision tree model JSON");this.decisionTreeModel=a,this.modelSession=null,this.modelKind="decision_tree";const n=Number(((o=a.input)==null?void 0:o.sequence_length)??1),i=Number(((l=a.input)==null?void 0:l.feature_size)??1);if(this.sequenceLength=Number.isFinite(n)&&n>0?n:1,this.featureSize=Number.isFinite(i)&&i>0?i:1,a.label_by_index){const p=[];for(const d of Object.keys(a.label_by_index))p[Number(d)]=a.label_by_index[d];this.labelByIndex=p}return this.lastInferenceInfo=`decision-tree shape=[1,${this.sequenceLength},${this.featureSize}]`,this.lastInferenceError="",Be(this,Ce,yr).call(this),!0}getDebugInfo(){return{modelKind:this.modelKind,inputName:this.inputName,outputName:this.outputName,sequenceLength:this.sequenceLength,featureSize:this.featureSize,lastInferenceError:this.lastInferenceError,lastInferenceInfo:this.lastInferenceInfo,lastLeftAction:this.lastLeftAction,lastRightAction:this.lastRightAction}}async runSanityCheck(){var a,n;const t=[-120,-20,0,20,120],r=[];if(this.decisionTreeModel){for(const i of t){const o=[i],l=Ap(this.decisionTreeModel,o);r.push({deltaY:i,action:this.labelByIndex[l]??"stay",classIndex:l})}return{modelKind:"decision_tree",outputs:r}}if(this.modelSession&&this.ort){for(const i of t){const o=this.featureSize===1?[i]:[0,0,480,270+i,0,0].slice(0,this.featureSize),l=[];for(let S=0;S<this.sequenceLength;S+=1)l.push(o);const p=Float32Array.from(l.flat()),d=new this.ort.Tensor("float32",p,[1,this.sequenceLength,this.featureSize]),f=await this.modelSession.run({[this.inputName]:d}),g=(a=f[this.outputName])==null?void 0:a.data,y=Object.keys(f)[0],_=y?(n=f[y])==null?void 0:n.data:null,w=g??_??[];let b=0;for(let S=1;S<w.length;S+=1)w[S]>w[b]&&(b=S);r.push({deltaY:i,action:this.labelByIndex[b]??"stay",classIndex:b})}return{modelKind:"onnx",outputs:r}}return{modelKind:"none",outputs:[]}}predictRightAction(t){return this.modelSession||this.decisionTreeModel?Be(this,Ce,ja).call(this,t,"right"):this.config.enableCheatBot?Zo("right",t):"stay"}predictLeftAction(t){return this.modelSession||this.decisionTreeModel?Be(this,Ce,ja).call(this,t,"left"):this.config.enableCheatBot?Zo("left",t):"stay"}}Ce=new WeakSet,ja=function(t,r){if(this.decisionTreeModel)return Be(this,Ce,_m).call(this,t,r);if(!this.modelSession||!this.ort)return"stay";try{const a=Be(this,Ce,Ka).call(this,t,r),n=r==="left"?this.leftSequence:this.rightSequence;if(n.push(a),n.length>this.sequenceLength&&n.shift(),n.length<this.sequenceLength)return"stay";const i=r==="left"?this.leftBusy:this.rightBusy,o=r==="left"?this.lastLeftAction:this.lastRightAction;if(i)return o;r==="left"?this.leftBusy=!0:this.rightBusy=!0;const l=Float32Array.from(n.flat()),p=new this.ort.Tensor("float32",l,[1,this.sequenceLength,this.featureSize]);return this.modelSession.run({[this.inputName]:p}).then(d=>{var S,v;const f=(S=d[this.outputName])==null?void 0:S.data,g=Object.keys(d)[0],y=g?(v=d[g])==null?void 0:v.data:null,_=f??y;if(!_||_.length===0){this.lastInferenceError="Model output kosong";return}let w=0;for(let $=1;$<_.length;$+=1)_[$]>_[w]&&(w=$);const b=this.labelByIndex[w]??"stay";this.lastInferenceError="",this.lastInferenceInfo=`output=${this.outputName} len=${_.length}`,r==="left"?this.lastLeftAction=b:this.lastRightAction=b}).catch(d=>{const f=String(d);this.lastInferenceError=f,Be(this,Ce,wm).call(this,f)&&(this.lastInferenceInfo=`dimension auto-fix -> shape=[1,${this.sequenceLength},${this.featureSize}]`)}).finally(()=>{r==="left"?this.leftBusy=!1:this.rightBusy=!1}),o}catch{return"stay"}},Ka=function(t,r){const a=r==="left"?t.leftPaddle:t.rightPaddle,n=r==="left"?t.rightPaddle:t.leftPaddle;if(this.featureSize===1){const i=a.y+this.config.paddleHeight/2;return[t.ball.y-i]}return[a.y,n.y,t.ball.x,t.ball.y,t.ball.vx,t.ball.vy]},_m=function(t,r){const a=Be(this,Ce,Ka).call(this,t,r),n=r==="left"?this.leftSequence:this.rightSequence;if(n.push(a),n.length>this.sequenceLength&&n.shift(),n.length<this.sequenceLength)return"stay";try{const i=n.flat(),o=Ap(this.decisionTreeModel,i),l=this.labelByIndex[o]??"stay";return this.lastInferenceError="",this.lastInferenceInfo=`decision-tree class=${o} action=${l}`,r==="left"?this.lastLeftAction=l:this.lastRightAction=l,l}catch(i){return this.lastInferenceError=String(i),r==="left"?this.lastLeftAction:this.lastRightAction}},yr=function(){this.leftSequence=[],this.rightSequence=[],this.leftBusy=!1,this.rightBusy=!1,this.lastLeftAction="stay",this.lastRightAction="stay"},Qa=function(){var a,n,i;if(!this.modelSession)return;this.inputName=((a=this.modelSession.inputNames)==null?void 0:a[0])??"input",this.outputName=((n=this.modelSession.outputNames)==null?void 0:n[0])??"logits";const t=(i=this.modelSession.inputMetadata)==null?void 0:i[this.inputName],r=(t==null?void 0:t.dimensions)??[];if(r.length===3){const o=Op(r[1]),l=Op(r[2]);o!==null&&(this.sequenceLength=o),l!==null&&(this.featureSize=l)}this.lastInferenceInfo=`input=${this.inputName} output=${this.outputName} shape=[1,${this.sequenceLength},${this.featureSize}]`},wm=function(t){const r=t.match(/index:\s*1\s*Got:\s*\d+\s*Expected:\s*(\d+)/i),a=t.match(/index:\s*2\s*Got:\s*\d+\s*Expected:\s*(\d+)/i);let n=!1;if(r){const i=Number.parseInt(r[1],10);Number.isFinite(i)&&i>0&&i!==this.sequenceLength&&(this.sequenceLength=i,n=!0)}if(a){const i=Number.parseInt(a[1],10);Number.isFinite(i)&&i>0&&i!==this.featureSize&&(this.featureSize=i,n=!0)}return n&&Be(this,Ce,yr).call(this),n};function Ap(e,t){const r=e.tree,a=r.children_left,n=r.children_right,i=r.feature,o=r.threshold,l=r.value,p=e.classes;let d=0;for(;a[d]!==-1&&n[d]!==-1;){const _=i[d];d=(t[_]??0)<=o[d]?a[d]:n[d]}const f=l[d];let g=0;for(let _=1;_<f.length;_+=1)f[_]>f[g]&&(g=_);const y=p[g];return Number(y)}function Op(e){if(typeof e=="number")return Number.isFinite(e)&&e>0?e:null;if(typeof e=="bigint")return e>0n?Number(e):null;if(typeof e=="string"){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null}return null}class w_{constructor(t){this.mode=t,this.rows=[],this.matchId=`${Date.now()}`}record(t,r,a,n,i){this.rows.push({match_id:this.matchId,frame_idx:t,timestamp_ms:r,mode:this.mode,player_left_id:i.left,player_right_id:i.right,left_paddle_y:Gt(a.leftPaddle.y),right_paddle_y:Gt(a.rightPaddle.y),ball_x:Gt(a.ball.x),ball_y:Gt(a.ball.y),ball_vx:Gt(a.ball.vx),ball_vy:Gt(a.ball.vy),label_action_left:n.left,label_action_right:n.right,score_left:a.leftScore,score_right:a.rightScore})}toCsv(){if(!this.rows.length)return"";const t=Object.keys(this.rows[0]),r=[t.join(",")];for(const a of this.rows)r.push(t.map(n=>b_(String(a[n]))).join(","));return r.join(`
`)}toReplayPayload(){return{id:this.matchId,mode:this.mode,created_at:new Date().toISOString(),frames:this.rows}}}function b_(e){return e.includes(",")||e.includes('"')||e.includes(`
`)?`"${e.replaceAll('"','""')}"`:e}function Gt(e){return Math.round(e*1e3)/1e3}class $_{constructor(t,r){this.storageKey=t,this.maxItems=r}loadAll(){const t=localStorage.getItem(this.storageKey);if(!t)return[];try{return JSON.parse(t)}catch{return[]}}save(t){const r=this.loadAll(),a=[t,...r].slice(0,this.maxItems);return localStorage.setItem(this.storageKey,JSON.stringify(a)),a}latest(){return this.loadAll()[0]??null}byId(t){return this.loadAll().find(r=>r.id===t)??null}deleteById(t){const r=this.loadAll().filter(a=>a.id!==t);return localStorage.setItem(this.storageKey,JSON.stringify(r)),r}}function v_(e){return{leftPaddle:{y:Number(e.left_paddle_y)},rightPaddle:{y:Number(e.right_paddle_y)},ball:{x:Number(e.ball_x),y:Number(e.ball_y)},leftScore:Number(e.score_left),rightScore:Number(e.score_right)}}function ze(e,t=!1){const r=document.getElementById("status");r.textContent=`Status: ${e}`,r.style.color=t?"#8a1c1c":"#1f2520"}function x_(e){document.getElementById("btn-pvp").addEventListener("click",e.onPvp),document.getElementById("btn-pve").addEventListener("click",e.onPve),document.getElementById("btn-bvb").addEventListener("click",e.onBvb),document.getElementById("btn-stop").addEventListener("click",e.onStop),document.getElementById("btn-replay-last").addEventListener("click",e.onReplayLast),document.getElementById("btn-replay-selected").addEventListener("click",e.onReplaySelected),document.getElementById("btn-stop-replay").addEventListener("click",e.onStopReplay),document.getElementById("btn-delete-replay").addEventListener("click",e.onDeleteReplay),document.getElementById("btn-export-csv").addEventListener("click",e.onExportCsv),document.getElementById("btn-train-guide").addEventListener("click",e.onTrainGuide),document.getElementById("btn-load-model").addEventListener("click",e.onLoadModel)}function Cn(e){const t=document.getElementById("replay-select"),r=document.getElementById("replay-delete-select"),a=t.value,n=r.value;t.innerHTML='<option value="">Pilih replay...</option>',r.innerHTML='<option value="">Pilih replay untuk dihapus...</option>';for(const i of e){const o=document.createElement("option");o.value=i.id,o.textContent=`${i.id} (${i.mode})`,t.appendChild(o);const l=document.createElement("option");l.value=i.id,l.textContent=`${i.id} (${i.mode})`,r.appendChild(l)}a&&(t.value=a),n&&(r.value=n)}function S_(){return document.getElementById("replay-select").value}function k_(){return document.getElementById("replay-delete-select").value}function I_(){var t;return((t=document.getElementById("model-file").files)==null?void 0:t[0])??null}function En(e,t,r,a={left:"P1",right:"P2"}){e.clearRect(0,0,r.width,r.height),e.fillStyle="#121914",e.fillRect(0,0,r.width,r.height),e.fillStyle="#edf7ef",T_(e,r),e.fillRect(t.leftPaddle.x,t.leftPaddle.y,r.paddleWidth,r.paddleHeight),e.fillRect(t.rightPaddle.x,t.rightPaddle.y,r.paddleWidth,r.paddleHeight),e.beginPath(),e.arc(t.ball.x,t.ball.y,r.ballRadius,0,Math.PI*2),e.fill(),e.font="700 28px Segoe UI",e.fillText(`${a.left}: ${t.leftScore}`,32,42),e.fillText(`${a.right}: ${t.rightScore}`,r.width-170,42)}function T_(e,t){const n=t.width/2-2;for(let i=0;i<t.height;i+=28)e.fillRect(n,i,4,16)}const C_=document.getElementById("game-canvas"),zn=C_.getContext("2d"),At=document.getElementById("model-log"),Rp=new Hy,$t=new __(ke),Tr=new $_(Za.replayHistoryKey,ke.maxReplayHistory);let vr=null,jt=null,An="idle",bm="pvp",ti=null,li=null;const E_=3,z_=200,A_=30;function O_(){Cn(Tr.loadAll()),L_(),Rn(),et("[init] log siap. jalankan PVE/BVB untuk melihat output model."),x_({onPvp:()=>za("pvp"),onPve:()=>za("pve"),onBvb:()=>za("bvb"),onStop:On,onReplayLast:R_,onReplaySelected:B_,onStopReplay:xr,onDeleteReplay:M_,onExportCsv:N_,onTrainGuide:D_,onLoadModel:P_})}function za(e){if(e!=="pvp"&&!$t.hasUsableBot()){ze("Model bot belum tersedia. Kumpulkan data PVP lalu train model.",!0);return}xr(),On(),An=e,jt=new w_(e),Rn(),et(`[match] mode=${e}`);const t=W_(e);vr=new Fy(ke,t,{onRender:r=>En(zn,r,ke,xm(e)),onFrame:(r,a,n)=>{jt.record(n,performance.now(),r,a,U_(e)),q_(e,n,a)},onMatchEnd:r=>{$m(),ze(`Match selesai. Skor ${r.leftScore}-${r.rightScore}`)}}),ze(`Match dimulai (${e.toUpperCase()})`),vr.start()}function On(){vr&&(vr.stop(),$m(),ze("Match dihentikan"),An="idle")}function $m(){if(!jt)return;bm=An;const e=jt.toCsv();localStorage.setItem(Za.lastCsvKey,e);const t=jt.toReplayPayload(),r=Tr.save(t);Cn(r),jt=null,vr=null}function R_(){const e=Tr.latest();if(!e){ze("Belum ada replay.",!0);return}vm(e)}function B_(){const e=S_();if(!e){ze("Pilih replay dulu.",!0);return}const t=Tr.byId(e);if(!t){ze("Replay tidak ditemukan.",!0);return}vm(t)}function vm(e){xr(),On(),Rn(),et(`[replay] id=${e.id} mode=${e.mode}`),ze(`Replay ${e.id} dimulai`),li=e.id;let t=0;const r=xm(e.mode);ti=setInterval(()=>{if(t>=e.frames.length){xr(!1),ze(`Replay ${e.id} selesai`);return}const a=e.frames[t],n=v_(a);En(zn,{leftPaddle:{x:ke.paddleInset,y:n.leftPaddle.y},rightPaddle:{x:ke.width-ke.paddleInset-ke.paddleWidth,y:n.rightPaddle.y},ball:{x:n.ball.x,y:n.ball.y},leftScore:n.leftScore,rightScore:n.rightScore},ke,r),t+=1},Math.round(1e3/ke.replayFps))}function xr(e=!0){ti&&(clearInterval(ti),ti=null,e&&(ze(`Replay ${li??""} dihentikan`),et("[replay] stopped")),li=null)}function M_(){const e=k_();if(!e){ze("Pilih replay yang mau dihapus.",!0);return}li===e&&xr(!1);const t=Tr.deleteById(e);Cn(t),ze(`Replay ${e} dihapus`)}function N_(){const e=localStorage.getItem(Za.lastCsvKey);if(!e){ze("Belum ada data match untuk diexport.",!0);return}const t=new Blob([e],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(t),a=document.createElement("a"),n=new Date().toISOString().replaceAll(":","-");a.href=r,a.download=`match_${bm}_${n}.csv`,a.click(),URL.revokeObjectURL(r),ze("CSV berhasil diexport")}function D_(){ze("Buka folder train/, jalankan scripts/run_train.ps1 untuk training. Detail: docs/training_spec.md")}async function P_(){const e=I_();if(!e){ze("Pilih file model (.onnx atau .json) dulu.",!0);return}try{const t=e.name.toLowerCase();if(t.endsWith(".onnx"))await $t.loadOnnxModelFromFile(e);else if(t.endsWith(".json"))await $t.loadDecisionTreeFromFile(e);else throw new Error("Unsupported model file. Gunakan .onnx atau .json");const r=$t.getDebugInfo();et(`[model] loaded kind=${r.modelKind} input=${r.inputName} output=${r.outputName} shape=[1,${r.sequenceLength},${r.featureSize}]`);const a=await $t.runSanityCheck();et(`[model] sanity-check kind=${a.modelKind}`);for(const n of a.outputs)et(`[sanity] deltaY=${n.deltaY} -> ${n.action} (class=${n.classIndex})`);ze(`Model loaded: ${e.name}`)}catch(t){const r=String(t);if(r.toLowerCase().includes("no available backend")||r.toLowerCase().includes("initwasm")){ze("Gagal load model ONNX: backend WASM gagal init. Cek koneksi internet lalu reload halaman.",!0);return}ze(`Gagal load model: ${r}`,!0)}}function xm(e){return e==="pvp"?{left:"P1",right:"P2"}:e==="pve"?{left:"Player",right:"Bot"}:{left:"Bot-L",right:"Bot-R"}}function U_(e){return e==="pvp"?{left:"player_1",right:"player_2"}:e==="pve"?{left:"player_1",right:"bot_001"}:{left:"bot_001",right:"bot_002"}}function W_(e){return e==="pvp"?jy(Rp):e==="pve"?Ky(Rp,$t):Qy($t)}function L_(){En(zn,{leftPaddle:{x:ke.paddleInset,y:ke.height/2-ke.paddleHeight/2},rightPaddle:{x:ke.width-ke.paddleInset-ke.paddleWidth,y:ke.height/2-ke.paddleHeight/2},ball:{x:ke.width/2,y:ke.height/2},leftScore:0,rightScore:0},ke,{left:"P1",right:"P2"})}function q_(e,t,r){if(e==="pvp"||t%E_!==0)return;const a=(t*ke.fixedDeltaTime).toFixed(2);if(e==="pve"){et(`[f=${t} | t=${a}s] bot(right) -> ${r.right}`),Bp(t);return}et(`[f=${t} | t=${a}s] bot(left) -> ${r.left}, bot(right) -> ${r.right}`),Bp(t)}function Bp(e){if(e%A_!==0)return;const t=$t.getDebugInfo();if(t.lastInferenceError){et(`[debug] inference-error: ${t.lastInferenceError}`);return}t.lastInferenceInfo&&et(`[debug] ${t.lastInferenceInfo}`)}function et(e){const t=document.createElement("div");for(t.textContent=e,At.appendChild(t);At.childElementCount>z_;)At.removeChild(At.firstChild);At.scrollTop=At.scrollHeight}function Rn(){At.innerHTML=""}O_();
