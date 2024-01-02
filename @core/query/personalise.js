const GET_KPI_LIST = `
query KPI_LIST($level: Int!) {
  KPI: master_config(where: {level: {_eq: $level}}) {
    id
    level
    name
    ui_element_name
    children {
      id
      level
      name
      parent_screen_id
      ui_element_name
    }
  }
}
`;

const GET_USER_KPI = `
query GetUserKPI($user_id: String) {
  user_kpi:user(where: {user_id: {_eq: $user_id}}) {
    user_id
    kpi
  }
}
`;

const UPDATE_USER_KPI = `
mutation Update_User_KPI($user_id: String!,$kpi: String!) {
  update_user(where: {user_id: {_eq: $user_id}}, _set: {kpi: $kpi}) {
    returning {
      kpi
      user_id
    }
  }
}
`;

export {GET_KPI_LIST, GET_USER_KPI, UPDATE_USER_KPI};
