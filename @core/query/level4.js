const GET_LEVEL_4_Products = `
query level4($id: bigint!) {
  Level_Data: master_config(where: {id: {_eq: $id}}) {
    name
    template_id
    ui_element_name
    level
    id
    parent_screen_id
    children {
      name
      template_id
      ui_element_name
      parent_screen_id
      id
      filter
    }
  }
}
`;

export {GET_LEVEL_4_Products};
