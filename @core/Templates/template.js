import React, {Fragment, useEffect, useState} from 'react';

// Template components
import Template1 from './Template_1';
import Template2 from './Template_2';
import Template3 from './Template_3';
import Template4 from './Template_4';
import Template5 from './Template_5';
import Template6 from './Template_6';
import Template7 from './Template_7';
import Template8 from './Template_8';
import Template9 from './Template_9';
import Template10 from './Template_10';
import Template11 from './Template_11';
import Template12 from './Template_12';
import Template13 from './Template_13';
import Template15 from './Template_15';
import Template16 from './Template_16';
import Template17 from './Template_17';

const templateComponents = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
  5: Template5,
  6: Template6,
  7: Template7,
  8: Template8,
  9: Template9,
  10: Template10,
  11: Template11,
  12: Template12,
  13: Template13,
  15: Template15,
  16: Template16,
  17: Template17,
  // Add more templates as needed
};

const Template = props => {
  const {
    template_id,
    tableName,
    title,
    id,
    navigation,
    level,
    disableCardHeader,
    isModal,
    filter,
    productSegement,
    level2SliderData,
  } = props;
  const [TemplateComponent, setTemplateComponent] = useState(null);

  useEffect(() => {
    // Set the template component based on the template ID
    if (template_id) {
      setTemplateComponent(() => templateComponents[template_id]);
    } else {
      // Handle the case when the template ID is invalid
      // You might want to set a default template or show an error message here
    }
  }, [template_id]);

  if (template_id === null) {
    return null;
  }

  return (
    <Fragment>
      {TemplateComponent ? (
        <TemplateComponent
          template_id={template_id}
          tableName={tableName}
          title={title}
          id={id}
          navigation={navigation}
          level={level}
          disableCardHeader={disableCardHeader}
          isModal={isModal}
          filter={filter}
          productSegement={productSegement}
          level2SliderData={level2SliderData}
        />
      ) : null}
    </Fragment>
  );
};

export default Template;
