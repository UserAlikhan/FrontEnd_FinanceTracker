import React from 'react';
import Chart from './Chart';
import { getData } from "./utils";
import { selectAsset } from '../../../state-manager/choosenAsset/choosenAssetSlice';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTrendlinesAction } from '../../../state-manager/trendline/trendlineActions';
import { usersSlicer } from '../../../state-manager/users/usersSlice';
import { decodeToken } from '../../helper/decodeToken';
import { fetchFibbonaciAction } from '../../../state-manager/fibonacci/fibonacciActions';
import { fetchInteractiveTextAction } from '../../../state-manager/interactiveText/interactiveTextActions';
import { fetchBuyOrdersAction } from '../../../state-manager/buyOrders/buyOrdersActions';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const abbreviation = this.props.params.abbreviation
    this.props.setAbbreviation(abbreviation)

    // set user info if he opened this page 
    //in the search bar instead the home page
    const user = decodeToken()
    this.props.setUserInformation(user)

    getData().then((data) => {
      this.setState({ data });
    });

    this.props.onFetchTrendlinesAction(user?.sub, abbreviation)
    this.props.onFetchFibbonaciAction(user?.sub, abbreviation)
    this.props.onFetchInteractiveTextAction(user?.sub, abbreviation)
  }
  //  переделать
  // componentDidUpdate() {
  //   console.log('this.props.backtesting.backtestingInfo._id ', this.props.backtesting.backtestingInfo._id)
  //   if (this.props.backtesting.backtestingInfo._id !== undefined) {
  //     this.props.onFetchBuyOrders(this.props?.users?.usersInfo?.sub, this.props?.choosenAsset?.choosenAsset, this.props?.backtesting?.backtestingInfo?._id)
  //   }
  // }

  render() {
    if (this.state.data === null) {
      return <div>Loading...</div>;
      
    } else if (this.state.data && this.props.backtesting.isBacktestingForChooseAssetExists) {
      const startDate = new Date(this.props.backtesting.backtestingInfo.startDate)
      startDate.setDate(startDate.getDate() - 100)

      const endDate = new Date(this.props.backtesting.backtestingInfo.endDate)

      const filteredData = this.state.data.filter(
        (datapoint) => 
          new Date(datapoint.date) >= startDate &&
          new Date(datapoint.date) <= endDate
      )
      console.log('filteredData ', filteredData)
      return <Chart type={'hybrid'} data={filteredData} />

    } else {
      return (
        this.state.data && <Chart type={'hybrid'} data={this.state.data} />
        // <TypeChooser>
        //   {(type) => <Chart type={type} data={this.state.data} />}
        // </TypeChooser>
      );
    }
  }
}

const mapStateToProps = (state) => ({
    users: state.users,
    choosenAsset: state.choosenAsset,
    backtesting: state.backtesting
}) 

const mapDispatchToProps = (dispatch) => ({
    setAbbreviation: (abbreviation) => dispatch(selectAsset(abbreviation)),
    setUserInformation: (userInfo) => dispatch(usersSlicer(userInfo)),
    onFetchTrendlinesAction: (userId, abbreviation, backtestingId=null) => dispatch(fetchTrendlinesAction(userId, abbreviation, backtestingId)),
    onFetchFibbonaciAction: (userId, abbreviation, backtestingId=null) => dispatch(fetchFibbonaciAction(userId, abbreviation, backtestingId)),
    onFetchInteractiveTextAction: (userId, abbreviation, backtestingId=null) => dispatch(fetchInteractiveTextAction(userId, abbreviation, backtestingId)),
    onFetchBuyOrders: (userId, abbreviation, backtestingId) => dispatch(fetchBuyOrdersAction(userId, abbreviation, backtestingId))
})

export default withParams(connect(mapStateToProps, mapDispatchToProps)(ChartComponent))