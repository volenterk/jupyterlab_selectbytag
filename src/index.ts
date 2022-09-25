import {
  IDisposable,
  DisposableDelegate
} from '@lumino/disposable';

import { LabIcon } from '@jupyterlab/ui-components';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ToolbarButton } from '@jupyterlab/apputils';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import { RunByTagDropdownWidget } from './runByTagDropdownWidget'

import {
  NotebookPanel,
  INotebookModel,
  INotebookTracker,
  NotebookActions
} from '@jupyterlab/notebook';

import logo from './runbytag_icon.svg';

export const runIcon = new LabIcon({
  name: 'runIcon',
  svgstr: logo
});

const plugin: JupyterFrontEndPlugin<void> = {
  activate,
  id: 'jupyterlab_runbytag',
  autoStart: true,
};

export class RunByTagExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    const runByTag = () => {
      const prevIndex = panel.content.activeCellIndex;
      const topOption = dropdown.node.getElementsByTagName('select')[0];
      const currentTag = topOption.options[topOption.selectedIndex].value;

      panel.content.widgets.forEach((child, index) => {
        let cellTags = child.model.metadata.get('tags') || [];
        cellTags = cellTags.toString().split(',');
        if(cellTags.indexOf(currentTag) !== -1) {
          panel.content.select(child);
          panel.content.activeCellIndex = index;
        }
      });

      NotebookActions.run(panel.content, context.sessionContext).then(() => {
        panel.content.activeCellIndex = prevIndex;
      });
    };

    const button = new ToolbarButton({
      className: 'run-by-tag-button',
      icon: runIcon,
      onClick: runByTag,
      tooltip: 'Run by tag',
    });
    panel.toolbar.insertItem(10, 'runByTag', button);

    const dropdown = new RunByTagDropdownWidget(context.model);
    panel.toolbar.insertItem(11, 'dropdown', dropdown);

    return new DisposableDelegate(() => {
      button.dispose();
      dropdown.dispose();
    });
  }
}

function activate(app: JupyterFrontEnd, tracker: INotebookTracker, model: INotebookModel): void {
  app.docRegistry.addWidgetExtension('Notebook', new RunByTagExtension());
}

export default plugin;
