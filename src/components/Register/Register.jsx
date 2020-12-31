import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameInput: '',
      userEmailInput: '',
      userPasswordInput: '',
      errorMessage: '',
      hasError: false,
    };
  }

  onUserNameInput = (event) => {
    this.setState({ userNameInput: event.target.value });
  };
  onUserEmailInput = (event) => {
    this.setState({ userEmailInput: event.target.value });
  };
  onUserPasswordInput = (event) => {
    this.setState({ userPasswordInput: event.target.value });
  };
  onSubmit = () => {
    const { userNameInput, userEmailInput, userPasswordInput } = this.state;
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userNameInput,
        email: userEmailInput,
        password: userPasswordInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ hasError: true });
          this.setState({ errorMessage: data.message });
        } else {
          this.props.userStatusChange('signin');
        }
      });
  };
  render() {
    const { userStatusChange } = this.props;
    return (
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Registration</legend>
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
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(event) => this.onUserNameInput(event)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(event) => this.onUserEmailInput(event)}
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
                  onChange={(event) => this.onUserPasswordInput(event)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={() => this.onSubmit()}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                href="#0"
                className="f6 link dim black db"
                onClick={() => userStatusChange('signin')}
              >
                Sgnin
              </a>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
