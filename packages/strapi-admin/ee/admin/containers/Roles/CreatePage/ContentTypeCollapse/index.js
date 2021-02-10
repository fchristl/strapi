import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Collapse from './Collapse';
import CollapsePropertyMatrix from './CollapsePropertyMatrix';
import getAvailableActions from './utils/getAvailableActions';
import Wrapper from './Wrapper';

const ContentTypeCollapse = ({
  allActions,
  contentTypeName,
  index,
  isActive,
  onClickToggleCollapse,
  properties,
}) => {
  const handleClickToggleCollapse = useCallback(() => {
    onClickToggleCollapse(contentTypeName);
  }, [contentTypeName, onClickToggleCollapse]);

  const availableActions = useMemo(() => {
    return getAvailableActions(allActions, contentTypeName);
  }, [allActions, contentTypeName]);

  const isOdd = useMemo(() => index % 2 !== 0, [index]);

  return (
    <Wrapper withMargin={isOdd}>
      <Collapse
        availableActions={availableActions}
        isActive={isActive}
        isGrey={index % 2 === 0}
        name={contentTypeName}
        onClickToggle={handleClickToggleCollapse}
      />
      {isActive &&
        properties.map(({ label, key, values }, i) => {
          return (
            <CollapsePropertyMatrix
              availableActions={availableActions}
              label={label}
              propertyName={key}
              key={key}
              isLast={i === properties.length - 1}
              isOdd={isOdd}
              values={values}
            />
          );
        })}
    </Wrapper>
  );
};

ContentTypeCollapse.propTypes = {
  allActions: PropTypes.array.isRequired,
  contentTypeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClickToggleCollapse: PropTypes.func.isRequired,
  properties: PropTypes.array.isRequired,
};

export default ContentTypeCollapse;