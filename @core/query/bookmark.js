const GET_BOOKMARK_LIST = `
query Get_User_Bookmark($id: [Int!]!) {
  Bookmark_List:master_config(where: {id: {_in: $id}}) {
    id
    ui_element_name
    level
    parent_screen_id
    parent {
      id
      level
      ui_element_name
      parent_screen_id
      parent {
        id
        level
        ui_element_name
        parent_screen_id
        parent {
          id
          level
          ui_element_name
          parent_screen_id
        }
      }
    }
  }
}

`;

const UPDATE_USER_BOOKMARK = `
mutation Update_User_KPI($user_id: String!,$bookmark: String!) {
  update_user(where: {user_id: {_eq: $user_id}}, _set: {bookmark: $bookmark}) {
    returning {
      bookmark
      user_id
    }
  }
}
`;

export {GET_BOOKMARK_LIST, UPDATE_USER_BOOKMARK};
