const I18N = {
  en:{
    hero:"Find the correct taming item for every supported mob, plus special rules for bosses.",
    supported:"supported mobs",versionTitle:"Version note",versionText:"This page currently reflects the current Fabric 1.21.1 source (1.4.1 development). Older builds such as 1.3.2 can differ in some details.",
    guideLabel:"TAMING GUIDE",allMobs:"All mobs & taming items",results:"results",noResults:"No matching mobs found.",
    bossLabel:"SPECIAL TAMING",bossTitle:"Bosses",multiplierNote:"Chance multipliers are relative to the mod's normal base taming chance. They are not standalone percentages.",
    faqTitle:"Common questions",faq1q:"How do I tame a mob?",faq1a:"Hold one of the listed taming items and use it on the mob. A failed attempt can consume the item, so multiple attempts may be required.",
    faq2q:"How do I tame an Enderman?",faq2a:"Use an Eye of Ender or Chorus Fruit on the Enderman.",
    faq3q:"How do I tame the Ender Dragon?",faq3a:"First defeat the dragon and complete “Free the End”. Then resummon it and use Dragon's Breath, an End Crystal, or the Dragon Egg on the resummoned dragon.",
    faq4q:"My Red Taming Guide does not open. What can I do?",faq4a:"Use this online list as a fallback and include your Minecraft version, loader, and mod version when reporting the guide issue.",
    footer:"Documentation generated from the mod's taming data.", search:"Search mobs or items…", all:"All", tamingItems:"Taming items"
  },
  de:{
    hero:"Finde für jeden unterstützten Mob das richtige Zähm-Item sowie Sonderregeln für Bosse.",
    supported:"unterstützte Mobs",versionTitle:"Versionshinweis",versionText:"Diese Seite basiert aktuell auf dem derzeitigen Fabric-1.21.1-Quellstand (1.4.1 Entwicklung). Ältere Builds wie 1.3.2 können in einzelnen Details abweichen.",
    guideLabel:"ZÄHM-GUIDE",allMobs:"Alle Mobs & Zähm-Items",results:"Ergebnisse",noResults:"Keine passenden Mobs gefunden.",
    bossLabel:"BESONDERES ZÄHMEN",bossTitle:"Bosse",multiplierNote:"Chance-Multiplikatoren gelten relativ zur normalen Basis-Zähmchance der Mod und sind keine eigenständigen Prozentwerte.",
    faqTitle:"Häufige Fragen",faq1q:"Wie zähme ich einen Mob?",faq1a:"Halte eines der aufgelisteten Zähm-Items und benutze es am Mob. Ein fehlgeschlagener Versuch kann das Item verbrauchen, daher können mehrere Versuche nötig sein.",
    faq2q:"Wie zähme ich einen Enderman?",faq2a:"Benutze ein Enderauge oder eine Chorusfrucht am Enderman.",
    faq3q:"Wie zähme ich den Enderdrachen?",faq3a:"Besiege zuerst den Drachen und schließe „Free the End“ ab. Beschwöre ihn danach erneut und benutze Drachenatem, einen Endkristall oder das Drachenei am neu beschworenen Drachen.",
    faq4q:"Mein Red Taming Guide öffnet sich nicht. Was kann ich tun?",faq4a:"Nutze diese Online-Liste als Ersatz und gib bei einem Bugreport Minecraft-Version, Loader und Mod-Version an.",
    footer:"Dokumentation aus den Taming-Daten der Mod erzeugt.", search:"Mobs oder Items suchen…", all:"Alle", tamingItems:"Zähm-Items"
  }
};
const CAT_DE={"Passive":"Passiv","Water":"Wasser","Utility":"Utility","Overworld":"Oberwelt","Nether":"Nether","End / Trial":"Ende / Prüfung","Boss":"Boss"};
let lang="en", category="All", query="";
const grid=document.getElementById("mobGrid"), bossGrid=document.getElementById("bossGrid"), filters=document.getElementById("filters");
const categories=["All",...new Set(window.TEM_MOBS.map(m=>m.category))];

