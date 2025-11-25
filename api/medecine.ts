export interface Medicine {
    id: string;
    name: string;
    genericName: string;
    category: string;
    description: string;
}

export const medicines: Medicine[] = [
    {
      id: "1",
      name: "Paracétamol 500mg",
      genericName: "Paracétamol",
      category: "Analgésique",
      description: "Traitement de la douleur et de la fièvre",
    },
    {
      id: "2",
      name: "Amoxicilline 500mg",
      genericName: "Amoxicilline",
      category: "Antibiotique",
      description: "Traitement des infections bactériennes",
    },
    {
      id: "3",
      name: "Ibuprofène 400mg",
      genericName: "Ibuprofène",
      category: "Anti-inflammatoire",
      description: "Traitement de la douleur et de l'inflammation",
    },
    {
      id: "4",
      name: "Aspirine 100mg",
      genericName: "Acide acétylsalicylique",
      category: "Antiagrégant plaquettaire",
      description: "Prévention des maladies cardiovasculaires",
    },
    {
      id: "5",
      name: "Métronidazole 500mg",
      genericName: "Métronidazole",
      category: "Antibiotique",
      description: "Traitement des infections parasitaires et bactériennes",
    },
    {
      id: "6",
      name: "Ciprofloxacine 500mg",
      genericName: "Ciprofloxacine",
      category: "Antibiotique",
      description: "Traitement des infections bactériennes",
    },
    {
      id: "7",
      name: "Oméprazole 20mg",
      genericName: "Oméprazole",
      category: "Anti-ulcéreux",
      description: "Traitement des troubles gastriques",
    },
    {
      id: "8",
      name: "Diclofénac 50mg",
      genericName: "Diclofénac",
      category: "Anti-inflammatoire",
      description: "Traitement de la douleur et de l'inflammation",
    },
    {
      id: "9",
      name: "Loratadine 10mg",
      genericName: "Loratadine",
      category: "Antihistaminique",
      description: "Traitement des allergies",
    },
    {
      id: "10",
      name: "Azithromycine 500mg",
      genericName: "Azithromycine",
      category: "Antibiotique",
      description: "Traitement des infections respiratoires",
    },
    {
      id: "11",
      name: "Artéméther-Luméfantrine",
      genericName: "Artéméther-Luméfantrine",
      category: "Antipaludique",
      description: "Traitement du paludisme",
    },
    {
      id: "12",
      name: "Quinine 300mg",
      genericName: "Quinine",
      category: "Antipaludique",
      description: "Traitement du paludisme",
    },
    {
      id: "13",
      name: "Vitamine C 1g",
      genericName: "Acide ascorbique",
      category: "Vitamine",
      description: "Supplément vitaminique",
    },
    {
      id: "14",
      name: "Fer 65mg",
      genericName: "Sulfate ferreux",
      category: "Supplément minéral",
      description: "Traitement de l'anémie",
    },
    {
      id: "15",
      name: "Mébendazole 100mg",
      genericName: "Mébendazole",
      category: "Antiparasitaire",
      description: "Traitement des parasites intestinaux",
    },
];
  