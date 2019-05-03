import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import logoImage from '../../assets/logo.jpg';

const customDrawer = props => (
  <SafeAreaView style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={logoImage} style={styles.image} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});

export default customDrawer;
