import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function exportProject(projectTitle: string, mvpSuggestions: any[], guidanceSteps: any[]) {
  const zip = new JSZip();

  // 1️⃣ Add README
  zip.file(
    'README.md',
    `# ${projectTitle}\n\nThis project was generated via UpvoteLabs.\n\n## MVP Features\n${mvpSuggestions
      .map((f) => `- ${f.feature}: ${f.description}`)
      .join('\n')}\n\n## Guidance Steps\n${guidanceSteps.map((g) => `- ${g.step}: ${g.description}`).join('\n')}`
  );

  // 2️⃣ Add placeholder src folder
  const srcFolder = zip.folder('src');
  srcFolder?.file(
    'index.ts',
    `// Placeholder entry point for ${projectTitle}\nconsole.log('Hello from ${projectTitle}!');`
  );

  // 3️⃣ Add MVP features as placeholder files
  const mvpFolder = zip.folder('mvp_features');
  mvpSuggestions.forEach((f, i) => {
    mvpFolder?.file(`${i + 1}_${f.feature.replace(/\s+/g, '_')}.txt`, f.description);
  });

  // 4️⃣ Generate zip blob and trigger download
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${projectTitle.replace(/\s+/g, '_')}.zip`);
}
