import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { INotebookModel } from '@jupyterlab/notebook';
import { SelectByTagComponent } from './selectByTagComponent';

export class SelectByTagDropdownWidget extends ReactWidget {
  private _model: INotebookModel;

  constructor(model: INotebookModel) {
    super();
    this._model = model;
    this.addClass('lm-Widget');
    this.addClass('p-Widget');
    this.addClass('jp-Notebook-toolbarCellType');
    this.addClass('jp-Toolbar-item');
  }

  render(): JSX.Element {
    return <SelectByTagComponent model={this._model} />;
  }
}
