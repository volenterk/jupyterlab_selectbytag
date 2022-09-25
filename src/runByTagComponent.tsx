import React from 'react';
import { INotebookModel } from '@jupyterlab/notebook';
import { collectTags } from './collectTags';

interface IRunByTagProps {
  model: INotebookModel;
}

interface IRunByTagState {
  tags: string[];
}

export class RunByTagComponent extends React.Component<IRunByTagProps, IRunByTagState> {
  constructor(props: IRunByTagProps) {
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
    return <select>{dropdownList}</select>;
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
