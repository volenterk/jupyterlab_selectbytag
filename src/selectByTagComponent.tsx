import React from 'react';
import { INotebookModel } from '@jupyterlab/notebook';
import { collectTags } from './collectTags';

interface ISelectByTagProps {
  model: INotebookModel;
}

interface ISelectByTagState {
  tags: string[];
}

export class SelectByTagComponent extends React.Component<ISelectByTagProps, ISelectByTagState> {
  constructor(props: ISelectByTagProps) {
    super(props);
    this.state = { tags: ['-'] };
  }
  render() {
    const dropdownList = [];
    for(let i = 0; i < this.state.tags.length; i++) {
      dropdownList.push(
        <option key={i} value={this.state.tags[i]}>
          {this.state.tags[i]}
        </option>
      );
    }
    return <div className="jp-HTMLSelect jp-DefaultStyle jp-Notebook-toolbarCellTypeDropdown">
             <select>
               {dropdownList}
             </select>
           </div>;
  };

  componentDidMount() {
    const { model } = this.props;
    model.contentChanged.connect((sender, args) => {
      let notebookTags = collectTags(sender);
      if(notebookTags.length === 0) notebookTags = ['-'];

      this.setState({tags: notebookTags});
    })
  }
}
