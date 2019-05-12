import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { Formik, Field } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { addPlace } from '../../store/actions/index';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class SharePlaceScreen extends Component {
  _handleSubmit = (values, actions) => {
    this.props.onAddPlace(values);
    actions.setSubmitting(false);
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage />
          <Formik
            initialValues={{
              placeName: '',
              location: null
            }}
            onSubmit={this._handleSubmit}
            validationSchema={Yup.object().shape({
              placeName: Yup.string()
                .min(3)
                .required()
            })}
            render={({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              errors,
              isValid,
              isSubmitting
            }) => (
              <React.Fragment>
                <Field name="location" component={PickLocation} />
                <Input
                  label="Place Name"
                  placeholder="Playa del Carmen"
                  value={values.placeName}
                  onChangeText={handleChange('placeName')}
                  onBlur={handleBlur('placeName')}
                  autoCorrect={false}
                  errorMessage={touched.placeName && errors.placeName}
                />
                <Button
                  title="Submit Place"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </React.Fragment>
            )}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: place => dispatch(addPlace(place))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
