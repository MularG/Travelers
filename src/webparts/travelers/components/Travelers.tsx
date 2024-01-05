import * as React from 'react';
import { ITravelersProps } from './ITravelersProps';
import { sp } from "@pnp/sp";

// Define a specific type for list items
interface ListItem {
  Id: number;
  Title: string;
}

export interface ITravelersState {
  items: ListItem[]; // Use the ListItem type here
}

export default class Travelers extends React.Component<ITravelersProps, ITravelersState> {

  constructor(props: ITravelersProps) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });

    this.state = {
      items: []
    };
  }

  public componentDidMount(): void {
    this._getListItems().catch((error) => {
      console.error("Error fetching list items:", error);
      if (error instanceof Error) {
        // Log more detailed information
        console.log("Error details:", error.message);
        console.log("Stack Trace:", error.stack);
      }
    });
  }
  
  private async _getListItems(): Promise<void> {
    // Directly fetching items without try/catch
    const items: ListItem[] = await sp.web.lists.getByTitle("Angular").items.select("Id", "Title").get();
    this.setState({ items });
  }

  public render(): React.ReactElement<ITravelersProps> {
    return (
      <div>
        <h2>List Items</h2>
        <ul>
          {this.state.items.map(item => (
            <li key={item.Id}>{item.Title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
