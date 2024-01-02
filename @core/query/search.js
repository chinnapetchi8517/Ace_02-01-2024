const GLOBAL_SEARCH = `
query GlobelSearch($condition: master_config_bool_exp!) {
  search: master_config(where: $condition) {
    ui_element_name
    parent_screen_id
    name
    id
    template_id
    level
    parent {
      level
      ui_element_name
      parent {
        id
        level
        ui_element_name
        parent {
          id
          level
          ui_element_name
        }
      }
    }
  }
}
`;

const GET_RECENT_SEARCH = `
query Recent_Search($user_id: String) {
  RecentSearch: user_preference(where: {user_id: {_eq: $user_id}}) {
    recent_search
    user_id
  }
}
`;

const UPDATE_RECENT_SEARCH = `
mutation Upadte_Recent_Search($user_id: String, $recent_search: String) {
  UpdateRecent: update_user_preference(where: {user_id: {_eq: $user_id}}, _set: {recent_search: $recent_search}) {
    returning {
      user_id
      recent_search
    }
  }
}
`;

export {GLOBAL_SEARCH, GET_RECENT_SEARCH, UPDATE_RECENT_SEARCH};
