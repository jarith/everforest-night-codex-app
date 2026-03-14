export type ThemeVariant = "dark" | "light";

export type CodeThemeId = "everforest";

export interface ThemeConfig {
  id: string;
  label: string;
  outputFile: string;
  variant: ThemeVariant;
  codeThemeId: CodeThemeId;
  theme: {
    accent: string;
    surface: string;
    ink: string;
    contrast: number;
    opaqueWindows: boolean;
    semanticColors: {
      diffAdded: string;
      diffRemoved: string;
      skill: string;
    };
    fonts: {
      ui: string | null;
      code: string | null;
    };
  };
}

export const themeConfigs: readonly ThemeConfig[] = [
  {
    id: "everforest-night-dark-medium",
    label: "Everforest Night Dark Medium",
    outputFile: "everforest-night-dark.txt",
    variant: "dark",
    codeThemeId: "everforest",
    theme: {
      accent: "#a7c080",
      surface: "#323d43",
      ink: "#d8caac",
      contrast: 42,
      opaqueWindows: true,
      semanticColors: {
        diffAdded: "#7eb18c",
        diffRemoved: "#d09a8e",
        skill: "#86bfb7",
      },
      fonts: {
        ui: null,
        code: null,
      },
    },
  },
  {
    id: "everforest-night-light-hard",
    label: "Everforest Night Light Hard",
    outputFile: "everforest-night-light.txt",
    variant: "light",
    codeThemeId: "everforest",
    theme: {
      accent: "#47661b",
      surface: "#f3ebd2",
      ink: "#4f5b62",
      contrast: 38,
      opaqueWindows: true,
      semanticColors: {
        diffAdded: "#46725d",
        diffRemoved: "#9c5656",
        skill: "#2e7099",
      },
      fonts: {
        ui: null,
        code: null,
      },
    },
  },
];
