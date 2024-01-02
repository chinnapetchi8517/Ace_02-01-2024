const InsertUser = `
mutation InserUser($user_id: String!) {
  InsertUser: insert_user_preference(objects: {user_id: $user_id}) {
    returning {
      id
      recent_search
      kpi
      user_id
      bookmark
    }
  }
}
`;

const GetUser = `
query GetUser($user_id: String!) {
  User: user_preference(where: {user_id: {_eq: $user_id}}) {
    user_id
    recent_search
    bookmark
    id
    kpi
  }
}
`;

export {InsertUser, GetUser};
