import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends React.Component {
   constructor() {
       super();
       this.state = {
          data: this.props.data,
          loading: false,
          pages: 0
       };
   }

    render() {
          const { data } = this.state;
          return (
                  <ReactTable
                       data={data}
                       pages={this.state.pages}
                       columns={[
                             {
                               Header: "RoleID",
                               accessor: "index"
                             },
                             {
                               Header: "GivenName",
                               accessor: "status"
                             },
                             {
                               Header: "Surname",
                               accessor: "name"
                              }
                            ]}
                     defaultPageSize={10}
                     className="-striped -highlight"
                     loading={this.state.loading}
                     showPagination={true}
                     showPaginationTop={false}
                     showPaginationBottom={true}
                     pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                     manual // this would indicate that server side pagination has been enabled 
                     onFetchData={(state, instance) => {
                             this.setState({loading: true});
                             testService.getTestData(state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                             this.setState({
                                     data: res.data.rows,
                                     pages: res.data.pages,
                                     loading: false
                             })
                     });
                     }}
                     />
         );
     }
}

export default Table;