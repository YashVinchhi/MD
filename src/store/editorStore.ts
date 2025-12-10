import { create } from 'zustand';

interface EditorState {
  markdownText: string;
  setMarkdownText: (text: string) => void;
  filePath: string | null;
  setFilePath: (path: string | null) => void;
  isSaved: boolean;
  setSaved: (saved: boolean) => void;
  summaries: Record<string, string>; // summary per file
  setSummary: (file: string, summary: string) => void;
  tags: Record<string, string[]>; // tags per file
  setTags: (file: string, tags: string[]) => void;
  mindmap: string;
  setMindmap: (mindmap: string) => void;
  isLoading: 'summary' | 'tags' | 'mindmap' | null;
  setIsLoading: (loading: 'summary' | 'tags' | 'mindmap' | null) => void;
}

const sampleMarkdown = `# Unveiling the Red Planet: A Journey to Mars

Mars, the fourth planet from the Sun, has captivated human imagination for centuries. Its reddish hue, caused by iron oxide (rust) on its surface, has earned it the nickname "the Red Planet." This document explores the key characteristics of Mars, its potential for past and future life, and the ongoing missions that seek to unlock its secrets.

## Key Characteristics

- **Atmosphere**: Mars has a very thin atmosphere, composed mainly of carbon dioxide (95.3%), with traces of nitrogen and argon. The atmospheric pressure is less than 1% of Earth's, making it impossible for liquid water to exist on the surface for long.
- **Geography**: The planet boasts a diverse landscape, including the largest volcano in the solar system, Olympus Mons, and the deepest canyon, Valles Marineris. It has polar ice caps made of water ice and frozen carbon dioxide.
- **Climate**: Mars experiences seasons like Earth, but they are much longer due to its extended orbit. Temperatures can range from a relatively mild 20°C (68°F) at the equator during summer to a frigid -153°C (-243°F) at the poles.

## The Search for Life

One of the most compelling reasons for exploring Mars is the search for extraterrestrial life. Evidence suggests that Mars was once much warmer and wetter, with a thicker atmosphere and liquid water on its surface—conditions that could have supported microbial life.

### Past Missions and Discoveries

- **Viking Landers (1976)**: Performed the first experiments to detect life, with results that remain debated to this day.
- **Mars Pathfinder (1997)**: Deployed the Sojourner rover, analyzing rocks and soil.
- **Spirit and Opportunity (2004)**: Rovers that found strong evidence of past water activity.
- **Curiosity Rover (2012)**: Discovered organic molecules, the building blocks of life, in ancient lakebed sediments.

### Future Missions

- **Mars 2020 (Perseverance Rover)**: Currently on Mars, Perseverance is caching rock samples for a future sample-return mission to Earth.
- **ExoMars (Rosalind Franklin Rover)**: A joint European-Russian mission planned to drill deep beneath the surface to search for signs of life.

## Conclusion

Mars remains a planet of profound scientific interest. While challenging, its exploration promises to answer fundamental questions about our place in the universe and whether life exists beyond Earth. The journey to Mars is not just a technological endeavor but a testament to human curiosity and our relentless drive to explore the unknown.
`;

export const useEditorStore = create<EditorState>((set) => ({
  markdownText: sampleMarkdown,
  setMarkdownText: (text) => set({ markdownText: text }),
  filePath: null,
  setFilePath: (path) => set({ filePath: path }),
  isSaved: true,
  setSaved: (saved) => set({ isSaved: saved }),
  summaries: {},
  setSummary: (file, summary) => set((state) => ({ summaries: { ...state.summaries, [file]: summary } })),
  tags: {},
  setTags: (file, tags) => set((state) => ({ tags: { ...state.tags, [file]: tags } })),
  mindmap: '',
  setMindmap: (mindmap) => set({ mindmap }),
  isLoading: null,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
