import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User>();

  const handleLogin = () => {

    console.log(email, pass);
  };

  const handleRegister = async () => {

    // check value
    if (email && pass && rePass) {
      if (rePass !== pass) {
        console.log('mật khẩu của bạn không khớp');
      } else {
        if (pass.length < 6) {
          console.log('mật khẩu của bạn chứa ít nhất 6 ký tự');
        } else {
          await auth()
            .createUserWithEmailAndPassword(email, pass)
            .then(userCredential => {
              const user = userCredential.user;

              if (user) {
                setUserInfo(user);
                setIsRegister(false);
              }
            })
            .catch(error => {
              console.log('không thể đăng ký: ', error);
            });
        }
      }
    }
  };
  return (
    <ImageBackground
      source={require('../assets/images/bg-3.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      {isLogin && userInfo ? (
        <>
         

        </>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: '#212121',
              marginVertical: 20,
            }}
          >
            {isRegister ? 'Đăng Ký' :'Đăng Nhập'}
          </Text>

          <View style={styles.loginFormContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={val => setEmail(val)}
                maxLength={100}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                autoComplete="off"
                maxLength={100}
                value={pass}
                onChangeText={val => setPass(val)}
                secureTextEntry
              />
            </View>

            {isRegister && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  autoComplete="off"
                  maxLength={100}
                  value={rePass}
                  onChangeText={val => setRePass(val)}
                  secureTextEntry
                />
              </View>
            )}
          </View>

          <View style={{ height: 20 }} />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={isRegister ? handleRegister : handleLogin}
          >
            <Text style={styles.buttonText}>
              {isRegister ? 'Đăng Ký' : 'Đăng Nhập'}

            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsRegister(!isRegister)}
            style={styles.buttonRegister}
          >
            <Text>{isRegister ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  loginFormContainer: {
    width: Dimensions.get('window').width - 40,
  },

  inputContainer: {
    marginTop: 16,
    marginBottom:16,
  },

  inputLabel: {
    fontWeight: '500',
    color: '#212121',
    fontSize: 26,
  },

  input: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: 28,
    padding: 10,
    borderRadius: 100,
    minHeight: 40,
  },

  buttonLogin: {
    height: 40,
    backgroundColor: '#669900',
    width: Dimensions.get('window').width - 40,
     justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 200,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#fafafa',
  },

  buttonRegister: {
    marginVertical:30,
    //justifyContent: 'center',
    alignItems: 'center',
    
    
  },

});