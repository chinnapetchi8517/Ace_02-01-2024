const GET_LEVEL_3_Products = `
query level3($id: bigint!) {
  Level_Data: master_config(where: {id: {_eq: $id}}) {
    name
    template_id
    ui_element_name
    parent_screen_id
    level
    filter
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

const ChannelTemplateQuery = props => {
  const {tableName, columnKey} = props;

  return `
  query Channel($value: String) {
    channelData: ${tableName}_view_aggregate(where: {${columnKey}: {_eq: $value}}) {
      aggregate {
        sum {
          m1
          m2
          m3
          m4
          m5
          m6
          m7
          m8
          m9
          m10
          m11
          m12
        }
      }
    }
  }
  `;
};

const GET_CHANNEL_DATA = `
query Channel($value: String) {
  Asset_sales_view_aggregate(where: {channel: {_eq: $value}}) {
    aggregate {
      sum {
        m1
        m2
        m3
        m4
        m5
        m6
        m7
        m8
        m9
        m10
        m11
        m12
      }
    }
  }
}
`;

export {GET_LEVEL_3_Products, GET_CHANNEL_DATA, ChannelTemplateQuery};
