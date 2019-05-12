import React, { Component } from 'react';
import { Formik } from 'formik';
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as Yup from 'yup';

class AuthForm extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  _handleSubmit = async () => {
    await AsyncStorage.setItem('userToken', new Date().getTime().toString());
    this.props.navigation.navigate('Places');
  };

  render() {
    return (
      <Formik
        initialValues={{
          isLogin: true,
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          isLogin: Yup.boolean(),
          email: Yup.string()
            .email('Not valid email')
            .required('Email is required'),
          password: Yup.string()
            .min(6)
            .required('Password is required'),
          confirmPassword: Yup.string().when('isLogin', {
            is: false,
            then: Yup.string()
              .oneOf(
                [Yup.ref('password'), null],
                'Confirm Password must matched Password'
              )
              .required('Confirm Password is required')
          })
        })}
        render={({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
          isValid,
          isSubmitting,
          setFieldValue
        }) => (
          <React.Fragment>
            <Button
              title={values.isLogin ? 'Switch to Signup' : 'Switch to Login'}
              buttonStyle={styles.button}
              onPress={() => setFieldValue('isLogin', !values.isLogin)}
            />
            <View style={styles.inputContainer}>
              <Input
                containerStyle={styles.input}
                label="Email"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errorMessage={touched.email && errors.email}
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View
                style={
                  this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === 'portrait' || values.isLogin
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <Input
                    containerStyle={styles.input}
                    label="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    errorMessage={touched.password && errors.password}
                  />
                </View>
                {!values.isLogin && (
                  <View
                    style={
                      this.state.viewMode === 'portrait'
                        ? styles.portraitPasswordWrapper
                        : styles.landscapePasswordWrapper
                    }
                  >
                    <Input
                      containerStyle={styles.input}
                      label="Confirm Password"
                      autoCapitalize="none"
                      secureTextEntry
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      errorMessage={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                  </View>
                )}
              </View>
            </View>
            <Button
              buttonStyle={styles.button}
              title="Submit"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
            />
          </React.Fragment>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordWrapper: {
    width: '100%'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  button: {
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    opacity: 0.75,
    borderRadius: 4,
    padding: 5
  }
});

export default AuthForm;
