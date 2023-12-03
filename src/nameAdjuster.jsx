function processChampionName(name) {
  name = name.replace(/[ .'"]/g, "");

  const allowedChampions = [
    "MasterYi",
    "RenataGlasc",
    "TwistedFate",
    "TahmKench",
    "KSante",
    "XinZhao",
    "AurelionSol",
    "Nunu&Willump",
    "JarvanIV",
  ];

  if (!allowedChampions.includes(name)) {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  if (name === "RenataGlasc") {
    name = "Renata";
  }

  if (name === "Nunu&Willump") {
    name = "Nunu";
  }
  if (name === "Wukong") {
    name = "MonkeyKing";
  }
  return name;
}
export default processChampionName;
