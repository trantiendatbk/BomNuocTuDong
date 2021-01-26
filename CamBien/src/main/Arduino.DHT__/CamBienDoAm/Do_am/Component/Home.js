import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableHighlight, ActivityIndicator, RefreshControl, TouchableOpacity, SafeAreaView } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Svg, { Path } from 'react-native-svg';
import Pie from 'react-native-pie'
import { time } from 'console'
const screenWidth = Dimensions.get('window').width

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            pass: "",
            humidity: '',
            data: [],
            setup: "",
            value: "",
            isLoading: false,
            setLoading: false,
            refreshing: false,
            doam: "",
            dulieu: [{ name: 'Độ ẩm', population: 4, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },

            { name: '', population: 100, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }]
        }
    }


    getData = () => {
        fetch('http://103.237.144.143:9999/api/humidity/search', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue'
            })
        })
            .then((response) => response.json())
            .then((reponseJson) => {
                console.log(reponseJson);
                this.setState({
                    isLoading: true,
                    data: reponseJson.data[0]

                })
                console.log("data doam là :" + this.state.data);
                console.log("data là :" + JSON.stringify(this.state.data));
            
            })
            .catch((error) => console.error(error))

    }



    activeLoad = () => {
        return (
            this.state.loading ?
                <View>

                    <ActivityIndicator size="large" />
                </View> : null
        )
    }
    loadNew = () => {
        this.setState({
            refreshing: true
        })
    }



    off = () => {
        // this.handleRemove();

        fetch('http://103.237.144.143:9999/api/pump/setup?fbclid=IwAR1Q9SORtLg6S-dmU9wGIcdvcuq6t-p_44Pq5qXPbaOPtrjSZOUVM588jL4', {       //Gửi lên API value=0
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                led: "0",
                setup: parseInt(this.state.setup, 10)
            })
        });

        alert(" Đã tắt");
    }

    lammoi = () => {
        this.getData();
    }

    on = () => {
        // this.handleRemove();
        fetch('http://103.237.144.143:9999/api/pump/setup?fbclid=IwAR1Q9SORtLg6S-dmU9wGIcdvcuq6t-p_44Pq5qXPbaOPtrjSZOUVM588jL4', {       //Gửi lên API value=1
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                led: "1",
                setup: parseInt(this.state.setup, 10)
            })
        });

        alert(" Đã bật");
    }
    render() {
        // var item = this.state.data.doam;
        const data = [


        ]
        return (
            <ScrollView>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }} >
                    <View style={{ justifyContent: "center", alignItems: "center", height: 50, width: 150, borderColor: "#abc555", borderWidth: 1 }} >
                        <Text style={{ fontSize: 15, fontWeight: "700", color: "#adb333" }} >
                            Nhập thông tin wifi
                </Text>
                    </View>
                    <TextInput
                        style={{ height: 50, width: 150, borderBottomWidth: 2, borderColor: "#eas345", justifyContent: "center", alignItems: 'center' }}
                        onChangeText={(name) => { this.setState({ name: name }) }}
                        placeholder="Nhập tên wifi"
                    />
                    <TextInput style={{ height: 50, width: 150, borderBottomWidth: 2, borderColor: "#eas345", justifyContent: "center", alignItems: 'center' }} onChangeText={(pass) => { this.setState({ pass: pass }) }} placeholder="nhap password" />

                    <TouchableHighlight onPress={this.connect} style={{ backgroundColor: "#efa199", height: 45, width: 80, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginTop: 25 }} >
                        <Text>
                            Kết nối
                         </Text>
                    </TouchableHighlight>


                    <TextInput style={{ height: 50, width: 150, borderBottomWidth: 2, borderColor: "#eas345", justifyContent: "center", alignItems: 'center' }} onChangeText={(setup) => { this.setState({ setup: setup }) }} placeholder="nhap do am duy tri cho cay" />
                    {/* <TouchableHighlight onPress={this.setUp} style={{ backgroundColor: "#eae545", height: 45, width: 80, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginTop: 25 }} >
                        <Text>
                           Thiết lập
                         </Text>
                    </TouchableHighlight> */}
                </View>

                <View>


                </View>



                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 20 }} >
                    <View style={{ justifyContent: "center", alignItems: "center", height: 50, width: 150, borderColor: "#abc555", borderWidth: 1 }} >
                        <TouchableOpacity onPress={this.off}>
                            <Text style={{ fontSize: 15, fontWeight: "700", color: "#adb333" }} >
                                Tắt
                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", height: 50, width: 150, marginLeft: 50, borderColor: "#abc555", borderWidth: 1 }} >
                        <TouchableOpacity onPress={this.on} >
                            <Text style={{ fontSize: 15, fontWeight: "700", color: "#adb333" }} >
                                Bật
                </Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <SafeAreaView style={{ backgroundColor: "#dcdeed", marginTop: 15 }} >

                    <View style={{ borderWidth: 2 }}>
                        <View style={{
                            flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 20,
                            backgroundColor: '#d9d9d9',
                            shadowColor: "#000000",
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            shadowOffset: {
                                height: 1,
                                width: 1
                            }
                        }}>
                            <Text>
                                Độ ẩm hiện tại
                                    </Text>


                            <Text>
                                {this.state.data.humidity}

                            </Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5 }} >

                        <TouchableOpacity onPress={this.lammoi} style={{ height: 70, width: 150, }} >
                            <Text style={{ fontSize: 15, fontWeight: "700", color: "#adb333", borderColor: "#abc555", borderWidth: 1, justifyContent: "center", alignItems: "center" }} >
                                Làm mới dữ liệu
                </Text>
                        </TouchableOpacity>

                    </View>

                </SafeAreaView>


            </ScrollView>
        )
    }
    componentDidMount() {
        this.getData();


    }

}

