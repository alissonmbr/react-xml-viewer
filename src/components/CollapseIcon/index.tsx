import { useXMLViewerContext } from "../../xml-viewer-context";
import { ReactComponent as Caret} from "../../assets/svg/caret-right.svg";

export interface CollapseIconProps {
  collapsed: boolean;
}

export function CollapseIcon(props: CollapseIconProps): JSX.Element | null {
  const { collapsible, theme } = useXMLViewerContext();
  const { collapsed } = props;

  return collapsible ? (
    <span style={{ position: "relative" }}>
      <span style={{ position: "absolute", right: "0", border: 0, padding: 0, background: "none" }}>
        <Caret
          fill={theme.separatorColor}
          style={{ transform: `rotate(${collapsed ? 0 : 90}deg)`, transition: "transform 0.2s" }}
        />
      </span>
    </span>
  ) : null;
}
