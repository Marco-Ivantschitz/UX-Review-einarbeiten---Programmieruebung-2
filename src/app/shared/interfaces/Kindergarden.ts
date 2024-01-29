export interface Kindergarden {
    id: number;
    name: string;
    address: string;
    betreiber: string;
    typ: Typ,
    images: { url: string }[]; // Hinzugefügt, um die images-Eigenschaft zu definieren
  }

  export enum Typ {
      privat = 1,
      oeffentlich = 2,
  }