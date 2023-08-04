import React, { useEffect, Component } from 'react';
import { Route } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';
import NavBar from "./NavBar";
import { AUTH_CONFIG } from './auth0-variables';
import { useAuth0 } from "@auth0/auth0-react";






function Lock()  {

	 var languageDictionary = {};

languageDictionary.title = "Sign In";

 languageDictionary.forgotPasswordInstructions = "Please enter your e-mail address. We will send you an email to reset your password.<br/>Unable to reset your password? <a href='https://www.delijn.be/en/contact/faq-detail/24699/ik-wil-mijn-wachtwoord-wijzigen' class='underline'>Then consult our FAQ.</a>";
 languageDictionary.signUpTerms = 'By signing up, you agree to our <a href="https://www.delijn.be/en/voettekst/disclaimer.html" class="underline">terms of service</a> and <a href="https://www.delijn.be/en/voettekst/privacy.html" class="underline">privacy policy</a>';
 languageDictionary.passwordlessEmailAlternativeInstructions = "Try to login using your e-mail or <a class='underline' href='#' onclick='loginWithPassword()'>click here </a> to type your password";
 languageDictionary.passwordlessEmailInstructions = "Try to login using your e-mail or <a class='underline' href='#' onclick='loginWithPassword()'>click here </a> to type your password";
 languageDictionary.passwordlessSMSInstructions = "Register your phone number with us to make your authentication easier"
 languageDictionary.error = {
 login: {
 blocked_user: 'The user is blocked.',
 invalid_user_password: 'No account found',
 'lock.fallback': "We're sorry, something went wrong when attempting to log in.<br/>Still having trouble? <a href='#' onclick='passwordless()' class='underline'>Try to login with your email </a>",
 'lock.invalid_code': 'Wrong code.',
 'lock.invalid_email_password': "Incorrect e-mail or password.<br/>Still having trouble? <a href='#' onclick='passwordless()' class='underline'>Try to login with your email </a>",
 'lock.invalid_username_password': "Wrong username or password.<br/>Still having trouble? <a href='#' onclick='passwordless()' class='underline'>Try to login with your email </a>",
 'lock.network': 'We could not reach the server. Please check your connection and try again.',
 'lock.popup_closed': 'Popup window closed. Try again.',
 'lock.unauthorized': 'Permissions were not granted. Try again.',
 'lock.mfa_registration_required':
 'Multifactor authentication is required but your device is not enrolled. Please enroll it before moving on.',
 'lock.mfa_invalid_code': 'Wrong code. Please try again.',
 password_change_required:
 'You need to update your password because this is the first time you are logging in, or because your password has expired.', // TODO: verify error code
 password_leaked:
 'We have detected a potential security issue with this account. To protect your account, we have blocked this login. An e-mail was sent with instruction on how to unblock your account.',
 too_many_attempts: 'Your account has been blocked after multiple consecutive login attempts.',
 too_many_requests:
 "We're sorry. There are too many requests right now. Please reload the page and try again. If this persists, please try again later.",
 session_missing:
 "Couldn't complete your authentication request. Please try again after closing all open dialogs",
 'hrd.not_matching_email': 'Please use your corporate e-mail to login.'
 },
 passwordless: {
 'bad.email': 'Invalid e-mail adress',
 'bad.phone_number': 'The phone number is invalid',
 'lock.fallback': "We're sorry, something went wrong <br/>Still having trouble? <a href='#' onclick='passwordless()' class='underline'>Try to login with your email </a>"
 },
 signUp:{
 invalid_password: 'invalid Password.',
 'lock.fallback': "We're sorry, something went wrong when attempting to sign up.<br/>Still having trouble? <a href='https://www.delijn.be/en/contact/faq-detail/24697/ik-kan-geen-account-aanmaken' class='underline'>Try to login with your email </a>",
 password_dictionary_error: 'Password is too common.',
 password_no_user_info_error: 'Password is based on user information.',
 password_strength_error: 'Password is too weak.',
 user_exists: 'The user already exists.',
 username_exists: 'The username already exists.'
 },

 }


  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    auth: {
      responseType: 'token id_token',
      sso: true,
      redirect: false
    },
    showTerms: true,
    languageDictionary: languageDictionary,
    allowSignUp: false,
    oidcConformant : true,
    closable: true,
    popupOptions: { width: 400, height: 400, left: 200, top: 300 },
    allowForgotPassword: false,
    container: AUTH_CONFIG.container,
    theme: {
      primaryColor: '#f2007d',
      logo: ""
    }
  });

  //lock.show();

//  constructor(props) {
//
//    super(props);

//  }


  const onAuthenticated = () => {

    lock.on('authenticated', (authResult) => {

      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      loginWithRedirect();
    });
  }

    useEffect(() => {
      // Update the document title using the browser API
          //if (!this.props.location || !(/access_token|id_token|error/.test(this.props.location.hash)) ) {
            lock.show();
                lock.on('authenticated', (authResult) => {

                  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                  localStorage.setItem('access_token', authResult.accessToken);
                  localStorage.setItem('id_token', authResult.idToken);
                  localStorage.setItem('expires_at', expiresAt);
                  loginWithRedirect();
                });
          //}
    });

  const componentDidMount = () => {
    // Avoid showing Lock when hash is parsed

    if (!this.props.location || !(/access_token|id_token|error/.test(this.props.location.hash)) ) {
      this.lock.show();
    }
  }

  //render() {
    const style = { marginTop: '32px' }

    return(
        <div>
          <h2>Login Page</h2>
          <div id={AUTH_CONFIG.container} style={style}></div>
        </div>

    );
  //}
}

export default Lock;
