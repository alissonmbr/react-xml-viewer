import { Attributes } from 'components/Attributes';
import { CollapseIcon } from 'components/CollapseIcon';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { hasAttributes } from 'helpers';
import { useCollapsible } from 'hooks/useCollapsible';
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
}

export function Tag(props: TagProps) {
  const { indentation, tagKey, attributes, children, isInline, hasChildren, level } = props;
  const { collapsed, buttonProps } = useCollapsible(level);
  const { theme } = useXMLViewerContext();

  return (
    <div>
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
          {!collapsed && children}
          {collapsed && '...'}
          <span style={{ color: theme.separatorColor }}>{`${
            isInline || collapsed ? '' : indentation
          }</`}</span>
          <span style={{ color: theme.tagColor }}>{`${tagKey}`}</span>
          <span style={{ color: theme.separatorColor }}>{'>'}</span>
        </>
      )}
    </div>
  );
}
