// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - -- - T H E M E S  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const range = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

let themes = {
  comparaisons_XVIIe_XVIIIe: {
    title: "Mathématiciens des XVII<sup>e</sup> et XVIII<sup>e</sup> siècles",
    info: "Questions pour situer les mathématiciens du XVII<sup>e</sup> et du siècle des Lumières. Détails et liens dans les corrections.",
    questions: range(2650,2669),
    maxPointsPerQuestion: 1,
  },
  comparaisons_pre_XVIIe: {
    title: "Mathématiciens du premier au XVII<sup>e</sup> siècle",
    info: "Questions pour situer les mathématiciens du début de notre ère jusqu'à la fin de la Renaissance. Détails et liens dans les corrections.",
    questions: range(2629,2649),
    maxPointsPerQuestion: 1,
  },
  comparaisons_antiquite: {
    title: "Mathématiciens de l'Antiquité",
    info: "Questions pour situer les mathématiciens de l'antiquité les uns par rapport aux autres. Détails et liens dans les corrections.",
    questions: range(2595,2610),
    maxPointsPerQuestion: 1,
  },
  elements_euclide: {
    title: "Les Éléments d'Euclide",
    info: "Questions sur le célèbre traité mathématique. Commentaires dans les corrections.",
    questions: range(2611,2628),
    maxPointsPerQuestion: 1,
  },
  sophie_germain: {
    title: "Sophie Germain",
    info: "Vie et travaux de Sophie Germain, mathématicienne. Commentaires dans les corrections. Source pour les questions : Wikipédia.",
    questions: range(2572,2594),
    maxPointsPerQuestion: 1,
  },
  permutations_conditions: {
    title: "Permutations avec conditions",
    info: "Questions portant sur le nombre de façon de permuter les lettres d'un mot, mais avec des contraintes ou conditions supplémentaires : commencer par une consonne, commencer ou finir par une voyelle etc.",
    questions: range(2543,2571),
  },
  permutations1: {
    title: "Permutations",
    info: "Questions portant sur le nombre de façon de permuter les lettres d'un mot par exemple.",
    questions: range(2524,2542),
    maxPointsPerQuestion: 5,
  },
  anagrammes2: {
    title: "Anagrammes, bis",
    info: "Mots plus longs, factorielles.",
    questions: range(2492,2523),
    maxPointsPerQuestion: 5,
  },
  anagrammes1: {
    title: "Anagrammes",
    info: "Mots courts, sans factorielles.",
    questions: range(2458,2491),
    maxPointsPerQuestion: 5,
  },
  additions_2chiffres: {
    title: "Additions à deux chiffres",
    info: "Calculs du type 19+57.",
    questions: range(2418, 2457),
    maxPointsPerQuestion: 5,
  },
  tables1: {
    title: "Tables de multiplications à un chiffre",
    info: "Parfait pour réviser ses tables !",
    questions: range(2354, 2383),
    maxPointsPerQuestion: 1,
  },
  additions_tables: {
    title: "Additions de multiplications",
    info: "Calculs du type 9x7+8x6.",
    questions: range(2384, 2417),
    maxPointsPerQuestion: 5,
  },
  valeurs_cosinus: {
    title: "Cosinus d'un angle aigu",
    info: "Définitions, valeurs classiques, calculs de valeurs de cosinus. Les angles sont aigus et donnés en degrés.",
    questions: [...range(2311, 2318), ...range(2321, 2341)],
  },
  comparaisons_cosinus: {
    title: "Comparaisons de cosinus",
    info: "Encadrements et comparaisons de cosinus de différents angle aigus. Les angles sont aigus et donnés en degrés.",
    questions: [2319, 2320, ...range(2342, 2353)],
  },
  fct_harmoniques: {
    title: "Fonctions harmoniques",
    info: "Fonctions harmoniques, liens avec les fonctions holomorphes.",
    questions: range(2292, 2310),
  },
  anneau_holomorphes: {
    title: "Anneaux de fonctions holomorphes",
    info: "Propriétés des anneaux de fonctions holomorphes.",
    questions: range(2282, 2291),
  },
  wirtinger: {
    title: "Notations de Wirtinger",
    info: "Notations et opérateurs de Wirtinger.",
    questions: range(2266, 2281),
  },
  holomorphie: {
    title: "Holomorphie",
    info: "Dérivabilité complexe, Cauchy-Riemann, exemples.",
    questions: range(2198, 2265),
  },
  corps: {
    title: "Corps",
    info: "Attention, les corps sont commutatifs par convention. Deal with it.",
    questions: range(2054, 2076),
  },
  anneaux_euclidiens: {
    title: "Anneaux euclidiens",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(2036, 2053),
  },
  anneaux_principaux: {
    title: "Anneaux principaux",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(2012, 2035),
  },
  anneaux_factoriels: {
    title: "Anneaux factoriels",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(1995, 2011),
  },
  anneaux_integres: {
    title: "Anneaux intègres",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(1972, 1994),
  },
  anneaux: {
    title: "Anneaux",
    info: "Anneaux, sous-anneaux, idéaux, morphismes d'anneaux. Attention, les anneaux sont unitaires par convention.",
    questions: range(1939, 1971),
  },
  signature: {
    title: "Signature",
    info: "Signature, groupes alternés.",
    questions: range(1915, 1938),
  },
  groupes_symetriques: {
    title: "Groupes symétriques",
    info: "Permutations, cycles, compositions, commutation etc.",
    questions: range(1878, 1914),
  },
  groupes_simples: {
    title: "Groupes simples",
    info: "Sous-groupes distingués, groupes simples.",
    questions: range(1853, 1877),
  },
  groupes_operant: {
    title: "Opérations de groupes",
    info: "Groupes opérant sur un ensemble.",
    questions: range(1849, 1852),
  },
  groupes: {
    title: "Groupes (et morphismes)",
    info: "Groupes, morphismes de groupes.",
    questions: range(1837, 1848),
  },
  groupes_ab_finis: {
    title: "Groupes abéliens (finis)",
    info: "Groupes abéliens finis, groupes cycliques.",
    questions: range(1785, 1836),
  },
  arithmetique_Z: {
    title: "Arithmétique dans Z",
    info: "Divisibilité, division euclidienne, pgcd, équations diophantiennes simples.",
    questions: range(1754, 1784),
  },
  tables_parentheses1: {
    title: "Tables de multiplication et parenthèses",
    info: "Calcul mental, multiplications avec parenthèses.",
    questions: range(1714, 1753),
    maxPointsPerQuestion: 5,
  },
  suites_arithmetiques_variations: {
    title: "Variation des suites arithmétiques",
    info: "Questions sur les suites arithmétiques et leurs variations : croissante, monotonie, caractère borné, majoré etc.",
    questions: range(1660, 1713),
  },
  suites_arithmetiques: {
    title: "Suites arithmétiques, Généralités",
    info: "Questions sur les suites arithmétiques.",
    questions: range(1586, 1659),
  },
  sommes_arithmetiques: {
    title: "Sommes arithmétiques",
    info: "Quelques sommes de termes consécutifs de suites arithmétiques. ",
    questions: range(1555, 1585),
  },
  quadrilateres: {
    title: "Quadrilatères",
    info: "Questions sur les quadrilatères : rectangles, carrés, losanges, parallélogrammes, trapèzes etc.",
    questions: [...range(657, 685), ...range(1259, 1273), ...range(1428, 1430)],
    links: [
      {
        title: "Wikipédia (très complet)",
        URL: "https://fr.wikipedia.org/wiki/Quadrilat%C3%A8re",
      },
      {
        title: "Vidéo d'Yvan Monka sur quelques cas",
        URL: "https://www.youtube.com/watch?v=ZYcfGoqDQz4",
      },
    ],
  },
  symetries: {
    title: "Symétries des polygones",
    info: "Axes et centres de symétrie des polygones du plan. Attention aux cas particuliers. Par exemple, un carré est un cas particulier de rectangle (ou de losange).",
    questions: range(1274, 1304),
  },
  fonctions_affines: {
    title: "Fonctions affines",
    info: "Fonctions linéaires et affines, images, antécédents, coefficients directeurs, ordonnée à l'origine...",
    questions: range(1467, 1514),
  },
  abs1: {
    title: "Valeur absolue",
    info: "Questions de base, trier questions",
    questions: range(1, 20),
  },
  analyse1: {
    title: "Analyse, première partie",
    info: "Un peu d'analyse. Fonctions paires, impaires, dérivables, continues.",
    questions: range(21, 34),
  },
  applications: {
    title: "Applications entre ensembles",
    info: "Injections, surjections, bijections. Images, images réciproques etc.<br>Les mots 'fonction' et 'application' sont synonymes.<br>Sauf précision supplémentaire, les applications vont d'un ensemble $E$ dans un ensemble $F$.",
    questions: range(35, 61),
  },
  app_lin1: {
    title: "Applications linéaires",
    info: "Des questions sur les applications linéaires en dimension quelconque.<br><b>Notations:</b> Les lettres $E$, $F$ et $G$ désignent des espaces vectoriels. L'ensemble des endomorphismes d'un espace vectoriel $E$ est noté $\\mathcal{L}(E)$.<br> Si une assertion n'est pas bien définie, on demande de répondre 'Faux'.",
    questions: [...range(62, 92), ...range(1213, 1219)],
  },
  arithmetique1: {
    title: "Arithmétique, première partie",
    info: "Divisibilité, diviseurs, nombres premiers. Pas de congruences.",
    questions: range(93, 116),
  },
  multiplication1: {
    title: "Multiplications",
    info: "Multiplications à deux chiffres.",
    questions: range(1305, 1337),
    maxPointsPerQuestion: 5,
  },
  tables_logique1: {
    title: "Tables et logique",
    info: "Tables de multiplication et connecteurs logiques «et» et «ou».",
    questions: range(117, 132),
    maxPointsPerQuestion: 5,
  },
  complexes_mult: {
    title: "Nombres complexes : forme algébrique",
    info: "Multiplications concrètes de nombres complexes, renforcement en calcul. L'objectif est d'abord de réussir un sans-faute (quitte à utiliser un brouillon lors des premiers essais) et seulement alors d'augmenter sa rapidité.",
    questions: range(133, 168),
  },
  complexes_arg: {
    title: "Nombres complexes : arguments classiques",
    info: "Calculs d'arguments concrets simples (ceux correspondant à des valeurs classiques de sinus et cosinus). L'objectif est d'abord de réussir un sans-faute (quitte à utiliser un brouillon) et seulement alors d'augmenter sa rapidité.",
    questions: range(169, 187),
  },
  complexes_mod: {
    title: "Nombres complexes : module, conjugaison",
    info: "Module, conjugaison, parties réelles et imaginaires.<br>les lettres non définies ($z$, $z'$, $w$ etc) désignent des nombres complexes. On demande de répondre 'VRAI' uniquement si l'assertion est universellement vraie, quelque soient les éventuels paramètres, et de répondre 'FAUX' dans le cas contraire. Par exemple, on répondra 'FAUX' à $|z|=|z|^2$ car même si ça peut exceptionnellement être vrai (pour $z=0$ par exemple), c'est en général faux.",
    questions: range(188, 211),
  },
  complexes_geo: {
    title: "Nombres complexes : géométrie élémentaire",
    info: "Triangles, alignement, orthogonalité, quadrilatères, angles. Pas de transformations.<br>Les lettres minuscules non définies ($z$, $z'$, $w$, $a$, $b$ etc) désignent des nombres complexes. Les lettres majuscules désignent des points du plan. Le point $A$ a pour affixe $a$ etc. Tous les points sont distincts.",
    questions: range(212, 239),
  },
  derivees1: {
    title: "Dérivées, première partie",
    info: "Dérivées simples, pas de logarithme ni d'exponentielle, pas de primitives.",
    questions: range(240, 266),
  },
  derivees2: {
    title: "Dérivées, primitives",
    info: "Dérivées et primitives sur le programme de terminale.",
    questions: range(267, 283),
  },
  domaines_zero: {
    title: "Domaines de définition, 1",
    info: "Détermination de domaines de définition en n'utilisant que l'interdiction de diviser par zéro. Pas de racines carrées, ni de logarithmes.<br>Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
    questions: range(284, 304),
  },
  domaines_sqrt: {
    title: "Domaines de définition 2 (sqrt)",
    info: "Détermination de domaines de définition d'expression comportant des racines carrées.<br>Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
    questions: range(305, 324),
  },
  domaines_log: {
    title: "Domaines de définition, 3 (log)",
    info: "Détermination de domaines de définition, avec logarithmes. Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
    questions: range(325, 344),
  },
  domaines_red: {
    title: "Domaines de définition, 4 (rédaction)",
    info: "Différentes rédactions de détermination de domaines de définition. On demande de répondre «Vrai» si la rédaction est correcte, et «Faux» si elle ne l'est pas.",
    questions: range(345, 363),
  },
  droites1: {
    title: "Droites et équations",
    info: "Géométrie en coordonnées, droites du plan, équations cartésiennes et paramétrages. <br/>Terminologie : l'origine du plan est notée $O$. Les axes de coordonnées (abscisses et ordonnées) partagent le plan en quatre <b>quadrants</b>. Le premier quadrant est le quadrant supérieur droit ($x>0$ et $y>0$). Le deuxième quadrant est le supérieur gauche et les autres suivent dans le sens trigonométrique.",
    questions: range(364, 384),
  },
  equations1: {
    title: "Équations 1",
    info: "Équations, avec vérification qu'un élément est solution (en injectant).",
    questions: range(385, 402),
  },
  ev1: {
    title: "Espaces vectoriels 1",
    info: "Espaces vectoriels, sous-espaces vectoriels. Familles libres, liées, bases.<br>Attention, la dimension n'est pas forcément finie.",
    questions: [...range(403, 436), ...range(1197, 1212)],
  },
  calcul_litt1: {
    title: "Calcul littéral, 1",
    info: "Exercices de calcul littéral : identités remarquables, développement d'expressions avec une variable.",
    questions: range(1338, 1385),
  },
  calcul_litt2: {
    title: "Calcul littéral, 2",
    info: "Exercices de calcul littéral : identités remarquables, développement d'expressions avec deux variables.",
    questions: range(1386, 1427),
  },
  calcul_litt3: {
    title: "Calcul littéral, 3",
    info: "Exercices de calcul littéral : développement d'expressions avec deux variables, avec des expressions de degré trois ou plus. (À bac+1, ce sont des identités remarquables à connaître.)",
    questions: range(1431, 1466),
  },
  facto1: {
    title: "Factorisation, première partie",
    info: "Exercices de calcul littéral, accessible en théorie dès la fin du collège. (Note : il n'y a pas besoin de savoir ce qu'est un discriminant et même si la notion est connue, elle fait perdre beaucoup de temps. La compétence à travailler ici est la factorisation de tête.)",
    questions: range(437, 465),
  },
  fractions1: {
    title: "Fractions2",
    info: "Calcul mental et littéral sur les fractions. Les lettres désignent des entiers qui peuvent être quelconques du moment que ça ne provoque pas une division par zéro.",
    questions: range(466, 485),
  },
  implication: {
    titre:
      "Implication logique. <br>Les symboles $A$ et $B$ désignent des assertions.",
    info: "",
    questions: range(486, 513),
  },
  inegalites1: {
    title: "Inégalités 1",
    info: "inégalités avec variables, racines carrées, élévation au carré d'inégalités, implications et équivalences.",
    questions: range(514, 536),
  },
  isometries_planes1: {
    title: "Isométries planes, partie 1",
    info: "On se place dans leplan euclidien blabla, notations etc",
    questions: range(537, 574),
  },
  matrices1: {
    title: "Matrices",
    info: "Attention, une matrice est en général rectangulaire !",
    questions: [...range(575, 600), ...range(1226, 1232), ...range(1188, 1196)],
  },
  complexes_mod1: {
    title: "Nombres complexes de module un, racines de l'unité",
    info: "Questions sur les racines $N$-èmes, sur les racines de l'unité et en général sur le cercle unité du plan complexe.",
    questions: range(601, 626),
  },
  predicats: {
    title: "Calcul des précicats",
    info: "La lettre $x$ désigne un nombre réel.",
    questions: range(627, 656),
  },
  quantificateurs1: {
    title: "Quantificateurs",
    info: "<b>CONSIGNE IMPORTANTE:</b><br>Certaines phrases sont mal formées et n'ont pas de sens mathématique. Dans ce cas, il est demandé de choisir «FAUX».",
    questions: range(686, 718),
  },
  sqrt1: {
    title: "Racines carrées (sans produits)",
    info: "Calculs avec racines carrées : simplifications, factorisations, inégalités.",
    questions: range(719, 758),
  },
  sqrt2: {
    etiquette: "Racine carrée 2",
    niveau: -3,
    title: "Racines carrées et produits",
    info: "Avec produits, mais sans quotients ni calcul littéral",
    questions: range(759, 778),
  },
  sqrt3: {
    title: "Racines carrées et fractions",
    info: "Racines carrées et fractions, sans calcul littéral",
    questions: range(779, 806),
  },
  recap1: {
    title: "Récap terminale",
    info: "Vérifier s'il n'y a pas deux thèmes ici",
    questions: range(807, 858),
  },
  relations_equiv: {
    title: "Relations d'équivalence",
    info: "Sans ensemble quotient",
    questions: range(859, 903),
  },
  relations_ordre: {
    title: "Relations d'ordre",
    info: "Plus grand élément, divisibilité etc..",
    questions: range(904, 926),
  },
  rotations_planes1: {
    title: "Rotations planes",
    info: "notations, plan, application complexe associée",
    questions: range(927, 946),
  },
  systemes1: {
    title: "Systèmes à deux équations et deux inconnues",
    info: "les variables désignent des nombres réels.",
    questions: range(947, 975),
  },
  trigo_valeurs: {
    title: "Trigonométrie, 1 : valeurs classiques",
    info: "Séparer en deux thèmes. Formules de trigonométrie de base : somme, différence, doublement. Valeurs classiques. Les lettres $a$ et $b$ désignent des nombres réels.",
    questions: [...range(1005, 1019), ...range(1030, 1042)],
  },
  trigo_formules1: {
    title: "Trigonométrie 2 : formules de base",
    info: "Séparer en deux thèmes. Formules de trigonométrie de base : somme, différence, doublement. Valeurs classiques. Les lettres $a$ et $b$ désignent des nombres réels.",
    questions: [...range(976, 1004), ...range(1020, 1029), 1043],
  },
  trigo_tan: {
    title: "",
    info: "Tangente, valeurs classiques, formules, domaine de définition",
    questions: [
      ...range(1044, 1068),
      ...range(1079, 1084),
      1093,
      1094,
      1095,
      ...range(1099, 1119),
    ],
  },
  trigo_congruences: {
    title: "Trigonométrie 4",
    info: "Congruences et équations",
    questions: [...range(1069, 1078), ...range(1085, 1092), 1096, 1097, 1098],
  },
  dim_finie: {
    title: "Dimension finie",
    info: "Espaces vectoriels en dimension finie",
    questions: range(1220, 1225),
  },
  polynomes1: {
    title: "Polynômes",
    info: "Questions sur les polynômes, l'espace des polynômes, et leur arithmétique.",
    questions: [...range(1233, 1239)],
  },
  espaces_probabilises_finis: {
    title: "Espaces probabilisés finis",
    info: "",
    questions: [...range(1248, 1253)],
  },
  variables_aleatoires_finies: {
    title: "Variables aléatoires",
    info: "(Sur un espace probabilisé fini.)",
    questions: [...range(1254, 1258)],
  },
  analyse_asymptotique1: {
    title: "Analyse asymptotique",
    info: "Équivalents de suites, petit o, grand O.",
    questions: [...range(1127, 1129), ...range(1131, 1133)],
  },
  suites1: {
    title: "Suites et limites",
    info: "Questions de convergence.",
    questions: [...range(1134, 1144)],
  },
  series1: {
    title: "Séries (pratique)",
    info: "Natures de séries données par un terme général concret.",
    questions: [...range(1145, 1148), ...range(2108, 2157)],
  },
  series_theorie: {
    title: "Séries (questions théoriques)",
    info: "Questions de convergence, comparaison etc.",
    questions: [...range(2158, 2197)],
  },
  continuite1: {
    title: "Limites et continuité",
    info: "Convergence et limite en un point, continuité de fonctions réelles à variable réelle, prolongements par continuité.",
    questions: [...range(1157, 1165)],
  },
  derivabilite1: {
    title: "Dérivabilité",
    info: "",
    questions: [...range(1166, 1174)],
  },
  discriminants1: {
    title: "Discriminants",
    info: "",
    questions: [...range(1515, 1554)],
  },
};
