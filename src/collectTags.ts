import { INotebookModel } from '@jupyterlab/notebook';

export function collectTags(sender: INotebookModel) {
  const cells = sender.cells;
  const set = new Set<string>();

  for(let i = 0; cells && i <= cells.length; i++) {
    const cell = cells.get(i);
    
    if(cell) {
      const currentTags = cell.metadata.get('tags');

      if(currentTags) {
        currentTags.toString().split(',').forEach((e) => {
          set.add(e);
        });
      }
    }
  }

  return Array.from(set);
}
