import { Property } from 'csstype';
import type { SVGAttributes } from 'nixix';

type HeroIconPath = {
  path: string;
  outline: boolean;
};

type IconProps = {
  path: HeroIconPath;
  fill?: Property.Fill;
  stroke?: Property.Fill;
  size?: number;
  className?: string;
} & Omit<SVGAttributes<SVGSVGElement>, 'path' | 'stroke' | 'fill'>;

const Icon = (props: IconProps) => {
  const { className, stroke, size = 24, fill, path, ...rest } = props;
  if ('stroke:width' in rest) {
    path.path = path.path.replace(
      `stroke-width="2"`,
      `stroke-width="${rest['stroke:width']}"`
    );
  }
  const svg = (
    <svg
      viewBox={'0 0 24 24'}
      width={size}
      height={size}
      innerHTML={path.path}
      className={className ? className : 'he-i'}
      {...rest}
    ></svg>
  );
  const svgElement = svg as unknown as SVGSVGElement;
  if (fill) svgElement.style.setProperty('fill', fill);
  if (stroke) svgElement.style.setProperty('stroke', stroke);
  return svg;
};

export default Icon;
