// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - C H A P I T R E S - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -

// Mettre les étiquettes ici ? Et pas dans les thèmes ?
// Car l'étiquette dépend du titre du chapitre
// changer ceci, mettre directement les questions ici ?
// du genre :
//"calcul_mental":{
//		"nom": "Calcul mental",
//		"themes":[
//			{"étiquette thème 1","519-156 618 978 1023-1027"},
//			{"étiquette thème 2","519-156 618 978 1023-1027"}
//		],
//	},

// ou alors mettre carrément les thèmes avec l'ancienne structure dans les chapitres:
// ne pas passer l'id du thème, passer tout le thème

const _chapitres = [
  {
    nom: "Calcul mental",
    themes: [
      { label: "Priorités", id: "tables_parentheses1" },
      { label: "Mult. à 2 chiffres", id: "multiplication1" },
      { label: "Calcul et logique", id: "tables_logique1" },
    ],
  },
  {
    nom: "Géométrie élémentaire",
    themes: [
      { label: "Quadrilatères", id: "quadrilateres" },
      { label: "Symétries", id: "symetries" },
    ],
  },
  {
    nom: "Trigonométrie élémentaire",
    themes: [
      { label: "Cosinus", id: "valeurs_cosinus" },
      { label: "Comparaisons de cos", id: "comparaisons_cosinus" },
    ],
  },
  {
    nom: "Calcul littéral",
    themes: [
      { label: "Fractions", id: "fractions1" },
      { label: "Un symbole", id: "calcul_litt1" },
      { label: "Deux symboles", id: "calcul_litt2" },
      { label: "Factorisat°", id: "facto1" },
      { label: "Plus calculatoire", id: "calcul_litt3" },
      { label: "Discriminants", id: "discriminants1" },
    ],
  },
  {
    nom: "Racine carrée",
    themes: [
      { label: "Simplifications", id: "sqrt1" },
      { label: "Avec produits", id: "sqrt2" },
      { label: "Avec quotients", id: "sqrt3" },
    ],
  },
  {
    nom: "Introduction aux fonctions",
    themes: [{ label: "Fonctions affines", id: "fonctions_affines" }],
  },
  {
    nom: "Domaines de définition",
    themes: [
      { label: "Divisions", id: "domaines_zero" },
      { label: "Racines carrées", id: "domaines_sqrt" },
      { label: "Logarithmes", id: "domaines_log" },
      { label: "Rédaction", id: "domaines_red" },
    ],
  },
  {
    nom: "Suites arithmétiques",
    themes: [
      { label: "Généralités", id: "suites_arithmetiques" },
      { label: "Variations", id: "suites_arithmetiques_variations" },
      { label: "Sommes", id: "sommes_arithmetiques" },
    ],
  },
  {
    nom: "Analyse",
    themes: [
      { label: "Analyse 1", id: "analyse1" },
      { label: "Dérivées 1", id: "derivees1" },
      { label: "Dérivées 2", id: "derivees2" },
      { label: "Valeur absolue", id: "abs1" },
      { label: "Équations 1", id: "equations1" },
      { label: "Équations 2", id: "inegalites1" },
      { label: "Recap", id: "recap1" },
    ],
  },
  {
    nom: "Nombres complexes",
    themes: [
      { label: "Multiplications", id: "complexes_mult" },
      { label: "Arguments classiques", id: "complexes_arg" },
      { label: "Module", id: "complexes_mod" },
      { label: "Géométrie", id: "complexes_geo" },
      { label: "𝕌 et 𝕌<sub>n</sub>", id: "complexes_mod1" },
    ],
  },
  {
    nom: "Trigonométrie",
    themes: [
      { label: "Valeurs classiques", id: "trigo_valeurs" },
      { label: "Formules", id: "trigo_formules1" },
      { label: "Tangente", id: "trigo_tan" },
      { label: "Congruences", id: "trigo_congruences" },
    ],
  },
  {
    nom: "Géométrie plane",
    themes: [
      { label: "Isométries, 1", id: "isometries_planes1" },
      { label: "Rotations", id: "rotations_planes1" },
      { label: "Systèmes 2x2", id: "systemes1" },
      { label: "Droites", id: "droites1" },
    ],
  },
  {
    nom: "Logique, quantificateurs",
    themes: [
      { label: "Implication", id: "implication" },
      { label: "∃ ∀", id: "quantificateurs1" },
      { label: "Prédicats", id: "predicats" },
    ],
  },
  {
    nom: "Relations binaires",
    themes: [
      { label: "", id: "relations_equiv" },
      { label: "", id: "relations_ordre" },
    ],
  },
  {
    nom: "Arithmétique",
    themes: [
      { label: "Arithmétique 1", id: "arithmetique1" },
      { label: "Arithmétique de ℤ", id: "arithmetique_Z" },
    ],
  },
  {
    nom: "Algèbre linéaire",
    themes: [
      { label: "Espaces vectoriels", id: "ev1" },
      { label: "Applications linéaires", id: "app_lin1" },
      { label: "Matrices", id: "matrices1" },
      { label: "Dimension finie", id: "dim_finie" },
    ],
  },
  {
    nom: "Suites et séries",
    themes: [
      { label: "Analyse asymptotique", id: "analyse_asymptotique1" },
      { label: "Suites et limites", id: "suites1" },
      { label: "Séries (pratique)", id: "series1" },
      { label: "Séries (théorie)", id: "series_theorie" },
    ],
  },
  {
    nom: "Continuité et dérivabilité",
    themes: [
      { label: "Continuité", id: "continuite1" },
      { label: "Dérivabilité", id: "derivabilite1" },
    ],
  },
  {
    nom: "Probabilités",
    themes: [
      { label: "Esp. probabilisés finis", id: "espaces_probabilises_finis" },
      { label: "Var. aléatoires finies", id: "variables_aleatoires_finies" },
    ],
  },
  {
    nom: "Algèbre",
    themes: [
      { label: "Groupes", id: "groupes" },
      { label: "...agissant sur des ensembles", id: "groupes_operant" },
      { label: "...abéliens finis", id: "groupes_ab_finis" },
      { label: "...simples", id: "groupes_simples" },
      { label: "Gpe symétrique", id: "groupes_symetriques" },
      { label: "Signature", id: "signature" },
      { label: "Anneaux", id: "anneaux" },
      { label: "...intègres", id: "anneaux_integres" },
      { label: "...factoriels", id: "anneaux_factoriels" },
      { label: "...principaux", id: "anneaux_principaux" },
      { label: "...euclidiens", id: "anneaux_euclidiens" },
      { label: "Corps", id: "corps" },
    ],
  },
  {
    nom: "Analyse complexe",
    themes: [
      { label: "Holomorphie", id: "holomorphie" },
      { label: "∂ et ∂̅", id: "wirtinger" },
      { label: "", id: "anneau_holomorphes" },
      { label: "", id: "fct_harmoniques" },
    ],
  },
];
