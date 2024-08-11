// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - C H A P I T R E S - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -

let chapters = [
  {
    name: "Calcul mental",
    themes: [
      { label: "Additions", id: "additions_2chiffres" },
      { label: "Tables", id: "tables1" },
      { label: "Multiplications d'additions", id: "tables_parentheses1" },
      { label: "Additions de multiplications", id: "additions_tables" },
      { label: "Mult. à 2 chiffres", id: "multiplication1" },
      { label: "Tables et logique", id: "tables_logique1" },
    ],
  },
  {
    name: "Géométrie élémentaire",
    themes: [
      { label: "Quadrilatères", id: "quadrilateres" },
      { label: "Symétries", id: "symetries" },
    ],
  },
  {
    name: "Trigonométrie élémentaire",
    themes: [
      { label: "Cosinus", id: "valeurs_cosinus" },
      { label: "Comparaisons de cos", id: "comparaisons_cosinus" },
    ],
  },
  {
    name: "Combinatoire élémentaire",
    themes: [
      { label: "Anagrammes", id: "anagrammes1" },
      { label: "Plus d'anagrammes", id: "anagrammes2" },
    ],
  },
  {
    name: "Calcul littéral",
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
    name: "Racine carrée",
    themes: [
      { label: "Simplifications", id: "sqrt1" },
      { label: "Avec produits", id: "sqrt2" },
      { label: "Avec quotients", id: "sqrt3" },
    ],
  },
  {
    name: "Introduction aux fonctions",
    themes: [{ label: "Fonctions affines", id: "fonctions_affines" }],
  },
  {
    name: "Domaines de définition",
    themes: [
      { label: "Divisions", id: "domaines_zero" },
      { label: "Racines carrées", id: "domaines_sqrt" },
      { label: "Logarithmes", id: "domaines_log" },
      { label: "Rédaction", id: "domaines_red" },
    ],
  },
  {
    name: "Suites arithmétiques",
    themes: [
      { label: "Généralités", id: "suites_arithmetiques" },
      { label: "Variations", id: "suites_arithmetiques_variations" },
      { label: "Sommes", id: "sommes_arithmetiques" },
    ],
  },
  {
    name: "Analyse",
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
    name: "Nombres complexes",
    themes: [
      { label: "Multiplications", id: "complexes_mult" },
      { label: "Arguments classiques", id: "complexes_arg" },
      { label: "Module", id: "complexes_mod" },
      { label: "Géométrie", id: "complexes_geo" },
      { label: "𝕌 et 𝕌<sub>n</sub>", id: "complexes_mod1" },
    ],
  },
  {
    name: "Trigonométrie",
    themes: [
      { label: "Valeurs classiques", id: "trigo_valeurs" },
      { label: "Formules", id: "trigo_formules1" },
      { label: "Tangente", id: "trigo_tan" },
      { label: "Congruences", id: "trigo_congruences" },
    ],
  },
  {
    name: "Géométrie plane",
    themes: [
      { label: "Isométries, 1", id: "isometries_planes1" },
      { label: "Rotations", id: "rotations_planes1" },
      { label: "Systèmes 2x2", id: "systemes1" },
      { label: "Droites", id: "droites1" },
    ],
  },
  {
    name: "Logique, quantificateurs",
    themes: [
      { label: "Implication", id: "implication" },
      { label: "∃ ∀", id: "quantificateurs1" },
      { label: "Prédicats", id: "predicats" },
    ],
  },
  {
    name: "Relations binaires",
    themes: [
      { label: "Relations d'équivalence", id: "relations_equiv" },
      { label: "Relations d'ordre", id: "relations_ordre" },
    ],
  },
  {
    name: "Arithmétique",
    themes: [
      { label: "Arithmétique 1", id: "arithmetique1" },
      { label: "Arithmétique de ℤ", id: "arithmetique_Z" },
    ],
  },
  {
    name: "Algèbre linéaire",
    themes: [
      { label: "Espaces vectoriels", id: "ev1" },
      { label: "Applications linéaires", id: "app_lin1" },
      { label: "Matrices", id: "matrices1" },
      { label: "Dimension finie", id: "dim_finie" },
    ],
  },
  {
    name: "Suites et séries",
    themes: [
      { label: "Analyse asymptotique", id: "analyse_asymptotique1" },
      { label: "Suites et limites", id: "suites1" },
      { label: "Séries (pratique)", id: "series1" },
      { label: "Séries (théorie)", id: "series_theorie" },
    ],
  },
  {
    name: "Continuité et dérivabilité",
    themes: [
      { label: "Continuité", id: "continuite1" },
      { label: "Dérivabilité", id: "derivabilite1" },
    ],
  },
  {
    isHidden: true,
    name: "Probabilités",
    themes: [
      {
        isHidden: true,
        label: "Esp. probabilisés finis",
        id: "espaces_probabilises_finis",
      },
      { label: "Var. aléatoires finies", id: "variables_aleatoires_finies" },
    ],
  },
  {
    name: "Algèbre",
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
    name: "Analyse complexe",
    themes: [
      { label: "Holomorphie", id: "holomorphie" },
      { label: "∂ et ∂̅", id: "wirtinger" },
      { label: "𝒪(U)", id: "anneau_holomorphes" },
      { label: "Harmonicité", id: "fct_harmoniques" },
    ],
  },
];
