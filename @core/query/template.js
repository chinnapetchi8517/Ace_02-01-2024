const TEMPLATE_DATA = `
query template_sum_query($tableName: String, $params: jsonb, $fields: String) {
  TemplateData: get_dynamic_result_v3(args: {table_name: $tableName, params: $params, computed_fields: $fields}) {
    result
  }
}
`;

const GROUP_BY_DATA = `
query dynamic_query($tableName: String, $params: jsonb, $fields: String, $limit: Int, $offset: Int) {
  GroupData: get_dynamic_data_aggregate_v3(args: {table_name: $tableName, params: $params, computed_fields: $fields, limit_param: $limit, offset_param: $offset}) {
    result
  }
}
`;

const TEMPLATE_LEGEND_DATA = `
query GetLegend($id: Int) {
  template(where: {id: {_eq: $id}}, limit: 1) {
    legend
  }
}
`;

export {TEMPLATE_DATA, GROUP_BY_DATA, TEMPLATE_LEGEND_DATA};

const TemplateQuery = props => {
  const {template_id, tableName} = props;

  switch (template_id) {
    case 1:
      return `
      query Template1($filter: ${tableName}_view_bool_exp) {
        stage1: ${tableName}_view_aggregate(where: $filter) {
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
              y1
              y2
              mtd_target_m1
              mtd_target_m2
              mtd_target_m3
              mtd_target_m4
              mtd_target_m5
              mtd_target_m6
              mtd_target_m7
              mtd_target_m8
              mtd_target_m9
              mtd_target_m10
              mtd_target_m11
              mtd_target_m12
              ytd_target_y1
            }
          }
        }
        stage2: ${tableName}_view_aggregate(where: $filter) {
          aggregate {
            sum {
              month_end_m1
              month_end_m2
              month_end_m3
              month_end_m4
              month_end_m5
              month_end_m6
              month_end_m7
              month_end_m8
              month_end_m9
              month_end_m10
              month_end_m11
              month_end_m12
              month_end_m13
              month_end_m14
              month_end_m15
              month_end_m16
              month_end_m17
              month_end_m18
              month_end_m19
              month_end_m20
              month_end_m21
              month_end_m22
              month_end_m23
              month_end_m24
            }
          }
        }
      }
      `;
    case 2:
      return `query Template1 {
        templateData:${tableName} {
          ytd
          mtd
          customer_segment
          emirate
          age_bracket
        }
      }`;

    case 3:
      return `query Template3 {
          get_chart_data(args: { groupbycolumn: "buyout_banks", keyname: "buyout_banks"}) {
            x: data_name
            y: data_value
          }
        }`;

    case 10:
      return `query MyQuery {
            get_table_data1 {
              result
            }
          }`;

    default:
      return null;
  }
};

export default TemplateQuery;
