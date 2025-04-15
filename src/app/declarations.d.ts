// declarations.d.ts
declare module '*.svg' {
    import { ReactElement } from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }