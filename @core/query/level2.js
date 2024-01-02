const GET_LEVEL_2_BUSINESS = `
query level2($id: bigint!) {
  Level_Data:master_config(where: {id: {_eq: $id}}) {
    id
    ui_element_name
    template_id
    name
    level
    children {
      id
      name
      ui_element_name
      template_id
      level
    }
  }
}
`;

const GET_LEVEL_2_PRODUCTS = `
query level2($id: bigint!) {
  Level_Data: master_config(where: {id: {_eq: $id}}) {
    name
    template_id
    ui_element_name
    parent_screen_id
    level
    id
    filter
  }
}
`;

export {GET_LEVEL_2_BUSINESS, GET_LEVEL_2_PRODUCTS};
