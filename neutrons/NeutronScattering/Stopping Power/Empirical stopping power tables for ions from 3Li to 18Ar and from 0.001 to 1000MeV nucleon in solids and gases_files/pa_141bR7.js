var SDPA={init:function(){$(window).load(SDPA.sendIndex());$(window).load(SDPA.sendPage());$(window).load(SDPA.sendResources(2E3));$(window).unload(function(){SDPA.sendResources(0)})},hashCode:function(e){var t=0;if(e.length==0)return t;for(i=0;i<e.length;i++){var letr=e.charCodeAt(i);t=(t<<5)-t+letr;t=t&t}return t},sendIndex:function(){if(Fragment.mapsComplete){var sds=SDM.sds,tid=SDM.tid,sdsh=SDPA.hashCode(sds),tidh=SDPA.hashCode(tid),e=window.performance;var t="";t+="cpc=SD";t+="&pagetype="+SDM.pageType;
t+="&sds="+sds;t+="&tid="+tid;t+="&sdsh="+sdsh;t+="&tidh="+tidh;if("performance"in window)t+="&ns="+window.performance.timing.navigationStart;else t+="&ns="+Date.now();t+="&absf="+(Fragment.foldCheckJumper()+1);t+="&maxf="+Fragment.fragmentMap.length;var n=SDM.pru+"/idx?"+t;$("#sdpa").append('<img style="display:none" src="'+n+'">')}else setTimeout(function(){SDPA.sendIndex()},1E3)},sendPage:function(){var e=window.performance;var t="";t+="cpc=SD";t+="&key="+encodeURIComponent(SDM.pageTransKey);t+=
"&pagetype="+SDM.pageType;t+="&sdsh="+SDPA.hashCode(SDM.sds);t+="&tidh="+SDPA.hashCode(SDM.tid);if("ahm"in SDM.tm)t+="&ahm="+SDM.tm.ahm;if("chm"in SDM.tm)t+="&chm="+SDM.tm.chm;if(document.location.href)t+="&href="+encodeURIComponent(document.location.href);if(document.documentElement.clientWidth&&document.documentElement.clientHeight){t+="&winHeight="+document.documentElement.clientHeight;t+="&winWidth="+document.documentElement.clientWidth}t+="&domCount="+document.getElementsByTagName("*").length;
if("optimizely"in window)if("data"in window.optimizely&&"state"in window.optimizely.data){var n=window.optimizely.data.state.activeExperiments;var r=n.length;var i="&oexp=";for(var s=0;s<r;s++)if(s+1<r)i+=n[s]+"|";else i+=n[s];t+=i}t+="&ud="+SDM.ud;if(SDM.isOAarticle!=undefined)if(SDM.isOAarticle=="true")t+="&oa=1";else t+="&oa=0";else t+="&oa=-1";if("performance"in window){if(e.timing){var o=e.timing;if(o.loadEventEnd>0){for(var u in o)t+="&"+u+"="+o[u];if(typeof chrome!="undefined")if("loadTimes"in
chrome)t+="&msFirstPaint="+SDPA.toInt(chrome.loadTimes().firstPaintTime*1E3);var a=SDM.pru+"/pageReport?"+t;$("#sdpa").append('<img style="display:none" src="'+a+'">')}else setTimeout(SDPA.sendPage,100)}}else{var a=SDM.pru+"/pageReport?"+t;$("#sdpa").append('<img style="display:none" src="'+a+'">')}},toInt:function(e){return Math.round(Number(e)).toString()},buildResources:function(e,t){var n=window.performance.timing;var r=$("iframe");var i=n.navigationStart;var s=n.responseStart-i;var o=n.domInteractive-
i;var u=n.loadEventEnd-i;var a=window.performance.getEntries();var f=[];var sdsh=SDPA.hashCode(SDM.sds);var tidh=SDPA.hashCode(SDM.tid);f.push({sdsh:sdsh,tidh:tidh,ns:i});var l=SDPA.sc[SDPA.sc.length-1];for(var c=l;c<e;c++){var h=a[c].name.match(/^https?\:\/\/([^\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/i);if(h===null){var p="";var d="";var fragID=""}else{var v=h[2].split("/");if(v.length>=4)var p=v[1]+"/"+v[2]+"/"+v[3];else if(v.length==3)var p=v[1]+"/"+v[2];else if(v.length==2)var p=
v[1];else var p="";var d=h[1];if(v[2]=="frag")if(h[4].split("_")[1]!=undefined)fragID=h[4].split("_")[1];else if(h[4]=="maps")fragID=0;else if(h[4]=="all")fragID=32767;else fragID="";else fragID=""}f.push({i:c,tm:SDPA.toInt(a[c].startTime)+"|"+SDPA.toInt(a[c].responseStart)+"|"+SDPA.toInt(a[c].duration),t:a[c].initiatorType,h:d,p:p,f:fragID});if(a[c].initiatorType==="iframe")if(r[SDPA.u]!=undefined){var m=r[SDPA.u].src.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);if(m[1].indexOf("www.sciencedirect.com")!=
-1){ifo=r[SDPA.u].contentWindow.window.performance.getEntries();for(ic=0;ic<ifo.length;ic++){var g=ifo[ic].name.match(/^https?\:\/\/([^\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/i);if(g==null)var y="";else if(g.length>2){var b=g[2].split("/");if(b.length>=4)var y=b[1]+"/"+b[2]+"/"+b[3];else if(b.length==3)var y=b[1]+"/"+b[2];else if(b.length==2)var y=b[1];else var y=""}f.push({i:c,ifr:ic,tm:SDPA.toInt(ifo[ic].startTime)+"|"+SDPA.toInt(ifo[ic].responseStart)+"|"+SDPA.toInt(ifo[ic].duration),
t:ifo[ic].initiatorType,h:g[1],p:y})}SDPA.u++}else SDPA.u++}}var w=encodeURI(JSON.stringify(f));var E=SDM.pru+"/resource?"+w;$("#sdpa").append('<img style="display:none" src="'+E+'">');SDPA.sc.push(e);SDPA.loopc=[0]},ec:[0],sc:[0],loopc:[0],u:0,sendResources:function(e){if(typeof e!="undefined"&&e>0)var t=e;else var t=0;var n=SDPA.ec;if("performance"in window){var r=window.performance;if("timing"in r)var i=r.timing;if("getEntries"in r){var s=r.getEntries().length;SDPA.ec.push(s);ecl=SDPA.ec.length-
1;ecC=SDPA.ec[ecl]-SDPA.ec[ecl-1];ecLast=SDPA.ec[ecl-1];if(SDPA.ec[ecl]==SDPA.ec[ecl-1]||SDPA.ec[ecl]-SDPA.ec[ecl-1]<15){SDPA.loopc.push(0);if(SDPA.loopc.length<8)setTimeout(function(){SDPA.sendResources(t)},t)}else{if(ecC>15){var o=SDPA.sc[SDPA.sc.length-1];for(var u=o;s-u>0;u=u+15){var o=SDPA.sc[SDPA.sc.length-1];SDPA.buildResources(u,s);if(s-u<15){var a=s-u;SDPA.buildResources(s,s)}}}setTimeout(function(){SDPA.sendResources(t)},t)}}}},allFrags:function(){var e=window.performance;var load=Date.now();
var t="";t+="cpc=SD";if(SDM.sds)t+="&sdsh="+SDPA.hashCode(SDM.sds);if(SDM.tid)t+="&tidh="+SDPA.hashCode(SDM.tid);t+="&domCount="+$("*").length;t+="&fragAllLoad="+load;if("performance"in window){if(e.timing){var n=e.timing;if(n.loadEventEnd>0){t+="&navigationStart="+n.navigationStart;var i=SDM.pru+"/fragAll?"+t;DBG.out(1,i);$("#sdpa").append('<img style="display:none" src="'+i+'">')}}}else{var i=SDM.pru+"/fragAll?"+t;DBG.out(1,i);$("#sdpa").append('<img style="display:none" src="'+i+'">')}}};
