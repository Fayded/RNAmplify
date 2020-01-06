import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import { withAuthenticator } from 'aws-amplify-react-native'
import { Auth } from 'aws-amplify' 
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

class App extends React.Component {
  state = {
    username: '', password: '', email: ''
  }
  // event handler
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    console.log('user:', user)
  }
  signUp = async() => {
    const { username, password, email } = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email }})
    } catch (err) {
      console.log('error signing up user...', err)
    }
  }
  signOut = () => {
    Auth.signOut()
      .then(() => this.props.onStateChange('signedOut'))
      .catch(err => console.log('err: ', err))
  }
  render() {
    return (
      <div>
        <TextInput
          placeholder='username'
          value={this.state.username}
          style={{ width: 300, height: 50, margin: 5, backgroundColor: "#ddd" }}
          onChangeText={v => this.onChange('username', v)}
        />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Hello World</Text>
          <Text onPress={this.signOut}>Sign Out</Text>
        </SafeAreaView>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28
  }
})

export default withAuthenticator(App);