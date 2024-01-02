const GET_AUTH_VALIDATOR = `mutation AuthValidator {
    verifyDevice {
      decodedToken {
        code
        data {
          preferred_username
          exp
        }
        message
        status
      }
      profileData {
        code
        data {
          id
          userPrincipalName
          displayName
          jobTitle
        }
        message
        status
      }
      userData {
        code
        data {
          userDetails {
            id
          }
          id
        }
        message
        status
      }
    }
  }`;

const LOGOUT = `
mutation LogoutUserDevice($user_id: String) {
  logoutDevice(arg1: {entraId: $user_id}) {
    userData {
      code
      message
      status
      data {
        id
        sessionClosedAt
      }
    }
  }
}
`;

export {GET_AUTH_VALIDATOR, LOGOUT};
