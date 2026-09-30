(() => {
  const byId = id => document.getElementById(id);
  const normalize = value => value.trim().toLocaleLowerCase();
  function init() {
    const filter=byId("library_filter"), empty=byId("library_filter_empty"), list=byId("components_list");
    const dialog=byId("library_command"), input=byId("library_command_input"), results=byId("library_command_results"), trigger=byId("library_search_trigger");
    if(!filter||!dialog||!input||!results) return;
    const filterNavigation=()=> {
      const query=normalize(filter.value), items=[...document.querySelectorAll("#side_nav .list__item")]; let visible=0;
      items.forEach(item=>{const match=!query||normalize(item.textContent).includes(query);item.closest("li").hidden=!match;if(match)visible++;});
      document.querySelectorAll("#side_nav h4").forEach(heading=>{const next=heading.nextElementSibling, hasVisible=next&&[...next.querySelectorAll("li")].some(li=>!li.hidden);heading.hidden=Boolean(query)&&!hasVisible;});
      if(empty)empty.hidden=!query||visible>0;
    };
    filter.addEventListener("input",filterNavigation);
    filter.addEventListener("keydown",event=>{if(event.key==="Escape"){filter.value="";filterNavigation();filter.blur();}});
    const getEntries=()=>[...document.querySelectorAll("#side_nav a.list__item")].map(anchor=>({title:anchor.textContent.trim().replace(/\s+/g," "),href:anchor.getAttribute("href"),group:anchor.closest("ul")?.previousElementSibling?.textContent.trim()||"Library"}));
    let activeIndex=0;
    const updateSelection=()=>[...results.querySelectorAll(".library-command__result")].forEach((button,index)=>button.setAttribute("aria-selected",String(index===activeIndex)));
    const renderResults=()=>{
      const query=normalize(input.value), matches=getEntries().filter(entry=>!query||(entry.title+" "+entry.group).toLocaleLowerCase().includes(query));
      activeIndex=Math.min(activeIndex,Math.max(0,matches.length-1));results.replaceChildren();
      if(!matches.length){const node=document.createElement("p");node.className="library-command__empty";node.textContent="No pages match your search.";results.append(node);return;}
      matches.forEach((entry,index)=>{
        const button=document.createElement("button");button.type="button";button.className="library-command__result";button.setAttribute("role","option");button.setAttribute("aria-selected",String(index===activeIndex));
        const icon=document.createElement("span");icon.className="material-icons";icon.setAttribute("aria-hidden","true");icon.textContent=/overview|start|global|styling/i.test(entry.title)?"dashboard":"widgets";
        const title=document.createElement("span");title.textContent=entry.title;const group=document.createElement("small");group.textContent=entry.group;button.append(icon,title,group);
        button.addEventListener("mouseenter",()=>{activeIndex=index;updateSelection();});button.addEventListener("click",()=>{location.hash=entry.href;dialog.close();});results.append(button);
      });
    };
    const openSearch=()=>{input.value="";activeIndex=0;renderResults();if(!dialog.open)dialog.showModal();requestAnimationFrame(()=>input.focus());};
    trigger?.addEventListener("click",openSearch);
    dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener("close",()=>trigger?.focus());
    input.addEventListener("input",()=>{activeIndex=0;renderResults();});
    input.addEventListener("keydown",event=>{
      const items=[...results.querySelectorAll(".library-command__result")];
      if(event.key==="ArrowDown"&&items.length){event.preventDefault();activeIndex=(activeIndex+1)%items.length;updateSelection();items[activeIndex].scrollIntoView({block:"nearest"});}
      if(event.key==="ArrowUp"&&items.length){event.preventDefault();activeIndex=(activeIndex-1+items.length)%items.length;updateSelection();items[activeIndex].scrollIntoView({block:"nearest"});}
      if(event.key==="Enter"&&items.length){event.preventDefault();items[activeIndex].click();}
    });
    document.addEventListener("keydown",event=>{
      const target=event.target, typing=target instanceof HTMLElement&&(target.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if((event.key.toLowerCase()==="k"&&(event.ctrlKey||event.metaKey))||(event.key==="/"&&!typing)){event.preventDefault();openSearch();}
    });
    if(list){new MutationObserver(()=>{if(dialog.open)renderResults();}).observe(list,{childList:true,subtree:true});}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
