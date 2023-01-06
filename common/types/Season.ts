export interface Season {
  id: string;
  year: number;
  image: {
    src: string;
    credit?: {
      person: string;
      personUrl?: string;
      company?: string;
      companyUrl?: string;
    };
  };
}
