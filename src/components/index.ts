import { SvgIconOwnProps } from '@mui/material';

export interface SvgIconTypeMap<AdditionalProps, RootComponent extends React.ElementType = 'svg'> {
  props: AdditionalProps & SvgIconOwnProps;
  defaultComponent: RootComponent;
}
