import { CollapseIcon } from 'components/CollapseIcon';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useCollapsible } from 'hooks/useCollapsible';
import { useLineNumber } from 'hooks/useLineNumber';
import { ReactNode } from 'react';

export interface CommentTagProps {
  indentation: string;
  children: ReactNode;
  isInline: boolean;
  level: number;
  keyValue: string;
}

export function CommentTag(props: CommentTagProps) {
  const { indentation, children, isInline, level, keyValue } = props;
  const { theme } = useXMLViewerContext();
  const { collapsed, buttonProps } = useCollapsible(level);
  const openTagRef = useLineNumber<HTMLSpanElement>(keyValue);
  const closeTagRef = useLineNumber<HTMLSpanElement>(`${keyValue}-close`, !isInline);
  const display = collapsed ? 'none' : undefined;

  return (
    <div style={{ color: theme.commentColor }}>
      <span {...buttonProps}>
        <span>{indentation}</span>
        <CollapseIcon collapsed={collapsed} />
        <span ref={openTagRef}>{'<!-- '}</span>
      </span>
      <span style={{ display }}>{children}</span>
      {collapsed && '...'}
      <span style={{ display }} ref={closeTagRef}>{`${
        isInline || collapsed ? ' ' : indentation
      }-->`}</span>
    </div>
  );
}
