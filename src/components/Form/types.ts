export type FormFieldsData = {
    name: string;
    password: string;
    comment: string;
    language: Language | '';
    level: Level | '';
    agree: boolean;
};

export type Language = 'javascript' | 'coffeescript' | 'typescript';
export type Level = 'senior' | 'middle' | 'junior';
