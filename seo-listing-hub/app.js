const $=id=>document.getElementById(id);
const clean=s=>String(s||"").trim();
const words=s=>clean(s).split(/[^a-zA-Z0-9]+/).filter(Boolean);
const unique=a=>[...new Set(a.map(x=>x.toLowerCase()).filter(Boolean))];
const cap=s=>clean(s).replace(/\b\w/g,c=>c.toUpperCase());

function build(){
 const product=clean($("product").value),brand=clean($("brand").value),cat=clean($("category").value),market=clean($("marketplace").value),material=clean($("material").value),variant=clean($("variant").value),features=clean($("features").value),raw=clean($("keywords").value),existing=clean($("existing").value);
 if(!product){alert("Please enter Product Name.");$("product").focus();return}
 const keys=unique(raw.split(/[,\n]+/).map(x=>x.trim()).filter(x=>x.length>2)).slice(0,12);
 const fallback=unique([product,cat,material,...features.split(/[,\n]+/),...words(product)]).filter(x=>x.length>2).slice(0,8);
 const kws=keys.length?keys:fallback;
 let title=[brand,product,material,variant].filter(Boolean).join(" - ");
 if(kws[0]&&!title.toLowerCase().includes(kws[0].toLowerCase()))title+=" | "+kws[0];
 const max=market==="eBay"?80:market==="Amazon"?200:255;
 if(title.length>max)title=title.slice(0,max).replace(/\s+\S*$/,"");
 $("outTitle").textContent=title;$("titleCount").textContent=title.length+" chars";
 const fl=features.split(/[,\n]+/).map(x=>x.trim()).filter(Boolean).slice(0,5);
 $("outDesc").textContent=cap(product)+" is designed for everyday use with a practical focus on quality and convenience. "+(fl.length?fl.join(". ")+". ":"")+"Suitable for "+(cat||"everyday needs")+"."+(variant?" Available in "+variant+".":"");
 const list=(fl.length?fl:[material,variant,"Practical everyday design","Easy to use and maintain","Suitable for regular use"].filter(Boolean)).slice(0,5);
 $("outBullets").textContent=list.map((x,i)=>(i+1)+". "+cap(x)+" — practical feature designed for everyday use.").join("\n");
 $("outKeywords").textContent=unique([...kws,...words(product),...words(cat),...words(material)]).slice(0,40).join(", ");
 const rows=kws.map((k,i)=>"<tr><td>"+k+"</td><td>"+(i<2?"Primary":"Related")+"</td><td>"+(i<2?"High":"Medium")+"</td></tr>").join("");
 $("analysis").innerHTML="<table><thead><tr><th>Keyword</th><th>Type</th><th>Priority</th></tr></thead><tbody>"+(rows||"<tr><td colspan='3'>Add keywords for analysis.</td></tr>")+"</tbody></table>";
 audit(existing,title,kws);
}
function audit(existing,title,kws){
 if(!existing){$("audit").textContent="Paste an existing listing above and click Generate.";return}
 const low=existing.toLowerCase(),all=words(existing.toLowerCase());
 const missing=kws.filter(k=>!low.includes(k.toLowerCase()));
 const repeated=unique(all).filter(w=>all.filter(x=>x===w).length>=4).slice(0,8);
 $("audit").innerHTML="<b>Title length:</b> "+title.length+" chars<br><b>Keyword coverage:</b> "+(kws.length-missing.length)+"/"+kws.length+"<br><b>Missing keywords:</b> "+(missing.join(", ")||"None")+"<br><b>Repeated terms:</b> "+(repeated.join(", ")||"None detected")+"<br><b>Tip:</b> Keep keywords natural and write for shoppers first.";
}
$("generateBtn").addEventListener("click",build);
$("clearBtn").addEventListener("click",()=>{document.querySelectorAll("input,textarea").forEach(x=>x.value="");$("outTitle").textContent="Generate a listing to see results.";$("outDesc").textContent="—";$("outBullets").textContent="—";$("outKeywords").textContent="—";$("analysis").textContent="—";$("audit").textContent="Paste an existing listing above and click Generate.";});
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",async()=>{await navigator.clipboard.writeText($(b.dataset.target).textContent);b.textContent="Copied!";setTimeout(()=>b.textContent="Copy",900)}));
$("copyAll").addEventListener("click",async()=>{const t="SEO TITLE\n"+$("outTitle").textContent+"\n\nDESCRIPTION\n"+$("outDesc").textContent+"\n\nBULLETS\n"+$("outBullets").textContent+"\n\nSEARCH KEYWORDS\n"+$("outKeywords").textContent;await navigator.clipboard.writeText(t);$("copyAll").textContent="Copied!";setTimeout(()=>$("copyAll").textContent="Copy All",900)});
