class SignIn extends React.Component {
  constructor() {
    super()
    this.state = { email: '', password: '', error: '' }
  }
  change(e, key) {
    this.setState({ [key]: e.target.value })
  }
  async signIn() {
    try {
      this.setState({ error: '' })
      let d = await axios.post('/sign-in', { email: this.state.email, password: this.state.password })
      if (d.data.email) location.href = '/profile'
    } catch (e) {
      console.log(e)
      this.setState({ error: e.response.data.error })
    }
  }
  render() {
    return (
      <div className="SignIn">
        <div>
          <label>Email:</label>
          <input type="text" value={this.state.email} onChange={e => this.change(e, 'email')} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={this.state.password} onChange={e => this.change(e, 'password')} />
        </div>
        <button type="button" onClick={() => this.signIn()}>
          Sign In
        </button>
        <div className="error">{this.state.error}</div>
        <div>
          <a href="/sign-up">Sign Up</a>
        </div>
      </div>
    )
  }
}

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = { email: '', password: '', error: '' }
  }
  change(e, key) {
    this.setState({ [key]: e.target.value })
  }
  async signUp() {
    try {
      this.setState({ error: '' })
      let d = await axios.post('/sign-up', { email: this.state.email, password: this.state.password })
      if (d.data.email) location.href = '/profile'
    } catch (e) {
      console.log(e)
      this.setState({ error: e.response.data.error })
    }
  }
  render() {
    return (
      <div className="SignUp">
        <div>
          <label>Email:</label>
          <input type="text" value={this.state.email} onChange={e => this.change(e, 'email')} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={this.state.password} onChange={e => this.change(e, 'password')} />
        </div>
        <button type="button" onClick={() => this.signUp()}>
          Sign Up
        </button>
        <div className="error">{this.state.error}</div>
        <div>
          <a href="/sign-in">Sign In</a>
        </div>
      </div>
    )
  }
}

if (document.getElementById('SignIn')) ReactDOM.render(<SignIn />, document.getElementById('SignIn'))
if (document.getElementById('SignUp')) ReactDOM.render(<SignUp />, document.getElementById('SignUp'))

onload = () => {
  let logout = document.querySelector('.logout')
  if (logout) {
    logout.addEventListener('click', async function(e) {
      e.preventDefault()
      try {
        await axios.post('/logout')
        location.href = '/sign-in'
      } catch (e) {
        console.log(e)
      }
    })
  }
}
