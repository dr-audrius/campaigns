import React, { Component } from "react";
import orderBy from "lodash/orderBy";
import CampaignTable from "./CampaignTable";
import axios from 'axios';
import logo from "./images/logo.png";

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class App extends Component {
  state = {
    campaigns: [
      { "id": 1, "name": "Divavu", "startDate": "9/19/2017", "endDate": "3/9/2020", "Budget": 883, "userId": 3 },
      { "id": 2, "name": "Jaxspan", "startDate": "11/21/2017", "endDate": "2/21/2018", "Budget": 608715, "userId": 2 },
      { "id": 3, "name": "Miboo", "startDate": "11/1/2017", "endDate": "6/20/2020", "Budget": 239507, "userId": 22 },
      { "id": 4, "name": "Trilith", "startDate": "8/25/2017", "endDate": "11/30/2017", "Budget": 179838, "userId": 1 },
      { "id": 5, "name": "Layo", "startDate": "11/28/2017", "endDate": "3/10/2018", "Budget": 837850, "userId": 1 },
      { "id": 6, "name": "Photojam", "startDate": "7/25/2017", "endDate": "6/23/2017", "Budget": 858131, "userId": 3 },
      { "id": 7, "name": "Blogtag", "startDate": "6/27/2017", "endDate": "1/15/2018", "Budget": 109078, "userId": 99 },
      { "id": 8, "name": "Rhyzio", "startDate": "10/13/2017", "endDate": "1/25/2018", "Budget": 272552, "userId": 4 },
      { "id": 9, "name": "Zoomcast", "startDate": "9/6/2017", "endDate": "11/10/2017", "Budget": 301919, "userId": 8 },
      { "id": 10, "name": "Realbridge", "startDate": "3/5/2018", "endDate": "10/2/2017", "Budget": 5050602, "userId": 5 }
    ],
    concatCampaigns: [],
    campaignsCopy: [],
    users: [],
    columnToSort: "",
    sortDirection: "desc"
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(res => {
        this.setState({
          users: res.data
        });
        this.concat()
      })
      .catch(error => {
        console.log(error.message);
        this.notifyError(error.message);
      })
  }

  concat = () => {

    //forming current date  
    var year = new Date().getFullYear(); //current Year
    var month = new Date().getMonth(); //current Month
    var day = new Date().getDate(); //current Day

    this.setState({
      currentDate: new Date(month + '/' + day + '/' + year) //current date
    })

    const { campaigns } = this.state
    const { users } = this.state
    const { currentDate } = this.state
    var { concatCampaigns } = this.state

    campaigns.forEach((campaign, count) => {

        //filtering user from users object by id to match userId in campaigns object 
        let filtered = users.filter(user => {
          return campaign.userId === user.id
        });
        //assiging "Unknown user" if nothing was filtered from users object
        let username = (filtered.length) ? filtered[0].name : "Unknown user"

        const start = new Date(campaign.startDate);
        const end = new Date(campaign.endDate);

        //checking if current date is inside campaign interval
        let active = (currentDate > start && currentDate < end) ? "Active" : "Inactive"

        // If the endDate is before the start date, the campaign should not be shown.
        end > start ? (

        concatCampaigns.push({
          "id": campaign.id,
          "name": campaign.name,
          "username": username,
          "startDate": campaign.startDate,
          "endDate": campaign.endDate,
          "active": active,
          "Budget": this.nFormatter(campaign.Budget, 0)
        })
        ) : (
           this.notify("Campaign ", campaign.name, " ending date is before starting date. Therefore not included in the table.")
        )
      }
      )
    this.setState({
      concatCampaigns: concatCampaigns
    });
  };

  nFormatter = (num, digits) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + "" + si[i].symbol + " USD";
  }


handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  }

  notify = (info1, info2, info3) => {
    var res = info1.concat(info2, info3);
    toast.success(res, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: false,
      className: 'foo-bar'
    });
  };

  notifyError = (info) => {
    toast.error(info, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      className: 'foo-bar'
    });
  };

render() {

    return (
        <div className="App post">

        <div id="container">
          <div id="a">
              <h3>Campaigns list</h3>
          </div>
          <div id="b">
              <img className="am-image" src={logo} alt="logo" />
         </div>
        </div>

        <CampaignTable
            handleSort={this.handleSort}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(
              this.state.concatCampaigns,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            header={[
              { name: "Id", prop: "id" },
              { name: "Name", prop: "name" },
              { name: "User name", prop: "username" },
              { name: "Start date", prop: "startDate" },
              { name: "End date", prop: "endDate" },
              { name: "Active", prop: "active" },
              { name: "Budget", prop: "Budget" }
            ]}
          />
          <ToastContainer />
        </div>
    );
  }
}

export default App;
