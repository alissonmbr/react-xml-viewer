import { Attributes } from 'components/Attributes';
import { CollapseIcon } from 'components/CollapseIcon';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { hasAttributes } from 'helpers';
import { useCollapsible } from 'hooks/useCollapsible';
import { useLineNumber } from 'hooks/useLineNumber';
import { ReactNode } from 'react';
import { AttributesObject } from 'types';

export interface TagProps {
  indentation: string;
  tagKey: string;
  attributes: AttributesObject;
  children: ReactNode;
  isInline: boolean;
  hasChildren: boolean;
  level: number;
  keyValue: string;
}

export function Tag(props: TagProps) {
  const { indentation, tagKey, attributes, children, isInline, hasChildren, level, keyValue } =
    props;
  const { collapsed, buttonProps } = useCollapsible(level);
  const { theme } = useXMLViewerContext();
  const tagRef = useLineNumber<HTMLDivElement>(keyValue);
  const closeTagRef = useLineNumber<HTMLSpanElement>(`${keyValue}-close`, !isInline);
  const display = collapsed ? 'none' : undefined;

  return (
    <div ref={tagRef}>
      <span {...buttonProps}>
        <span>{indentation}</span>
        <CollapseIcon collapsed={collapsed} />
        <span style={{ color: theme.separatorColor }}>{'<'}</span>
        <span style={{ color: theme.tagColor }}>{`${tagKey}`}</span>
        {!collapsed && <Attributes attributes={attributes} />}
        {collapsed && hasAttributes(attributes) && ' ...'}
        <span style={{ color: theme.separatorColor }}>{!hasChildren ? ' />' : '>'}</span>
      </span>
      {hasChildren && (
        <>
          <span style={{ display }}>{children}</span>
          {collapsed && '...'}
          <span style={{ color: theme.separatorColor, display }}>{`${
            isInline || collapsed ? '' : indentation
          }</`}</span>
          <span style={{ color: theme.tagColor, display }}>{`${tagKey}`}</span>
          <span style={{ color: theme.separatorColor, display }} ref={closeTagRef}>
            {'>'}
          </span>
        </>
      )}
    </div>
  );
}
