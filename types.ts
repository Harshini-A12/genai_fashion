export interface User {
  id: string;
  name: string;
  email: string;
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-Binary'
}

export enum Occasion {
  FORMAL = 'Formal',
  CASUAL = 'Casual',
  PARTY = 'Party',
  BUSINESS = 'Business'
}

export enum SkinTone {
  FAIR = 'Fair',
  MEDIUM = 'Medium',
  OLIVE = 'Olive',
  DEEP = 'Deep'
}

export interface StylingResult {
  id: string;
  date: string;
  userImage: string; // Base64
  detectedSkinTone: SkinTone;
  gender: Gender;
  occasion: Occasion;
  outfit: {
    top: string;
    bottom: string;
    shoes: string;
  };
  accessories: string[];
  hairstyle: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  explanation: string;
  shoppingKeywords: string[];
}
