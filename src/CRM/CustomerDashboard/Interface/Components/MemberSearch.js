import React from 'react';
import MemberSearchTable from './MemberSearchTable';

import memberSearch from '../../../Common/QueryRules/GetMemberSearchData';

import Button from '@material-ui/core/Button';

import TextField from '../../../Common/Components/TextField';

// import ReactTable from '../Components/ReactTable';

const axios = require('axios');


class MemberSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
    }


    componentDidMount() {
        // let self = this;
        // findMembers(self);



    }



    render() {

        const { isLoaded, searchResults, error } = this.state;

        const search = <Button
            onClick={this.findMembers}
            variant="contained" color="primary">
            Search
      </Button>



            return (
                <div>
                    <h1>Member search</h1>
                    <p>Please search for a member using one of the fields below.</p>



<MemberSearchTable />
                    {/* <ReactTable /> */}
                </div>
            );
        }
    
}

export default MemberSearch;