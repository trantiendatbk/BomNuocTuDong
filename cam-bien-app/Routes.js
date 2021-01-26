import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import AppIntro from './Component/AppIntro';
import Home from './Component/Home';

import Login from './Component/Login';
import OrderTabLayout from './Component/OrderTabLayout';
import CourseMember from './Component/CourseMember';
import InforCourse from './Component/InforCourse';

const Routes = () => {
      return (
            <Router navigationBarStyle={styles.navBar} titleStyle={{ color: '#089101', textTransform: 'uppercase', fontSize: 14 }}>
                  <Stack key="root" tintColor='#089101' backTitle=" ">
                        <Scene key="login" component={Login} title="Đăng Nhập" hideNavBar={true} />
                        <Scene key="AppIntro" component={AppIntro} initial={true} hideNavBar={true} />
                        <Scene key="home" component={Home} renderTitle={() => { return <AppLogo />; }} backButtonImage={() => null} />
                        <Scene key="OrderTabLayout" component={OrderTabLayout} title="Quản lý đơn hàng" />
                        <Scene key="courseMember" component={CourseMember} title="Nhiệt Độ Của Cây" />
                        <Scene key="inforCourse" component={InforCourse} title="Thông tin khoá học" />
                  </Stack>
            </Router>
      )
}

const AppLogo = () => {
      return (
            <View style={styles.logo}>
                  <Image source={require('./assets/icon.png')}
                        style={{
                              width: 30, height: 30, borderRadius: 15
                        }} />
            </View>
      );
};


const styles = StyleSheet.create({
      logo: {
            flex: 1,
            alignItems: 'center',
            marginLeft: Platform.OS === 'android' ? -50 : 0
      },
      navBar: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff', // changing navbar color
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
            color: '#089101'
      }
})

export default Routes 