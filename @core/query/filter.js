const GET_FILTER = `
query MyQuery($levelIds: [String!]!) {
  app_filter(order_by: {id: asc, level: asc}, where: {level: {_in: $levelIds}}) {
    sectionName: display_name
    level
    value
    children {
      options: display_name
      value
    }
  }
}
`;

const GET_SUBPRODUCT = `query MyQuery($sub_product :String ) {
  app_filter(order_by: {id: asc, level: asc}, where: {level: {_in: "2"}}) {
    sectionName: display_name
    level
    value
    children(where: {value: {_like: $sub_product}}) {
      options: display_name
      value
      products
    }
  }
}`;

export {GET_FILTER,GET_SUBPRODUCT};
