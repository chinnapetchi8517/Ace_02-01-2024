const GET_USER = `
query User_details($id:  bigint!) {
    user(where: {id: {_eq: $id}}) {
      email
      id
      name
      role
    }
  }
`;

const GET_MONTH = `
query GetMonth {
  Month: template(limit: 1) {
    month
  }
}
`;

// Home query file
const GET_DASHBOARD_DATA = `
query Dashboard @cached(ttl: 120) {
  Dashboard: master_config(where: {level: {_eq: 0}}, order_by: {id: asc}) {
    id
    name
    template_id
    ui_element_name
    level
    children {
      level
      id
      name
      template_id
      ui_element_name
      parent_screen_id
    }
  }
}
`;

// Get Products
const GET_PRODUCTS = `
query GetProducts($id: bigint!) {
  Products: master_config(where: {id: {_eq: $id}}) {
    level
    id
    name
    template_id
    ui_element_name
    children(order_by: {id: asc}) {
      id
      level
      name
      template_id
      ui_element_name
    }
  }
}
`;

// Overview
const GET_OVERVIEW_MONTH = `
query GetOverviewCategoryMonth($category: String!) {
  CategoryMonth: overview_all(where: {category: {_eq: $category}}, limit: 1) {
    month
    category
  }
}
`;

export {
  GET_USER,
  GET_DASHBOARD_DATA,
  GET_PRODUCTS,
  GET_MONTH,
  GET_OVERVIEW_MONTH,
};
