export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Workspace {
  id: string;
  title: string;
  firstColor: string;
  secondColor: string;
  notes: Note[];
}