function mobDisplayName(m){ return m.name; }
function itemDisplayName(i){
  if(lang==="en") return i.name.replace("Ender Eye","Eye Of Ender");
  const map={
    "Leather":"Leder","Mushroom Stew":"Pilzsuppe","White Wool":"Weiße Wolle","Mud":"Schlamm","Feather":"Feder","Rabbit Hide":"Kaninchenfell",
    "Rabbit Foot":"Kaninchenpfote","Barrel":"Fass","Bone Block":"Knochenblock","Rotten Flesh":"Verrottetes Fleisch","String":"Faden","Flint":"Feuerstein",
    "Cake":"Kuchen","Turtle Scute":"Schildkrötenschuppe","Goat Horn":"Ziegenhorn","Ochre Froglight":"Ocker-Froschlicht","Verdant Froglight":"Grünes Froschlicht",
    "Pearlescent Froglight":"Perlmutt-Froschlicht","Clay Ball":"Tonklumpen","Sand":"Sand","Pitcher Plant":"Kannenpflanze","Torchflower":"Fackellilie",
    "Armadillo Scute":"Gürteltier-Hornschild","Honeycomb":"Honigwabe","Honey Bottle":"Honigflasche","Note Block":"Notenblock","Ink Sac":"Tintensack",
    "Glow Ink Sac":"Leuchttintensack","Apple":"Apfel","Kelp":"Seetang","Heart Of The Sea":"Herz des Meeres","Nautilus Shell":"Nautilusschale",
    "Bell":"Glocke","Emerald Block":"Smaragdblock","Poppy":"Mohnblume","Iron Block":"Eisenblock","Snow Block":"Schneeblock","Gold Block":"Goldblock",
    "Golden Sword":"Goldschwert","Warped Wart Block":"Wirrwarzenblock","Gold Nugget":"Goldklumpen","Ender Eye":"Enderauge","Chorus Fruit":"Chorusfrucht",
    "Blue Ice":"Blaueis","Nautilus Shell":"Nautilusschale","Dead Bush":"Toter Busch","Bone":"Knochen","Brown Mushroom":"Brauner Pilz",
    "Red Mushroom":"Roter Pilz","Spider Eye":"Spinnenauge","Gunpowder":"Schwarzpulver","Slime Ball":"Schleimball","Glass Bottle":"Glasflasche",
    "Redstone":"Redstone","Glowstone Dust":"Glowstonestaub","Crossbow":"Armbrust","Iron Axe":"Eisenaxt","Totem Of Undying":"Totem der Unsterblichkeit",
    "Amethyst Shard":"Amethystscherbe","Iron Sword":"Eisenschwert","Hay Block":"Heuballen","Stone":"Stein","Ender Pearl":"Enderperle",
    "Phantom Membrane":"Phantomhaut","Prismarine Shard":"Prismarinscherbe","Blaze Rod":"Lohenrute","Magma Cream":"Magmacreme","Ghast Tear":"Ghastträne",
    "Coal":"Kohle","Cooked Porkchop":"Gebratenes Schweinefleisch","Golden Axe":"Goldaxt","Shulker Shell":"Shulkerschale","Breeze Rod":"Böenrute",
    "Wind Charge":"Windladung","Lapis Lazuli":"Lapislazuli","Dragon Breath":"Drachenatem","End Crystal":"Endkristall","Dragon Egg":"Drachenei",
    "Nether Star":"Netherstern","Wither Skeleton Skull":"Witherskelettschädel","Soul Sand":"Seelensand","Prismarine Crystals":"Prismarinkristalle",
    "Wet Sponge":"Nasser Schwamm","Echo Shard":"Echoscherbe","Sculk Catalyst":"Sculk-Katalysator","Recovery Compass":"Bergungskompass"
  };
  return map[i.name]||i.name;
}
function renderFilters(){
  filters.innerHTML="";
  categories.forEach(c=>{
    const b=document.createElement("button"); b.className="filter-btn"+(c===category?" active":"");
    b.textContent=c==="All"?I18N[lang].all:(lang==="de"?(CAT_DE[c]||c):c);
    b.onclick=()=>{category=c;renderFilters();renderMobs()};
    filters.appendChild(b);
  });
}
function itemChip(i){
  const mult=i.multiplier?`<span class="mult">×${i.multiplier.toFixed(2).replace(/\.00$/," ").trim()}</span>`:"";
  return `<span class="item">${itemDisplayName(i)}${mult}</span>`;
}
function renderMobs(){
  const q=query.trim().toLowerCase();
  const rows=window.TEM_MOBS.filter(m=>{
    const cat=category==="All"||m.category===category;
    const hay=[m.name,m.id,m.category,...m.items.map(x=>x.name+" "+x.id)].join(" ").toLowerCase();
    return cat&&(!q||hay.includes(q));
  });
  document.getElementById("visibleCount").textContent=rows.length;
  document.getElementById("emptyState").hidden=rows.length>0;
  grid.innerHTML=rows.map(m=>`<article class="mob-card">
    <div class="mob-head"><div class="mob-name">${mobDisplayName(m)}</div><span class="category">${lang==="de"?(CAT_DE[m.category]||m.category):m.category}</span></div>
    <div class="items-label">${I18N[lang].tamingItems}</div>
    <div class="items">${m.items.map(itemChip).join("")}</div>
  </article>`).join("");
}
function renderBosses(){
  const bosses=window.TEM_MOBS.filter(m=>m.category==="Boss");
  bossGrid.innerHTML=bosses.map(m=>{
    const text=m.special?m.special[lang]:"";
    return `<article class="boss-card"><h3>${m.name}</h3><p>${text}</p><div class="boss-items">${
      m.items.map(i=>`<div class="boss-item"><span>${itemDisplayName(i)}</span><b>${i.multiplier?`×${i.multiplier.toFixed(2).replace(/\.00$/," ").trim()}`:""}</b></div>`).join("")
    }</div></article>`;
  }).join("");
}
function applyLanguage(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(I18N[lang][key])el.textContent=I18N[lang][key]});
  document.getElementById("searchInput").placeholder=I18N[lang].search;
  document.getElementById("langToggle").textContent=lang==="en"?"DE":"EN";
  renderFilters();renderMobs();renderBosses();
}
document.getElementById("searchInput").addEventListener("input",e=>{query=e.target.value;renderMobs()});
document.getElementById("langToggle").addEventListener("click",()=>{lang=lang==="en"?"de":"en";applyLanguage()});
document.getElementById("mobCount").textContent=window.TEM_MOBS.length;
applyLanguage();
