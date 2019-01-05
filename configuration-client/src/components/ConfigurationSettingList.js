import React, { Component } from "react";
import {
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  SelectionState
} from "@devexpress/dx-react-grid";

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  SearchPanel,
  TableSelection
} from "@devexpress/dx-react-grid-bootstrap4";

export default class ConfigurationSettingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "configurationSettingId", title: "Configuration Setting Id" },
        { name: "name", title: "Name" },
        { name: "type", title: "Type" },
        { name: "value", title: "Value" },
        { name: "isActive", title: "Is Active" },
        { name: "applicationName", title: "Application Name" }
      ],
      pageSizes: [10, 20, 50, 100, 0],
      searchValue: "",
      currentPage: 0,
      pageSize: 10,
      selection: []
    };

    this.changeSearchValue = value => this.setState({ searchValue: value });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.changeSelection = selection => {
      const index = selection[0];
      const selectedItem = this.props.configurationSettingItems[index];
      this.props.navigateToDetail(selectedItem.id);
    };
  }

  render() {
    const {
      columns,
      pageSizes,
      searchValue,
      currentPage,
      pageSize,
      selection
    } = this.state;
    const { configurationSettingItems } = this.props;

    if (
      configurationSettingItems == null ||
      configurationSettingItems.length === 0
    ) {
      return null;
    }
    return (
      <Grid rows={configurationSettingItems} columns={columns}>
        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />
        <SearchState
          value={searchValue}
          onValueChange={this.changeSearchValue}
        />
        <IntegratedFiltering />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={this.changePageSize}
          defaultCurrentPage={0}
          defaultPageSize={10}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <TableSelection
          selectByRowClick
          highlightRow
          showSelectionColumn={false}
        />
        <PagingPanel pageSizes={pageSizes} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    );
  }
}
