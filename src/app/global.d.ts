declare module '*.svg' {
   import React, { FC } from 'react';

   const SVG: FC<React.SVGProps<SVGSVGElement>>;
   export default SVG;
}
