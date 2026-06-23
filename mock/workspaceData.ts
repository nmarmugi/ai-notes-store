import { Workspace } from "@/types";

// Colori derivati dalla palette "aree" in app/globals.css (unica fonte: le var CSS)
function areaColors(varName: string): Pick<Workspace, "firstColor" | "secondColor"> {
  return {
    firstColor: `var(${varName})`,
    secondColor: `color-mix(in srgb, var(${varName}) 20%, transparent)`,
  };
}

export const mockSpaces: Workspace[] = [
  {
    id: "1",
    title: "Università",
    ...areaColors("--color-area-indigo"),
    notes: [
      {
        id: "1",
        title: "Diritto Privato - Obbligazioni",
        content: "Le obbligazioni nascono da contratto, fatto illecito o ogni altro atto o fatto idoneo a produrle.",
        date: "12/03/2026",
      },
      {
        id: "2",
        title: "Diritto Costituzionale",
        content: "La sovranità appartiene al popolo, che la esercita nelle forme e nei limiti della Costituzione.",
        date: "18/03/2026",
      },
      {
        id: "3",
        title: "Economia Politica",
        content: "Domanda e offerta determinano il prezzo di equilibrio in un mercato di concorrenza perfetta.",
        date: "02/04/2026",
      },
      {
        id: "4",
        title: "Statistica",
        content: "La media non basta: varianza e deviazione standard descrivono la dispersione dei dati.",
        date: "09/04/2026",
      },
    ],
  },
  {
    id: "2",
    title: "Lavoro",
    ...areaColors("--color-area-teal"),
    notes: [
      {
        id: "1",
        title: "Sprint planning",
        content: "Definire obiettivi dello sprint, stimare i task e assegnare le priorità con il team.",
        date: "15/06/2026",
      },
      {
        id: "2",
        title: "Retrospettiva",
        content: "Cosa è andato bene, cosa migliorare, azioni concrete per il prossimo ciclo.",
        date: "19/06/2026",
      },
      {
        id: "3",
        title: "Onboarding nuovo collega",
        content: "Accessi, repo, documentazione e primo task semplice per prendere confidenza.",
        date: "21/06/2026",
      },
    ],
  },
  {
    id: "3",
    title: "Ricette",
    ...areaColors("--color-area-orange"),
    notes: [
      {
        id: "1",
        title: "Carbonara",
        content: "Uova, guanciale, pecorino e pepe. No panna.",
        date: "01/02/2026",
      },
      {
        id: "2",
        title: "Pane fatto in casa",
        content: "Farina, acqua, lievito e sale. Lievitazione lenta 18 ore in frigo.",
        date: "08/02/2026",
      },
      {
        id: "3",
        title: "Tiramisù",
        content: "Mascarpone, savoiardi, caffè e cacao. Niente scorciatoie sul mascarpone.",
        date: "14/02/2026",
      },
    ],
  },
  {
    id: "4",
    title: "Idee",
    ...areaColors("--color-area-purple"),
    notes: [
      {
        id: "1",
        title: "App per appunti",
        content: "Note organizzate per aree, con AI per riassunti e ricerca semantica.",
        date: "05/05/2026",
      },
      {
        id: "2",
        title: "Newsletter settimanale",
        content: "Tre link interessanti a settimana su design e sviluppo. Tono leggero.",
        date: "11/05/2026",
      },
    ],
  },
  {
    id: "5",
    title: "Viaggi",
    ...areaColors("--color-area-crimson"),
    notes: [
      {
        id: "1",
        title: "Lisbona",
        content: "Alfama, tram 28, pastéis de Belém e tramonto al Miradouro da Senhora do Monte.",
        date: "20/06/2026",
      },
      {
        id: "2",
        title: "Checklist valigia",
        content: "Documenti, caricabatterie, adattatore, farmaci, un cambio in più.",
        date: "21/06/2026",
      },
    ],
  },
  {
    id: "6",
    title: "Allenamento",
    ...areaColors("--color-area-blue"),
    notes: [],
  },
];
