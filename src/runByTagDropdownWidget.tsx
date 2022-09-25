import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { INotebookModel } from '@jupyterlab/notebook';
import { RunByTagComponent } from './runByTagComponent';

export class RunByTagDropdownWidget extends ReactWidget {
  private _model: INotebookModel;

  constructor(model: INotebookModel) {
    super();
    this._model = model;
    this.addClass('jp-ReactWidget');
    this.addClass('jp-HTMLSelect');
    this.addClass('jp-Notebook-toolbarCellType');
    this.addClass('jp-Notebook-toolbarCellTypeDropdown');
  }

  render(): JSX.Element {
    return <RunByTagComponent model={this._model} />;
  }
}
