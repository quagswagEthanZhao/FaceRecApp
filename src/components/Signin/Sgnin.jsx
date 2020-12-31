import React from 'react';

class Sgnin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      hasError: false,
      errorMessage: '',
    };
  }
  onEmailChange = (event) => {
    // console.log(event.target.value);
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    // console.log(`User cridencials ${this.state.signInEmail}`);
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.message);
        if (!data.error) {
          // console.log(data.currentUser);
          this.props.getCurrentUser(data.currentUser);
          this.props.userStatusChange('home');
        } else {
          this.setState({ hasError: true });
          this.setState({ errorMessage: data.message });
        }
      });
    // this.props.userStatusChange('home');
  };
  render() {
    const { userStatusChange } = this.props;
    return (
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              {this.state.hasError ? (
                <p
                  style={{ fontSize: 10 }}
                  class="w-150 ba br2 pa3 ma2 red bg-washed-red"
                  role="alert"
                >
                  {this.state.errorMessage}
                </p>
              ) : (
                <p></p>
              )}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(event) => this.onEmailChange(event)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) => this.onPasswordChange(event)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={() => this.onSubmitSignIn()}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                href="#0"
                className="f6 link dim black db"
                onClick={() => userStatusChange('register')}
              >
                Register
              </a>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Sgnin;
