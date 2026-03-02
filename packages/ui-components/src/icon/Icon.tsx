import { getColorByName } from "@repo/ui-theme/parts/color.js";
import type { Theme } from "@repo/ui-theme/theme.js";
import { ThemeContext } from "@repo/ui-theme/themeProvider/ThemeContext.js";
import type { ColorName } from "@repo/ui-theme/types.js";
import type { LucideIcon as LucideIconType, LucideProps } from "lucide-react";
import { type HTMLAttributes, useContext } from "react";
import { customIcon } from "./icon.css.js";

type Size = keyof Theme["icon"]["size"];

interface BaseProps {
  color?: "inherit" | ColorName;
  size?: Size | number;
}

export interface LucideIconProps extends Omit<LucideProps, "size" | "color">, BaseProps {
  icon: LucideIconType;
}

interface CustomIconProps extends BaseProps, Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  icon: string;
}

export type IconProps = LucideIconProps | CustomIconProps;

export const Icon = (props: IconProps) =>
  isCustomProps(props) ? <CustomIcon {...props} /> : <LucideIcon {...props} />;

const isCustomProps = (props: IconProps): props is CustomIconProps => {
  return typeof props.icon === "string";
};

const CustomIcon = ({ icon: svgString, size = "medium", color = "inherit" }: CustomIconProps) => {
  const { theme } = useContext(ThemeContext);
  const actualColor = color === "inherit" ? undefined : getColorByName(color, theme.palette);
  const pixels = typeof size === "number" ? size : theme.icon.size[size];
  return (
    <div
      className={customIcon}
      dangerouslySetInnerHTML={{ __html: svgString }}
      style={{
        width: pixels,
        height: pixels,
        color: actualColor,
      }}
    />
  );
};

export const LucideIcon = ({ icon: IconComponent, size = "medium", color = "inherit", ...props }: LucideIconProps) => {
  const { theme } = useContext(ThemeContext);
  const actualColor = color === "inherit" ? undefined : getColorByName(color, theme.palette);
  const pixels = typeof size === "number" ? size : theme.icon.size[size];
  return <IconComponent size={pixels} color={actualColor} {...props} />;
};
