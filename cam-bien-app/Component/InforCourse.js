import React, { Component } from 'react';
import { Alert, Linking, Text, AsyncStorage, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

import { api, Authentication, NumberUtils, RenderProcessing, styles } from '../Base';

class InforCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.course.id,
      
      course: this.props.course ? this.props.course : {},
      isLoading: false
    }
  }

  componentDidMount() {
    //this.removeItem()
  }

  //ham nay la de xoa AsyncStorage
  removeItem() {
    AsyncStorage.multiRemove(["cart"], (err) => {
        // keys k1 & k2 removed, if they existed
        // do most stuff after removal (if you want)
      });
  }

  async addLocalStore (course) {
    var arr = [];
    const value = await AsyncStorage.getItem('cart');
    
    if(value != null) {        
        AsyncStorage.getItem('cart', (err, result) => {
          var arrCourse = [];
          arrCourse = JSON.parse(result);
          for(var i = 0; i < arrCourse.length; i++) {
            //console.log(arrCourse[i]);
            arr.push(arrCourse[i])
          }
          arr.push(course)
          if(arr != null) {
            AsyncStorage.setItem(
            'cart',
            JSON.stringify(arr),
            () => {
                AsyncStorage.getItem('cart', (err, result) => {
                    console.log(result);
                    Alert.alert('Thành công', 'Khoá học đã được thêm vào giỏ hàng.',
                    [
                        {
                          text: 'OK', onPress: () => {
                            Actions.pop();
                          }
                        },
                    ]
                    )
                });
            }
          );
          }
          //console.log(arr);
        });
       
    } 
    else {
        arr.push(course);
        console.log(arr)
        AsyncStorage.setItem(
            'cart',
            JSON.stringify(arr),
            () => {
              AsyncStorage.getItem('cart', (err, result) => {
                  //console.log(result);
                  Alert.alert('Thành công', 'Khoá học đã được thêm vào giỏ hàng.',
                  [
                      {
                        text: 'OK', onPress: () => {
                          Actions.pop();
                        }
                      },
                  ]
                  )
              });
            }
          );
    }
    
  }

  renderProcessing = () => {
    if (this.state.isLoading) {
      return <RenderProcessing />
    }
    return null
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true} keyboardShouldPersistTaps="handled" extraScrollHeight={120}>
        {this.renderProcessing()}
        <View style={styles.item}>
          <View style={styles.itemHead}>
            <Text style={styles.itemHeadText}>ID: {this.state.course.id} </Text>
          </View>
          <View style={styles.itemBody}>
            <View style={styles.vContainer}>
              
              <View style={styles.hContainer}>
                <Text style={styles.title}>Giá: </Text>
                <Text style={styles.info}>{NumberUtils.formatNumber(this.state.course.price)}</Text>
              </View>
              
            </View>
          </View>
          <View style={styles.itemFoot}>
            <View style={styles.hContainer}>
              <Text style={styles.info} >{this.state.course.createdDate}</Text>
            </View>
            <View style={[styles.hContainer, { justifyContent: "flex-end" }]}>
              <Text style={[styles.info, { textAlign: 'right' }]}>Seller: {this.state.course.createdBy}</Text>
            </View>
          </View>
        </View>
        
        <View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginTop: 10, padding: 10, flex: 1, backgroundColor: 'red' }} onPress={ () => this.addLocalStore(this.state.course)}>
                    <Text style={{
                    fontSize: 15,
                    lineHeight: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#ffffff',
                    textTransform: 'uppercase'
                    }}>Chọn mua</Text>
                </TouchableOpacity>
            </View>
        </View>
            
        
      </KeyboardAwareScrollView>
    )
  }
}
export default InforCourse;
