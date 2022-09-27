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

import { SelectByTagDropdownWidget } from './selectByTagDropdownWidget'

import {
  NotebookPanel,
  INotebookModel,
  INotebookTracker,
  NotebookActions
} from '@jupyterlab/notebook';

import logo from '../style/icons/selectbytag_icon.svg';

export const selectIcon = new LabIcon({
  name: 'selectIcon',
  svgstr: logo
});

const plugin: JupyterFrontEndPlugin<void> = {
  activate,
  id: 'jupyterlab_selectbytag',
  autoStart: true,
};

export class SelectByTagExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    const selectbytag = () => {
      NotebookActions.deselectAll(panel.content);

      const topOption = dropdown.node.getElementsByTagName('select')[0];
      const currentTag = topOption.options[topOption.selectedIndex].value;

      panel.content.widgets.forEach((child, index) => {
        let cellTags = child.model.metadata.get('tags') || [];
        cellTags = cellTags.toString().split(',');
        if(cellTags.indexOf(currentTag) !== -1) {
          panel.content.select(child);
        }
      });
    };

    const button = new ToolbarButton({
      className: 'lm-Widget p-Widget jp-CommandToolbarButton nbdime-toolbarButton jp-Toolbar-item bp3-button bp3-minimal jp-ToolbarButtonComponent minimal jp-Button',
      icon: selectIcon,
      onClick: selectbytag,
      tooltip: 'Select by tag',
    });
    panel.toolbar.insertAfter('cellType', 'selectbytag', button);

    const dropdown = new SelectByTagDropdownWidget(context.model);
    panel.toolbar.insertAfter('selectbytag', 'dropdown', dropdown);

    return new DisposableDelegate(() => {
      button.dispose();
      dropdown.dispose();
    });
  }
}

function activate(app: JupyterFrontEnd, tracker: INotebookTracker, model: INotebookModel): void {
  app.docRegistry.addWidgetExtension('Notebook', new SelectByTagExtension());
}

export default plugin;
