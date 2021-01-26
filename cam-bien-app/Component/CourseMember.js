import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { BASE_URL, RenderProcessing, styles, InputSearch, NumberUtils } from '../Base';

export default class CourseMember extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      recordsFiltered: 0,
      isLoading: true,
      processing: false,
      refresh: false,
      hasMore: false
    };

  }

  searchDTO = {
    start: 0,
    length: 10,
    keyword: "",
    sortBy: {
        column: "id",
        dir: "desc"
    },
  };

  componentDidMount() {
    this.loadData()
  }

  refresh = () => {
    this.setState({ refresh: true });
    //this.searchDTO.start = 0;
    this.loadData();
  }

  _onEndReached = () => {
    if (this.state.hasMore) {
      this.searchDTO.start = this.searchDTO.start + this.searchDTO.length;
      this.loadData();
    }
  }

  async loadData() {
    this.setState({ isLoading: true });
    fetch(BASE_URL + "/api/search", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.searchDTO)
    }).then(response => {
      this.setState({ isLoading: false })
      if (response.status && response.status == 409) {
        return { status: 409 };
      }
      return response.json()
    }).then(responseJson => {
      this.setState({courses: responseJson.data, recordsFiltered: responseJson.recordsFiltered});
      this.setState({
        refresh: false,
        courses: courses,
        isLoading: false,
        hasMore: responseJson.data.length == this.searchDTO.length
      });
    }).catch(error => {
      console.log(error);
    });
  }

  

  renderRowItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemHead}>
        <Text style={styles.itemHeadText} selectable onPress={() => Actions.inforCourse({ course: item })}>ID: {item.id}</Text>

        <View style={[styles.hContainer, { justifyContent: "flex-end" }]}>
          <TouchableOpacity onPress={() => this.delete(item)}>
            <Image
              source={require("../assets/trash.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemBody}>
        <View style={styles.vContainer}>

          <View style={styles.hContainer}>
            <Text style={styles.title}>Nhiệt Độ : </Text>
            <Text style={styles.info}>{(item.temperature)}</Text>
          </View>
          <View style={styles.hContainer}>
            <Text style={styles.title}>Độ Ẩm: </Text>
            <Text style={styles.info}>{item.humidity}</Text>
          </View>
        </View>
      </View>
      
      <View style={{ flex: 1, flexDirection: 'row' }}>

      </View>
    </View>
  )

  renderProcessing = () => {
    if (this.state.processing) {
      return (<RenderProcessing />)
    }
    return null
  }

  renderNoDataComponent = () => {
    if (this.state.courses == 0 && this.state.isLoading == false) {
      return (
        <Text style={{ flex: 1, textAlign: 'center' }}>Không có đơn hàng nào!</Text>
      )
    }
    return null
  }

  renderLoadMore = () => {
    if (this.state.hasMore) {
      return (<ActivityIndicator size="small" color="#000" />)
    }
    return null
  }

  // renderAddButton = () => (
  //   <AddFloatingButton action={() => Actions.addOrder()} />
  // )

  renderData() {
    return (
      <FlatList
        refreshing={this.state.isLoading}
        onRefresh={() => this.refresh()}
        data={this.state.courses}
        renderItem={this.renderRowItem}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          this.onEndReached()
        }}
        onEndReached={() => {
          this._onEndReached();
        }}
        ListEmptyComponent={this.renderNoDataComponent}
        ListFooterComponent={this.renderLoadMore}
      />
    )
  }

  render() {
    return (
      <View style={styles.vContainer}>
        {this.renderProcessing()}
        {/* {this.renderSearchSection()} */}
        
        <View style={{ height: 0.5, backgroundColor: '#59262b', marginLeft: 10, marginRight: 10 }}></View>
        <View style={{ height: 30, backgroundColor: '#59262b', margin: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff' }}>Số Lần Đo Được: {this.state.recordsFiltered}</Text>
        </View>
        {this.renderData()}
        {/* {this.renderAddButton()} */}
      </View>
    )
  }
}
