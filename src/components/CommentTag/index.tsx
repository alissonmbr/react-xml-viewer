import { CollapseIcon } from 'components/CollapseIcon';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useCollapsible } from 'hooks/useCollapsible';
import { ReactNode } from 'react';

export interface CommentTagProps {
  indentation: string;
  children: ReactNode;
  isInline: boolean;
  level: number;
}

export function CommentTag(props: CommentTagProps) {
  const { indentation, children, isInline, level } = props;
  const { theme } = useXMLViewerContext();
  const { collapsed, buttonProps } = useCollapsible(level);

  return (
    <div style={{ color: theme.commentColor }}>
      <span {...buttonProps}>
        <span>{indentation}</span>
        <CollapseIcon collapsed={collapsed} />
        <span>{'<!-- '}</span>
      </span>
      {!collapsed && children}
      {collapsed && '...'}
      <span>{`${isInline || collapsed ? ' ' : indentation}-->`}</span>
    </div>
  );
}
